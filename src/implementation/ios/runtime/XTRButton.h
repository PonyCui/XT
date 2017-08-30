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

+ (XTRButton *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSString *)xtr_title;
- (void)xtr_setTitle:(JSValue *)title;
- (JSValue *)xtr_font;
- (void)xtr_setFont:(JSValue *)font;
- (JSValue *)xtr_image;
- (void)xtr_setImage:(JSValue *)image;
- (NSDictionary *)xtr_color;
- (void)xtr_setColor:(JSValue *)color;
- (BOOL)xtr_vertical;
- (void)xtr_setVertical:(JSValue *)vertical;
- (NSNumber *)xtr_inset;
- (void)xtr_setInset:(JSValue *)inset;

@end

@interface XTRButton : XTRView<XTRComponent, XTRButtonExport>

@end
