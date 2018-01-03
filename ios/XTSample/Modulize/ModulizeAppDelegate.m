//
//  ModulizeAppDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "ModulizeAppDelegate.h"
#import "ModulizeStartViewController.h"

@interface ModulizeNavigationController: UINavigationController

@end

@implementation ModulizeNavigationController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.navigationBar.tintColor = [UIColor blackColor];
}

- (UIViewController *)childViewControllerForStatusBarStyle {
    return self.childViewControllers.lastObject;
}

@end

@implementation ModulizeAppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = [[ModulizeNavigationController alloc] initWithRootViewController:[ModulizeStartViewController new]];
    [self.window makeKeyAndVisible];
    return YES;
}

@end
