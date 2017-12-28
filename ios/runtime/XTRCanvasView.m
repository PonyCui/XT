//
//  XTRCanvasView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/21.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRCanvasView.h"
#import "XTRUtils.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRCanvasState: NSObject<NSCopying>

@property (nonatomic, assign) CGFloat globalAlpha;
@property (nonatomic, strong) UIColor *fillStyle;
@property (nonatomic, strong) UIColor *strokeStyle;
@property (nonatomic, strong) NSString *lineCap;
@property (nonatomic, strong) NSString *lineJoin;
@property (nonatomic, assign) CGFloat lineWidth;
@property (nonatomic, assign) CGFloat miterLimit;
@property (nonatomic, assign) CGAffineTransform currentTransform;

@end

@implementation XTRCanvasState

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.globalAlpha = 1.0;
        self.lineWidth = 1.0;
        self.currentTransform = CGAffineTransformIdentity;
    }
    return self;
}

- (nonnull id)copyWithZone:(nullable NSZone *)zone {
    XTRCanvasState *newState = [XTRCanvasState allocWithZone:zone];
    newState.globalAlpha = self.globalAlpha;
    newState.fillStyle = self.fillStyle;
    newState.strokeStyle = self.strokeStyle;
    newState.lineCap = self.lineCap;
    newState.lineJoin = self.lineJoin;
    newState.lineWidth = self.lineWidth;
    newState.miterLimit = self.miterLimit;
    newState.currentTransform = self.currentTransform;
    return newState;
}

@end

@interface XTRCanvasView()

@property (nonatomic, strong) XTRCanvasState *currentState;
@property (nonatomic, copy) NSArray *stateStack;
@property (nonatomic, strong) UIBezierPath *currentPath;

@end

@implementation XTRCanvasView

+ (NSString *)name {
    return @"XTRCanvasView";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRCanvasView *view = [[XTRCanvasView alloc] initWithFrame:[frame toRect]];
    view.currentState = [XTRCanvasState new];
    view.backgroundColor = [UIColor clearColor];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (CGFloat)xtr_globalAlpha:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return view.currentState.globalAlpha;
    }
    return 0.0;
}

+ (void)xtr_setGlobalAlpha:(CGFloat)globalAlpha objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.globalAlpha = globalAlpha;
    }
}

+ (NSDictionary *)xtr_fillStyle:(NSString *)objectRef{
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return [JSValue fromColor:view.currentState.fillStyle];
    }
    return nil;
}

+ (void)xtr_setFillStyle:(JSValue *)fillStyle objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.fillStyle = [fillStyle toColor];
    }
}

+ (NSDictionary *)xtr_strokeStyle:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return [JSValue fromColor:view.currentState.strokeStyle];
    }
    return nil;
}

+ (void)xtr_setStrokeStyle:(JSValue *)strokeStyle objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.strokeStyle = [strokeStyle toColor];
    }
}

+ (NSString *)xtr_lineCap:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return view.currentState.lineCap;
    }
    return nil;
}

+ (void)xtr_setLineCap:(NSString *)lineCap objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.lineCap = lineCap;
    }
}

+ (NSString *)xtr_lineJoin:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return view.currentState.lineJoin;
    }
    return nil;
}

+ (void)xtr_setLineJoin:(NSString *)lineJoin objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.lineJoin = lineJoin;
    }
}

+ (CGFloat)xtr_lineWidth:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return view.currentState.lineWidth;
    }
    return 0.0;
}

+ (void)xtr_setLineWidth:(CGFloat)lineWidth objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.lineWidth = lineWidth;
    }
}

+ (CGFloat)xtr_miterLimit:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        return view.currentState.miterLimit;
    }
    return 0.0;
}

+ (void)xtr_setMiterLimit:(CGFloat)miterLimit objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.miterLimit = miterLimit;
    }
}

+ (void)xtr_rect:(JSValue *)rect objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentPath = [UIBezierPath bezierPathWithRect:[rect toRect]];
    }
}

+ (void)xtr_fillRect:(JSValue *)rect objectRef:(NSString *)objectRef {
    [self xtr_rect:rect objectRef:objectRef];
    [self xtr_fill:objectRef];
}

+ (void)xtr_strokeRect:(JSValue *)rect objectRef:(NSString *)objectRef {
    [self xtr_rect:rect objectRef:objectRef];
    [self xtr_stroke:objectRef];
}

+ (void)xtr_fill:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        if (view.currentPath != nil) {
            CAShapeLayer *layer = [CAShapeLayer layer];
            layer.transform = CATransform3DMakeAffineTransform(view.currentState.currentTransform);
            [layer setPath:[view.currentPath CGPath]];
            [layer setFillColor:[(view.currentState.fillStyle ?: [UIColor blackColor]) CGColor]];
            [layer setOpacity:view.currentState.globalAlpha];
            [layer setStrokeColor:[UIColor clearColor].CGColor];
            [view.layer addSublayer:layer];
        }
    }
}

