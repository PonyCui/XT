//
//  XTUIScrollView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIScrollView.h"
#import "XTUIUtils.h"
#import "XTUILayoutConstraint.h"
#import "XTContext.h"
#import "XTUIWindow.h"
#import "XTMemoryManager.h"

@interface XTUIScrollView ()<UIScrollViewDelegate>

@property (nonatomic, readwrite) UIScrollView *innerView;

@end

@implementation XTUIScrollView

+ (NSString *)name {
    return @"_XTUIScrollView";
}

#pragma mark - XTUIScrollViewExport

+ (NSDictionary *)xtr_contentOffset:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return [JSValue fromPoint:view.innerView.contentOffset];
    }
    return @{};
}

+ (void)xtr_setContentOffset:(JSValue *)contentOffset animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setContentOffset:[contentOffset toPoint] animated:animated];
    }
}

+ (NSDictionary *)xtr_contentInset:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return [JSValue fromInsets:view.innerView.contentInset];
    }
    return @{};
}

+ (void)xtr_setContentInset:(JSValue *)contentInset objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setContentInset:[contentInset toInsets]];
    }
}

+ (void)xtr_scrollRectToVisible:(JSValue *)argRect animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        CGRect rect = [argRect toRect];
        CGPoint targetContentOffset = view.innerView.contentOffset;
        if (rect.origin.x < view.innerView.contentOffset.x) {
            targetContentOffset.x = rect.origin.x;
        }
        else if (rect.origin.x + rect.size.width > view.innerView.contentOffset.x + view.innerView.bounds.size.width) {
            targetContentOffset.x = rect.origin.x + rect.size.width - view.bounds.size.width;
        }
        if (rect.origin.y < view.innerView.contentOffset.y) {
            targetContentOffset.y = rect.origin.y;
        }
        else if (rect.origin.y + rect.size.height > view.innerView.contentOffset.y + view.innerView.bounds.size.height) {
            targetContentOffset.y = rect.origin.y + rect.size.height - view.innerView.bounds.size.height;
        }
        targetContentOffset.x = MAX(0, MIN(view.innerView.contentSize.width - view.innerView.bounds.size.width, targetContentOffset.x));
        targetContentOffset.y = MAX(0, MIN(view.innerView.contentSize.height - view.innerView.bounds.size.height, targetContentOffset.y));
        [view.innerView setContentOffset:targetContentOffset animated:animated];
    }
}

+ (NSDictionary *)xtr_contentSize:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return [JSValue fromSize:view.innerView.contentSize];
    }
    return @{};
}

+ (void)xtr_setContentSize:(JSValue *)contentSize objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setContentSize:[contentSize toSize]];
    }
}

+ (BOOL)xtr_isDirectionalLockEnabled:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.isDirectionalLockEnabled;
    }
    return NO;
}

+ (void)xtr_setDirectionalLockEnabled:(BOOL)isDirectionalLockEnabled objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return [view.innerView setDirectionalLockEnabled:isDirectionalLockEnabled];
    }
}

+ (BOOL)xtr_bounces:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.bounces;
    }
    return NO;
}

+ (void)xtr_setBounces:(BOOL)bounces objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        view.innerView.bounces = bounces;
    }
}

+ (BOOL)xtr_isPagingEnabled:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.isPagingEnabled;
    }
    return NO;
}

+ (void)xtr_setPagingEnabled:(BOOL)isPagingEnabled objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setPagingEnabled:isPagingEnabled];
    }
}

+ (BOOL)xtr_isScrollEnabled:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.isScrollEnabled;
    }
    return NO;
}

+ (void)xtr_setScrollEnabled:(BOOL)isScrollEnabled objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setScrollEnabled:isScrollEnabled];
    }
}

+ (BOOL)xtr_showsHorizontalScrollIndicator:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.showsHorizontalScrollIndicator;
    }
    return NO;
}

+ (void)xtr_setShowsHorizontalScrollIndicator:(BOOL)showsHorizontalScrollIndicator objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setShowsHorizontalScrollIndicator:showsHorizontalScrollIndicator];
    }
}

+ (BOOL)xtr_showsVerticalScrollIndicator:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.showsVerticalScrollIndicator;
    }
    return NO;
}

+ (void)xtr_setShowsVerticalScrollIndicator:(BOOL)showsVerticalScrollIndicator objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setShowsVerticalScrollIndicator:showsVerticalScrollIndicator];
    }
}

+ (BOOL)xtr_alwaysBounceVertical:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.alwaysBounceVertical;
    }
    return NO;
}

+ (void)xtr_setAlwaysBounceVertical:(BOOL)alwaysBounceVertical objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setAlwaysBounceVertical:alwaysBounceVertical];
    }
}

+ (BOOL)xtr_alwaysBounceHorizontal:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        return view.innerView.alwaysBounceHorizontal;
    }
    return NO;
}

+ (void)xtr_setAlwaysBounceHorizontal:(BOOL)alwaysBounceHorizontal objectRef:(NSString *)objectRef {
    XTUIView<XTUIScrollable> *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIView class]] && [view conformsToProtocol:@protocol(XTUIScrollable)]) {
        [view.innerView setAlwaysBounceHorizontal:alwaysBounceHorizontal];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.innerView = [[UIScrollView alloc] init];
        [self.innerView setBackgroundColor:[UIColor clearColor]];
        self.innerView.delegate = self;
        if (@available(iOS 11.0, *)) {
            self.innerView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        }
        [self _addSubview:self.innerView];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

- (void)dealloc {
    self.innerView.delegate = nil;
#ifdef LOGDEALLOC
    NSLog(@"XTUIScrollView dealloc.");
#endif
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    JSValue *value = self.scriptObject;
    if (value != nil) {
        [value invokeMethod:@"handleScroll" withArguments:@[]];
    }
}

#pragma mark - View Manager Proxy

- (void)insertSubview:(UIView *)view atIndex:(NSInteger)index {
    [self.innerView insertSubview:view atIndex:index];
}

- (void)exchangeSubviewAtIndex:(NSInteger)index1 withSubviewAtIndex:(NSInteger)index2 {
    [self.innerView exchangeSubviewAtIndex:index1 withSubviewAtIndex:index2];
}

- (void)_addSubview:(UIView *)view {
    [super addSubview:view];
}

- (void)addSubview:(UIView *)view {
    [self.innerView addSubview:view];
}

- (void)insertSubview:(UIView *)view belowSubview:(UIView *)siblingSubview {
    [self.innerView insertSubview:view belowSubview:siblingSubview];
}

- (void)insertSubview:(UIView *)view aboveSubview:(UIView *)siblingSubview {
    [self.innerView insertSubview:view aboveSubview:siblingSubview];
}

- (void)bringSubviewToFront:(UIView *)view {
    [self.innerView bringSubviewToFront:view];
}

- (void)sendSubviewToBack:(UIView *)view {
    [self.innerView sendSubviewToBack:view];
}

static BOOL hitTesting = NO;

- (NSArray<UIView *> *)subviews {
    if (hitTesting) {
        return [super subviews];
    }
    return [self.innerView subviews];
}

- (UIView *)hitTest:(CGPoint)point withEvent:(UIEvent *)event {
    hitTesting = YES;
    id target = [super hitTest:point withEvent:event];
    hitTesting = NO;
    return target;
}

@end
