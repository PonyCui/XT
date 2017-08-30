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

+ (XTRLabel *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSString *)xtr_text;
- (void)xtr_setText:(JSValue *)text;
- (JSValue *)xtr_font;
- (void)xtr_setFont:(JSValue *)font;
- (NSDictionary *)xtr_textColor;
- (void)xtr_setTextColor:(JSValue *)textColor;
- (NSNumber *)xtr_textAlignment;
- (void)xtr_setTextAlignment:(JSValue *)textAlignment;
- (NSNumber *)xtr_numberOfLines;
- (void)xtr_setNumberOfLines:(JSValue *)numberOfLines;
- (NSNumber *)xtr_lineBreakMode;
- (void)xtr_setLineBreakMode:(JSValue *)lineBreakMode;
- (NSNumber *)xtr_lineSpace;
- (void)xtr_setLineSpace:(JSValue *)lineSpace;
- (NSDictionary *)xtr_textRectForBounds:(JSValue *)bounds;

@end

@interface XTRLabel : XTRView<XTRComponent, XTRLabelExport>

@end
