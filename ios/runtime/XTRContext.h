//
//  XTRContext.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

@class XTRBridge;

typedef void (^JSValueAsynchronousResult)(JSValue * _Nullable value);

@interface XTRContext : JSContext

@property (nonatomic, weak) XTRBridge * _Nullable bridge;

@end
