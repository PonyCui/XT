//
//  XTRScrollView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRScrollView;

@protocol XTRScrollViewExport <JSExport>

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSDictionary *)xtr_contentOffset;
- (void)xtr_setContentOffset:(JSValue *)contentOffset animated:(JSValue *)animated;
- (NSDictionary *)xtr_contentSize;
- (void)xtr_setContentSize:(JSValue *)contentSize;
- (BOOL)xtr_isDirectionalLockEnabled;
- (void)xtr_setDirectionalLockEnabled:(JSValue *)isDirectionalLockEnabled;
- (BOOL)xtr_bounces;
- (void)xtr_setBounces:(JSValue *)bounces;
- (BOOL)xtr_isScrollEnabled;
- (void)xtr_setScrollEnabled:(JSValue *)isScrollEnabled;
- (BOOL)xtr_showsHorizontalScrollIndicator;
- (void)xtr_setShowsHorizontalScrollIndicator:(JSValue *)showsHorizontalScrollIndicator;
- (BOOL)xtr_showsVerticalScrollIndicator;
- (void)xtr_setShowsVerticalScrollIndicator:(JSValue *)showsVerticalScrollIndicator;
- (BOOL)xtr_alwaysBounceVertical;
- (void)xtr_setAlwaysBounceVertical:(JSValue *)alwaysBounceVertical;
- (BOOL)xtr_alwaysBounceHorizontal;
- (void)xtr_setAlwaysBounceHorizontal:(JSValue *)alwaysBounceHorizontal;

@end

@interface XTRScrollView : UIScrollView<XTRComponent, XTRViewExport, XTRScrollViewExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
