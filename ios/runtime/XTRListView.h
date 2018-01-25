//
//  XTRTableView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRScrollView.h"

@class XTRListView;

@protocol XTRListViewExport <JSExport>

+ (NSString *)create;
+ (void)xtr_setItems:(JSValue *)items objectRef:(NSString *)objectRef;
+ (void)xtr_reloadData:(NSString *)objectRef;

@end

@interface XTRListView : UITableView<XTComponent, XTRListViewExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
