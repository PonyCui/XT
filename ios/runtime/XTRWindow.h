//
//  XTRWindow.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRView.h"
#import "XTComponent.h"

@class XTRWindow, XTContext;

@protocol XTRWindowExport <JSExport>

+ (NSString *)create;
+ (void)xtr_makeKeyAndVisible:(NSString *)objectRef;
+ (NSString *)xtr_rootViewController:(NSString *)objectRef;
+ (void)xtr_setRootViewController:(NSString *)viewControllerRef objectRef:(NSString *)objectRef;
+ (void)xtr_endEditing:(NSString *)objectRef;
+ (NSString *)xtr_firstResponder:(NSString *)objectRef;

@end

@interface XTRWindow : UIWindow<XTComponent, XTRWindowExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) XTContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

+ (void)setCurrentFirstResponder:(id<XTComponent>)argCurrentFirstResponder;

@end
