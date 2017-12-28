//
//  XTRViewController.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRViewController;

@protocol XTRViewControllerExport <JSExport>

+ (NSString *)create:(JSValue *)scriptObject;
+ (NSString *)xtr_view:(NSString *)objectRef;
+ (void)xtr_setView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (NSString *)xtr_parentViewController:(NSString *)objectRef;
+ (NSArray<NSString *> *)xtr_childViewControllers:(NSString *)objectRef;
+ (void)xtr_addChildViewController:(NSString *)childControllerRef objectRef:(NSString *)objectRef;
+ (void)xtr_removeFromParentViewController:(NSString *)objectRef;
+ (NSString *)xtr_navigationController:(NSString *)objectRef;

@end

typedef void(^XTRViewControllerExitAction)(XTRViewController *keyViewController);

@interface XTRViewController : UIViewController<XTRComponent, XTRViewControllerExport>

@property (nonatomic, assign) BOOL shouldRestoreNavigationBar;
@property (nonatomic, copy) XTRViewControllerExitAction exitAction;
@property (nonatomic, copy) NSString *objectUUID;

@end
