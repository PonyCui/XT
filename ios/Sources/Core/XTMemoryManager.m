//
//  XTMemoryManager.m
//  XTMem
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTMemoryManager.h"

@interface XTMemoryManager()

@property (nonatomic, copy) NSDictionary<NSString *, XTManagedObject *> *objectMapping;

@end

@implementation XTMemoryManager

+ (XTMemoryManager *)sharedManager {
    static XTMemoryManager *manager;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        manager = [XTMemoryManager new];
    });
    return manager;
}

+ (void)attachContext:(JSContext *)context {
    context[@"_XTRetain"] = ^(NSString *objectUUID, JSValue *ownerUUID){
        [XTMemoryManager retain:objectUUID owner:ownerUUID.isString ? ownerUUID.toString : nil];
    };
    context[@"_XTRelease"] = ^(NSString *objectUUID){
        [XTMemoryManager release:objectUUID];
    };
}

+ (void)add:(XTManagedObject *)managedObject {
    [self runGC:NO];
    NSMutableDictionary *objectMapping = [(([XTMemoryManager sharedManager].objectMapping) ?: @{}) mutableCopy];
    objectMapping[managedObject.objectUUID] = managedObject;
    [XTMemoryManager sharedManager].objectMapping = objectMapping;
}

+ (void)retain:(NSString *)objectUUID owner:(NSString *)ownerUUID {
    XTManagedObject *managedObject = [XTMemoryManager sharedManager].objectMapping[objectUUID];
    if (managedObject != nil) {
        managedObject.xtRetainCount++;
        id owner = ownerUUID != nil ? [self find:ownerUUID] ?: [JSContext currentContext] : [JSContext currentContext] ;
        if (owner != nil) {
            NSMutableArray *mutableOwners = (managedObject.owners ?: @[]).mutableCopy;
            XTManagedOwner *ownerObject = [XTManagedOwner new];
            ownerObject.owner = owner;
            [mutableOwners addObject:ownerObject];
            managedObject.owners = mutableOwners.copy;
        }
    }
}

+ (void)release:(NSString *)objectUUID {
    [XTMemoryManager sharedManager].objectMapping[objectUUID].xtRetainCount--;
}

+ (id)find:(NSString *)objectUUID {
    XTManagedObject *managedObject = [XTMemoryManager sharedManager].objectMapping[objectUUID];
    if (!managedObject.objectThreadSafe && managedObject.objectThread != [NSThread currentThread]) {
        return nil;
    }
    return [managedObject weakRef];
}

+ (void)runGC:(BOOL)force {
    if (arc4random() % 100 < 2 || force) {
        static NSNumber *syncToken;
        static dispatch_once_t onceToken;
        dispatch_once(&onceToken, ^{
            syncToken = @(0);
        });
        @synchronized (syncToken) {
            NSDictionary *immutable = [XTMemoryManager sharedManager].objectMapping.copy;
            NSMutableDictionary *mutable = [XTMemoryManager sharedManager].objectMapping.mutableCopy;
            [immutable enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, XTManagedObject * _Nonnull obj, BOOL * _Nonnull stop) {
                if (obj.weakRef == nil) {
                    [mutable removeObjectForKey:key];
                }
                else if (obj.owners != nil && obj.owners.count > 0) {
                    BOOL ownersReleased = YES;
                    for (XTManagedOwner *ownerRef in obj.owners) {
                        if (ownerRef.owner != nil) {
                            ownersReleased = NO;
                        }
                    }
                    if (ownersReleased) {
                        [mutable removeObjectForKey:key];
                    }
                }
            }];
            [XTMemoryManager sharedManager].objectMapping = mutable.copy;
        }
    }
}

@end
