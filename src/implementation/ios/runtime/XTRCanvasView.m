//
//  XTRCanvasView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/21.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRCanvasView.h"
#import "XTRUtils.h"

@interface XTRCanvasView()

@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) JSManagedValue *scriptObject;
@property (nonatomic, strong) UIColor *fillStyle;
@property (nonatomic, strong) UIColor *strokeStyle;
@property (nonatomic, strong) NSString *lineCap;
@property (nonatomic, strong) NSString *lineJoin;
@property (nonatomic, assign) CGFloat lineWidth;
@property (nonatomic, assign) CGLineCap miterLimit;
@property (nonatomic, strong) UIBezierPath *currentPath;

@end

@implementation XTRCanvasView

+ (NSString *)name {
    return @"XTRCanvasView";
}

+ (XTRCanvasView *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRCanvasView *view = [[XTRCanvasView alloc] initWithFrame:[frame toRect]];
    view.lineWidth = 1;
    view.backgroundColor = [UIColor clearColor];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = (id)scriptObject.context;
    view.scriptObject = [JSManagedValue managedValueWithValue:scriptObject andOwner:view];
    return view;
}

- (NSDictionary *)xtr_fillStyle {
    return [JSValue fromColor:self.fillStyle];
}

- (void)xtr_setFillStyle:(JSValue *)fillStyle {
    self.fillStyle = [fillStyle toColor];
}

- (NSDictionary *)xtr_strokeStyle {
    return [JSValue fromColor:self.strokeStyle];
}

- (void)xtr_setStrokeStyle:(JSValue *)strokeStyle {
    self.strokeStyle = [strokeStyle toColor];
}

- (NSString *)xtr_lineCap {
    return self.lineCap;
}

- (void)xtr_setLineCap:(NSString *)lineCap {
    self.lineCap = lineCap;
}

- (NSString *)xtr_lineJoin {
    return self.lineJoin;
}

- (void)xtr_setLineJoin:(NSString *)lineJoin {
    self.lineJoin = lineJoin;
}

- (CGFloat)xtr_lineWidth {
    return self.lineWidth;
}

- (void)xtr_setLineWidth:(CGFloat)lineWidth {
    self.lineWidth = lineWidth;
}

- (CGFloat)xtr_miterLimit {
    return self.miterLimit;
}

- (void)xtr_setMiterLimit:(CGFloat)miterLimit {
    self.miterLimit = miterLimit;
}

- (void)xtr_rect:(JSValue *)rect {
    self.currentPath = [UIBezierPath bezierPathWithRect:[rect toRect]];
}

- (void)xtr_fillRect:(JSValue *)rect {
    self.currentPath = [UIBezierPath bezierPathWithRect:[rect toRect]];
    [self xtr_fill];
}

- (void)xtr_strokeRect:(JSValue *)rect {
    self.currentPath = [UIBezierPath bezierPathWithRect:[rect toRect]];
    [self xtr_stroke];
}

- (void)xtr_clearRect:(JSValue *)rect {
    if (self.backgroundColor != nil && ![self.backgroundColor isEqual:[UIColor clearColor]]) {
        [self.backgroundColor setFill];
        CGContextFillRect(UIGraphicsGetCurrentContext(), [rect toRect]);
        [self.fillStyle setFill];
    }
    else {
        CGContextClearRect(UIGraphicsGetCurrentContext(), [rect toRect]);
    }
}

- (void)xtr_fill {
    if (self.currentPath != nil) {
        [(self.fillStyle ?: [UIColor blackColor]) setFill];
        [self.currentPath fill];
    }
}

- (void)xtr_stroke {
    if (self.currentPath != nil) {
        [(self.strokeStyle ?: [UIColor blackColor]) setStroke];
        if ([self.lineCap isEqualToString:@"butt"]) {
            self.currentPath.lineCapStyle = kCGLineCapButt;
        }
        else if ([self.lineCap isEqualToString:@"round"]) {
            self.currentPath.lineCapStyle = kCGLineCapRound;
        }
        else if ([self.lineCap isEqualToString:@"square"]) {
            self.currentPath.lineCapStyle = kCGLineCapSquare;
        }
        if ([self.lineJoin isEqualToString:@"bevel"]) {
            self.currentPath.lineJoinStyle = kCGLineJoinBevel;
        }
        else if ([self.lineJoin isEqualToString:@"miter"]) {
            self.currentPath.lineJoinStyle = kCGLineJoinMiter;
        }
        else if ([self.lineJoin isEqualToString:@"round"]) {
            self.currentPath.lineJoinStyle = kCGLineJoinRound;
        }
        self.currentPath.lineWidth = self.lineWidth;
        self.currentPath.miterLimit = self.miterLimit;
        [self.currentPath stroke];
    }
}

- (void)xtr_beginPath {
    self.currentPath = [[UIBezierPath alloc] init];
}
- (void)xtr_moveTo:(JSValue *)point {
    [self.currentPath moveToPoint:[point toPoint]];
}
- (void)xtr_closePath {
    [self.currentPath closePath];
}

- (void)xtr_lineTo:(JSValue *)point {
    [self.currentPath addLineToPoint:[point toPoint]];
}

- (void)xtr_clip {
    [self.currentPath addClip];
}

- (void)xtr_quadraticCurveTo:(JSValue *)cpPoint xyPoint:(JSValue *)xyPoint {
    [self.currentPath addQuadCurveToPoint:[xyPoint toPoint] controlPoint:[cpPoint toPoint]];
}

- (void)xtr_bezierCurveTo:(JSValue *)cp1Point cp2Point:(JSValue *)cp2Point xyPoint:(JSValue *)xyPoint {
    [self.currentPath addCurveToPoint:[xyPoint toPoint]
                        controlPoint1:[cp1Point toPoint]
                        controlPoint2:[cp2Point toPoint]];
}

- (void)xtr_arc:(JSValue *)point r:(JSValue *)r sAngle:(JSValue *)sAngle eAngle:(JSValue *)eAngle counterclockwise:(JSValue *)counterclockwise {
    [self.currentPath addArcWithCenter:[point toPoint]
                                radius:r.toDouble
                            startAngle:sAngle.toDouble
                              endAngle:eAngle.toDouble
                             clockwise:!counterclockwise.toBool];
}

- (BOOL)xtr_isPointInPath:(JSValue *)point {
    return [self.currentPath containsPoint:[point toPoint]];
}

- (void)xtr_setNeedsDisplay {
    [self setNeedsDisplay];
}

- (void)drawRect:(CGRect)rect {
    [super drawRect:rect];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"onDraw" withArguments:@[]];
    }
}

@end
