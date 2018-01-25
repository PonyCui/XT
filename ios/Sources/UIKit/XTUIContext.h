//
//  XTUIContext.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTContext.h"
#import "XTUIApplication.h"
#import "XTUIApplicationDelegate.h"

@class XTContext, XTRViewController;

typedef void(^XTUIContextCompletionBlock)(void);
typedef void(^XTUIContextFailureBlock)(NSError * _Nonnull error);

@interface XTUIContext : XTContext

//@property (nonatomic, weak) XTRViewController * _Nullable keyViewController;
//@property (nonatomic, weak) UIWindow * _Nullable keyWindow;
@property (nonatomic, readonly) NSURL * _Nullable sourceURL;
@property (nonatomic, strong) XTUIApplication * _Nullable application;

#pragma mark - Public methods

+ (void)startWithNamed:(nonnull NSString *)name
              inBundle:(nullable NSBundle *)bundle
  navigationController:(nonnull UINavigationController *)navigationController;

+ (void)startWithURLString:(nonnull NSString *)URLString
      navigationController:(nonnull UINavigationController *)navigationController
           completionBlock:(nullable XTUIContextCompletionBlock)completionBlock
              failureBlock:(nullable XTUIContextFailureBlock)failureBlock;

- (instancetype _Nonnull )initWithSourceURL:(nullable NSURL *)sourceURL
                            completionBlock:(nullable XTUIContextCompletionBlock)completionBlock
                               failureBlock:(nullable XTUIContextFailureBlock)failureBlock;


#pragma mark - Debugger

+ (void)debugWithIP:(nonnull NSString *)IP port:(NSInteger)port navigationController:(nonnull UINavigationController *)navigationController;

+ (void)reloadDebugging;

@end
