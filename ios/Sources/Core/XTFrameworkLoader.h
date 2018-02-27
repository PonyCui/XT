//
//  XTFrameworkLoader.h
//  XTSample
//
//  Created by 崔明辉 on 2018/2/27.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@class XTContext;

@interface XTFrameworkLoader : NSObject

+ (void)loadFrameworks:(NSString *)evalCode context:(XTContext *)context;

@end
