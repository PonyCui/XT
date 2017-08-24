//
//  XTRApplicationDelegate.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRBridge;

@class XTRApplication;

@protocol XTRApplicationDelegateExport <JSExport>

+ (void)attachDelegate:(JSValue *)delegate;

@end

@interface XTRApplicationDelegate : UIResponder<UIApplicationDelegate, XTRComponent, XTRApplicationDelegateExport>

@property (readonly) XTRBridge *bridge;
@property (strong, nonatomic) UIWindow *window;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;

@end
