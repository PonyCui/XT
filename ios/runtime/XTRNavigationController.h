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

+ (NSString *)create:(JSValue *)scriptObject;
+ (void)xtr_setViewControllers:(NSArray<NSString *> *)viewControllers animated:(BOOL)animated objectRef:(NSString *)objectRef;
+ (void)xtr_pushViewController:(NSString *)viewControllerRef animated:(BOOL)animated objectRef:(NSString *)objectRef;
+ (NSString *)xtr_popViewController:(BOOL)animated objectRef:(NSString *)objectRef;
+ (NSArray<NSString *> *)xtr_popToViewController:(NSString *)viewControllerRef
                                        animated:(JSValue *)animated
                                       objectRef:(NSString *)objectRef;
+ (NSArray<NSString *> *)xtr_popToRootViewController:(BOOL)animated objectRef:(NSString *)objectRef;

@end

@interface XTRNavigationController : UINavigationController<XTRComponent, XTRNavigationControllerExport>

+ (XTRNavigationController *)clone:(UINavigationController *)navigationController;

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
