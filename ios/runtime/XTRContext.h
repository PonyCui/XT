//
//  XTRContext.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <JavaScriptCore/JavaScriptCore.h>
#import "XTRObjectRefs.h"

@class XTRBridge;

typedef void (^JSValueAsynchronousResult)(JSValue * _Nullable value);

@interface XTRContext : JSContext

@property (nonatomic, weak) XTRBridge * _Nullable bridge;
@property (nonatomic, strong) XTRObjectRefs * _Nonnull objectRefs;

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
