//
//  XTRApplicationDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRApplicationDelegate.h"
#import "XTRBridge.h"
#import "XTRUtils.h"
#import "XTRContext.h"
#import "XTRuntime.h"
#import "XTRWindow.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRuntime (Private)

+ (XTRApplicationDelegate *)requestDelegateWithObjectUUID:(NSString *)objectUUID;

@end

@interface XTRApplicationDelegate()

@end

@implementation XTRApplicationDelegate

+ (NSString *)name {
    return @"XTRApplicationDelegate";
}

+ (XTRApplicationDelegate *)xtr_delegate:(NSString *)objectUUID {
    return [XTRuntime requestDelegateWithObjectUUID:objectUUID];
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRApplicationDelegate dealloc.");
#endif
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if (application != nil) {
        [XTRuntime retainDelegate:self];
    }
    if (self.bridge == nil) {
        self.bridge = [[XTRBridge alloc] initWithAppDelegate:self];
    }
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:self];
    [XTMemoryManager add:managedObject];
    [XTMemoryManager retain:managedObject.objectUUID];
    self.objectUUID = managedObject.objectUUID;
    self.bridge.application = application;
    JSValue *scriptObject = [self.bridge.context evaluateScript:@"window._xtrDelegate"];
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"resetNativeObject" withArguments:@[self.objectUUID]];
        [scriptObject invokeMethod:@"applicationDidFinishLaunchingWithOptions" withArguments:@[@"", launchOptions ?: @{}]];
    }
    return YES;
}

+ (NSString *)xtr_window:(NSString *)objectRef {
    XTRApplicationDelegate *delegate = [XTMemoryManager find:objectRef];
    if ([delegate isKindOfClass:[XTRApplicationDelegate class]]) {
        if ([delegate.window isKindOfClass:[XTRWindow class]]) {
            return [(XTRWindow *)delegate.window objectUUID];
        }
    }
    return @"";
}

+ (void)xtr_setWindow:(NSString *)windowRef objectRef:(NSString *)objectRef {
    XTRApplicationDelegate *delegate = [XTMemoryManager find:objectRef];
    XTRWindow *window = [XTMemoryManager find:windowRef];
    if ([delegate isKindOfClass:[XTRApplicationDelegate class]] && [window isKindOfClass:[XTRWindow class]]) {
        delegate.window = window;
    }
}

- (void)exit {
    _bridge = nil;
}

- (void)setBridge:(XTRBridge *)bridge {
    if (_bridge == nil) {
        _bridge = bridge;
    }
}

- (NSString *)objectUUID {
    if (_objectUUID == nil) {
        _objectUUID = [[NSUUID UUID] UUIDString];
    }
    return _objectUUID;
}

@end
