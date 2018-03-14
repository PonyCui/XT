//
//  XTExtObject.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/12.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "XTBaseObject.h"

@protocol XTExtObjectExport<JSExport>

+ (NSString *)create:(NSString *)clazz;
+ (id)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (id)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef;

@end

@interface XTExtObjectImplementation: NSObject

- (id)onGetValue:(NSString *)propKey;
- (void)onSetValue:(NSString *)propKey value:(id)value;
- (id)onCallMethod:(NSString *)methodName args:(NSArray *)args;
- (id)invokeMethod:(NSString *)methodName args:(NSArray *)args;

@end

@interface XTExtObject : XTBaseObject <XTExtObjectExport>

@end
