//
//  XTUITableView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIScrollView.h"

@class XTUIListView;

@protocol XTUIListViewExport <XTUIViewExport, JSExport>

+ (NSString *)xtr_refreshControl:(NSString *)objectRef;
+ (void)xtr_setRefreshControl:(NSString *)rcRef objectRef:(NSString *)objectRef;
+ (NSString *)xtr_loadMoreControl:(NSString *)objectRef;
+ (void)xtr_setLoadMoreControl:(NSString *)rcRef objectRef:(NSString *)objectRef;
+ (void)xtr_setItems:(JSValue *)items objectRef:(NSString *)objectRef;
+ (void)xtr_setHeaderView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (void)xtr_setFooterView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (void)xtr_reloadData:(NSString *)objectRef;

@end

@interface XTUIListView : XTUIScrollView<XTComponent, XTUIListViewExport>

@end
