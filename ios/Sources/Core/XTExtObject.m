//
//  XTExtObject.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/12.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTExtObject.h"
#import "XTMemoryManager.h"

@interface XTExtEntity: NSObject

@property (nonatomic, assign) Class clazz;
@property (nonatomic, copy) XTExtObjectInitializer initializer;
@property (nonatomic, copy) XTExtObjectSetter setter;
@property (nonatomic, copy) XTExtObjectGetter getter;
@property (nonatomic, copy) XTExtObjectCaller caller;

@end

@implementation XTExtEntity

@end

@interface XTExtObject ()

@property (nonatomic, strong) id innerObject;
@property (nonatomic, strong) XTExtEntity *extItem;

@end

@implementation XTExtObject

static NSDictionary *registedClasses;

+ (NSString *)create:(NSString *)clazz {
    XTExtObject *obj = [[self alloc] init];
    if (registedClasses[clazz] != nil) {
        XTExtEntity *item = registedClasses[clazz];
        if (item.initializer) {
            obj.innerObject = item.initializer();
        }
        else {
            obj.innerObject = [item.clazz new];
        }
        obj.extItem = item;
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

+ (JSValue *)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTExtObject *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTExtObject class]]) {
        XTExtObjectGetter getter = obj.extItem.getter;
        if (getter) {
            return [JSValue valueWithObject:getter(propKey, obj.innerObject) inContext:[JSContext currentContext]];
        }
        else {
            @try {
                return [JSValue valueWithObject:[obj.innerObject valueForKey:propKey] inContext:[JSContext currentContext]];
            } @catch (NSException *exception) { } @finally { }
        }
    }
    return nil;
}

+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTExtObject *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTExtObject class]]) {
        XTExtObjectSetter setter = obj.extItem.setter;
        if (setter) {
            setter(value, propKey, obj.innerObject);
        }
        else {
            @try {
                if (value.isString) {
                    [obj.innerObject setValue:value.toString forKey:propKey];
                }
                else if (value.isNumber) {
                    [obj.innerObject setValue:value.toNumber forKey:propKey];
                }
                else if (value.isBoolean) {
                    [obj.innerObject setValue:@(value.toBool) forKey:propKey];
                }
            } @catch (NSException *exception) { } @finally { }
        }
    }
}

+ (JSValue *)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef {
    XTExtObject *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTExtObject class]]) {
        XTExtObjectCaller caller = obj.extItem.caller;
        if (caller) {
            return [JSValue valueWithObject:caller(methodName, arguments, obj.innerObject) inContext:[JSContext currentContext]];
        }
    }
    return nil;
}

+ (void)registerClass:(Class)clazz
          initializer:(XTExtObjectInitializer)initializer
               getter:(XTExtObjectGetter)getter
               setter:(XTExtObjectSetter)setter
               caller:(XTExtObjectCaller)caller {
    NSMutableDictionary *mutable = (registedClasses ?: @{}).mutableCopy;
    XTExtEntity *item = [[XTExtEntity alloc] init];
    item.clazz = clazz;
    item.initializer = initializer;
    item.getter = getter;
    item.setter = setter;
    item.caller = caller;
    [mutable setObject:item
                forKey:NSStringFromClass(clazz)];
    registedClasses = mutable.copy;
}

@end
