//
//  XTRBridge.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRBridge.h"
#import "XTRContext.h"
#import "XTRComponent.h"
#import "XTRApplication.h"
#import "XTRView.h"
#import "XTRWindow.h"
#import "XTRApplicationDelegate.h"
#import "XTRViewController.h"
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
#import <JavaScriptCore/JavaScriptCore.h>

@interface XTRBridge ()

@property (nonatomic, strong) XTRContext *context;
@property (nonatomic, strong) XTRApplicationDelegate *appDelegate;
@property (nonatomic, readwrite) NSURL *sourceURL;

@end

@implementation XTRBridge

static NSString *globalBridgeScript;

+ (void)setGlobalBridgeScript:(NSString *)argGlobalBridgeScript {
    globalBridgeScript = argGlobalBridgeScript;
}

- (instancetype)initWithAppDelegate:(XTRApplicationDelegate *)appDelegate
{
    return [self initWithAppDelegate:appDelegate sourceURL:nil];
}

- (instancetype)initWithAppDelegate:(XTRApplicationDelegate *)appDelegate sourceURL:(NSURL *)sourceURL
{
    self = [super init];
    if (self) {
        _appDelegate = appDelegate;
        _sourceURL = sourceURL;
        _context = [[XTRContext alloc] initWithThread:[NSThread mainThread]];
        _context.bridge = self;
        [_context evaluateScript:@"var window = {}"];
        [XTRUtils attachPolyfills:_context];
        self.components = @[
                            [XTRApplication class],
                            [XTRApplicationDelegate class],
                            [XTRView class],
                            [XTRWindow class],
                            [XTRViewController class],
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
                            ];
        if (_sourceURL != nil) {
            [self loadViaSourceURL];
        }
        else {
            [_context evaluateScript:globalBridgeScript];
        }
    }
    return self;
}

- (void)loadViaSourceURL {
    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    [[[NSURLSession sharedSession] dataTaskWithURL:self.sourceURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        if (error == nil && data != nil) {
            NSString *script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
            if (script) {
                [self.context evaluateScript:script];
            }
        }
        dispatch_semaphore_signal(semaphore);
    }] resume];
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);
}

- (void)setComponents:(NSArray<Class> *)components {
    _components = components;
    for (Class component in components) {
        if ([component conformsToProtocol:@protocol(XTRComponent)]) {
            self.context[[component name]] = component;
        }
    }
}

- (void)reload {
    if (self.sourceURL != nil) {
        [self loadViaSourceURL];
        [self.appDelegate application:[UIApplication sharedApplication]
        didFinishLaunchingWithOptions:@{}];
    }
    else {
        [self.context evaluateScript:globalBridgeScript];
        [self.appDelegate application:[UIApplication sharedApplication]
        didFinishLaunchingWithOptions:@{}];
    }
}

- (void)resetSourceURL:(NSURL *)sourceURL {
    self.sourceURL = sourceURL;
    [self reload];
}

@end
