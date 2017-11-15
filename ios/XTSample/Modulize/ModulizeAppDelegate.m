//
//  ModulizeAppDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "ModulizeAppDelegate.h"
#import "ModulizeStartViewController.h"

@implementation ModulizeAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = [[UINavigationController alloc] initWithRootViewController:[ModulizeStartViewController new]];
    [self.window makeKeyAndVisible];
    return YES;
}

@end
