//
//  FOOPlugin.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "FOOPlugin.h"

@implementation FOOPlugin

- (instancetype)initWithJSContext:(JSContext *)context {
    self = [super init];
    if (self) {
        context[@"FOOPlugin"] = self;
    }
    return self;
}

- (NSString *)sayHello {
    return @"FOO >>> Hello, World!";
}

@end
