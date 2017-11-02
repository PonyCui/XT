//
//  XTRListCell.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRListCell;

@protocol XTRListCellExport <JSExport>

+ (XTRListCell *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSNumber *)xtr_selectionStyle;
- (void)xtr_setSelectionStyle:(JSValue *)selectionStyle;

@end

@interface XTRListCell : XTRView<XTRComponent, XTRListCellExport>

@property (nonatomic, weak) UITableViewCell *realCell;
@property (nonatomic, strong) JSManagedValue *scriptObject;

@end
