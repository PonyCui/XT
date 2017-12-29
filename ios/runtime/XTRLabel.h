//
//  XTRLabel.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRLabel;

@protocol XTRLabelExport <JSExport>

+ (NSString *)create;
+ (NSString *)xtr_text:(NSString *)objectRef;
+ (void)xtr_setText:(NSString *)text objectRef:(NSString *)objectRef;
+ (NSString *)xtr_font:(NSString *)objectRef;
+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_textColor:(NSString *)objectRef;
+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_textAlignment:(NSString *)objectRef;
+ (void)xtr_setTextAlignment:(JSValue *)textAlignment objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_numberOfLines:(NSString *)objectRef;
+ (void)xtr_setNumberOfLines:(NSInteger)numberOfLines objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_lineBreakMode:(NSString *)objectRef;
+ (void)xtr_setLineBreakMode:(NSInteger)lineBreakMode objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_lineSpace:(NSString *)objectRef;
+ (void)xtr_setLineSpace:(CGFloat)lineSpace objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_textRectForBounds:(JSValue *)bounds objectRef:(NSString *)objectRef;

@end

@interface XTRLabel : XTRView<XTRComponent, XTRLabelExport>

@end
