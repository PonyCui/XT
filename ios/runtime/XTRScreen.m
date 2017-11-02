//
//  XTRScreen.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRScreen.h"
#import "XTRUtils.h"

@implementation XTRScreen

+ (NSString *)name {
    return @"XTRScreen";
}

+ (NSDictionary *)xtr_mainScreenBounds {
    return [JSValue fromRect:[UIScreen mainScreen].bounds];
}

+ (CGFloat)xtr_mainScreenScale {
    return [UIScreen mainScreen].scale;
}

@end
