//
//  XTFURLResponse.m
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/4.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import "XTFURLResponse.h"
#import "XTMemoryManager.h"

@implementation XTFURLResponse

+ (NSString *)xtr_URLString:(NSString *)objectRef {
    NSURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSURLResponse class]]) {
        return obj.URL.absoluteString;
    }
    return nil;
}

+ (NSString *)xtr_MIMEType:(NSString *)objectRef {
    NSURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSURLResponse class]]) {
        return obj.MIMEType;
    }
    return nil;
}

+ (NSInteger)xtr_expectedContentLength:(NSString *)objectRef {
    NSURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSURLResponse class]]) {
        return obj.expectedContentLength;
    }
    return 0;
}

+ (NSString *)xtr_textEncodingName:(NSString *)objectRef {
    NSURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSURLResponse class]]) {
        return obj.textEncodingName;
    }
    return nil;
}

+ (NSString *)xtr_suggestedFilename:(NSString *)objectRef {
    NSURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSURLResponse class]]) {
        return obj.suggestedFilename;
    }
    return nil;
}

+ (NSInteger)xtr_statusCode:(NSString *)objectRef {
    NSHTTPURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSHTTPURLResponse class]]) {
        return obj.statusCode;
    }
    return 0;
}

+ (NSDictionary *)xtr_allHeaderFields:(NSString *)objectRef {
    NSHTTPURLResponse *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[NSHTTPURLResponse class]]) {
        return obj.allHeaderFields;
    }
    return @{};
}

@end
