//
//  XTUICustomView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/26.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUICustomView.h"
#import "XTUIUtils.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTUICustomView ()

@property (nonatomic, strong) UIView *innerView;

@end

@implementation XTUICustomView

static NSDictionary<NSString *, NSString *> *classMapping;

+ (NSString *)name {
    return @"_XTUICustomView";
}

+ (void)registerClass:(Class)viewClass className:(NSString *)className {
    if (viewClass != NULL && NSStringFromClass(viewClass) != nil && className != nil) {
        NSMutableDictionary *mutableClassMapping = [(classMapping ?: @{}) mutableCopy];
        [mutableClassMapping setObject:NSStringFromClass(viewClass) forKey:className];
        classMapping = [mutableClassMapping copy];
    }
}

+ (NSString *)create:(NSString *)className {
    XTUICustomView *view = [[XTUICustomView alloc] initWithFrame:CGRectZero];
    if (className != nil && classMapping[className] != nil) {
        Class viewClass = NSClassFromString(classMapping[className]);
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
    XTUICustomView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUICustomView class]]) {
        if ([view.innerView respondsToSelector:@selector(onMessage:customView:)]) {
            return [JSValue fromObject:[(id<XTUICustomViewProtocol>)view.innerView onMessage:value customView:view]
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
