//
//  XTRWindow.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRWindow.h"
#import "XTRUtils.h"
#import "XTRLayoutConstraint.h"
#import "XTRContext.h"
#import "XTRDebug.h"
#import "XTRViewController.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRWindow ()

@property (nonatomic, assign) NSTimeInterval longPressDuration;
@property (nonatomic, strong) UITapGestureRecognizer *tapGestureRecognizer;
@property (nonatomic, strong) UITapGestureRecognizer *doubleTapGestureRecognizer;
@property (nonatomic, strong) UILongPressGestureRecognizer *longPressGestureRecognizer;
@property (nonatomic, strong) UIPanGestureRecognizer *panGestureRecognizer;

@property (nonatomic, strong) id keyboardWillShowObserver;
@property (nonatomic, strong) id keyboardWillHideObserver;

@end

@implementation XTRWindow

+ (NSString *)name {
    return @"XTRWindow";
}

+ (NSString *)create:(JSValue *)frame {
    XTRWindow *view = [[XTRWindow alloc] initWithFrame:[frame toRect]];
    [view setupDebug];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = (id)[JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    [view setupKeyboardNotifications];
    return managedObject.objectUUID;
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRWindow dealloc.");
#endif
    [self unsetKeyboardNotifications];
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)setTranslatesAutoresizingMaskIntoConstraints:(BOOL)translatesAutoresizingMaskIntoConstraints {
    [super setTranslatesAutoresizingMaskIntoConstraints:YES];
}

+ (void)xtr_makeKeyAndVisible:(NSString *)objectRef {
    XTRWindow *window = [XTMemoryManager find:objectRef];
    if ([window isKindOfClass:[XTRWindow class]]) {
        window.frame = [UIScreen mainScreen].bounds;
        window.context.bridge.keyWindow = window;
        if (window.context.bridge.application == [UIApplication sharedApplication]) {
            [window makeKeyAndVisible];
        }
    }
}

+ (NSString *)xtr_rootViewController:(NSString *)objectRef {
    XTRWindow *window = [XTMemoryManager find:objectRef];
    if ([window isKindOfClass:[XTRWindow class]]) {
        XTRViewController *viewController = (id)window.rootViewController;
        if ([viewController isKindOfClass:[XTRViewController class]]) {
            return viewController.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_setRootViewController:(NSString *)viewControllerRef objectRef:(NSString *)objectRef {
    XTRWindow *window = [XTMemoryManager find:objectRef];
    XTRViewController *viewController = [XTMemoryManager find:viewControllerRef];
    if ([window isKindOfClass:[XTRWindow class]] && [viewController isKindOfClass:[XTRViewController class]]) {
        window.rootViewController = viewController;
    }
}

+ (void)xtr_endEditing:(NSString *)objectRef {
    XTRWindow *window = [XTMemoryManager find:objectRef];
    if ([window isKindOfClass:[XTRWindow class]]) {
        [window endEditing:YES];
    }
}

#pragma mark - View Layout Callbacks

- (void)didAddSubview:(XTRView *)subview {
    [super didAddSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didAddSubview" withArguments:(subview != nil && [subview isKindOfClass:[XTRView class]]
                                                                   ? @[subview.objectUUID ?: @""] : @[])];
    }
}

- (void)willRemoveSubview:(XTRView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willRemoveSubview" withArguments:(subview != nil && [subview isKindOfClass:[XTRView class]]
                                                                       ? @[subview.objectUUID ?: @""] : @[])];
    }
}

- (void)willMoveToSuperview:(XTRView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToSuperview" withArguments:(newSuperview != nil && [newSuperview isKindOfClass:[XTRView class]]
                                                                         ? @[newSuperview.objectUUID ?: @""] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(XTRWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToWindow" withArguments:(newWindow != nil && [newWindow isKindOfClass:[XTRWindow class]]
                                                                      ? @[newWindow.objectUUID ?: @""] : @[])];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToWindow" withArguments:@[]];
    }
}

#pragma mark - Keyboard Notifications

- (void)setupKeyboardNotifications {
    __weak XTRWindow *welf = self;
    self.keyboardWillShowObserver = [[NSNotificationCenter defaultCenter] addObserverForName:UIKeyboardWillShowNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        __strong XTRWindow *strongSelf = welf;
        JSValue *value = strongSelf.scriptObject;
        if (value) {
            [value invokeMethod:@"handleKeyboardShow" withArguments:@[
                                                                      [JSValue fromRect:[note.userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue]],
                                                                      note.userInfo[UIKeyboardAnimationDurationUserInfoKey] ?: @(0),
                                                                      ]];
        }
    }];
    self.keyboardWillHideObserver = [[NSNotificationCenter defaultCenter] addObserverForName:UIKeyboardWillHideNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        __strong XTRWindow *strongSelf = welf;
        JSValue *value = strongSelf.scriptObject;
        if (value) {
            [value invokeMethod:@"handleKeyboardHide" withArguments:@[
                                                                      note.userInfo[UIKeyboardAnimationDurationUserInfoKey] ?: @(0),
                                                                      ]];
        }
    }];
}

- (void)unsetKeyboardNotifications {
    [[NSNotificationCenter defaultCenter] removeObserver:self.keyboardWillShowObserver];
    [[NSNotificationCenter defaultCenter] removeObserver:self.keyboardWillHideObserver];
}

#pragma mark - XTRDEBUG

- (void)setupDebug {
    UITapGestureRecognizer *debugGesture = [[UITapGestureRecognizer alloc] init];
    debugGesture.numberOfTouchesRequired = 3;
    debugGesture.numberOfTapsRequired = 3;
    [debugGesture addTarget:self action:@selector(onDebug)];
    [self addGestureRecognizer:debugGesture];
}

#if TARGET_OS_SIMULATOR

- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    [self onDebug];
}

#endif

- (void)onDebug {
    [XTRDebug showMenu:self.context.bridge];
}

@end
