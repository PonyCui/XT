//
//  XTUIExtView.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/13.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIExtView.h"
#import "XTMemoryManager.h"

@interface XTUIExtEntity: NSObject

@property (nonatomic, assign) Class clazz;
@property (nonatomic, copy) XTExtViewInitializer initializer;
@property (nonatomic, copy) XTExtViewSetter setter;
@property (nonatomic, copy) XTExtViewGetter getter;
@property (nonatomic, copy) XTExtViewCaller caller;

@end

@implementation XTUIExtEntity

@end

@interface XTUIExtView ()

@property (nonatomic, strong) UIView *innerView;
@property (nonatomic, strong) XTUIExtEntity *extItem;
@property (nonatomic, copy) XTExtViewInvoker invoker;

@end

@implementation XTUIExtView

static NSDictionary *registeredClasses;

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        __weak XTUIExtView *welf = self;
        [self setInvoker:^JSValue *(NSString *invokeMethod, NSArray<id> *arguments) {
            __strong XTUIExtView *self = welf;
            if (self == nil) { return nil; }
            JSValue *scriptObject = [self scriptObject];
            if (scriptObject != nil) {
                return [scriptObject invokeMethod:invokeMethod withArguments:arguments];
            }
            return nil;
        }];
    }
    return self;
}

+ (NSString *)name {
    return @"_XTUIExtView";
}

+ (void)registerClass:(Class)clazz
          initializer:(XTExtViewInitializer)initializer
               getter:(XTExtViewGetter)getter
               setter:(XTExtViewSetter)setter
               caller:(XTExtViewCaller)caller {
    if (![clazz isSubclassOfClass:[UIView class]]) {
        return;
    }
    NSMutableDictionary *mutable = (registeredClasses ?: @{}).mutableCopy;
    XTUIExtEntity *item = [[XTUIExtEntity alloc] init];
    item.clazz = clazz;
    item.initializer = initializer;
    item.getter = getter;
    item.setter = setter;
    item.caller = caller;
    [mutable setObject:item
                forKey:NSStringFromClass(clazz)];
    registeredClasses = mutable.copy;
}

+ (void)xtr_initWithViewClass:(NSString *)viewClass objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIExtView class]]) {
        if (registeredClasses[viewClass] != nil) {
            XTUIExtEntity *item = registeredClasses[viewClass];
            if (item.initializer) {
                view.innerView = item.initializer(view.invoker);
            }
            else {
                view.innerView = [item.clazz new];
            }
            view.innerView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            view.innerView.frame = view.bounds;
            [view addSubview:view.innerView];
            view.extItem = item;
        }
    }
}

+ (JSValue *)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIExtView class]]) {
        XTExtViewGetter getter = view.extItem.getter;
        if (getter) {
            return [JSValue valueWithObject:getter(propKey, view.innerView) inContext:[JSContext currentContext]];
        }
        else {
            @try {
                return [JSValue valueWithObject:[view.innerView valueForKey:propKey] inContext:[JSContext currentContext]];
            } @catch (NSException *exception) { } @finally { }
        }
    }
    return nil;
}

+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIExtView class]]) {
        XTExtViewSetter setter = view.extItem.setter;
        if (setter) {
            setter(value, propKey, view.innerView);
        }
        else {
            @try {
                if (value.isString) {
                    [view.innerView setValue:value.toString forKey:propKey];
                }
                else if (value.isNumber) {
                    [view.innerView setValue:value.toNumber forKey:propKey];
                }
                else if (value.isBoolean) {
                    [view.innerView setValue:@(value.toBool) forKey:propKey];
                }
                else if (value.isObject) {
                    [view.innerView setValue:value.toObject forKey:propKey];
                }
            } @catch (NSException *exception) { } @finally { }
        }
    }
}

+ (JSValue *)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIExtView class]]) {
        XTExtViewCaller caller = view.extItem.caller;
        if (caller) {
            return [JSValue valueWithObject:caller(methodName, arguments, view.innerView) inContext:[JSContext currentContext]];
        }
    }
    return nil;
}

@end
