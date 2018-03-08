//
//  XTObject.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/7.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTBaseObject.h"
#import "XTMemoryManager.h"

@implementation XTBaseObject

+ (NSString *)name {
    return @"_XTBaseObject";
}

+ (NSString *)create {
    XTBaseObject *obj = [[self alloc] init];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
    [XTMemoryManager add:managedObject];
    obj.context = [JSContext currentContext];
    obj.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)dealloc {
    JSValue *scriptObject = [self scriptObject];
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"dealloc" withArguments:nil];
    }
#ifdef LOGDEALLOC
    NSLog(@"XTBaseObject dealloc.");
#endif
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

@end
