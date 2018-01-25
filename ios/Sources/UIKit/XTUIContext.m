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
#import "XTRApplication.h"
#import "XTRView.h"
#import "XTRWindow.h"
#import "XTRApplicationDelegate.h"
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

@property (nonatomic, weak) XTRApplicationDelegate *appDelegate;
@property (nonatomic, readwrite) NSURL *sourceURL;
@property (nonatomic, copy) NSArray *pluginInstances;

@end

@implementation XTUIContext

#ifdef LOGDEALLOC
- (void)dealloc {
    NSLog(@"XTUIContext dealloc.");
}
#endif

- (instancetype)initWithAppDelegate:(XTRApplicationDelegate *)appDelegate
{
    return [self initWithAppDelegate:appDelegate sourceURL:nil completionBlock:nil failureBlock:nil];
}

- (instancetype)initWithAppDelegate:(XTRApplicationDelegate *)appDelegate
                          sourceURL:(NSURL *)sourceURL
                    completionBlock:(nullable XTUIContextCompletionBlock)completionBlock
                       failureBlock:(XTUIContextFailureBlock)failureBlock
{
    self = [super init];
    if (self) {
        _appDelegate = appDelegate;
        _appDelegate.bridge = self;
        _sourceURL = sourceURL;
        [self loadComponents];
        [self loadRuntime];
        if (_sourceURL != nil) {
            [self loadViaSourceURL:completionBlock failureBlock:failureBlock];
        }
    }
    return self;
}

- (void)loadViaSourceURL:(XTUIContextCompletionBlock)completionBlock failureBlock:(XTUIContextFailureBlock)failureBlock {
    if (self.sourceURL.isFileURL) {
        NSString *script = [[NSString alloc] initWithContentsOfURL:self.sourceURL encoding:NSUTF8StringEncoding error:NULL];
        if (script) {
            [self evaluateScript:script];
            if (((JSValue *)[self evaluateScript:@"window._xtrDelegate"]).isUndefined) {
                if (failureBlock) {
                    failureBlock([NSError errorWithDomain:@"XTUIContext" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"Fail to create AppDelegate."}]);
                }
                return ;
            }
            if (completionBlock) {
                completionBlock();
            }
        }
        return;
    }
    NSURLRequest *request = [NSURLRequest requestWithURL:self.sourceURL
                                             cachePolicy:NSURLRequestUseProtocolCachePolicy
                                         timeoutInterval:15.0];
    if (failureBlock) {
        [[[NSURLSession sharedSession] dataTaskWithRequest:request
                                         completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
            if (error == nil && data != nil) {
                NSString *script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                if (script) {
                    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                        [self evaluateScript:script];
                        if (((JSValue *)[self evaluateScript:@"window._xtrDelegate"]).isUndefined) {
                            if (failureBlock) {
                                failureBlock([NSError errorWithDomain:@"XTUIContext" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"Fail to create AppDelegate."}]);
                            }
                            return ;
                        }
                        if (completionBlock) {
                            completionBlock();
                        }
                    }];
                }
            }
            else {
                [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                    failureBlock(error ?: [NSError errorWithDomain:@"XTUIContext" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"unknown error."}]);
                }];
            }
        }] resume];
    }
    else {
        dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
        [[[NSURLSession sharedSession] dataTaskWithRequest:request
                                         completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
                                             if (error == nil && data != nil) {
                                                 NSString *script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                                                 if (script) {
                                                     [self evaluateScript:script];
                                                     if (completionBlock) {
                                                         completionBlock();
                                                     }
                                                 }
                                             }
                                             else {
                                                 if (failureBlock) {
                                                     failureBlock(error);
                                                 }
                                             }
                                             dispatch_semaphore_signal(semaphore);
                                         }] resume];
        dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
    }
}

