//
//  XTUIWindow.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIWindow.h"
#import "XTUIUtils.h"
#import "XTUILayoutConstraint.h"
#import "XTContext.h"
#import "XTUIContext.h"
#import "XTUIViewController.h"
#import "XTMemoryManager.h"

@interface XTUIWindow ()

@end

@implementation XTUIWindow

+ (NSString *)name {
    return @"_XTUIWindow";
}

+ (NSString *)create {
    XTUIWindow *view = [[XTUIWindow alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = (id)[JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUIWindow dealloc.");
#endif
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)setTranslatesAutoresizingMaskIntoConstraints:(BOOL)translatesAutoresizingMaskIntoConstraints {
    [super setTranslatesAutoresizingMaskIntoConstraints:YES];
}

+ (void)xtr_makeKeyAndVisible:(NSString *)objectRef {
    XTUIWindow *window = [XTMemoryManager find:objectRef];
    if ([window isKindOfClass:[XTUIWindow class]]) {
        window.frame = [UIScreen mainScreen].bounds;
        if ([window.context isKindOfClass:[XTUIContext class]]) {
            [(XTUIContext *)window.context application].delegate.window = window;
        }
    }
}

+ (NSString *)xtr_rootViewController:(NSString *)objectRef {
    UIWindow *window = [XTMemoryManager find:objectRef];
    if ([window isKindOfClass:[UIWindow class]]) {
        id viewController = (id)window.rootViewController;
        if ([viewController conformsToProtocol:@protocol(XTComponent)]) {
            return [viewController objectUUID];
        }
    }
    return nil;
}

+ (void)xtr_setRootViewController:(NSString *)viewControllerRef objectRef:(NSString *)objectRef {
    UIWindow *window = [XTMemoryManager find:objectRef];
    UIViewController *viewController = [XTMemoryManager find:viewControllerRef];
    if ([window isKindOfClass:[UIWindow class]] &&
        [viewController isKindOfClass:[UIViewController class]]) {
        window.rootViewController = viewController;
    }
}

+ (void)xtr_endEditing:(NSString *)objectRef {
    [[UIApplication sharedApplication].keyWindow endEditing:YES];
}

static id<XTComponent> currentFirstResponder;

+ (void)setCurrentFirstResponder:(id<XTComponent>)argCurrentFirstResponder {
    currentFirstResponder = argCurrentFirstResponder;
}

+ (NSString *)xtr_firstResponder:(NSString *)objectRef {
    if ([currentFirstResponder conformsToProtocol:@protocol(XTComponent)]) {
        return currentFirstResponder.objectUUID;
    }
    return nil;
}

#pragma mark - View Callbacks

- (void)layoutSubviews {
    [super layoutSubviews];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"layoutSubviews" withArguments:@[]];
    }
}

- (void)didAddSubview:(XTUIView *)subview {
    [super didAddSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didAddSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                   ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willRemoveSubview:(XTUIView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willRemoveSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                       ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willMoveToSuperview:(XTUIView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToSuperview" withArguments:([newSuperview conformsToProtocol:@protocol(XTComponent)]
                                                                         ? @[[newSuperview objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(XTUIWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToWindow" withArguments:([newWindow conformsToProtocol:@protocol(XTComponent)]
                                                                      ? @[[newWindow objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToWindow" withArguments:@[]];
    }
}

@end
