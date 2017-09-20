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
    [XTRBridge setGlobalBridgeScript:[NSString stringWithContentsOfFile:[[NSBundle mainBundle] pathForResource:@"sample.ios.min"
                                                                                                        ofType:@"js"]
                                                               encoding:NSUTF8StringEncoding
                                                                  error:NULL]];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if (self.bridge == nil) {
        self.bridge = [[XTRBridge alloc] initWithAppDelegate:self
                                                   sourceURL:[NSURL URLWithString:@"http://localhost:8083/sample.ios.min.js"]];
    }
    [super application:application didFinishLaunchingWithOptions:launchOptions];
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
