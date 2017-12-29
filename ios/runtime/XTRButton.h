//
//  XTRButton.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRButton;

@protocol XTRButtonExport <JSExport>

+ (NSString *)create;
+ (NSString *)xtr_title:(NSString *)objectRef;
+ (void)xtr_setTitle:(NSString *)title objectRef:(NSString *)objectRef;
+ (NSString *)xtr_font:(NSString *)objectRef;
+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef;
+ (NSString *)xtr_image:(NSString *)objectRef;
+ (void)xtr_setImage:(NSString *)imageRef objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_color:(NSString *)objectRef;
+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef;
+ (BOOL)xtr_vertical:(NSString *)objectRef;
+ (void)xtr_setVertical:(BOOL)vertical objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_inset:(NSString *)objectRef;
+ (void)xtr_setInset:(CGFloat)inset objectRef:(NSString *)objectRef;

@end

@interface XTRButton : XTRView<XTRComponent, XTRButtonExport>

@end
