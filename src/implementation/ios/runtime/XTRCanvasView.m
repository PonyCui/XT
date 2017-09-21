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

@end

@implementation XTRCanvasView

+ (NSString *)name {
    return @"XTRCanvasView";
}

+ (XTRCanvasView *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRCanvasView *view = [[XTRCanvasView alloc] initWithFrame:[frame toRect]];
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
    [(self.fillStyle ?: [UIColor clearColor]) setFill];
}

- (NSDictionary *)xtr_strokeStyle {
    return [JSValue fromColor:self.strokeStyle];
}

- (void)xtr_setStrokeStyle:(JSValue *)strokeStyle {
    self.strokeStyle = [strokeStyle toColor];
    [(self.strokeStyle ?: [UIColor clearColor]) setStroke];
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

- (void)xtr_fillRect:(JSValue *)rect {
    UIBezierPath *bezierPath = [UIBezierPath bezierPathWithRect:[rect toRect]];
    [bezierPath fill];
}

- (void)xtr_strokeRect:(JSValue *)rect {
    UIBezierPath *bezierPath = [UIBezierPath bezierPathWithRect:[rect toRect]];
    if ([self.lineCap isEqualToString:@"butt"]) {
        bezierPath.lineCapStyle = kCGLineCapButt;
    }
    else if ([self.lineCap isEqualToString:@"round"]) {
        bezierPath.lineCapStyle = kCGLineCapRound;
    }
    else if ([self.lineCap isEqualToString:@"square"]) {
        bezierPath.lineCapStyle = kCGLineCapSquare;
    }
    if ([self.lineJoin isEqualToString:@"bevel"]) {
        bezierPath.lineJoinStyle = kCGLineJoinBevel;
    }
    else if ([self.lineJoin isEqualToString:@"miter"]) {
        bezierPath.lineJoinStyle = kCGLineJoinMiter;
    }
    else if ([self.lineJoin isEqualToString:@"round"]) {
        bezierPath.lineJoinStyle = kCGLineJoinRound;
    }
    bezierPath.lineWidth = self.lineWidth;
    bezierPath.miterLimit = self.miterLimit;
    [bezierPath stroke];
}

- (void)drawRect:(CGRect)rect {
    [super drawRect:rect];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"onDraw" withArguments:@[]];
    }
}

@end
