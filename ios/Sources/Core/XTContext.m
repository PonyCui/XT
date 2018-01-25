//
//  XTRContext.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTContext ()

@end

@implementation XTContext

#ifdef LOGDEALLOC
- (void)dealloc {
    NSLog(@"XTRContext dealloc.");
}
#endif

- (instancetype)init
{
    self = [super init];
    if (self) {
        [XTMemoryManager attachContext:self];
        [self setExceptionHandler:^(JSContext *context, JSValue *exception) {
            NSLog(@"%@", [exception toString]);
        }];
    }
    return self;
}

@end
