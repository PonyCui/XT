//
//  XTUIScrollView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUIScrollView;

@protocol XTUIScrollViewExport <XTUIViewExport, JSExport>

+ (NSDictionary *)xtr_contentOffset:(NSString *)objectRef;
+ (void)xtr_setContentOffset:(JSValue *)contentOffset animated:(BOOL)animated objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_contentInset:(NSString *)objectRef;
+ (void)xtr_setContentInset:(JSValue *)contentInset objectRef:(NSString *)objectRef;
+ (void)xtr_scrollRectToVisible:(JSValue *)rect animated:(BOOL)animated  objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_contentSize:(NSString *)objectRef;
+ (void)xtr_setContentSize:(JSValue *)contentSize objectRef:(NSString *)objectRef;
+ (BOOL)xtr_isDirectionalLockEnabled:(NSString *)objectRef;
+ (void)xtr_setDirectionalLockEnabled:(BOOL)isDirectionalLockEnabled objectRef:(NSString *)objectRef;
+ (BOOL)xtr_bounces:(NSString *)objectRef;
+ (void)xtr_setBounces:(BOOL)bounces objectRef:(NSString *)objectRef;
+ (BOOL)xtr_isPagingEnabled:(NSString *)objectRef;
+ (void)xtr_setPagingEnabled:(BOOL)isPagingEnabled objectRef:(NSString *)objectRef;
+ (BOOL)xtr_isScrollEnabled:(NSString *)objectRef;
+ (void)xtr_setScrollEnabled:(BOOL)isScrollEnabled objectRef:(NSString *)objectRef;
+ (BOOL)xtr_showsHorizontalScrollIndicator:(NSString *)objectRef;
+ (void)xtr_setShowsHorizontalScrollIndicator:(BOOL)showsHorizontalScrollIndicator objectRef:(NSString *)objectRef;
+ (BOOL)xtr_showsVerticalScrollIndicator:(NSString *)objectRef;
+ (void)xtr_setShowsVerticalScrollIndicator:(BOOL)showsVerticalScrollIndicator objectRef:(NSString *)objectRef;
+ (BOOL)xtr_alwaysBounceVertical:(NSString *)objectRef;
+ (void)xtr_setAlwaysBounceVertical:(BOOL)alwaysBounceVertical objectRef:(NSString *)objectRef;
+ (BOOL)xtr_alwaysBounceHorizontal:(NSString *)objectRef;
+ (void)xtr_setAlwaysBounceHorizontal:(BOOL)alwaysBounceHorizontal objectRef:(NSString *)objectRef;

@end

@interface XTUIScrollView : XTUIView<XTComponent, XTUIScrollViewExport>

@property (nonatomic, readonly) UIScrollView *innerView;

#pragma - Private

- (void)scrollViewDidScroll:(UIScrollView *)scrollView;
- (void)_addSubview:(UIView *)view;

@end
