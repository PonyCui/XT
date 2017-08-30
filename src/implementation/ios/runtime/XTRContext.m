//
//  XTRContext.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRContext.h"

@interface XTRContext ()

@property (nonatomic, strong) NSOperationQueue *queue;

@end

@implementation XTRContext

- (instancetype)initWithOperationQueue:(NSOperationQueue *)queue
{
    self = [super init];
    if (self) {
        _queue = queue;
    }
    return self;
}

@end

@implementation JSValue (XTRContext)

- (JSValue *)xtr_callWithArguments:(NSArray *)arguments {
    return [self xtr_callWithArguments:arguments asyncResult:nil];
}

- (JSValue *)xtr_callWithArguments:(NSArray *)arguments asyncResult:(JSValueAsynchronousResult)asyncResult {
    if ([self.context isKindOfClass:[XTRContext class]]) {
        if ([(XTRContext *)self.context queue] == [NSOperationQueue mainQueue] && [NSThread isMainThread]) {
            return [self callWithArguments:arguments];
        }
        else {
            [[(XTRContext *)self.context queue] addOperationWithBlock:^{
                if (asyncResult) {
                    asyncResult([self callWithArguments:arguments]);
                }
            }];
            return nil;
        }
    }
    else {
        return [self callWithArguments:arguments];
    }
}

@end
