//
//  XTUIExtView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/13.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"

typedef id(^XTExtViewInitializer)(void);
typedef id (^XTExtViewGetter)(NSString *propKey, id obj);
typedef void(^XTExtViewSetter)(JSValue *value, NSString *propKey, id obj);
typedef id(^XTExtViewCaller)(NSString *methodName, NSArray<id> *arguments, id obj);

@protocol XTExtViewExport<XTUIViewExport, JSExport>

+ (void)xtr_initWithViewClass:(NSString *)viewClass objectRef:(NSString *)objectRef;
+ (JSValue *)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (JSValue *)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef;

@end

@interface XTUIExtView : XTUIView <XTExtViewExport>

+ (void)registerClass:(Class)clazz
          initializer:(XTExtViewInitializer)initializer
               getter:(XTExtViewGetter)getter
               setter:(XTExtViewSetter)setter
               caller:(XTExtViewCaller)caller;

@end
