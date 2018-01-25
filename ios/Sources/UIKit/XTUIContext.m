//
//  XTUIContext.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIContext.h"
#import "XTContext.h"
#import "XTComponent.h"
#import "XTUIApplication.h"
#import "XTRView.h"
#import "XTRWindow.h"
#import "XTUIApplicationDelegate.h"
#import "XTRViewController.h"
#import "XTRNavigationBar.h"
#import "XTRNavigationController.h"
#import "XTRScreen.h"
#import "XTRImage.h"
#import "XTRImageView.h"
#import "XTRLabel.h"
#import "XTRLayoutConstraint.h"
#import "XTRButton.h"
#import "XTRFont.h"
#import "XTRUtils.h"
#import "XTRScrollView.h"
#import "XTRListView.h"
#import "XTRListCell.h"
#import "XTRTextField.h"
#import "XTRTextView.h"
#import "XTDebug.h"
#import "XTRCanvasView.h"
#import "XTRCustomView.h"
#import "XTRDevice.h"
#import "XTRTextMeasurer.h"
#import "XTRHRView.h"
#import "XTRModal.h"
#import "XTRWebView.h"
#import "XTRSwitch.h"
#import "XTRSlider.h"
#import "XTRActivityIndicatorView.h"
#import "XTDebug.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface XTUIContext ()<UINavigationControllerDelegate>

@property (nonatomic, weak) XTUIApplicationDelegate *appDelegate;
@property (nonatomic, readwrite) NSURL *sourceURL;
@property (nonatomic, copy) NSArray *pluginInstances;

@end

@implementation XTUIContext

#ifdef LOGDEALLOC
- (void)dealloc {
    NSLog(@"XTUIContext dealloc.");
}
#endif

- (instancetype)initWithSourceURL:(NSURL *)sourceURL
                  completionBlock:(XTUIContextCompletionBlock)completionBlock
                     failureBlock:(XTUIContextFailureBlock)failureBlock
{
    self = [super init];
    if (self) {
        _sourceURL = sourceURL;
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
            [self loadViaSourceURL:completionBlock failureBlock:failureBlock];
        }];
    }
    return self;
}

- (void)setup {
    [super setup];
    [self loadComponents];
    [self loadScript];
}

- (void)loadViaSourceURL:(XTUIContextCompletionBlock)completionBlock failureBlock:(XTUIContextFailureBlock)failureBlock {
    if (self.sourceURL.isFileURL) {
        NSString *script = [[NSString alloc] initWithContentsOfURL:self.sourceURL encoding:NSUTF8StringEncoding error:NULL];
        if (script) {
            [self evaluateScript:script];
            [self.application.delegate didFinishLaunchingWithOptions:@{}];
            if (completionBlock) {
                completionBlock();
            }
        }
    }
    else {
        NSURLRequest *request = [NSURLRequest requestWithURL:self.sourceURL
                                                 cachePolicy:NSURLRequestUseProtocolCachePolicy
                                             timeoutInterval:15.0];
        [[[NSURLSession sharedSession] dataTaskWithRequest:request
                                         completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
                                             if (error == nil && data != nil) {
                                                 NSString *script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                                                 if (script) {
                                                     [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                                                         [self evaluateScript:script];
                                                         [self.application.delegate didFinishLaunchingWithOptions:@{}];
                                                         if (completionBlock) {
                                                             completionBlock();
                                                         }
                                                     }];
                                                 }
                                             }
                                             else {
                                                 [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                                                     if (failureBlock) {
                                                         failureBlock(error ?: [NSError errorWithDomain:@"XTUIContext" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"unknown error."}]);
                                                     }
                                                     
                                                 }];
                                             }
                                         }] resume];
    }
}

- (void)loadComponents {
    for (Class component in @[
                              [XTUIApplication class],
                              [XTUIApplicationDelegate class],
                              [XTRView class],
                              [XTRWindow class],
                              [XTRViewController class],
                              [XTRNavigationBar class],
                              [XTRNavigationController class],
                              [XTRScreen class],
                              [XTRImage class],
                              [XTRImageView class],
                              [XTRLabel class],
                              [XTRLayoutConstraint class],
                              [XTRButton class],
                              [XTRFont class],
                              [XTRScrollView class],
                              [XTRListView class],
                              [XTRListCell class],
                              [XTRTextField class],
                              [XTRTextView class],
                              [XTRCanvasView class],
                              [XTRCustomView class],
                              [XTRDevice class],
                              [XTRTextMeasurer class],
                              [XTRHRView class],
                              [XTRModal class],
                              [XTRWebView class],
                              [XTRSwitch class],
                              [XTRSlider class],
                              [XTRActivityIndicatorView class],
                              [XTDebug class],
                              ]) {
        if ([component conformsToProtocol:@protocol(XTComponent)]) {
            self[[component name]] = component;
        }
    }
}

