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

+ (XTRApplication *)create:(JSValue *)scriptObject;
- (JSValue *)xtr_keyWindow;

@end

@interface XTRApplication : NSObject<XTRComponent, XTRApplicationExport>

@end
