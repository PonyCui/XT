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
#import "XTRDebug.h"

@implementation XTRuntime

static NSSet<XTRApplicationDelegate *> *moduleDelegates;

+ (NSString *)version {
    return @"0.0.1";
}

+ (XTRApplicationDelegate *)requestDelegateWithObjectUUID:(NSString *)objectUUID {
    for (XTRApplicationDelegate *moduleDelegate in moduleDelegates) {
        if ([moduleDelegate.objectUUID isEqualToString:objectUUID]) {
            return moduleDelegate;
        }
    }
    return nil;
}

+ (void)retainDelegate:(XTRApplicationDelegate *)delegate {
    NSMutableSet *mutable = [(moduleDelegates ?: [NSSet set]) mutableCopy];
    [mutable addObject:delegate];
    moduleDelegates = [mutable copy];
}

+ (void)releaseDelegate:(XTRApplicationDelegate *)delegate {
    NSMutableSet *mutable = [(moduleDelegates ?: [NSSet set]) mutableCopy];
    [mutable removeObject:delegate];
    moduleDelegates = [mutable copy];
    [delegate exit];
}

+ (void)startWithNamed:(NSString *)name inBundle:(NSBundle *)bundle navigationController:(UINavigationController *)navigationController {
    [self startWithURL:[NSURL fileURLWithPath:[(bundle ?: [NSBundle mainBundle]) pathForResource:name ofType:@"js"]]
  navigationController:navigationController
       completionBlock:nil
          failureBlock:nil];
}

+ (void)startWithURLString:(NSString *)URLString
      navigationController:(UINavigationController *)navigationController
           completionBlock:(XTRuntimeCompletionBlock)completionBlock
              failureBlock:(XTRBridgeFailureBlock)failureBlock {
    [self startWithURL:[NSURL URLWithString:URLString] navigationController:navigationController completionBlock:completionBlock failureBlock:failureBlock];
}

+ (void)startWithURL:(NSURL *)sourceURL
navigationController:(UINavigationController *)navigationController
     completionBlock:(XTRuntimeCompletionBlock)completionBlock
        failureBlock:(XTRBridgeFailureBlock)failureBlock {
    XTRApplicationDelegate *moduleDelegate = [[XTRApplicationDelegate alloc] init];
    [self retainDelegate:moduleDelegate];
    moduleDelegate.bridge = [[XTRBridge alloc]
                             initWithAppDelegate:moduleDelegate
                             sourceURL:sourceURL
                             completionBlock:^{
                                [moduleDelegate application:nil didFinishLaunchingWithOptions:@{}];
                                if (moduleDelegate.window != nil && [moduleDelegate.window.rootViewController isKindOfClass:[UINavigationController class]]) {
                                    XTRViewController *viewController = [(UINavigationController *)moduleDelegate.window.rootViewController viewControllers].firstObject;
                                    viewController.shouldRestoreNavigationBar = !navigationController.navigationBar.hidden;
                                    moduleDelegate.bridge.keyViewController = viewController;
                                    [UIView animateWithDuration:0.25 animations:^{
                                       [navigationController pushViewController:viewController
                                                                       animated:YES];
                                       navigationController.navigationBar.alpha = 0.0;
                                    } completion:^(BOOL finished) {
                                       navigationController.navigationBar.alpha = 1.0;
                                       navigationController.navigationBar.hidden = YES;
                                    }];
                                    __weak XTRApplicationDelegate *weakModuleDelegate = moduleDelegate;
                                    [viewController setExitAction:^(XTRViewController *keyViewController) {
                                       if (keyViewController.navigationController) {
                                           NSUInteger keyIndex = [keyViewController.navigationController.childViewControllers indexOfObject:keyViewController];
                                           if (keyIndex > 0 && keyIndex != NSNotFound) {
                                               [keyViewController.navigationController popToViewController:keyViewController.navigationController.childViewControllers[keyIndex - 1]
                                                                                                  animated:YES];
                                           }
                                       }
                                       __strong XTRApplicationDelegate *strongModuleDelegate = weakModuleDelegate;
                                       if (strongModuleDelegate) {
                                           [self releaseDelegate:strongModuleDelegate];
                                       }
                                    }];
                                    if (completionBlock) {
                                        completionBlock();
                                    }
                                }
                             }
                             failureBlock:failureBlock];
}

static UINavigationController *currentDebugNavigationViewController;

+ (void)debugWithIP:(NSString *)IP port:(NSInteger)port navigationController:(UINavigationController *)navigationController {
    currentDebugNavigationViewController = navigationController;
    [[XTRDebug sharedDebugger] connectWithIP:IP port:port];
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
}

+ (void)reloadDebugging {
    UIViewController *targetViewController = nil;
    BOOL found = NO;
    for (id item in [currentDebugNavigationViewController childViewControllers]) {
        if ([item isKindOfClass:[XTRViewController class]]) {
            found = YES;
            break;
        }
        targetViewController = item;
    }
    if (found) {
        if (targetViewController == nil) {
            [currentDebugNavigationViewController setViewControllers:@[] animated:NO];
        }
        else {
            [currentDebugNavigationViewController popToViewController:targetViewController animated:NO];
        }
    }
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        [UIApplication sharedApplication].networkActivityIndicatorVisible = NO;
        [self startWithURL:[[XTRDebug sharedDebugger] sourceURL]
      navigationController:currentDebugNavigationViewController
           completionBlock:nil
              failureBlock:nil];
    });
}

@end
