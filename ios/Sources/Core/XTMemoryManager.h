//
//  XTMemoryManager.h
//  XTMem
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTManagedObject.h"

@interface XTMemoryManager : NSObject

+ (XTMemoryManager *)sharedManager;

+ (void)attachContext:(JSContext *)context;

+ (void)add:(XTManagedObject *)managedObject;

+ (void)retain:(NSString *)objectUUID owner:(NSString *)ownerUUID;

+ (void)release:(NSString *)objectUUID;

+ (id)find:(NSString *)objectUUID;

+ (void)runGC:(BOOL)force;

@end
