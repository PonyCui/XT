//
//  XTRCanvasView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/21.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRCanvasView;

@protocol XTRCanvasViewExport <JSExport>

+ (XTRCanvasView *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSString *)xtr_fillStyle;
- (void)xtr_setFillStyle:(JSValue *)fillStyle;
- (NSString *)xtr_strokeStyle;
- (void)xtr_setStrokeStyle:(JSValue *)strokeStyle;
- (NSString *)xtr_lineCap;
- (void)xtr_setLineCap:(NSString *)lineCap;
- (NSString *)xtr_lineJoin;
- (void)xtr_setLineJoin:(NSString *)lineJoin;
- (CGFloat)xtr_lineWidth;
- (void)xtr_setLineWidth:(CGFloat)lineWidth;
- (CGFloat)xtr_miterLimit;
- (void)xtr_setMiterLimit:(CGFloat)miterLimit;
- (void)xtr_fillRect:(JSValue *)rect;
- (void)xtr_strokeRect:(JSValue *)rect;

@end

@interface XTRCanvasView : XTRView<XTRComponent, XTRCanvasViewExport>

@end
