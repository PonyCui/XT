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

@interface XTRuntime (Private)

+ (XTRApplicationDelegate *)requestDelegateWithObjectUUID:(NSString *)objectUUID;

@end

@interface XTRApplicationDelegate()

@property (nonatomic, weak) id owner;
@property (nonatomic, strong) JSManagedValue *scriptObject;

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
    [self.bridge.context.objectRefs store:self];
    JSValue *delegate = [self.bridge.context evaluateScript:@"window._xtrDelegate"];
    self.scriptObject = [JSManagedValue managedValueWithValue:delegate andOwner:application];
    self.bridge.application = application;
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"resetNativeObject" withArguments:@[self.objectUUID]];
            [value invokeMethod:@"applicationDidFinishLaunchingWithOptions" withArguments:@[@"", launchOptions ?: @{}]];
        }
    }
    return YES;
}

- (JSValue *)xtr_window {
    return [JSValue fromObject:self.window context:self.bridge.context];
}

- (void)xtr_setWindow:(JSValue *)window {
    self.window = [window toWindow];
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
