//
//  XTUINavigationBar.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/3.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUINavigationBar, XTUIViewController;

@protocol XTUINavigationBarExport <XTUIViewExport, JSExport>

+ (NSString *)xtr_title:(NSString *)objectRef;
+ (void)xtr_setTitle:(NSString *)title objectRef:(NSString *)objectRef;
+ (BOOL)xtr_lightContent:(NSString *)objectRef;
+ (void)xtr_setLightContent:(BOOL)value objectRef:(NSString *)objectRef;
+ (BOOL)xtr_translucent:(NSString *)objectRef;
+ (void)xtr_setTranslucent:(BOOL)value objectRef:(NSString *)objectRef;
+ (void)xtr_setLeftBarButtonItems:(JSValue *)value objectRef:(NSString *)objectRef;
+ (void)xtr_setRightBarButtonItems:(JSValue *)value objectRef:(NSString *)objectRef;

@end

@interface XTUINavigationBar : XTUIView<XTComponent, XTUINavigationBarExport>

@property (nonatomic, weak) XTUIViewController *viewController;
@property (nonatomic, readonly) UINavigationItem *innerItem;
@property (nonatomic, assign) BOOL shouldShowBackBarButtonItem;
@property (nonatomic, assign) BOOL translucent;
@property (nonatomic, assign) BOOL lightContent;

@end
