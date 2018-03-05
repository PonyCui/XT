//
//  XTFNotification.m
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/21.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import "XTFNotification.h"

@interface XTFNotificationObserver: NSObject

@property (nonatomic, strong) NSString *handler;
@property (nonatomic, strong) NSString *name;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, weak) NSThread *thread;
@property (nonatomic, strong) id observer;
@property (nonatomic, strong) NSNotification *lastNote;

@end

@implementation XTFNotificationObserver

@end

@implementation XTFNotification

static NSArray<XTFNotificationObserver *> *observers;

+ (NSString *)addObserver:(NSString *)name {
    NSString *handler = [[NSUUID UUID] UUIDString];
    NSMutableArray *mutable = (observers ?: @[]).mutableCopy;
    XTFNotificationObserver *observer = [XTFNotificationObserver new];
    observer.handler = handler;
    observer.name = name;
    observer.context = [JSContext currentContext];
    observer.thread = [NSThread currentThread];
    observer.observer = [[NSNotificationCenter defaultCenter] addObserverForName:name object:nil queue:[NSOperationQueue currentQueue] usingBlock:^(NSNotification * _Nonnull note) {
        [XTFNotification onNotification: note];
    }];
    [mutable addObject:observer];
    observers = mutable.copy;
    return handler;
}

+ (void)onNotification:(NSNotification *)note {
    for (XTFNotificationObserver *observer in observers) {
        if ([observer.name isEqualToString:note.name] && observer.thread != nil) {
            observer.lastNote = note;
            [self performSelector:@selector(emitNotification:) onThread:observer.thread withObject:observer waitUntilDone:NO];
        }
    }
}

+ (void)emitNotification:(XTFNotificationObserver *)observer {
    JSContext *context = observer.context;
    if (context != nil) {
        JSValue *contextInstance = [context evaluateScript:@"window.XTFNotificationCenter.default"];
        [contextInstance invokeMethod:@"onNotification" withArguments:@[
                                                                        observer.lastNote.name ?: @"",
                                                                        observer.lastNote.object ?: [JSValue valueWithUndefinedInContext:context],
                                                                        observer.lastNote.userInfo ?: [JSValue valueWithUndefinedInContext:context]
                                                                        ]];
    }
    
}

+ (void)removeObserver:(NSString *)handler {
    NSMutableArray *mutable = (observers ?: @[]).mutableCopy;
    for (XTFNotificationObserver *observer in observers) {
        if ([observer.handler isEqualToString:handler]) {
            [[NSNotificationCenter defaultCenter] removeObserver:observer.observer];
        }
        [mutable removeObject:observer];
    }
    observers = mutable.copy;
}

+ (void)postNotification:(NSString *)name object:(JSValue *)object userInfo:(JSValue *)userInfo {
    id anObject = nil;
    if (object.isString) {
        anObject = object.toString;
    }
    if (object.isNumber) {
        anObject = object.toNumber;
    }
    if (object.isBoolean) {
        anObject = @(object.toBool);
    }
    if (@available(iOS 9.0, *)) {
        if (object.isDate) {
            anObject = object.toDate;
        }
    }
    if (@available(iOS 9.0, *)) {
        if (object.isArray) {
            anObject = object.toArray;
        }
    }
    if (object.isObject) {
        anObject = object.toDictionary;
    }
    [[NSNotificationCenter defaultCenter] postNotificationName:name
                                                        object:anObject
                                                      userInfo:(userInfo.isObject ? userInfo.toDictionary : nil)];
}

@end
