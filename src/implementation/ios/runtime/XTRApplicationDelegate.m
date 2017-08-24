//
//  XTRApplicationDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRApplicationDelegate.h"
#import "XTRBridge.h"

@interface XTRApplicationDelegate()

@property (nonatomic, strong) XTRBridge *bridge;
@property (nonatomic, strong) JSValue *scriptObject;

@end

@implementation XTRApplicationDelegate

static XTRApplicationDelegate *sharedDelegate;

+ (void)attachDelegate:(JSValue *)delegate {
    if (sharedDelegate != nil) {
        [sharedDelegate setScriptObject:delegate];
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
        _bridge = [[XTRBridge alloc] initWithAppDelegate:self];
    }
    return self;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if (self.scriptObject != nil) {
        [self.scriptObject invokeMethod:@"applicationDidFinishLaunchingWithOptions"
                          withArguments:@[@"", launchOptions ?: @{}]];
    }
    return YES;
}

@end
