//
//  XTRContext.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>

typedef JSValue *_Nullable(^JSValueAsynchronousResult)();

@interface XTRContext : JSContext

- (instancetype _Nonnull )initWithOperationQueue:(NSOperationQueue *_Nonnull)queue;

@end

@interface JSValue (XTRContext)

- (nullable JSValue *)xtr_callWithArguments:(nonnull NSArray *)arguments;
- (nullable JSValue *)xtr_callWithArguments:(nonnull NSArray *)arguments asyncResult:(nullable JSValueAsynchronousResult)asyncResult;

@end
