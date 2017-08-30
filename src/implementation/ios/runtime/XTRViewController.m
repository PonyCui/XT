//
//  XTRViewController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRViewController.h"
#import "XTRUtils.h"

@interface XTRViewController ()

@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) JSManagedValue *scriptObject;

@end

@implementation XTRViewController

+ (NSString *)name {
    return @"XTRViewController";
}

+ (XTRViewController *)create:(JSValue *)scriptObject {
    XTRViewController *viewController = [XTRViewController new];
    viewController.objectUUID = [[NSUUID UUID] UUIDString];
    viewController.context = scriptObject.context;
    viewController.scriptObject = [JSManagedValue managedValueWithValue:scriptObject andOwner:viewController];
    return viewController;
}

- (JSValue *)xtr_view {
    return [JSValue fromObject:self.view context:self.context];
}

- (void)xtr_setView:(JSValue *)view {
    self.view = [view toView];
}

- (void)loadView {
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"loadView" withArguments:@[]];
        }
    }
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.automaticallyAdjustsScrollViewInsets = NO;
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewDidLoad" withArguments:@[]];
        }
    }
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewWillAppear" withArguments:@[]];
        }
    }
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewDidAppear" withArguments:@[]];
        }
    }
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewWillDisappear" withArguments:@[]];
        }
    }
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewDidDisappear" withArguments:@[]];
        }
    }
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewWillLayoutSubviews" withArguments:@[]];
        }
    }
}

- (void)viewDidLayoutSubviews {
    [super viewDidLayoutSubviews];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"viewDidLayoutSubviews" withArguments:@[]];
        }
    }
}

- (JSValue *)xtr_parentViewController {
    return [JSValue fromObject:self.parentViewController context:self.context];
}

- (NSArray<JSValue *> *)xtr_childViewControllers {
    NSMutableArray *childViewControllers = [NSMutableArray array];
    for (UIViewController *viewController in self.childViewControllers) {
        [childViewControllers addObject:[JSValue fromObject:viewController context:self.context] ?: [NSNull null]];
    }
    return [childViewControllers copy];
}

- (void)xtr_addChildViewController:(JSValue *)childController {
    UIViewController *viewController = [childController toViewController];
    if (viewController) {
        [self addChildViewController:viewController];
    }
}

- (void)xtr_removeFromParentViewController {
    [self removeFromParentViewController];
}

- (void)willMoveToParentViewController:(UIViewController *)parent {
    [super willMoveToParentViewController:parent];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"willMoveToParentViewController" withArguments:parent != nil ? @[
                                                                                                  [JSValue fromObject:parent
                                                                                                              context:self.context]
                                                                                                  ] : @[]];
        }
    }
}

- (void)didMoveToParentViewController:(UIViewController *)parent {
    [super didMoveToParentViewController:parent];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject.value;
        if (value != nil) {
            [value invokeMethod:@"didMoveToParentViewController" withArguments:parent != nil ? @[
                                                                                                  [JSValue fromObject:parent
                                                                                                              context:self.context]
                                                                                                  ] : @[]];
        }
    }
}

- (JSValue *)xtr_navigationController {
    return [JSValue fromObject:self.navigationController context:self.context];
}

@end
