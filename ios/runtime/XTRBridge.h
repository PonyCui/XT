//
//  XTRBridge.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRApplicationDelegate.h"

@class XTRContext, XTRViewController;

@interface XTRBridge : NSObject

@property (nonatomic, readonly) XTRContext * _Nonnull context;
@property (nonatomic, strong) UIApplication * _Nullable application;
@property (nonatomic, weak) XTRViewController * _Nullable keyViewController;
@property (nonatomic, weak) UIWindow * _Nullable keyWindow;
@property (nonatomic, readonly) NSURL * _Nullable sourceURL;

#pragma mark - Public methods

+ (void)setGlobalBridgeScript:(nullable NSString *)globalBridgeScript;
- (instancetype _Nonnull )initWithAppDelegate:(nonnull XTRApplicationDelegate *)appDelegate;
- (instancetype _Nonnull )initWithAppDelegate:(nonnull XTRApplicationDelegate *)appDelegate sourceURL:(nullable NSURL *)sourceURL;

#pragma mark - Private methods

- (void)reload;
- (void)resetSourceURL:(NSURL *_Nullable)sourceURL;

@end
