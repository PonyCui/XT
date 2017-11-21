//
//  XTRObjectRefs.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/16.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRObjectRefs.h"

@interface XTRWeakRef: NSObject

@property (nonatomic, weak) id<XTRComponent> value;

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
        self.store = mutableStore;
    }
}

- (id<XTRComponent>)restore:(NSString *)objectUUID {
    id strongValue = self.store[objectUUID].value;
    return strongValue;
}

@end
