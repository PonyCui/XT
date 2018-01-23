//
//  XTRSwitch.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRSwitch;

@protocol XTRSwitchExport <JSExport>

+ (NSString *)create;
+ (BOOL)xtr_on:(NSString *)objectRef;
+ (void)xtr_setOn:(BOOL)value animated:(BOOL)animated objectRef:(NSString *)objectRef;

@end

@interface XTRSwitch : XTRView<XTRComponent, XTRSwitchExport>

@end
