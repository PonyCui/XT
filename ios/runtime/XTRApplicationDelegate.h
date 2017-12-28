//
//  XTRApplicationDelegate.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRBridge, XTRApplicationDelegate;

@class XTRApplication;

@protocol XTRApplicationDelegateExport <JSExport>

+ (JSValue *)xtr_window:(NSString *)objectRef;
+ (void)xtr_setWindow:(JSValue *)window objectRef:(NSString *)objectRef;

@end

@interface XTRApplicationDelegate : UIResponder<UIApplicationDelegate, XTRComponent, XTRApplicationDelegateExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) XTRBridge *bridge;
@property (strong, nonatomic) UIWindow *window;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
- (void)exit;

@end
