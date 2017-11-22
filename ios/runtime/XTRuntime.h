//
//  XTRuntime.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRBridge.h"
#import "XTRCustomView.h"

typedef void(^XTRuntimeCompletionBlock)(void);
typedef void(^XTRuntimeFailureBlock)(NSError *error);

@interface XTRuntime : NSObject<UINavigationControllerDelegate>

+ (NSString *)version;

+ (void)startWithNamed:(NSString *)name
              inBundle:(NSBundle *)bundle
  navigationController:(UINavigationController *)navigationController;

+ (void)startWithURLString:(NSString *)URLString
      navigationController:(UINavigationController *)navigationController
           completionBlock:(XTRuntimeCompletionBlock)completionBlock
              failureBlock:(XTRBridgeFailureBlock)failureBlock;

+ (void)retainDelegate:(XTRApplicationDelegate *)delegate;

@end
