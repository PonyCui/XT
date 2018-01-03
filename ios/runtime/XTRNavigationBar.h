//
//  XTRNavigationBar.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/3.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRNavigationBar, XTRViewController;

@protocol XTRNavigationBarExport <JSExport>

+ (NSString *)create;
+ (NSString *)xtr_title:(NSString *)objectRef;
+ (void)xtr_setTitle:(NSString *)title objectRef:(NSString *)objectRef;
+ (BOOL)xtr_lightContent:(NSString *)objectRef;
+ (void)xtr_setLightContent:(BOOL)value objectRef:(NSString *)objectRef;
+ (BOOL)xtr_translucent:(NSString *)objectRef;
+ (void)xtr_setTranslucent:(BOOL)value objectRef:(NSString *)objectRef;
+ (void)xtr_setLeftBarButtonItems:(JSValue *)value objectRef:(NSString *)objectRef;
+ (void)xtr_setRightBarButtonItems:(JSValue *)value objectRef:(NSString *)objectRef;

@end

@interface XTRNavigationBar : XTRView<XTRComponent, XTRNavigationBarExport>

@property (nonatomic, weak) XTRViewController *viewController;
@property (nonatomic, assign) BOOL shouldShowBackBarButtonItem;
@property (nonatomic, assign) BOOL translucent;
@property (nonatomic, assign) BOOL lightContent;

@end
