//
//  XTUITableView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIScrollView.h"

@class XTUIListView;

@protocol XTUIListViewExport <JSExport>

+ (NSString *)create;
+ (void)xtr_setItems:(JSValue *)items objectRef:(NSString *)objectRef;
+ (void)xtr_setHeaderView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (void)xtr_setFooterView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (void)xtr_reloadData:(NSString *)objectRef;

@end

@interface XTUIListView : UITableView<XTComponent, XTUIListViewExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
