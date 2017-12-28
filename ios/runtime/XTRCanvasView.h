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

+ (NSString *)create:(JSValue *)frame;
+ (CGFloat)xtr_globalAlpha:(NSString *)objectRef;
+ (void)xtr_setGlobalAlpha:(CGFloat)globalAlpha objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_fillStyle:(NSString *)objectRef;
+ (void)xtr_setFillStyle:(JSValue *)fillStyle objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_strokeStyle:(NSString *)objectRef;
+ (void)xtr_setStrokeStyle:(JSValue *)strokeStyle objectRef:(NSString *)objectRef;
+ (NSString *)xtr_lineCap:(NSString *)objectRef;
+ (void)xtr_setLineCap:(NSString *)lineCap objectRef:(NSString *)objectRef;
+ (NSString *)xtr_lineJoin:(NSString *)objectRef;
+ (void)xtr_setLineJoin:(NSString *)lineJoin objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_lineWidth:(NSString *)objectRef;
+ (void)xtr_setLineWidth:(CGFloat)lineWidth objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_miterLimit:(NSString *)objectRef;
+ (void)xtr_setMiterLimit:(CGFloat)miterLimit objectRef:(NSString *)objectRef;
+ (void)xtr_rect:(JSValue *)rect objectRef:(NSString *)objectRef;
+ (void)xtr_fillRect:(JSValue *)rect objectRef:(NSString *)objectRef;
+ (void)xtr_strokeRect:(JSValue *)rect objectRef:(NSString *)objectRef;
+ (void)xtr_fill:(NSString *)objectRef;
+ (void)xtr_stroke:(NSString *)objectRef;
+ (void)xtr_beginPath:(NSString *)objectRef;
+ (void)xtr_moveTo:(JSValue *)point objectRef:(NSString *)objectRef;
+ (void)xtr_closePath:(NSString *)objectRef;
+ (void)xtr_lineTo:(JSValue *)point objectRef:(NSString *)objectRef;
+ (void)xtr_quadraticCurveTo:(JSValue *)cpPoint xyPoint:(JSValue *)xyPoint objectRef:(NSString *)objectRef;
+ (void)xtr_bezierCurveTo:(JSValue *)cp1Point cp2Point:(JSValue *)cp2Point xyPoint:(JSValue *)xyPoint objectRef:(NSString *)objectRef;
+ (void)xtr_arc:(JSValue *)point r:(JSValue *)r sAngle:(JSValue *)sAngle eAngle:(JSValue *)eAngle counterclockwise:(JSValue *)counterclockwise objectRef:(NSString *)objectRef;
+ (void)xtr_postScale:(JSValue *)point objectRef:(NSString *)objectRef;
+ (void)xtr_postRotate:(JSValue *)angle objectRef:(NSString *)objectRef;
+ (void)xtr_postTranslate:(JSValue *)point objectRef:(NSString *)objectRef;
+ (void)xtr_postTransform:(JSValue *)transform objectRef:(NSString *)objectRef;
+ (void)xtr_setCanvasTransform:(JSValue *)transform objectRef:(NSString *)objectRef;
+ (void)xtr_save:(NSString *)objectRef;
+ (void)xtr_restore:(NSString *)objectRef;
+ (BOOL)xtr_isPointInPath:(JSValue *)point objectRef:(NSString *)objectRef;
+ (void)xtr_clear:(NSString *)objectRef;

@end

@interface XTRCanvasView : XTRView<XTRComponent, XTRCanvasViewExport>

@end
