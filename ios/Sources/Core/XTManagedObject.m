//
//  XTManagedObject.m
//  XTMem
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTManagedObject.h"

@implementation XTManagedOwner

@end

@interface XTManagedObject()

@property (nonatomic, readwrite) NSString *objectUUID;

@end

@implementation XTManagedObject

- (instancetype)initWithObject:(id)anObject
{
    self = [super init];
    if (self) {
        _weakRef = anObject;
        _objectUUID = [[NSUUID UUID] UUIDString];
        _objectThread = [NSThread currentThread];
        [[NSOperationQueue currentQueue] addOperationWithBlock:^{
            [anObject description];
        }];
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
//            [anObject description];
//        });
    }
    return self;
}

- (void)setXtRetainCount:(NSInteger)xtRetainCount {
    _xtRetainCount = xtRetainCount;
    if (xtRetainCount > 0) {
        self.strongRef = self.weakRef;
    }
    else {
        self.strongRef = nil;
    }
}

@end
