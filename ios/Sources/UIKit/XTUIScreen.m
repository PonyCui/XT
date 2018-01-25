//
//  XTUIScreen.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIScreen.h"
#import "XTUIUtils.h"

@implementation XTUIScreen

+ (NSString *)name {
    return @"_XTUIScreen";
}

+ (NSDictionary *)xtr_mainScreenBounds {
    return [JSValue fromRect:[UIScreen mainScreen].bounds];
}

+ (CGFloat)xtr_mainScreenScale {
    return [UIScreen mainScreen].scale;
}

@end
