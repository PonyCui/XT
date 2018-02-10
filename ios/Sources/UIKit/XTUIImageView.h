//
//  XTUIImageView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUIImageView;

@protocol XTUIImageViewExport <XTUIViewExport, JSExport>

+ (NSString *)xtr_image:(NSString *)objectRef;
+ (void)xtr_setImage:(NSString *)imageRef objectRef:(NSString *)objectRef;

@end

@interface XTUIImageView : XTUIView<XTComponent, XTUIImageViewExport>

@end
