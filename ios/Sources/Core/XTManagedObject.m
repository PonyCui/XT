//
//  XTManagedObject.m
//  XTMem
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTManagedObject.h"

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
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [anObject description]; }];
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
