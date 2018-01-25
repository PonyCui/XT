//
//  XTRScrollView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTComponent.h"

@class XTRScrollView;

@protocol XTRScrollViewExport <JSExport>

+ (NSString *)create;
+ (NSDictionary *)xtr_contentOffset:(NSString *)objectRef;
+ (void)xtr_setContentOffset:(JSValue *)contentOffset animated:(BOOL)animated objectRef:(NSString *)objectRef;
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

@interface XTRScrollView : UIScrollView<XTComponent, XTRScrollViewExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
