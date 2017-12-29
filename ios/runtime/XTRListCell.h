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

+ (NSString *)create;
+ (NSInteger)xtr_selectionStyle:(NSString *)objectRef;
+ (void)xtr_setSelectionStyle:(NSInteger)selectionStyle objectRef:(NSString *)objectRef;

@end

@interface XTRListCell : XTRView<XTRComponent, XTRListCellExport>

@property (nonatomic, weak) UITableViewCell *realCell;

@end
