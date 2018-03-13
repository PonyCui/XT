//
//  XTExtObject.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/12.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XTBaseObject.h"

typedef JSValue *(^XTExtObjectInvoker)(NSString *invokeMethod, NSArray<id> *arguments);
typedef id(^XTExtObjectInitializer)(XTExtObjectInvoker invoker);
typedef id (^XTExtObjectGetter)(NSString *propKey, id obj);
typedef void(^XTExtObjectSetter)(JSValue *value, NSString *propKey, id obj);
typedef id(^XTExtObjectCaller)(NSString *methodName, NSArray<id> *arguments, id obj);

@protocol XTExtObjectExport<JSExport>

+ (NSString *)create:(NSString *)clazz;
+ (JSValue *)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (JSValue *)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef;

@end

@interface XTExtObject : XTBaseObject <XTExtObjectExport>

+ (void)registerClass:(Class)clazz
          initializer:(XTExtObjectInitializer)initializer
               getter:(XTExtObjectGetter)getter
               setter:(XTExtObjectSetter)setter
               caller:(XTExtObjectCaller)caller;

@end
