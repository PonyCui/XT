//
//  XTRDevice.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRDevice.h"
#import "XTCore.h"
#import "XTContext.h"

@implementation XTRDevice

+ (NSString *)name {
    return @"XTRDevice";
}

+ (NSString *)xtr_name {
    return [UIDevice currentDevice].name;
}

+ (NSString *)xtr_systemName {
    return [UIDevice currentDevice].systemName;
}

+ (NSString *)xtr_systemVersion {
    return [UIDevice currentDevice].systemVersion;
}

+ (NSString *)xtr_xtRuntimeVersion {
    return [XTCore version];
}

+ (NSString *)xtr_model {
    return [UIDevice currentDevice].model;
}

+ (NSInteger)xtr_orientation {
    return [UIDevice currentDevice].orientation;
}

@end
