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

@property (nonatomic, copy) NSString *objectUUID;
+ (XTRViewController *)create:(JSValue *)scriptObject;
- (JSValue *)xtr_view;
- (void)xtr_setView:(JSValue *)view;
- (JSValue *)xtr_parentViewController;
- (NSArray<JSValue *> *)xtr_childViewControllers;
- (void)xtr_addChildViewController:(JSValue *)childController;
- (void)xtr_removeFromParentViewController;
- (JSValue *)xtr_navigationController;

@end

@interface XTRViewController : UIViewController<XTRComponent, XTRViewControllerExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
