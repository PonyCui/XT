//
//  XTRObjectRefs.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/16.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRObjectRefs.h"
#import <objc/runtime.h>

@interface XTRWeakRef: NSObject

@property (nonatomic, weak) id<XTRComponent> value;
@property (nonatomic, strong) id<XTRComponent> strongValue;

@end

@implementation XTRWeakRef

@end

@interface XTRObjectRefs ()

@property (nonatomic, copy) NSDictionary<NSString *, XTRWeakRef *> *store;

@end

@implementation XTRObjectRefs

- (void)store:(id<XTRComponent>)object {
    if (object.objectUUID != nil) {
        NSMutableDictionary *mutableStore = [(self.store ?: @{}) mutableCopy];
        XTRWeakRef *ref = [XTRWeakRef new];
        ref.value = object;
        [mutableStore setObject:ref forKey:object.objectUUID];
        [self runGC: mutableStore];
        self.store = mutableStore;
    }
}

- (void)retain:(id<XTRComponent>)object {
    if (object.objectUUID != nil) {
        NSMutableDictionary *mutableStore = [(self.store ?: @{}) mutableCopy];
        XTRWeakRef *ref = [XTRWeakRef new];
        ref.strongValue = object;
        [mutableStore setObject:ref forKey:object.objectUUID];
        self.store = mutableStore;
    }
}

- (id<XTRComponent>)restore:(NSString *)objectUUID {
    return self.store[objectUUID].strongValue ?: self.store[objectUUID].value;
}

- (void)addOwner:(JSValue *)child owner:(JSValue *)owner {
    static int ownerTag;
    if ([child isKindOfClass:[JSValue class]] && [child[@"nativeObjectRef"] isKindOfClass:[JSValue class]] &&
        [owner isKindOfClass:[JSValue class]] && [owner[@"nativeObjectRef"] isKindOfClass:[JSValue class]]) {
        NSString *childRef = [child[@"nativeObjectRef"] toString];
        NSString *ownerRef = [owner[@"nativeObjectRef"] toString];
        if (childRef != nil && ownerRef != nil) {
            id childObject = [self restore:childRef];
            id ownerObject = [self restore:ownerRef];
            if (childObject != nil && ownerObject != nil) {
                objc_setAssociatedObject(ownerObject, &ownerTag, childObject, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
            }
        }
    }
}

- (void)runGC:(NSMutableDictionary *)mutable {
    if (arc4random() % 10 < 2) {
        NSDictionary<NSString *, XTRWeakRef *> *copy = [mutable copy];
        for (NSString *aKey in copy) {
            if (copy[aKey].strongValue == nil && copy[aKey].value == nil) {
                [mutable removeObjectForKey:aKey];
            }
        }
    }
}

@end
