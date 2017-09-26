//
//  FOOView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/26.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "FOOView.h"
#import "XTRuntime.h"

@interface FOOView()<XTRCustomViewProtocol>

@end

@implementation FOOView

+ (void)load {
    [XTRCustomView registerClass:[self class] className:@"FOOView"];
}

- (void)onMessage:(JSValue *)value customView:(XTRCustomView *)customView {
    NSDictionary *params = [value toDictionary];
    if (params) {
        if ([params[@"on"] isKindOfClass:[NSNumber class]]) {
            [self setOn:[params[@"on"] boolValue] animated:YES];
            [customView emitMessage:@{@"alpha": [params[@"on"] boolValue] ? @(0.5) : @(1.0)}];
        }
    }
}

@end
