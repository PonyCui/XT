//
//  XTUIExtView.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/13.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIExtView.h"
#import "XTMemoryManager.h"

@interface XTUIExtView ()

@property (nonatomic, strong) UIView *innerView;

@end

@implementation XTUIExtView

+ (NSString *)name {
    return @"_XTUIExtView";
}

+ (void)xtr_initWithViewClass:(NSString *)viewClass objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    Class clz = [[NSBundle mainBundle] classNamed:viewClass];
    if (clz != NULL && [clz isSubclassOfClass:[UIView class]]) {
        view.innerView = [clz new];
        [(id<XTExtViewProtocol>)view.innerView setExtView:view];
        view.innerView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
        view.innerView.frame = view.bounds;
        [view addSubview:view.innerView];
    }
}

+ (id)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIExtView class]]) {
        if ([view.innerView respondsToSelector:@selector(onGetValue:)]) {
            return [(id<XTExtViewProtocol>)view.innerView onGetValue:propKey];
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
        if ([view.innerView respondsToSelector:@selector(onSetValue:value:)]) {
            [(id<XTExtViewProtocol>)view.innerView onSetValue:propKey value:newValue];
        }
        else {
            @try {
                [view.innerView setValue:newValue forKey:propKey];
            } @catch (NSException *exception) { } @finally { }
        }
    }
}

+ (id)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef {
    XTUIExtView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIExtView class]]) {
        if ([view.innerView respondsToSelector:@selector(onCallMethod:args:)]) {
            return [(id<XTExtViewProtocol>)view.innerView onCallMethod:methodName args:arguments];
        }
    }
    return nil;
}

- (id)invokeMethod:(NSString *)methodName args:(NSArray *)args {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        return [scriptObject invokeMethod:methodName withArguments:args];
    }
    return nil;
}

@end
