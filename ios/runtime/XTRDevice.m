//
//  XTRDevice.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRDevice.h"
#import "XTRuntime.h"
#import "XTRContext.h"

@implementation XTRDevice

+ (NSString *)name {
    return @"XTRDevice";
}

+ (NSString *)xtr_current {
    return [XTRDevice new].objectUUID;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.objectUUID = [[NSUUID UUID] UUIDString];
        [((XTRContext *)[JSContext currentContext]).objectRefs store:self];
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [self description]; }];
    }
    return self;
}

- (NSString *)xtr_name {
    return [UIDevice currentDevice].name;
}

- (NSString *)xtr_systemName {
    return [UIDevice currentDevice].systemName;
}

- (NSString *)xtr_systemVersion {
    return [UIDevice currentDevice].systemVersion;
}

- (NSString *)xtr_xtRuntimeVersion {
    return [XTRuntime version];
}

- (NSString *)xtr_model {
    return [UIDevice currentDevice].model;
}

- (NSInteger)xtr_orientation {
    return [UIDevice currentDevice].orientation;
}

@end
