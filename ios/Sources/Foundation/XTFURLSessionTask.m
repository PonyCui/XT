//
//  XTFURLSessionTask.m
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/19.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import "XTFURLSessionTask.h"
#import "XTMemoryManager.h"

@implementation XTFURLSessionTask

+ (void)cancel:(NSString *)objectRef {
    NSURLSessionTask *task = [XTMemoryManager find:objectRef];
    if ([task isKindOfClass:[NSURLSessionTask class]]) {
        [task cancel];
    }
}


+ (void)resume:(NSString *)objectRef {
    NSURLSessionTask *task = [XTMemoryManager find:objectRef];
    if ([task isKindOfClass:[NSURLSessionTask class]]) {
        [task resume];
    }
}

@end
