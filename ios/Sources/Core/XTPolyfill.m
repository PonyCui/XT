//
//  XTPolyfill.m
//  XTPolyfill
//
//  Created by 崔明辉 on 2017/10/11.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTPolyfill.h"
#import "XTDebug.h"
#import <objc/runtime.h>

@implementation XTPolyfill

+ (void)addPolyfills:(JSContext *)context {
    static int kPolyfillAddToken;
    if (objc_getAssociatedObject(context, &kPolyfillAddToken) == nil) {
        [self addTimeoutPolyfill:context];
        [self addIntervalPolyfill:context];
        [self addImmediatePolyfill:context];
        [self addRAFPolyfill:context];
        [self addConsolePolyfill:context];
        objc_setAssociatedObject(context, &kPolyfillAddToken, @(YES), OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
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
            [callback callWithArguments:@[]];
            [handlers removeObjectForKey:uuid];
        });
        return uuid;
    };
}

+ (void)addIntervalPolyfill:(JSContext *)context {
    typedef void(^IntervalBlock)(id keepBlock);
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
            [callback callWithArguments:@[]];
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

+ (void)addImmediatePolyfill:(JSContext *)context {
    static NSMutableDictionary *handlers;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        handlers = [NSMutableDictionary dictionary];
    });
    context[@"clearImmediate"] = ^(JSValue *timeoutHandler) {
        NSString *uuid = [timeoutHandler toString];
        if (uuid != nil && handlers[uuid] != nil) {
            [handlers removeObjectForKey:uuid];
        }
    };
    context[@"setImmediate"] = ^(JSValue *callback){
        NSString *uuid = [[NSUUID UUID] UUIDString];
        [handlers setObject:@(0) forKey:uuid];
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            if (handlers[uuid] == nil) {
                return ;
            }
            [callback callWithArguments:@[]];
            [handlers removeObjectForKey:uuid];
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
    [callback callWithArguments:@[]];
    [RAFHandlers removeObjectForKey:uuid];
}

+ (void)addConsolePolyfill:(JSContext *)context {
    context[@"XTLog"] = ^(JSValue *value) {
        NSLog(@"%@", value.toString);
        [[XTDebug sharedDebugger] sendLog:value.toString];
    };
    [context evaluateScript:@"(function(){ var originMethod = console.log; console.log = function() { originMethod.apply(console, arguments); for (var i = 0; i < arguments.length; i ++) {XTLog(arguments[i])} } })()"];
}

@end
