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

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (CGFloat)xtr_globalAlpha;
- (void)xtr_setGlobalAlpha:(CGFloat)globalAlpha;
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
- (void)xtr_rect:(JSValue *)rect;
- (void)xtr_fillRect:(JSValue *)rect;
- (void)xtr_strokeRect:(JSValue *)rect;
- (void)xtr_fill;
- (void)xtr_stroke;
- (void)xtr_beginPath;
- (void)xtr_moveTo:(JSValue *)point;
- (void)xtr_closePath;
- (void)xtr_lineTo:(JSValue *)point;
- (void)xtr_quadraticCurveTo:(JSValue *)cpPoint xyPoint:(JSValue *)xyPoint;
- (void)xtr_bezierCurveTo:(JSValue *)cp1Point cp2Point:(JSValue *)cp2Point xyPoint:(JSValue *)xyPoint;
- (void)xtr_arc:(JSValue *)point r:(JSValue *)r sAngle:(JSValue *)sAngle eAngle:(JSValue *)eAngle counterclockwise:(JSValue *)counterclockwise;
- (void)xtr_postScale:(JSValue *)point;
- (void)xtr_postRotate:(JSValue *)angle;
- (void)xtr_postTranslate:(JSValue *)point;
- (void)xtr_postTransform:(JSValue *)transform;
- (void)xtr_setCanvasTransform:(JSValue *)transform;
- (void)xtr_save;
- (void)xtr_restore;
- (BOOL)xtr_isPointInPath:(JSValue *)point;
- (void)xtr_clear;

@end

@interface XTRCanvasView : XTRView<XTRComponent, XTRCanvasViewExport>

@end