- (void)loadScript {
    [self evaluateScript:@"var XT = {}"];
    NSString *path = [[NSBundle mainBundle] pathForResource:@"xt.ios.min" ofType:@"js"];
    if (path) {
        NSString *script = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
        [self evaluateScript:script];
    }
}

#pragma mark - Start Application Static Methods

+ (void)startWithNamed:(NSString *)name
              inBundle:(NSBundle *)bundle
  navigationController:(UINavigationController *)navigationController {
    [self startWithURL:[NSURL fileURLWithPath:[(bundle ?: [NSBundle mainBundle]) pathForResource:name ofType:@"js"]]
  navigationController:navigationController
       completionBlock:nil
          failureBlock:nil];
}

+ (void)startWithURLString:(NSString *)URLString
      navigationController:(UINavigationController *)navigationController
           completionBlock:(XTUIContextCompletionBlock)completionBlock
              failureBlock:(XTUIContextFailureBlock)failureBlock {
    [self startWithURL:[NSURL URLWithString:URLString]
  navigationController:navigationController
       completionBlock:completionBlock
          failureBlock:failureBlock];
}

+ (void)startWithURL:(NSURL *)sourceURL
navigationController:(UINavigationController *)navigationController
     completionBlock:(XTUIContextCompletionBlock)completionBlock
        failureBlock:(XTUIContextFailureBlock)failureBlock {
    __block XTUIContext *context = [[XTUIContext alloc] initWithSourceURL:sourceURL
                                      completionBlock:^{
                                          UINavigationController *rootViewController = (id)context.application.delegate.window.rootViewController;
                                          if ([rootViewController isKindOfClass:[UINavigationController class]]) {
                                              XTRViewController *firstViewController = [rootViewController childViewControllers].firstObject;
                                              if ([firstViewController isKindOfClass:[XTRViewController class]]) {
                                                  firstViewController.shouldRestoreNavigationBar = !navigationController.navigationBar.hidden;
                                                  [UIView animateWithDuration:0.25 animations:^{
                                                      [navigationController pushViewController:firstViewController
                                                                                      animated:YES];
                                                      navigationController.navigationBar.alpha = 0.0;
                                                  } completion:^(BOOL finished) {
                                                      navigationController.navigationBar.alpha = 1.0;
                                                      navigationController.navigationBar.hidden = YES;
                                                  }];
                                                  [firstViewController setExitAction:^(XTRViewController *keyViewController) {
                                                      [context terminal];
                                                  }];
                                              }
                                          }
                                          if (completionBlock) {
                                              completionBlock();
                                          }
                                      }
                                         failureBlock:^(NSError * _Nonnull error) {
                                             if (failureBlock) {
                                                 failureBlock(error);
                                             }
                                             [context terminal];
                                         }];
}

static UINavigationController *currentDebugNavigationViewController;

+ (void)debugWithIP:(NSString *)IP port:(NSInteger)port navigationController:(UINavigationController *)navigationController {
    currentDebugNavigationViewController = navigationController;
    [[XTDebug sharedDebugger] connectWithIP:IP port:port];
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
}

+ (void)reloadDebugging {
    UIViewController *targetViewController = nil;
    BOOL found = NO;
    for (id item in [currentDebugNavigationViewController childViewControllers]) {
        if ([item isKindOfClass:[XTRViewController class]]) {
            found = YES;
            break;
        }
        targetViewController = item;
    }
    if (found) {
        if (targetViewController == nil) {
            [currentDebugNavigationViewController setViewControllers:@[] animated:NO];
        }
        else {
            [currentDebugNavigationViewController popToViewController:targetViewController animated:NO];
        }
    }
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
        [self startWithURL:[[XTDebug sharedDebugger] sourceURL]
      navigationController:currentDebugNavigationViewController
           completionBlock:nil
              failureBlock:nil];
    });
}

@end
