//
//  XTUIWindow.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTUIView.h"
#import "XTComponent.h"

@class XTUIWindow, XTContext;

@protocol XTUIWindowExport <JSExport>

+ (NSString *)create;
+ (void)xtr_makeKeyAndVisible:(NSString *)objectRef;
+ (NSString *)xtr_rootViewController:(NSString *)objectRef;
+ (void)xtr_setRootViewController:(NSString *)viewControllerRef objectRef:(NSString *)objectRef;
+ (void)xtr_endEditing:(NSString *)objectRef;
+ (NSString *)xtr_firstResponder:(NSString *)objectRef;

@end

@interface XTUIWindow : UIWindow<XTComponent, XTUIWindowExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) XTContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

+ (void)setCurrentFirstResponder:(id<XTComponent>)argCurrentFirstResponder;

@end
