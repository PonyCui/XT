//
//  XTFURLResponse.h
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/4.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@protocol XTFURLResponseExport<JSExport>

+ (NSString *)xtr_URLString:(NSString *)objectRef;
+ (NSString *)xtr_MIMEType:(NSString *)objectRef;
+ (NSInteger)xtr_expectedContentLength:(NSString *)objectRef;
+ (NSString *)xtr_textEncodingName:(NSString *)objectRef;
+ (NSString *)xtr_suggestedFilename:(NSString *)objectRef;
+ (NSInteger)xtr_statusCode:(NSString *)objectRef;
+ (NSDictionary *)xtr_allHeaderFields:(NSString *)objectRef;

@end

@interface XTFURLResponse : NSObject<XTFURLResponseExport>

@end
