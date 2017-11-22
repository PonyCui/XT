//
//  XTRContext.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRContext.h"

@interface XTRContext ()

@property (nonatomic, strong) NSThread *thread;

@end

@implementation XTRContext

- (instancetype)initWithThread:(NSThread *)thread
{
    self = [super init];
    if (self) {
        _thread = thread;
        _objectRefs = [XTRObjectRefs new];
        __weak XTRContext *welf = self;
        self[@"xtrRequestNativeObject"] = ^(NSString *objectUUID){
            return [welf.objectRefs restore:objectUUID];
        };
        self[@"xtrAddOwner"] = ^(JSValue *child, JSValue *owner){
            [welf.objectRefs addOwner:child owner:owner];
        };
        [self setExceptionHandler:^(JSContext *context, JSValue *exception) {
            NSLog(@"%@", [exception toString]);
        }];
    }
    return self;
}

@end

@implementation JSValue (XTRContext)

- (JSValue *)xtr_invokeMethod:(NSString *)method withArguments:(NSArray *)arguments {
    return [self xtr_invokeMethod:method withArguments:arguments asyncResult:nil];
}

- (JSValue *)xtr_invokeMethod:(NSString *)method withArguments:(NSArray *)arguments asyncResult:(JSValueAsynchronousResult)asyncResult {
    if ([self.context isKindOfClass:[XTRContext class]]) {
        if ([(XTRContext *)self.context thread] == [NSThread currentThread]) {
            JSValue *returnValue = [self invokeMethod:method withArguments:arguments];
            if (asyncResult) {
                asyncResult(returnValue);
            }
            return returnValue;
        }
        else {
            if (asyncResult) {
                [self performSelector:@selector(xtr_callWithArguments:)
                             onThread:[(XTRContext *)self.context thread]
                           withObject:@{
                                        @"arguments": arguments ?: @[],
                                        @"asyncResult": asyncResult,
                                        }
                        waitUntilDone:NO];
            }
            else {
                [self performSelector:@selector(xtr_callWithArguments:)
                             onThread:[(XTRContext *)self.context thread]
                           withObject:@{
                                        @"arguments": arguments ?: @[],
                                        }
                        waitUntilDone:NO];
            }
            return nil;
        }
    }
    else {
        JSValue *returnValue = [self invokeMethod:method withArguments:arguments];
        if (asyncResult) {
            asyncResult(returnValue);
        }
        return returnValue;
    }
}

- (JSValue *)xtr_callWithArguments:(NSArray *)arguments {
    if ([arguments isKindOfClass:[NSDictionary class]]) {
        NSDictionary *dict = (id)arguments;
        return [self xtr_callWithArguments:dict[@"arguments"] asyncResult:dict[@"asyncResult"]];
    }
    return [self xtr_callWithArguments:arguments asyncResult:nil];
}

- (JSValue *)xtr_callWithArguments:(NSArray *)arguments asyncResult:(JSValueAsynchronousResult)asyncResult {
    if ([self.context isKindOfClass:[XTRContext class]]) {
        if ([(XTRContext *)self.context thread] == [NSThread currentThread]) {
            JSValue *returnValue = [self callWithArguments:arguments];
            if (asyncResult) {
                asyncResult(returnValue);
            }
            return returnValue;
        }
        else {
            if (asyncResult) {
                [self performSelector:@selector(xtr_callWithArguments:)
                             onThread:[(XTRContext *)self.context thread]
                           withObject:@{
                                        @"arguments": arguments ?: @[],
                                        @"asyncResult": asyncResult,
                                        }
                        waitUntilDone:NO];
            }
            else {
                [self performSelector:@selector(xtr_callWithArguments:)
                             onThread:[(XTRContext *)self.context thread]
                           withObject:@{
                                        @"arguments": arguments ?: @[],
                                        }
                        waitUntilDone:NO];
            }
            return nil;
        }
    }
    else {
        JSValue *returnValue = [self callWithArguments:arguments];
        if (asyncResult) {
            asyncResult(returnValue);
        }
        return returnValue;
    }
}

@end
