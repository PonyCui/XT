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
#import "XTContext.h"
#import "XTUIContext.h"
#import "XTRViewController.h"
#import "XTMemoryManager.h"

@interface XTRWindow ()

@end

@implementation XTRWindow

+ (NSString *)name {
    return @"XTRWindow";
}

+ (NSString *)create {
    XTRWindow *view = [[XTRWindow alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = (id)[JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRWindow dealloc.");
#endif
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

- (void)didAddSubview:(XTRView *)subview {
    [super didAddSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didAddSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                   ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willRemoveSubview:(XTRView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willRemoveSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                       ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willMoveToSuperview:(XTRView *)newSuperview {
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

- (void)willMoveToWindow:(XTRWindow *)newWindow {
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