- (void)loadComponents {
    for (Class component in @[
                              [XTRApplication class],
                              [XTRApplicationDelegate class],
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

- (void)loadRuntime {
    [self evaluateScript:@"var XT = {}"];
    NSString *path = [[NSBundle mainBundle] pathForResource:@"xt.ios.min" ofType:@"js"];
    if (path) {
        NSString *script = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
        [self evaluateScript:script];
    }
}

#pragma mark - Start Application Static Methods

static NSSet<XTRApplicationDelegate *> *moduleDelegates;

+ (XTRApplicationDelegate *)requestDelegateWithObjectUUID:(NSString *)objectUUID {
    for (XTRApplicationDelegate *moduleDelegate in moduleDelegates) {
        if ([moduleDelegate.objectUUID isEqualToString:objectUUID]) {
            return moduleDelegate;
        }
    }
    return nil;
}

+ (void)retainDelegate:(XTRApplicationDelegate *)delegate {
    NSMutableSet *mutable = [(moduleDelegates ?: [NSSet set]) mutableCopy];
    [mutable addObject:delegate];
    moduleDelegates = [mutable copy];
}

+ (void)releaseDelegate:(XTRApplicationDelegate *)delegate {
    NSMutableSet *mutable = [(moduleDelegates ?: [NSSet set]) mutableCopy];
    [mutable removeObject:delegate];
    moduleDelegates = [mutable copy];
    [delegate exit];
}

+ (void)startWithNamed:(NSString *)name inBundle:(NSBundle *)bundle navigationController:(UINavigationController *)navigationController {
    [self startWithURL:[NSURL fileURLWithPath:[(bundle ?: [NSBundle mainBundle]) pathForResource:name ofType:@"js"]]
  navigationController:navigationController
       completionBlock:nil
          failureBlock:nil];
}

+ (void)startWithURLString:(NSString *)URLString
      navigationController:(UINavigationController *)navigationController
           completionBlock:(XTUIContextCompletionBlock)completionBlock
              failureBlock:(XTUIContextFailureBlock)failureBlock {
    [self startWithURL:[NSURL URLWithString:URLString] navigationController:navigationController completionBlock:completionBlock failureBlock:failureBlock];
}

+ (void)startWithURL:(NSURL *)sourceURL
navigationController:(UINavigationController *)navigationController
     completionBlock:(XTUIContextCompletionBlock)completionBlock
        failureBlock:(XTUIContextFailureBlock)failureBlock {
    XTRApplicationDelegate *moduleDelegate = [[XTRApplicationDelegate alloc] init];
    [self retainDelegate:moduleDelegate];
    moduleDelegate.bridge = [[XTUIContext alloc]
                             initWithAppDelegate:moduleDelegate
                             sourceURL:sourceURL
                             completionBlock:^{
                                 [moduleDelegate didFinishLaunchingWithOptions:@{}];
                                 if (moduleDelegate.window != nil && [moduleDelegate.window.rootViewController isKindOfClass:[UINavigationController class]]) {
                                     XTRViewController *viewController = [(UINavigationController *)moduleDelegate.window.rootViewController viewControllers].firstObject;
                                     viewController.shouldRestoreNavigationBar = !navigationController.navigationBar.hidden;
                                     moduleDelegate.bridge.keyViewController = viewController;
                                     [UIView animateWithDuration:0.25 animations:^{
                                         [navigationController pushViewController:viewController
                                                                         animated:YES];
                                         navigationController.navigationBar.alpha = 0.0;
                                     } completion:^(BOOL finished) {
                                         navigationController.navigationBar.alpha = 1.0;
                                         navigationController.navigationBar.hidden = YES;
                                     }];
                                     __weak XTRApplicationDelegate *weakModuleDelegate = moduleDelegate;
                                     [viewController setExitAction:^(XTRViewController *keyViewController) {
                                         if (keyViewController.navigationController) {
                                             NSUInteger keyIndex = [keyViewController.navigationController.childViewControllers indexOfObject:keyViewController];
                                             if (keyIndex > 0 && keyIndex != NSNotFound) {
                                                 [keyViewController.navigationController popToViewController:keyViewController.navigationController.childViewControllers[keyIndex - 1]
                                                                                                    animated:YES];
                                             }
                                         }
                                         __strong XTRApplicationDelegate *strongModuleDelegate = weakModuleDelegate;
                                         if (strongModuleDelegate) {
                                             [self releaseDelegate:strongModuleDelegate];
                                         }
                                     }];
                                     if (completionBlock) {
                                         completionBlock();
                                     }
                                 }
                             }
                             failureBlock:failureBlock];
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
