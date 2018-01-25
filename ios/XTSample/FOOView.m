//
//  FOOView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/26.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "FOOView.h"
#import "XTUICustomView.h"

@interface FOOView()<XTUICustomViewProtocol>

@end

@implementation FOOView

+ (void)load {
    [XTUICustomView registerClass:[self class] className:@"FOOView"];
}

- (id)onMessage:(JSValue *)value customView:(XTUICustomView *)customView {
    NSDictionary *params = [value toDictionary];
    if (params) {
        if ([params[@"on"] isKindOfClass:[NSNumber class]]) {
            [self setOn:[params[@"on"] boolValue] animated:YES];
            JSValue *ackResult = [customView emitMessage:@{@"alpha": [params[@"on"] boolValue] ? @(0.5) : @(1.0)}];
            NSLog(@"%@", ackResult.toString);
            return @"Hello, World";
        }
    }
    return nil;
}

@end
