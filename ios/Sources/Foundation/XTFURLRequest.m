//
//  XTFURLRequest.m
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/18.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import "XTFURLRequest.h"
#import "XTFoundationContext.h"
#import "XTMemoryManager.h"

@interface XTFURLRequest()

@end

@implementation XTFURLRequest

+ (NSString *)create:(NSString *)URLString timeout:(NSInteger)timeout cachePolicy:(NSInteger)cachePolicy {
    NSMutableURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:URLString]
                                                    cachePolicy:cachePolicy
                                                timeoutInterval:timeout].mutableCopy;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:request];
    managedObject.objectThreadSafe = YES;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (void)xtr_setHTTPMethod:(NSString *)value objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]]) {
        request.HTTPMethod = value;
    }
}

+ (void)xtr_setHTTPHeaderValue:(NSString *)headedValue headerKey:(NSString *)headerKey objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]]) {
        [request setValue:headedValue forHTTPHeaderField:headerKey];
    }
}

+ (void)xtr_setHTTPBodyFromString:(NSString *)stringValue objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]]) {
        request.HTTPBody = [stringValue dataUsingEncoding:NSUTF8StringEncoding];
    }
}

+ (void)xtr_setHTTPBodyFromData:(NSString *)dataRef objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    NSData *data = [XTMemoryManager find:dataRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]] && [data isKindOfClass:[NSData class]]) {
        request.HTTPBody = data;
    }
}

+ (void)xtr_setHTTPShouldHandleCookies:(BOOL)value objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]]) {
        request.HTTPShouldHandleCookies = value;
    }
}

+ (void)xtr_setHTTPShouldUsePipelining:(BOOL)value objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]]) {
        request.HTTPShouldUsePipelining = value;
    }
}

+ (void)xtr_setAllowsCellularAccess:(BOOL)value objectRef:(NSString *)objectRef {
    NSMutableURLRequest *request = [XTMemoryManager find:objectRef];
    if ([request isKindOfClass:[NSMutableURLRequest class]]) {
        request.allowsCellularAccess = value;
    }
}

@end
