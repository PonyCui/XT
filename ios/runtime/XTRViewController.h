//
//  XTRViewController.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTRViewController;

@protocol XTRViewControllerExport <JSExport>

+ (NSString *)create;
+ (NSString *)xtr_view:(NSString *)objectRef;
+ (void)xtr_setView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_safeAreaInsets:(NSString *)objectRef;
+ (NSString *)xtr_parentViewController:(NSString *)objectRef;
+ (NSArray<NSString *> *)xtr_childViewControllers:(NSString *)objectRef;
+ (void)xtr_addChildViewController:(NSString *)childControllerRef objectRef:(NSString *)objectRef;
+ (void)xtr_removeFromParentViewController:(NSString *)objectRef;
+ (NSString *)xtr_navigationController:(NSString *)objectRef;
+ (NSString *)xtr_navigationBar:(NSString *)objectRef;
+ (void)xtr_setNavigationBar:(NSString *)barRef objectRef:(NSString *)objectRef;
+ (void)xtr_showNavigationBar:(BOOL)animated objectRef:(NSString *)objectRef;
+ (void)xtr_hideNavigationBar:(BOOL)animated objectRef:(NSString *)objectRef;

@end

typedef void(^XTRViewControllerExitAction)(XTRViewController *keyViewController);

@interface XTRViewController : UIViewController<XTComponent, XTRViewControllerExport>

@property (nonatomic, assign) BOOL shouldRestoreNavigationBar;
@property (nonatomic, copy) XTRViewControllerExitAction exitAction;
@property (nonatomic, copy) NSString *objectUUID;

#pragma mark - Private Props & Methods

@property (nonatomic, assign) BOOL navigationBarLightContent;

@end
