//
//  XTRDevice.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTRDevice;

@protocol XTRDeviceExport <JSExport>

+ (NSString *)xtr_name;
+ (NSString *)xtr_systemName;
+ (NSString *)xtr_systemVersion;
+ (NSString *)xtr_xtRuntimeVersion;
+ (NSString *)xtr_model;
+ (NSInteger)xtr_orientation;

@end

@interface XTRDevice : NSObject<XTComponent, XTRDeviceExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
