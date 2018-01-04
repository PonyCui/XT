//
//  XTRUtils.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRUtils.h"
#import "XTRImage.h"
#import "XTRFont.h"
#import "XTRLayoutConstraint.h"
#import "XTRContext.h"

#define FloatValue(VAL) [VAL isKindOfClass:[NSNumber class]] ? [VAL floatValue] : 0.0

@implementation XTRUtils

@end

@implementation JSValue (XTRUtils)

+ (NSDictionary *)fromRect:(CGRect)rect {
    return @{@"x": @(rect.origin.x), @"y": @(rect.origin.y), @"width": @(rect.size.width), @"height": @(rect.size.height)};
}

+ (NSDictionary *)fromInsets:(UIEdgeInsets)insets {
    return @{@"top": @(insets.top), @"left": @(insets.left), @"bottom": @(insets.bottom), @"right": @(insets.right)};
}

+ (NSDictionary *)fromSize:(CGSize)size {
    return @{@"width": @(size.width), @"height": @(size.height)};
}

+ (NSDictionary *)fromPoint:(CGPoint)point {
    return @{@"x": @(point.x), @"y": @(point.y)};
}

+ (NSDictionary *)fromTransform:(CGAffineTransform)transform {
    return @{@"a": @(transform.a), @"b": @(transform.b), @"c": @(transform.c), @"d": @(transform.d), @"tx": @(transform.tx), @"ty": @(transform.ty)};
}

- (CGAffineTransform)toTransform {
    if ([self isObject]) {
        NSDictionary *obj = [self toDictionary];
        return CGAffineTransformMake(FloatValue(obj[@"a"]),
                                     FloatValue(obj[@"b"]),
                                     FloatValue(obj[@"c"]),
                                     FloatValue(obj[@"d"]),
                                     FloatValue(obj[@"tx"]),
                                     FloatValue(obj[@"ty"]));
    }
    return CGAffineTransformIdentity;
}

+ (NSDictionary *)fromColor:(UIColor *)color {
    CGFloat r = 0.0;
    CGFloat g = 0.0;
    CGFloat b = 0.0;
    CGFloat a = 1.0;
    [color getRed:&r green:&g blue:&b alpha:&a];
    return @{
             @"r":@(r),
             @"g":@(g),
             @"b":@(b),
             @"a":@(a),
             };
}

- (UIColor *)toColor {
    if ([self isObject]) {
        NSDictionary *obj = [self toDictionary];
        return [UIColor colorWithRed:FloatValue(obj[@"r"]) green:FloatValue(obj[@"g"]) blue:FloatValue(obj[@"b"]) alpha:FloatValue(obj[@"a"])];
    }
    return nil;
}

+ (JSValue *)fromObject:(id<XTRComponent>)object context:(JSContext *)context {
    if ([object conformsToProtocol:@protocol(XTRComponent)]) {
        return [context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", object.objectUUID]];
    }
    return [JSValue valueWithUndefinedInContext:context];
}

@end
