//
//  XTRScrollView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRScrollView.h"
#import "XTRUtils.h"
#import "XTRLayoutConstraint.h"
#import "XTContext.h"
#import "XTRWindow.h"
#import "XTMemoryManager.h"

@interface UIScrollView (XTRScrollView)

- (void)handlePan:(id)sender;

@end

@interface XTRScrollView ()<UIScrollViewDelegate>

@property (nonatomic, assign) NSTimeInterval longPressDuration;
@property (nonatomic, strong) UITapGestureRecognizer *tapGestureRecognizer;
@property (nonatomic, strong) UITapGestureRecognizer *doubleTapGestureRecognizer;
@property (nonatomic, strong) UILongPressGestureRecognizer *longPressGestureRecognizer;

@end

@implementation XTRScrollView

+ (NSString *)name {
    return @"XTRScrollView";
}

+ (NSString *)create {
    XTRScrollView *view = [[XTRScrollView alloc] initWithFrame:CGRectZero];
    view.delegate = view;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)dealloc {
    self.delegate = nil;
#ifdef LOGDEALLOC
    NSLog(@"XTRScrollView dealloc.");
#endif
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)scrollRectToVisible:(CGRect)rect animated:(BOOL)animated {
    CGPoint targetContentOffset = self.contentOffset;
    if (rect.origin.x < self.contentOffset.x) {
        targetContentOffset.x = rect.origin.x;
    }
    else if (rect.origin.x + rect.size.width > self.contentOffset.x + self.bounds.size.width) {
        targetContentOffset.x = rect.origin.x + rect.size.width - self.bounds.size.width;
    }
    if (rect.origin.y < self.contentOffset.y) {
        targetContentOffset.y = rect.origin.y;
    }
    else if (rect.origin.y + rect.size.height > self.contentOffset.y + self.bounds.size.height) {
        targetContentOffset.y = rect.origin.y + rect.size.height - self.bounds.size.height;
    }
    targetContentOffset.x = MAX(0, MIN(self.contentSize.width - self.bounds.size.width, targetContentOffset.x));
    targetContentOffset.y = MAX(0, MIN(self.contentSize.height - self.bounds.size.height, targetContentOffset.y));
    [self setContentOffset:targetContentOffset animated:animated];
}

#pragma mark - XTRScrollViewExport

+ (NSDictionary *)xtr_contentOffset:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return [JSValue fromPoint:view.contentOffset];
    }
    return @{};
}

+ (void)xtr_setContentOffset:(JSValue *)contentOffset animated:(BOOL)animated objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setContentOffset:[contentOffset toPoint] animated:animated];
    }
}

+ (void)xtr_scrollRectToVisible:(JSValue *)rect animated:(BOOL)animated objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view scrollRectToVisible:[rect toRect] animated:animated];
    }
}

+ (NSDictionary *)xtr_contentSize:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return [JSValue fromSize:view.contentSize];
    }
    return @{};
}

+ (void)xtr_setContentSize:(JSValue *)contentSize objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setContentSize:[contentSize toSize]];
    }
}

+ (BOOL)xtr_isDirectionalLockEnabled:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.isDirectionalLockEnabled;
    }
    return NO;
}

+ (void)xtr_setDirectionalLockEnabled:(BOOL)isDirectionalLockEnabled objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return [view setDirectionalLockEnabled:isDirectionalLockEnabled];
    }
}

+ (BOOL)xtr_bounces:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.bounces;
    }
    return NO;
}

+ (void)xtr_setBounces:(BOOL)bounces objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        view.bounces = bounces;
    }
}

+ (BOOL)xtr_isPagingEnabled:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.isPagingEnabled;
    }
    return NO;
}

+ (void)xtr_setPagingEnabled:(BOOL)isPagingEnabled objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setPagingEnabled:isPagingEnabled];
    }
}

+ (BOOL)xtr_isScrollEnabled:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.isScrollEnabled;
    }
    return NO;
}

+ (void)xtr_setScrollEnabled:(BOOL)isScrollEnabled objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setScrollEnabled:isScrollEnabled];
    }
}

+ (BOOL)xtr_showsHorizontalScrollIndicator:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.showsHorizontalScrollIndicator;
    }
    return NO;
}

+ (void)xtr_setShowsHorizontalScrollIndicator:(BOOL)showsHorizontalScrollIndicator objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setShowsHorizontalScrollIndicator:showsHorizontalScrollIndicator];
    }
}

+ (BOOL)xtr_showsVerticalScrollIndicator:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.showsVerticalScrollIndicator;
    }
    return NO;
}

+ (void)xtr_setShowsVerticalScrollIndicator:(BOOL)showsVerticalScrollIndicator objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setShowsVerticalScrollIndicator:showsVerticalScrollIndicator];
    }
}

+ (BOOL)xtr_alwaysBounceVertical:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.alwaysBounceVertical;
    }
    return NO;
}

+ (void)xtr_setAlwaysBounceVertical:(BOOL)alwaysBounceVertical objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setAlwaysBounceVertical:alwaysBounceVertical];
    }
}

+ (BOOL)xtr_alwaysBounceHorizontal:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        return view.alwaysBounceHorizontal;
    }
    return NO;
}

+ (void)xtr_setAlwaysBounceHorizontal:(BOOL)alwaysBounceHorizontal objectRef:(NSString *)objectRef {
    UIScrollView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[UIScrollView class]]) {
        [view setAlwaysBounceHorizontal:alwaysBounceHorizontal];
    }
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    JSValue *value = self.scriptObject;
    if (value != nil) {
        [value invokeMethod:@"handleScroll" withArguments:@[]];
    }
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
        [scriptObject invokeMethod:@"_didAddSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                    ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willRemoveSubview:(XTRView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_willRemoveSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                        ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willMoveToSuperview:(XTRView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_willMoveToSuperview" withArguments:([newSuperview conformsToProtocol:@protocol(XTComponent)]
                                                                          ? @[[newSuperview objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(XTRWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_willMoveToWindow" withArguments:([newWindow conformsToProtocol:@protocol(XTComponent)]
                                                                       ? @[[newWindow objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_didMoveToWindow" withArguments:@[]];
    }
}

@end
