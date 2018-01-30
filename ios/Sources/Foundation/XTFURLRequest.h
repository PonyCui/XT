//
//  XTFURLRequest.h
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/18.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFURLRequest;

@protocol XTFURLRequestExport<JSExport>

+ (NSString *)create:(NSString *)URLString timeout:(NSInteger)timeout cachePolicy:(NSInteger)cachePolicy;
+ (void)xtr_setHTTPMethod:(NSString *)value objectRef:(NSString *)objectRef;
+ (void)xtr_setHTTPHeaderValue:(NSString *)headedValue headerKey:(NSString *)headerKey objectRef:(NSString *)objectRef;
+ (void)xtr_setHTTPBodyFromString:(NSString *)stringValue objectRef:(NSString *)objectRef;
+ (void)xtr_setHTTPBodyFromData:(NSString *)dataRef objectRef:(NSString *)objectRef;

@end

@interface XTFURLRequest : NSObject<XTFURLRequestExport>

@end
