//
//  XTRSlider.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRSlider;

@protocol XTRSliderExport <JSExport>

+ (NSString *)create;
+ (CGFloat)xtr_value:(NSString *)objectRef;
+ (void)xtr_setValue:(CGFloat)value animated:(BOOL)animated objectRef:(NSString *)objectRef;

@end

@interface XTRSlider : XTRView<XTRComponent, XTRSliderExport>

@end
