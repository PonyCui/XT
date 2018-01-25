//
//  XTRApplicationDelegate.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTUIContext, XTRApplicationDelegate;

@class XTRApplication;

@protocol XTRApplicationDelegateExport <JSExport>

+ (NSString *)xtr_window:(NSString *)objectRef;
+ (void)xtr_setWindow:(NSString *)windowRef objectRef:(NSString *)objectRef;

@end

@interface XTRApplicationDelegate : NSObject<XTComponent, XTRApplicationDelegateExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) XTUIContext *bridge;
@property (strong, nonatomic) UIWindow *window;

- (void)didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
- (void)exit;

@end
