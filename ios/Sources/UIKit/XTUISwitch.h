//
//  XTUISwitch.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUISwitch;

@protocol XTUISwitchExport <JSExport>

+ (NSString *)create;
+ (BOOL)xtr_on:(NSString *)objectRef;
+ (void)xtr_setOn:(BOOL)value animated:(BOOL)animated objectRef:(NSString *)objectRef;

@end

@interface XTUISwitch : XTUIView<XTComponent, XTUISwitchExport>

@end
