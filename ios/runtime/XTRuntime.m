//
//  XTRuntime.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRuntime.h"
#import "XTRApplicationDelegate.h"
#import "XTRViewController.h"

@implementation XTRuntime

+ (NSString *)version {
    return @"0.0.1";
}

+ (void)startWithNamed:(NSString *)name inBundle:(NSBundle *)bundle navigationController:(UINavigationController *)navigationController {
    XTRApplicationDelegate *moduleDelegate = [[XTRApplicationDelegate alloc] init];
    NSURL *sourceURL = [NSURL fileURLWithPath:[(bundle ?: [NSBundle mainBundle]) pathForResource:name ofType:@"js"]];
    moduleDelegate.bridge = [[XTRBridge alloc] initWithAppDelegate:moduleDelegate
                                                         sourceURL:sourceURL];
    [moduleDelegate application:nil didFinishLaunchingWithOptions:@{}];
    if (moduleDelegate.window != nil && [moduleDelegate.window.rootViewController isKindOfClass:[UINavigationController class]]) {
        XTRViewController *viewController = [(UINavigationController *)moduleDelegate.window.rootViewController viewControllers].firstObject;
        viewController.shouldRestoreNavigationBar = !navigationController.navigationBar.hidden;
        [navigationController.interactivePopGestureRecognizer addTarget:viewController action:NSSelectorFromString(@"onPopGesture:")];
        [UIView animateWithDuration:0.25 animations:^{
            [navigationController pushViewController:viewController
                                            animated:YES];
            navigationController.navigationBar.alpha = 0.0;
        } completion:^(BOOL finished) {
            navigationController.navigationBar.alpha = 1.0;
            navigationController.navigationBar.hidden = YES;
        }];
    }
}

@end
