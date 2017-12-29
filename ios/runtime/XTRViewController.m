//
//  XTRViewController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRViewController.h"
#import "XTRUtils.h"
#import "XTRContext.h"
#import "XTRNavigationController.h"
#import "XTRView.h"
#import <objc/runtime.h>
#import <XT-Mem/XTMemoryManager.h>

@interface XTRViewController ()

@property (nonatomic, weak) JSContext *context;

@end

@implementation XTRViewController

+ (NSString *)name {
    return @"XTRViewController";
}

+ (NSString *)create {
    XTRViewController *viewController = [XTRViewController new];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:viewController];
    [XTMemoryManager add:managedObject];
    viewController.context = [JSContext currentContext];
    viewController.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

#ifdef LOGDEALLOC
- (void)dealloc {
    NSLog(@"XTRViewController dealloc.");
}
#endif

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

+ (NSString *)xtr_view:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIViewController class]]) {
        XTRView *view = (id)obj.view;
        if ([view isKindOfClass:[XTRView class]]) {
            return view.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_setView:(NSString *)viewRef objectRef:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    UIView *view = [XTMemoryManager find:viewRef];
    if ([obj isKindOfClass:[UIViewController class]] && [view isKindOfClass:[UIView class]]) {
        obj.view = view;
    }
}

+ (NSString *)xtr_parentViewController:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIViewController class]]) {
        id parentViewController = [obj parentViewController];
        if ([parentViewController conformsToProtocol:@protocol(XTRComponent)]) {
            return [parentViewController objectUUID];
        }
    }
    return nil;
}

+ (NSArray<NSString *> *)xtr_childViewControllers:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    NSMutableArray *childViewControllers = [NSMutableArray array];
    if ([obj isKindOfClass:[UIViewController class]]) {
        for (id viewController in obj.childViewControllers) {
            if ([viewController conformsToProtocol:@protocol(XTRComponent)]) {
                [childViewControllers addObject:[viewController objectUUID] ?: @""];
            }
        }
    }
    return [childViewControllers copy];
}

+ (void)xtr_addChildViewController:(NSString *)childControllerRef objectRef:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIViewController class]]) {
        UIViewController *childController = [XTMemoryManager find:childControllerRef];
        if ([childController isKindOfClass:[UIViewController class]]) {
            [obj addChildViewController:childController];
        }
    }
}

+ (void)xtr_removeFromParentViewController:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIViewController class]]) {
        [obj removeFromParentViewController];
    }
}

+ (NSString *)xtr_navigationController:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIViewController class]]) {
        UINavigationController *naviCtl = obj.navigationController;
        if ([naviCtl isKindOfClass:[XTRNavigationController class]]) {
            return [(XTRNavigationController *)naviCtl objectUUID];
        }
        else if ([naviCtl isKindOfClass:[UINavigationController class]]) {
            return [XTRNavigationController clone:naviCtl];
        }
    }
    return nil;
}

#pragma mark - ViewController callbacks

- (void)loadView {
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"loadView" withArguments:@[]];
        }
    }
}

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

static UINavigationController *tmpNavigationController;

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    tmpNavigationController = self.navigationController;
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
    if (self.shouldRestoreNavigationBar && self.navigationController == nil) {
        tmpNavigationController.navigationBar.hidden = NO;
        tmpNavigationController.navigationBar.alpha = 1.0;
    }
    tmpNavigationController = nil;
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
                  withArguments:[parent conformsToProtocol:@protocol(XTRComponent)] ? @[[parent objectUUID] ?: [NSNull null]] : @[]];
        }
    }
    if ([parent isKindOfClass:[UINavigationController class]] && self.shouldRestoreNavigationBar) {
        [self.navigationController.interactivePopGestureRecognizer
         addTarget:self
         action:@selector(onPopGesture:)];
    }
}

- (void)didMoveToParentViewController:(id)parent {
    [super didMoveToParentViewController:parent];
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"_didMoveToParentViewController"
                  withArguments:[parent conformsToProtocol:@protocol(XTRComponent)] ? @[[parent objectUUID] ?: [NSNull null]] : @[]];
        }
    }
    if (parent == nil && self.exitAction) {
        self.exitAction(self);
    }
    if (parent == nil) {
        [tmpNavigationController.interactivePopGestureRecognizer
         removeTarget:self
         action:@selector(onPopGesture:)];
    }
}

- (void)onPopGesture:(UIPanGestureRecognizer *)sender {
    CGFloat progress = [sender locationInView:self.view.window].x / self.view.window.bounds.size.width;
    if (![tmpNavigationController.childViewControllers containsObject:self] && self.shouldRestoreNavigationBar) {
        tmpNavigationController.navigationBar.hidden = NO;
        tmpNavigationController.navigationBar.alpha = progress;
    }
}

@end
