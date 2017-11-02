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

@interface XTRApplicationDelegate()

@property (nonatomic, strong) JSManagedValue *scriptObject;
@property (nonatomic, strong) JSContext *context;

@end

@implementation XTRApplicationDelegate

static XTRApplicationDelegate *sharedDelegate;

+ (void)attachDelegate:(JSValue *)delegate {
    if (sharedDelegate != nil) {
        [sharedDelegate setScriptObject:[JSManagedValue managedValueWithValue:delegate andOwner:sharedDelegate]];
        [sharedDelegate setContext:delegate.context];
    }
}

+ (NSString *)name {
    return @"XTRApplicationDelegate";
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        sharedDelegate = self;
    }
    return self;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if (self.bridge == nil) {
        self.bridge = [[XTRBridge alloc] initWithAppDelegate:self];
    }
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"resetNativeObject" withArguments:@[self]];
            [value invokeMethod:@"applicationDidFinishLaunchingWithOptions" withArguments:@[@"", launchOptions ?: @{}]];
        }
    }
    return YES;
}

- (JSValue *)xtr_window {
    return [JSValue fromObject:self.window context:self.context];
}

- (void)xtr_setWindow:(JSValue *)window {
    self.window = [window toWindow];
}

- (void)setBridge:(XTRBridge *)bridge {
    NSAssert(bridge != nil, @"Should not reset bridge.");
    if (_bridge == nil) {
        _bridge = bridge;
    }
}

@end
