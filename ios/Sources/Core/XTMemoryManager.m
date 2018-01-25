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
    context[@"_XTRetain"] = ^(NSString *objectUUID){
        [XTMemoryManager retain:objectUUID];
    };
    context[@"_XTRelease"] = ^(NSString *objectUUID){
        [XTMemoryManager release:objectUUID];
    };
}

+ (void)add:(XTManagedObject *)managedObject {
    NSMutableDictionary *objectMapping = [(([XTMemoryManager sharedManager].objectMapping) ?: @{}) mutableCopy];
    objectMapping[managedObject.objectUUID] = managedObject;
    [XTMemoryManager sharedManager].objectMapping = objectMapping;
}

+ (void)retain:(NSString *)objectUUID {
    [XTMemoryManager sharedManager].objectMapping[objectUUID].xtRetainCount++;
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

@end
