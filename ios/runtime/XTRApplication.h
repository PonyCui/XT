//
//  XTRApplication.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRApplication;

@protocol XTRApplicationExport <JSExport>

@property (nonatomic, copy) NSString *objectUUID;
+ (NSString *)create:(JSValue *)scriptObject;
- (JSValue *)xtr_keyWindow;
- (void)xtr_exit;

@end

@interface XTRApplication : NSObject<XTRComponent, XTRApplicationExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
