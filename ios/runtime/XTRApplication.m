//
//  XTRApplication.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRApplication.h"
#import "XTRUtils.h"
#import "XTContext.h"
#import "XTUIContext.h"
#import "XTRViewController.h"
#import "XTRWindow.h"
#import "XTMemoryManager.h"

@interface XTRApplication ()

@property (nonatomic, weak) XTContext *context;

@end

@implementation XTRApplication

+ (NSString *)create {
    XTRApplication *app = [XTRApplication new];
    app.context = (id)[JSContext currentContext];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:app];
    [XTMemoryManager add:managedObject];
    [XTMemoryManager retain:managedObject.objectUUID];
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"XTRApplication";
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRApplication dealloc.");
#endif
}

+ (NSString *)xtr_keyWindow:(NSString *)objectRef {
    XTRApplication *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRApplication class]] && [obj.context isKindOfClass:[XTUIContext class]]) {
        XTRWindow *keyWindow = (id)[(XTUIContext *)obj.context keyWindow];
        if ([keyWindow isKindOfClass:[XTRWindow class]]) {
            return keyWindow.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_exit:(NSString *)objectRef {
    XTRApplication *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRApplication class]] && [obj.context isKindOfClass:[XTUIContext class]]) {
        XTRViewController *keyViewController = [(XTUIContext *)obj.context keyViewController];
        if ([keyViewController isKindOfClass:[XTRViewController class]] && keyViewController.exitAction) {
            keyViewController.exitAction(keyViewController);
        }
    }
    
}

@end
