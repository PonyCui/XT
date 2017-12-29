//
//  XTRCustomView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/26.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRCustomView.h"
#import "XTRUtils.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRCustomView ()

@property (nonatomic, strong) UIView *innerView;

@end

@implementation XTRCustomView

static NSDictionary<NSString *, NSString *> *classMapping;

+ (NSString *)name {
    return @"XTRCustomView";
}

+ (void)registerClass:(Class)viewClass className:(NSString *)className {
    if (viewClass != NULL && NSStringFromClass(viewClass) != nil && className != nil) {
        NSMutableDictionary *mutableClassMapping = [(classMapping ?: @{}) mutableCopy];
        [mutableClassMapping setObject:NSStringFromClass(viewClass) forKey:className];
        classMapping = [mutableClassMapping copy];
    }
}

+ (NSString *)create:(JSValue *)className {
    XTRCustomView *view = [[XTRCustomView alloc] initWithFrame:CGRectZero];
    if ([className toString] != nil && classMapping[className.toString] != nil) {
        Class viewClass = NSClassFromString(classMapping[className.toString]);
        id viewInstane = [viewClass new];
        if ([viewInstane isKindOfClass:[UIView class]]) {
            view.innerView = viewInstane;
            [view addSubview:view.innerView];
        }
    }
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

+ (JSValue *)handleMessage:(JSValue *)value objectRef:(NSString *)objectRef {
    XTRCustomView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRCustomView class]]) {
        if ([view.innerView respondsToSelector:@selector(onMessage:customView:)]) {
            return [JSValue fromObject:[(id<XTRCustomViewProtocol>)view.innerView onMessage:value customView:view]
                               context:view.context];
        }
        return nil;
    }
    return nil;
}

- (JSValue *)emitMessage:(id)value {
    return nil;
}

@end
