//
//  XTUISlider.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUISlider;

@protocol XTUISliderExport <JSExport>

+ (NSString *)create;
+ (CGFloat)xtr_value:(NSString *)objectRef;
+ (void)xtr_setValue:(CGFloat)value animated:(BOOL)animated objectRef:(NSString *)objectRef;

@end

@interface XTUISlider : XTUIView<XTComponent, XTUISliderExport>

@end
