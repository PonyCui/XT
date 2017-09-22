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

typedef void(^IntervalBlock)(id keepBlock);

@implementation XTRUtils

+ (void)attachPolyfills:(JSContext *)context {
    [self addTimeoutPolyfill:context];
    [self addIntervalPolyfill:context];
    [self addRAFPolyfill:context];
    [self addConsolePolyfill:context];
}

+ (void)addTimeoutPolyfill:(JSContext *)context {
    static NSMutableDictionary *handlers;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        handlers = [NSMutableDictionary dictionary];
    });
    context[@"clearTimeout"] = ^(JSValue *timeoutHandler) {
        NSString *uuid = [timeoutHandler toString];
        if (uuid != nil && handlers[uuid] != nil) {
            [handlers removeObjectForKey:uuid];
        }
    };
    context[@"setTimeout"] = ^(JSValue *callback, JSValue *millsecond){
        NSString *uuid = [[NSUUID UUID] UUIDString];
        [handlers setObject:@(0) forKey:uuid];
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(([millsecond toInt32] / 1000.0) * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            if (handlers[uuid] == nil) {
                return ;
            }
            [callback xtr_callWithArguments:@[]];
            [handlers removeObjectForKey:uuid];
        });
        return uuid;
    };
}

+ (void)addIntervalPolyfill:(JSContext *)context {
    static NSMutableDictionary *handlers;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        handlers = [NSMutableDictionary dictionary];
    });
    context[@"clearInterval"] = ^(JSValue *timeoutHandler) {
        NSString *uuid = [timeoutHandler toString];
        if (uuid != nil && handlers[uuid] != nil) {
            [handlers removeObjectForKey:uuid];
        }
    };
    context[@"setInterval"] = ^(JSValue *callback, JSValue *millsecond){
        NSString *uuid = [[NSUUID UUID] UUIDString];
        [handlers setObject:@(0) forKey:uuid];
        IntervalBlock __block intervalRunnable = ^(IntervalBlock keepBlock){
            if (handlers[uuid] == nil) {
                return ;
            }
            [callback xtr_callWithArguments:@[]];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(([millsecond toInt32] / 1000.0) * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                keepBlock(keepBlock);
            });
        };
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(([millsecond toInt32] / 1000.0) * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            intervalRunnable(intervalRunnable);
        });
        return uuid;
    };
}

static NSMutableDictionary *RAFHandlers;

+ (void)addRAFPolyfill:(JSContext *)context {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        RAFHandlers = [NSMutableDictionary dictionary];
    });
    context[@"clearAnimationFrame"] = ^(JSValue *timeoutHandler) {
        NSString *uuid = [timeoutHandler toString];
        if (uuid != nil && RAFHandlers[uuid] != nil) {
            [RAFHandlers removeObjectForKey:uuid];
        }
    };
    context[@"requestAnimationFrame"] = ^(JSValue *callback, JSValue *millsecond){
        NSString *uuid = [[NSUUID UUID] UUIDString];
        [RAFHandlers setObject:@(0) forKey:uuid];
        [NSTimer scheduledTimerWithTimeInterval:0.0
                                         target:self
                                       selector:@selector(handleAnimationFrame:)
                                       userInfo:@{@"uuid": uuid, @"callback": callback}
                                        repeats:NO];
        return uuid;
    };
}

+ (void)handleAnimationFrame:(NSTimer *)timer {
    NSString *uuid = timer.userInfo[@"uuid"];
    JSValue *callback = timer.userInfo[@"callback"];
    if (uuid == nil || callback == nil) {
        return;
    }
    if (RAFHandlers[uuid] == nil) {
        return ;
    }
    [callback xtr_callWithArguments:@[]];
    [RAFHandlers removeObjectForKey:uuid];
}

+ (void)addConsolePolyfill:(JSContext *)context {
    context[@"XTRLog"] = ^(JSValue *value) {
        NSLog(@"%@", [value toString]);
    };
    [context evaluateScript:@"(function(){ var originMethod = console.log; console.log = function() { originMethod.apply(originMethod, arguments); XTRLog(arguments[0]) } })()"];
}

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
