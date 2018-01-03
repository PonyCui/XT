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
#import "XTRNavigationBar.h"
#import "XTRView.h"
#import <objc/runtime.h>
#import <XT-Mem/XTMemoryManager.h>

@interface XTRViewController ()

@property (nonatomic, assign) UIStatusBarStyle originalStatusBarStyle;
@property (nonatomic, strong) XTRNavigationBar *navigationBar;
@property (nonatomic, assign) BOOL navigationBarHidden;
@property (nonatomic, strong) UIView *innerView;
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

- (instancetype)init
{
    self = [super init];
    if (self) {
        _originalStatusBarStyle = [UIApplication sharedApplication].statusBarStyle;
        _navigationBarHidden = YES;
    }
    return self;
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

+ (NSString *)xtr_view:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRViewController class]]) {
        XTRView *view = (id)[(XTRViewController *)obj innerView];
        if ([view isKindOfClass:[XTRView class]]) {
            return view.objectUUID;
        }
    }
    else if ([obj isKindOfClass:[UIViewController class]]) {
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
        obj.view = [UIView new];
        obj.view.backgroundColor = view.backgroundColor ?: [UIColor whiteColor];
        [obj.view addSubview:view];
        if ([obj isKindOfClass:[XTRViewController class]]) {
            [(XTRViewController *)obj setInnerView:view];
        }
    }
}

+ (NSDictionary *)xtr_safeAreaInsets:(NSString *)objectRef {
    XTRViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRViewController class]]) {
        CGFloat topLength = obj.topLayoutGuide.length;
        if (@available(iOS 11.0, *)) {
            topLength = obj.view.safeAreaInsets.top;
        }
        if (obj.navigationBar != nil && !obj.navigationBarHidden) {
            topLength += 44.0;
        }
        if (!obj.navigationBar.translucent) {
            topLength = 0;
        }
        return [JSValue fromInsets:UIEdgeInsetsMake(topLength, 0, 0, 0)];
    }
    return [JSValue fromInsets:UIEdgeInsetsZero];
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
    self.navigationItem.hidesBackButton = YES;
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewWillAppear" withArguments:@[]];
        }
    }
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    self.navigationItem.hidesBackButton = NO;
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
static BOOL onPanning;

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    self.navigationItem.hidesBackButton = YES;
    tmpNavigationController = self.navigationController;
    if (!onPanning) {
        [self viewWillForceDisappear:animated];
    }
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewWillDisappear" withArguments:@[]];
        }
    }
}

- (void)viewDidDisappear:(BOOL)animated {
    [super viewDidDisappear:animated];
    self.navigationItem.hidesBackButton = NO;
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"viewDidDisappear" withArguments:@[]];
        }
    }
    if (self.shouldRestoreNavigationBar && self.navigationController == nil) {
        tmpNavigationController.navigationBar.hidden = NO;
        tmpNavigationController.navigationBar.alpha = 1.0;
        [[UIApplication sharedApplication] setStatusBarStyle:self.originalStatusBarStyle];
    }
    tmpNavigationController = nil;
}

- (void)viewWillForceDisappear:(BOOL)animated {
    if ([self.navigationController.childViewControllers indexOfObject:self] == NSNotFound && self.shouldRestoreNavigationBar && animated) {
        tmpNavigationController.navigationBar.hidden = NO;
        [UIView animateWithDuration:0.25 animations:^{
            tmpNavigationController.navigationBar.alpha = 1.0;
        }];
    }
}

