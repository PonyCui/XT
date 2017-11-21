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
#import "XTRDebug.h"
#import "XTRCanvasView.h"
#import "XTRCustomView.h"
#import "XTRDevice.h"
#import "XTRTextMeasurer.h"
#import <JavaScriptCore/JavaScriptCore.h>
#import <XT-Polyfill/XTPolyfill.h>

@protocol XTRPluginProtocol

- (instancetype)initWithJSContext:(JSContext *)context;

@end

@interface XTRBridge ()

@property (nonatomic, strong) XTRContext *context;
@property (nonatomic, weak) XTRApplicationDelegate *appDelegate;
@property (nonatomic, readwrite) NSURL *sourceURL;
@property (nonatomic, copy) NSArray *pluginInstances;

@end

@implementation XTRBridge

static NSString *globalBridgeScript;

+ (void)setGlobalBridgeScript:(NSString *)argGlobalBridgeScript {
    globalBridgeScript = argGlobalBridgeScript;
}

- (void)dealloc {
    NSLog(@"XTRBridge dealloc");
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
        [_context evaluateScript:@"var window = {}; var objectRefs = {};"];
        
        [XTRBreakpoint attachBreakpoint:_context];
        [XTPolyfill addPolyfills:_context];
        [self loadComponents];
        [self loadRuntime];
        [self loadPlugins];
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
    if (self.sourceURL.isFileURL) {
        NSString *script = [[NSString alloc] initWithContentsOfURL:self.sourceURL encoding:NSUTF8StringEncoding error:NULL];
        if (script) {
            [self.context evaluateScript:script];
        }
        return;
    }
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

- (void)loadComponents {
    for (Class component in @[
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
                              [XTRCanvasView class],
                              [XTRCustomView class],
                              [XTRDevice class],
                              [XTRTextMeasurer class],
                              ]) {
        if ([component conformsToProtocol:@protocol(XTRComponent)]) {
            self.context[[component name]] = component;
        }
    }
}

- (void)loadRuntime {
    [self.context evaluateScript:@"var XT = {}"];
    NSString *path = [[NSBundle mainBundle] pathForResource:@"xt.ios.min" ofType:@"js"];
    if (path) {
        NSString *script = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
        [self.context evaluateScript:script];
    }
}

- (void)loadPlugins {
    NSMutableArray *pluginInstances = [NSMutableArray array];
    for (NSString *path in [[NSBundle mainBundle] pathsForResourcesOfType:@"xtplugin.json" inDirectory:nil]) {
        NSData *data = [NSData dataWithContentsOfFile:path options:kNilOptions error:NULL];
        if (data != nil) {
            NSDictionary *obj = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:NULL];
            if ([obj isKindOfClass:[NSDictionary class]] && [obj[@"main"] isKindOfClass:[NSString class]]) {
                Class clazz = NSClassFromString(obj[@"main"]);
                if (clazz != NULL) {
                    if ([clazz instancesRespondToSelector:@selector(initWithJSContext:)]) {
                        id instance = [[clazz alloc] initWithJSContext:self.context];
                        if (instance != nil) {
                            [pluginInstances addObject:instance];
                        }
                    }
                }
            }
        }
    }
    self.pluginInstances = pluginInstances;
}

- (void)reload {
    if (self.sourceURL != nil) {
        [self loadViaSourceURL];
        [self.appDelegate application:self.application
        didFinishLaunchingWithOptions:@{}];
    }
    else {
        [self.context evaluateScript:globalBridgeScript];
        [self.appDelegate application:self.application
        didFinishLaunchingWithOptions:@{}];
    }
}

- (void)resetSourceURL:(NSURL *)sourceURL {
    self.sourceURL = sourceURL;
    [self reload];
}

@end
