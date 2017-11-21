//
//  XTRNavigationController.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"
#import "XTRViewController.h"

@class XTRNavigationController;

@protocol XTRNavigationControllerExport <JSExport>

@property (nonatomic, copy) NSString *objectUUID;
+ (NSString *)create:(JSValue *)scriptObject;
- (void)xtr_setViewControllers:(NSArray<NSDictionary *> *)viewControllers animated:(JSValue *)animated;
- (void)xtr_pushViewController:(JSValue *)viewController animated:(JSValue *)animated;
- (JSValue *)xtr_popViewController:(JSValue *)animated;
- (NSArray<JSValue *> *)xtr_popToViewController:(JSValue *)viewController animated:(JSValue *)animated;
- (NSArray<JSValue *> *)xtr_popToRootViewController:(JSValue *)animated;

@end

@interface XTRNavigationController : UINavigationController<XTRComponent, XTRViewControllerExport, XTRNavigationControllerExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
