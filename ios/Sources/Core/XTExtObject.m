//
//  XTExtObject.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/12.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTExtObject.h"
#import "XTMemoryManager.h"

@interface XTExtObjectImplementation()

@property (nonatomic, weak) XTExtObject *owner;

@end

@implementation XTExtObjectImplementation

- (id)onGetValue:(NSString *)propKey {
    return [NSError errorWithDomain:@"Not Implemented" code:-999 userInfo:nil];
}

- (void)onSetValue:(NSString *)propKey value:(id)value { }

- (id)onCallMethod:(NSString *)methodName args:(NSArray *)args {
    return [NSError errorWithDomain:@"Not Implemented" code:-999 userInfo:nil];
}

- (id)invokeMethod:(NSString *)methodName args:(NSArray *)args {
    JSValue *scriptObject = self.owner.scriptObject;
    if (scriptObject != nil) {
        return [scriptObject invokeMethod:methodName withArguments:args];
    }
    return nil;
}

@end

@interface XTExtObject ()

@property (nonatomic, strong) XTExtObjectImplementation *innerObject;

@end

@implementation XTExtObject

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTExtObject dealloc.");
#endif
}

+ (NSString *)create:(NSString *)clazz {
    XTExtObject *obj = [[self alloc] init];
    Class clz = [[NSBundle mainBundle] classNamed:clazz];
    if (clz != NULL && [clz isSubclassOfClass:[XTExtObjectImplementation class]]) {
        obj.innerObject = [clz new];
        obj.innerObject.owner = obj;
    }
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
    [XTMemoryManager add:managedObject];
    obj.context = [JSContext currentContext];
    obj.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"_XTExtObject";
}

+ (id)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTExtObject *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTExtObject class]]) {
        id returnValue = [obj.innerObject onGetValue:propKey];
        if ([returnValue isKindOfClass:[NSError class]] && [returnValue code] == -999) {
            @try {
                return [JSValue valueWithObject:[obj.innerObject valueForKey:propKey] inContext:[JSContext currentContext]];
            } @catch (NSException *exception) { } @finally { }
        }
        else {
            return returnValue;
        }
    }
    return nil;
}

+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTExtObject *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTExtObject class]]) {
        id newValue = value;
        if (value.isString) {
            newValue = value.toString;
        }
        else if (value.isNumber) {
            newValue = value.toNumber;
        }
        else if (value.isBoolean) {
            newValue = @(value.toBool);
        }
        else if (value.isObject) {
            newValue = value.toObject;
        }
        @try {
            [obj.innerObject setValue:newValue forKey:propKey];
        } @catch (NSException *exception) { } @finally { }
        [obj.innerObject onSetValue:propKey value:newValue];
    }
}

+ (id)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef {
    XTExtObject *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTExtObject class]]) {
        return [obj.innerObject onCallMethod:methodName args:arguments];
    }
    return nil;
}

@end
