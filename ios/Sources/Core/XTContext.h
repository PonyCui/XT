//
//  XTRContext.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

@interface XTContext : JSContext

+ (void)attachToContext:(XTContext *)context;
- (void)setup;
- (void)terminal;

@end
