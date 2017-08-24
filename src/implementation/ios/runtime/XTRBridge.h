//
//  XTRBridge.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRApplicationDelegate.h"

@interface XTRBridge : NSObject

+ (void)setGlobalBridgeScript:(NSString *)globalBridgeScript;

@property (nonatomic, copy) NSArray<Class> *components;

- (instancetype)initWithAppDelegate:(XTRApplicationDelegate *)appDelegate;

@end
