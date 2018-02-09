//
//  XTUINavigationController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUINavigationController.h"
#import "XTUIUtils.h"
#import "XTContext.h"
#import "XTMemoryManager.h"
#import <objc/runtime.h>

@interface UINavigationController (XTUIPatch)

@end

@implementation UINavigationController (XTUIPatch)

+ (void)load {
    Method originMethod = class_getInstanceMethod([UINavigationController class], @selector(pushViewController:animated:));
    Method replacingMethod = class_getInstanceMethod([UINavigationController class], @selector(xtui_pushViewController:animated:));
    if (!class_addMethod([UINavigationController class],
                         @selector(xtui_pushViewController:animated:),
                         method_getImplementation(replacingMethod),
                         method_getTypeEncoding(replacingMethod))) {
        method_exchangeImplementations(originMethod, replacingMethod);
    }
}

- (void)xtui_pushViewController:(UIViewController *)viewController animated:(BOOL)animated {
    if ([viewController isKindOfClass:[XTUINavigationController class]]) {
        [self xtui_pushViewController:viewController.childViewControllers.firstObject animated:animated];
    }
    else {
        [self xtui_pushViewController:viewController animated:animated];
    }
}

- (UIViewController *)childViewControllerForStatusBarStyle {
    return self.childViewControllers.lastObject;
}

@end

@interface XTUINavigationController ()

@property (nonatomic, weak) UINavigationController *innerObject;

@end

@implementation XTUINavigationController

+ (NSString *)name {
    return @"_XTUINavigationController";
}

+ (NSString *)create {
    XTUINavigationController *viewController = [XTUINavigationController new];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:viewController];
    [XTMemoryManager add:managedObject];
    viewController.context = [JSContext currentContext];
    viewController.objectUUID = managedObject.objectUUID;
    viewController.navigationBar.hidden = YES;
    return managedObject.objectUUID;
}

+ (NSString *)clone:(UINavigationController *)navigationController {
    XTUINavigationController *viewController = [XTUINavigationController new];
    viewController.innerObject = navigationController;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:viewController];
    [XTMemoryManager add:managedObject];
    viewController.context = [JSContext currentContext];
    viewController.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

+ (void)xtr_setViewControllers:(NSArray<NSString *> *)viewControllers animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUINavigationController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUINavigationController class]]) {
        NSMutableArray *targetViewControllers = [NSMutableArray array];
        for (NSString *vcRef in viewControllers) {
            UIViewController *vc = [XTMemoryManager find:vcRef];
            if ([vc isKindOfClass:[UIViewController class]]) {
                [targetViewControllers addObject:vc];
            }
        }
        [(obj.innerObject ?: obj) setViewControllers:[targetViewControllers copy]
                                            animated:animated];
    }
}

+ (void)xtr_pushViewController:(NSString *)viewControllerRef animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUINavigationController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUINavigationController class]]) {
        UIViewController *target = [XTMemoryManager find:viewControllerRef];
        if ([target isKindOfClass:[UIViewController class]]) {
            [(obj.innerObject ?: obj) pushViewController:target animated:animated];
        }
    }
}

+ (NSString *)xtr_popViewController:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUINavigationController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUINavigationController class]]) {
        id target = [(obj.innerObject ?: obj) popViewControllerAnimated:animated];
        if ([target conformsToProtocol:@protocol(XTComponent)]) {
            return [target objectUUID];
        }
    }
    return nil;
}

+ (NSArray<NSString *> *)xtr_popToViewController:(NSString *)viewControllerRef
                                        animated:(BOOL)animated
                                       objectRef:(NSString *)objectRef {
    XTUINavigationController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUINavigationController class]]) {
        id targetViewController = [XTMemoryManager find:viewControllerRef];
        if ([targetViewController isKindOfClass:[UIViewController class]]) {
            NSArray *returns = [(obj.innerObject ?: obj) popToViewController:targetViewController animated:animated];
            NSMutableArray *output = [NSMutableArray array];
            for (id r in returns) {
                if ([r conformsToProtocol:@protocol(XTComponent)]) {
                    [output addObject:[r objectUUID] ?: @""];
                }
            }
            return [output copy];
        }
    }
    return @[];
}

+ (NSArray<NSString *> *)xtr_popToRootViewController:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUINavigationController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUINavigationController class]]) {
        NSArray *returns = [(obj.innerObject ?: obj) popToRootViewControllerAnimated:animated];
        NSMutableArray *output = [NSMutableArray array];
        for (id r in returns) {
            if ([r conformsToProtocol:@protocol(XTComponent)]) {
                [output addObject:[r objectUUID] ?: @""];
            }
        }
        return [output copy];
    }
    return @[];
}

- (UIViewController *)childViewControllerForStatusBarStyle {
    return [self.childViewControllers lastObject];
}

#pragma mark - ViewController callbacks

- (void)viewDidLoad {
    [super viewDidLoad];
    self.automaticallyAdjustsScrollViewInsets = NO;
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewDidLoad" withArguments:@[]];
        }
    }
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewWillAppear" withArguments:@[]];
        }
    }
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewDidAppear" withArguments:@[]];
        }
    }
    if (self.navigationController != nil) {
        self.navigationController.navigationBar.hidden = YES;
    }
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewWillDisappear" withArguments:@[]];
        }
    }
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewDidDisappear" withArguments:@[]];
        }
    }
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewWillLayoutSubviews" withArguments:@[]];
        }
    }
}

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewDidLayoutSubviews" withArguments:@[]];
        }
    }
}

- (void)willMoveToParentViewController:(id)parent {
    [super willMoveToParentViewController:parent];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"_willMoveToParentViewController"
                  withArguments:[parent conformsToProtocol:@protocol(XTComponent)] ? @[[parent objectUUID] ?: [NSNull null]] : @[]];
        }
    }
}

- (void)didMoveToParentViewController:(id)parent {
    [super didMoveToParentViewController:parent];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"_didMoveToParentViewController"
                  withArguments:[parent conformsToProtocol:@protocol(XTComponent)] ? @[[parent objectUUID] ?: [NSNull null]] : @[]];
        }
    }
}

@end
