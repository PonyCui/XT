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

+ (JSValue *)fromObject:(id)object context:(JSContext *)context {
    if (object == nil) {
        return nil;
    }
    return [[context evaluateScript:@"window.XTRObjCreater"] invokeMethod:@"create" withArguments:@[object]];
}

- (UIView *)toView {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        UIView *nativeView = [self[@"nativeObject"] toObject];
        if ([nativeView isKindOfClass:[UIView class]]) {
            return nativeView;
        }
    }
    return nil;
}

- (UIWindow *)toWindow {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        UIWindow *nativeView = [self[@"nativeObject"] toObject];
        if ([nativeView isKindOfClass:[UIWindow class]]) {
            return nativeView;
        }
    }
    return nil;
}

- (UIViewController *)toViewController {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        UIViewController *nativeViewController = [self[@"nativeObject"] toObject];
        if ([nativeViewController isKindOfClass:[UIViewController class]]) {
            return nativeViewController;
        }
    }
    return nil;
}

- (UINavigationController *)toNavigationController {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        UINavigationController *nativeViewController = [self[@"nativeObject"] toObject];
        if ([nativeViewController isKindOfClass:[UINavigationController class]]) {
            return nativeViewController;
        }
    }
    return nil;
}

- (XTRImage *)toImage {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        XTRImage *nativeView = [self[@"nativeObject"] toObject];
        if ([nativeView isKindOfClass:[XTRImage class]]) {
            return nativeView;
        }
    }
    return nil;
}

- (XTRFont *)toFont {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        XTRFont *nativeView = [self[@"nativeObject"] toObject];
        if ([nativeView isKindOfClass:[XTRFont class]]) {
            return nativeView;
        }
    }
    return nil;
}

- (XTRLayoutConstraint *)toLayoutConstraint {
    if ([self isObject] && [self[@"nativeObject"] isKindOfClass:[JSValue class]]) {
        XTRLayoutConstraint *constraint = [self[@"nativeObject"] toObject];
        if ([constraint isKindOfClass:[XTRLayoutConstraint class]]) {
            return constraint;
        }
    }
    return nil;
}

- (NSLayoutRelation)toLayoutRelation {
    switch ([self toInt32]) {
        case -1:
            return NSLayoutRelationLessThanOrEqual;
        case 0:
            return NSLayoutRelationEqual;
        case 1:
            return NSLayoutRelationGreaterThanOrEqual;
        default:
            return NSLayoutRelationEqual;
    }
}

- (NSLayoutAttribute)toLayoutAttribute {
    switch ([self toInt32]) {
        case 0:
            return 0;
        case 1:
            return NSLayoutAttributeLeft;
        case 2:
            return NSLayoutAttributeRight;
        case 3:
            return NSLayoutAttributeTop;
        case 4:
            return NSLayoutAttributeBottom;
        case 7:
            return NSLayoutAttributeWidth;
        case 8:
            return NSLayoutAttributeHeight;
        case 9:
            return NSLayoutAttributeCenterX;
        case 10:
            return NSLayoutAttributeCenterY;
        default:
            return 0;
    }
}

@end
