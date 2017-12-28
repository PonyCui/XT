//
//  XTRWindow.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRView.h"
#import "XTRComponent.h"

@class XTRWindow, XTRContext;

@protocol XTRWindowExport <JSExport>

+ (NSString *)create:(JSValue *)frame;
+ (void)xtr_makeKeyAndVisible:(NSString *)objectRef;
+ (NSString *)xtr_rootViewController:(NSString *)objectRef;
+ (void)xtr_setRootViewController:(NSString *)viewControllerRef objectRef:(NSString *)objectRef;
+ (void)xtr_endEditing:(NSString *)objectRef;

@end

@interface XTRWindow : UIWindow<XTRComponent, XTRWindowExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) XTRContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
