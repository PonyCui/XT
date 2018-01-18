//
//  XTRApplication.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRApplication.h"
#import "XTRUtils.h"
#import "XTRContext.h"
#import "XTRBridge.h"
#import "XTRViewController.h"
#import "XTRWindow.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRApplication ()

@property (nonatomic, weak) XTRContext *context;

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
    if ([obj isKindOfClass:[XTRApplication class]]) {
        XTRWindow *keyWindow = (id)obj.context.bridge.keyWindow;
        if ([keyWindow isKindOfClass:[XTRWindow class]]) {
            return keyWindow.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_exit:(NSString *)objectRef {
    XTRApplication *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRApplication class]]) {
        XTRViewController *keyViewController = obj.context.bridge.keyViewController;
        if ([keyViewController isKindOfClass:[XTRViewController class]] && keyViewController.exitAction) {
            keyViewController.exitAction(keyViewController);
        }
    }
    
}

@end
