//
//  XTUIHRView.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/4.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIHRView.h"
#import "XTUIUtils.h"
#import "XTMemoryManager.h"

@interface XTUIHRView()

@property (nonatomic, strong) CAShapeLayer *shapeLayer;
@property (nonatomic, strong) UIColor *color;
@property (nonatomic, assign) NSInteger position;

@end

@implementation XTUIHRView

+ (NSString *)name {
    return @"_XTUIHRView";
}

+ (NSString *)create {
    XTUIHRView *view = [[XTUIHRView alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSInteger)xtr_position:(NSString *)objectRef {
    XTUIHRView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIHRView class]]) {
        return view.position;
    }
    return 0;
}

+ (void)xtr_setPosition:(NSInteger)value objectRef:(NSString *)objectRef {
    XTUIHRView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIHRView class]]) {
        view.position = value;
    }
}

+ (NSDictionary *)xtr_color:(NSString *)objectRef {
    XTUIHRView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIHRView class]]) {
        return [JSValue fromColor:view.color];
    }
    return @{};
}

+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef {
    XTUIHRView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIHRView class]]) {
        view.color = [color toColor];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _position = 2;
        _shapeLayer = [CAShapeLayer layer];
        _shapeLayer.fillColor = [UIColor clearColor].CGColor;
        _shapeLayer.strokeColor = [UIColor blackColor].CGColor;
        _shapeLayer.lineWidth = 1.0 / [UIScreen mainScreen].scale;
        [self.layer addSublayer:_shapeLayer];
        self.userInteractionEnabled = NO;
    }
    return self;
}

- (void)setPosition:(NSInteger)position {
    _position = position;
    [self layoutSubviews];
}

- (void)setColor:(UIColor *)color {
    _color = color;
    self.shapeLayer.strokeColor = color.CGColor;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    if (self.position <= 2) {
        CGFloat yPosition = 0.0;
        if (self.position == 0) {
            yPosition = 0.0;
        }
        else if (self.position == 1) {
            yPosition = (1.0 - 1.0 / [UIScreen mainScreen].scale) / 2.0;
        }
        else if (self.position == 2) {
            yPosition = (1.0 - 1.0 / [UIScreen mainScreen].scale);
        }
        UIBezierPath *line = [UIBezierPath bezierPath];
        [line moveToPoint:CGPointMake(0, yPosition)];
        [line addLineToPoint:CGPointMake(self.bounds.size.width, yPosition)];
        [self.shapeLayer setPath:line.CGPath];
    }
    else {
        CGFloat xPosition = 0.0;
        if (self.position == 3) {
            xPosition = 0.0;
        }
        else if (self.position == 4) {
            xPosition = (1.0 - 1.0 / [UIScreen mainScreen].scale) / 2.0;
        }
        else if (self.position == 5) {
            xPosition = (1.0 - 1.0 / [UIScreen mainScreen].scale);
        }
        UIBezierPath *line = [UIBezierPath bezierPath];
        [line moveToPoint:CGPointMake(xPosition, 0)];
        [line addLineToPoint:CGPointMake(xPosition, self.bounds.size.height)];
        [self.shapeLayer setPath:line.CGPath];
    }
    
}

@end
