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

- (instancetype _Nonnull )initWithThread:(NSThread *_Nonnull)thread;

@end

@interface JSValue (XTRContext)

- (nullable JSValue *)xtr_invokeMethod:(NSString *_Nonnull)method
                         withArguments:(NSArray *_Nonnull)arguments;

- (nullable JSValue *)xtr_invokeMethod:(NSString *_Nonnull)method
                         withArguments:(NSArray *_Nonnull)arguments
                           asyncResult:(nullable JSValueAsynchronousResult)asyncResult;

- (nullable JSValue *)xtr_callWithArguments:(nonnull NSArray *)arguments;

- (nullable JSValue *)xtr_callWithArguments:(nonnull NSArray *)arguments
                                asyncResult:(nullable JSValueAsynchronousResult)asyncResult;

@end