- (void)viewWillLayoutSubviews {
    [super viewWillLayoutSubviews];
    if (self.navigationBar != nil && !self.navigationBarHidden) {
        CGFloat topLength = self.topLayoutGuide.length + 44.0;
        if (@available(iOS 11.0, *)) {
            topLength = self.view.safeAreaInsets.top + 44.0;
        }
        self.navigationBar.frame = CGRectMake(0, 0, self.view.bounds.size.width, topLength);
        if (self.navigationBar.translucent) {
            self.innerView.frame = self.view.bounds;
        }
        else {
            self.innerView.frame = CGRectMake(0,
                                              topLength,
                                              self.view.bounds.size.width,
                                              self.view.bounds.size.height - topLength);
        }
    }
    else {
        self.innerView.frame = self.view.bounds;
    }
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
    if (sender.state == UIGestureRecognizerStateBegan) {
        onPanning = YES;
    }
    else if (sender.state == UIGestureRecognizerStateEnded) {
        onPanning = NO;
    }
    CGFloat progress = [sender locationInView:self.view.window].x / self.view.window.bounds.size.width;
    if (![tmpNavigationController.childViewControllers containsObject:self] && self.shouldRestoreNavigationBar) {
        tmpNavigationController.navigationBar.hidden = NO;
        tmpNavigationController.navigationBar.alpha = progress;
    }
}

- (void)setNavigationBar:(XTRNavigationBar *)navigationBar {
    if (_navigationBar != nil) {
        [_navigationBar removeFromSuperview];
    }
    _navigationBar = navigationBar;
    if (_navigationBar != nil) {
        _navigationBar.viewController = self;
        [self.view addSubview:_navigationBar];
    }
    [self viewWillLayoutSubviews];
}

- (void)setNavigationBarLightContent:(BOOL)navigationBarLightContent {
    _navigationBarLightContent = navigationBarLightContent;
    [[UIApplication sharedApplication]
     setStatusBarStyle:_navigationBarLightContent ? UIStatusBarStyleLightContent : UIStatusBarStyleDefault];
    [self setNeedsStatusBarAppearanceUpdate];
}

- (UIStatusBarStyle)preferredStatusBarStyle {
    return self.navigationBarLightContent ? UIStatusBarStyleLightContent : UIStatusBarStyleDefault;
}

+ (NSString *)xtr_navigationBar:(NSString *)objectRef {
    XTRViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRViewController class]]) {
        return obj.navigationBar.objectUUID;
    }
    return nil;
}

+ (void)xtr_setNavigationBar:(NSString *)barRef objectRef:(NSString *)objectRef {
    XTRNavigationBar *bar = [XTMemoryManager find:barRef];
    XTRViewController *obj = [XTMemoryManager find:objectRef];
    if ([bar isKindOfClass:[XTRNavigationBar class]] && [obj isKindOfClass:[XTRViewController class]]) {
        obj.navigationBar = bar;
    }
}

+ (void)xtr_showNavigationBar:(BOOL)animated objectRef:(NSString *)objectRef {
    XTRViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRViewController class]]) {
        obj.navigationBarHidden = NO;
        obj.navigationBar.shouldShowBackBarButtonItem = [obj.navigationController.childViewControllers indexOfObject:obj] != 0;
        if (animated) {
            [UIView animateWithDuration:0.25 delay:0.0 usingSpringWithDamping:1.0 initialSpringVelocity:8.0 options:kNilOptions animations:^{
                obj.navigationBar.alpha = 1.0;
                [obj viewWillLayoutSubviews];
            } completion:nil];
        }
        else {
            obj.navigationBar.alpha = 1.0;
            [obj viewWillLayoutSubviews];
        }
    }
}

+ (void)xtr_hideNavigationBar:(BOOL)animated objectRef:(NSString *)objectRef {
    XTRViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRViewController class]]) {
        obj.navigationBarHidden = YES;
        if (animated) {
            [UIView animateWithDuration:0.25 delay:0.0 usingSpringWithDamping:1.0 initialSpringVelocity:8.0 options:kNilOptions animations:^{
                obj.navigationBar.alpha = 0.0;
                [obj viewWillLayoutSubviews];
            } completion:nil];
        }
        else {
            obj.navigationBar.alpha = 0.0;
            [obj viewWillLayoutSubviews];
        }
    }
}

@end
