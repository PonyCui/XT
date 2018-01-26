//
//  XTFData.h
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFData;

@protocol XTFDataExport<JSExport>

+ (NSString *)createWithString:(NSString *)stringValue;
+ (NSString *)createWithBytes:(NSArray *)bytes;
+ (NSString *)createWithData:(NSString *)objectRef;
+ (NSString *)createWithBase64EncodedString:(NSString *)value;
+ (NSString *)createWithBase64EncodedData:(NSString *)objectRef;
+ (BOOL)isEqualTo:(NSString *)toObjectRef objectRef:(NSString *)objectRef;
+ (NSArray *)getBytes:(NSString *)objectRef;
+ (NSUInteger)length:(NSString *)objectRef;
+ (NSString *)base64EncodedData:(NSString *)objectRef;
+ (NSString *)base64EncodedString:(NSString *)objectRef;
+ (NSString *)utf8String:(NSString *)objectRef;
+ (NSString *)md5:(NSString *)objectRef;
+ (NSString *)sha1:(NSString *)objectRef;

@end

@interface XTFData : NSObject<XTFDataExport>

@end
