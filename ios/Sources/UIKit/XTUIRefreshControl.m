//
//  XTUIRefreshControl.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/1.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIRefreshControl.h"
#import "XTMemoryManager.h"
#import "XTUIUtils.h"

@interface XTUIRefreshControl()

@property (nonatomic, weak) JSContext *context;

@end

@implementation XTUIRefreshControl

+ (NSString *)create {
    XTUIRefreshControl *view = [[self alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"_XTUIRefreshControl";
}

+ (BOOL)xtr_enabled:(NSString *)objectRef {
    XTUIRefreshControl *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIRefreshControl class]]) {
        return view.enabled;
    }
    return NO;
}

+ (void)xtr_setEnabled:(BOOL)value objectRef:(NSString *)objectRef {
    XTUIRefreshControl *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIRefreshControl class]]) {
        view.enabled = value;
    }
}

+ (NSDictionary *)xtr_color:(NSString *)objectRef {
    XTUIRefreshControl *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIRefreshControl class]]) {
        return [JSValue fromColor:obj.tintColor];
    }
    return @{};
}

+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef {
    XTUIRefreshControl *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIRefreshControl class]]) {
        obj.tintColor = [color toColor];
    }
}

+ (void)xtr_endRefreshing:(NSString *)objectRef {
    XTUIRefreshControl *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIRefreshControl class]]) {
        [view endRefreshing];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self addTarget:self action:@selector(onRefresh) forControlEvents:UIControlEventValueChanged];
    }
    return self;
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)onRefresh {
    if ([self scriptObject] != nil) {
        [[self scriptObject] invokeMethod:@"handleRefresh" withArguments:@[]];
    }
}

@end
