//
//  FooView.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/13.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "FooView.h"
#import "XTUIExtView.h"

@implementation FooView

- (void)setFooColor:(NSString *)fooColor {
    _fooColor = fooColor;
    if ([fooColor isEqualToString:@"gray"]) {
        self.backgroundColor = [UIColor grayColor];
    }
    else if ([fooColor isEqualToString:@"green"]) {
        self.backgroundColor = [UIColor greenColor];
    }
}

@end
