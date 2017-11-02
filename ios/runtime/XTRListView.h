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

+ (XTRListView *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (void)xtr_setItems:(JSValue *)items;
- (void)xtr_reloadData;

@end

@interface XTRListView : UITableView<XTRComponent, XTRViewExport, XTRScrollViewExport, XTRListViewExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
