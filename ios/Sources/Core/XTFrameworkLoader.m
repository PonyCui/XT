//
//  XTFrameworkLoader.m
//  XTSample
//
//  Created by 崔明辉 on 2018/2/27.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTFrameworkLoader.h"
#import "XTContext.h"

@interface XTContext (FrameworkLoader)

- (instancetype)initWithParentContext:(XTContext *)context;

@end

@implementation XTFrameworkLoader

+ (void)loadFrameworks:(NSString *)evalCode context:(XTContext *)context {
    if ([evalCode containsString:@"NS."]) {
        Class clazz = NSClassFromString(@"XTFoundationContext");
        if (clazz != NULL) {
            [[[clazz alloc] initWithParentContext:context] description];
        }
    }
}

@end