+ (void)xtr_stroke:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        if (view.currentPath != nil) {
            CAShapeLayer *layer = [CAShapeLayer layer];
            layer.transform = CATransform3DMakeAffineTransform(view.currentState.currentTransform);
            [layer setPath:[view.currentPath CGPath]];
            [layer setStrokeColor:[(view.currentState.strokeStyle ?: [UIColor blackColor]) CGColor]];
            [layer setOpacity:view.currentState.globalAlpha];
            if ([view.currentState.lineCap isEqualToString:@"butt"]) {
                layer.lineCap = @"butt";
            }
            else if ([view.currentState.lineCap isEqualToString:@"round"]) {
                layer.lineCap = @"round";
            }
            else if ([view.currentState.lineCap isEqualToString:@"square"]) {
                layer.lineCap = @"suqare";
            }
            if ([view.currentState.lineJoin isEqualToString:@"bevel"]) {
                layer.lineJoin = @"bevel";
            }
            else if ([view.currentState.lineJoin isEqualToString:@"miter"]) {
                layer.lineJoin = @"miter";
            }
            else if ([view.currentState.lineJoin isEqualToString:@"round"]) {
                layer.lineJoin = @"round";
            }
            layer.lineWidth = view.currentState.lineWidth;
            layer.miterLimit = view.currentState.miterLimit;
            [layer setFillColor:[UIColor clearColor].CGColor];
            [view.layer addSublayer:layer];
        }
    }
}

+ (void)xtr_beginPath:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentPath = [[UIBezierPath alloc] init];
    }
}

+ (void)xtr_moveTo:(JSValue *)point objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.currentPath moveToPoint:[point toPoint]];
    }
}

+ (void)xtr_closePath:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.currentPath closePath];
    }
}

+ (void)xtr_lineTo:(JSValue *)point objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.currentPath addLineToPoint:[point toPoint]];
    }
}

+ (void)xtr_quadraticCurveTo:(JSValue *)cpPoint xyPoint:(JSValue *)xyPoint objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.currentPath addQuadCurveToPoint:[xyPoint toPoint] controlPoint:[cpPoint toPoint]];
    }
}

+ (void)xtr_bezierCurveTo:(JSValue *)cp1Point cp2Point:(JSValue *)cp2Point xyPoint:(JSValue *)xyPoint objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.currentPath addCurveToPoint:[xyPoint toPoint]
                            controlPoint1:[cp1Point toPoint]
                            controlPoint2:[cp2Point toPoint]];
    }
}

+ (void)xtr_arc:(JSValue *)point r:(JSValue *)r sAngle:(JSValue *)sAngle eAngle:(JSValue *)eAngle counterclockwise:(JSValue *)counterclockwise objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.currentPath addArcWithCenter:[point toPoint]
                                    radius:r.toDouble
                                startAngle:sAngle.toDouble
                                  endAngle:eAngle.toDouble
                                 clockwise:!counterclockwise.toBool];
    }
}

+ (BOOL)xtr_isPointInPath:(JSValue *)point objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        UIBezierPath *currentPath = view.currentPath;
        if (!CGAffineTransformIsIdentity(view.currentState.currentTransform)) {
            currentPath = [UIBezierPath bezierPath];
            [currentPath appendPath:view.currentPath];
            [currentPath applyTransform:view.currentState.currentTransform];
        }
        return [currentPath containsPoint:[point toPoint]];
    }
    return NO;
}

+ (void)xtr_postScale:(JSValue *)point objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.currentTransform = CGAffineTransformScale(view.currentState.currentTransform, [point toPoint].x, [point toPoint].y);
    }
}

+ (void)xtr_postRotate:(JSValue *)angle objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.currentTransform = CGAffineTransformRotate(view.currentState.currentTransform, angle.toDouble);
    }
}

+ (void)xtr_postTranslate:(JSValue *)point objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.currentTransform = CGAffineTransformTranslate(view.currentState.currentTransform, [point toPoint].x, [point toPoint].y);
    }
}

+ (void)xtr_postTransform:(JSValue *)transform objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        view.currentState.currentTransform = CGAffineTransformConcat(view.currentState.currentTransform, [transform toTransform]);
    }
}

+ (void)xtr_setCanvasTransform:(JSValue *)transform objectRef:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
    }
}

- (void)xtr_setCanvasTransform:(JSValue *)transform {
    self.currentState.currentTransform = [transform toTransform];
}

+ (void)xtr_save:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        NSMutableArray *stateStack = [(view.stateStack ?: @[]) mutableCopy];
        [stateStack addObject:view.currentState];
        view.stateStack = stateStack;
        view.currentState = [view.currentState copy];
    }
}

+ (void)xtr_restore:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        if ([view.stateStack count] > 0) {
            view.currentState = [view.stateStack lastObject];
            NSMutableArray *stateStack = [(view.stateStack ?: @[]) mutableCopy];
            [stateStack removeLastObject];
            view.stateStack = stateStack;
        }
    }
}

+ (void)xtr_clear:(NSString *)objectRef {
    XTRCanvasView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCanvasView class]]) {
        [view.layer.sublayers makeObjectsPerformSelector:@selector(removeFromSuperlayer)];
        view.stateStack = @[];
        view.currentState = [XTRCanvasState new];
        view.currentPath = nil;
    }
}

@end
