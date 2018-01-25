//
//  XTUIListCell.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUIListCell;

@protocol XTUIListCellExport <JSExport>

+ (NSString *)create;
+ (NSInteger)xtr_selectionStyle:(NSString *)objectRef;
+ (void)xtr_setSelectionStyle:(NSInteger)selectionStyle objectRef:(NSString *)objectRef;

@end

@interface XTUIListCell : XTUIView<XTComponent, XTUIListCellExport>

@property (nonatomic, weak) UITableViewCell *realCell;

@end
