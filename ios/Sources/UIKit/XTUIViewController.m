//
//  XTUIViewController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIViewController.h"
#import "XTUIUtils.h"
#import "XTContext.h"
#import "XTUINavigationController.h"
#import "XTUINavigationBar.h"
#import "XTUIView.h"
#import <objc/runtime.h>
#import "XTMemoryManager.h"

@interface XTUIViewController ()

@property (nonatomic, assign) UIStatusBarStyle originalStatusBarStyle;
@property (nonatomic, strong) XTUINavigationBar *navigationBar;
@property (nonatomic, assign) BOOL navigationBarHidden;
@property (nonatomic, strong) UIView *innerView;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, strong) id keyboardWillShowObserver;
@property (nonatomic, strong) id keyboardWillHideObserver;

@end

@implementation XTUIViewController

+ (NSString *)name {
    return @"_XTUIViewController";
}

+ (NSString *)create {
    XTUIViewController *viewController = [XTUIViewController new];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:viewController];
    [XTMemoryManager add:managedObject];
    viewController.context = [JSContext currentContext];
    viewController.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}


- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUIViewController dealloc.");
#endif
    [self unsetKeyboardNotifications];
}


- (instancetype)init
{
    self = [super init];
    if (self) {
        _originalStatusBarStyle = [UIApplication sharedApplication].statusBarStyle;
        _navigationBarHidden = YES;
        [self setupKeyboardNotifications];
    }
    return self;
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

#pragma mark - Keyboard Notifications

- (void)setupKeyboardNotifications {
    static NSDictionary *lastUserInfo;
    __weak XTUIViewController *welf = self;
    self.keyboardWillShowObserver = [[NSNotificationCenter defaultCenter] addObserverForName:UIKeyboardWillShowNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        __strong XTUIViewController *strongSelf = welf;
        JSValue *value = strongSelf.scriptObject;
        if (value) {
            NSDictionary *userInfo = note.userInfo ?: lastUserInfo;
            if (userInfo == nil) {
                return ;
            }
            lastUserInfo = userInfo;
            [value invokeMethod:@"keyboardWillShow" withArguments:@[
                                                                      [JSValue fromRect:[userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue]],
                                                                      userInfo[UIKeyboardAnimationDurationUserInfoKey] ?: @(0),
                                                                      ]];
        }
    }];
    self.keyboardWillHideObserver = [[NSNotificationCenter defaultCenter] addObserverForName:UIKeyboardWillHideNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        __strong XTUIViewController *strongSelf = welf;
        JSValue *value = strongSelf.scriptObject;
        if (value) {
            [value invokeMethod:@"keyboardWillHide" withArguments:@[
                                                                      note.userInfo[UIKeyboardAnimationDurationUserInfoKey] ?: @(0),
                                                                      ]];
        }
    }];
}

- (void)unsetKeyboardNotifications {
    [[NSNotificationCenter defaultCenter] removeObserver:self.keyboardWillShowObserver];
    [[NSNotificationCenter defaultCenter] removeObserver:self.keyboardWillHideObserver];
}

+ (NSString *)xtr_view:(NSString *)objectRef {
    UIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIViewController class]]) {
        XTUIView *view = (id)[(XTUIViewController *)obj innerView];
        if ([view isKindOfClass:[XTUIView class]]) {
            return view.objectUUID;
        }
    }
    else if ([obj isKindOfClass:[UIViewController class]]) {
        XTUIView *view = (id)obj.view;
        if ([view isKindOfClass:[XTUIView class]]) {
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
        if ([obj isKindOfClass:[XTUIViewController class]]) {
            [(XTUIViewController *)obj setInnerView:view];
        }
    }
}

+ (NSDictionary *)xtr_safeAreaInsets:(NSString *)objectRef {
    XTUIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIViewController class]]) {
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
        if ([parentViewController conformsToProtocol:@protocol(XTComponent)]) {
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
            if ([viewController conformsToProtocol:@protocol(XTComponent)]) {
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
        if ([naviCtl isKindOfClass:[XTUINavigationController class]]) {
            return [(XTUINavigationController *)naviCtl objectUUID];
        }
        else if ([naviCtl isKindOfClass:[UINavigationController class]]) {
            return [XTUINavigationController clone:naviCtl];
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
    self.navigationBar.shouldShowBackBarButtonItem = [self.navigationController.childViewControllers indexOfObject:self] != 0;
    if (self.scriptObject != nil) {
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"_willMoveToParentViewController"
                  withArguments:[parent conformsToProtocol:@protocol(XTComponent)] ? @[[parent objectUUID] ?: [NSNull null]] : @[]];
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
                  withArguments:[parent conformsToProtocol:@protocol(XTComponent)] ? @[[parent objectUUID] ?: [NSNull null]] : @[]];
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

- (void)setNavigationBar:(XTUINavigationBar *)navigationBar {
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

- (void)setTitle:(NSString *)title {
    [super setTitle:title];
    if (self.navigationBar) {
        self.navigationBar.innerItem.title = title;
    }
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
    XTUIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIViewController class]]) {
        return obj.navigationBar.objectUUID;
    }
    return nil;
}

+ (void)xtr_setNavigationBar:(NSString *)barRef objectRef:(NSString *)objectRef {
    XTUINavigationBar *bar = [XTMemoryManager find:barRef];
    XTUIViewController *obj = [XTMemoryManager find:objectRef];
    if ([bar isKindOfClass:[XTUINavigationBar class]] && [obj isKindOfClass:[XTUIViewController class]]) {
        obj.navigationBar = bar;
    }
}

+ (void)xtr_showNavigationBar:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIViewController class]]) {
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
    XTUIViewController *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIViewController class]]) {
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