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

@class XTRWindow;

@protocol XTRWindowExport <JSExport>

@property (nonatomic, copy) NSString *objectUUID;
+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (void)xtr_makeKeyAndVisible;
- (JSValue *)xtr_rootViewController;
- (void)xtr_setRootViewController:(JSValue *)viewController;
- (void)xtr_endEditing;

@end

@interface XTRWindow : UIWindow<XTRComponent, XTRWindowExport, XTRViewExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
