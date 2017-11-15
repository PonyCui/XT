//
//  AppDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "AppDelegate.h"
#import "XTRuntime.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

+ (void)load {
    [XTRBridge setGlobalBridgeScript:[NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"sample.min"
                                                                                                        ofType:@"js"]
                                                               encoding:NSUTF8StringEncoding
                                                                  error:NULL]];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
//    if (self.bridge == nil) {
//        self.bridge = [[XTRBridge alloc] initWithAppDelegate:self
//                                                   sourceURL:[NSURL URLWithString:@"http://localhost:8083/sample.ios.min.js"]];
//    }
    [super application:application didFinishLaunchingWithOptions:launchOptions];
    return YES;
}

@end
