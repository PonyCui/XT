//
//  XTRApplicationDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRApplicationDelegate.h"
#import "XTUIContext.h"
#import "XTRUtils.h"
#import "XTContext.h"
#import "XTUIContext.h"
#import "XTRWindow.h"
#import "XTMemoryManager.h"

@interface XTUIContext (Private)

+ (XTRApplicationDelegate *)requestDelegateWithObjectUUID:(NSString *)objectUUID;

@end

@interface XTRApplicationDelegate()

@end

@implementation XTRApplicationDelegate

+ (NSString *)name {
    return @"XTRApplicationDelegate";
}

+ (XTRApplicationDelegate *)xtr_delegate:(NSString *)objectUUID {
    return [XTUIContext requestDelegateWithObjectUUID:objectUUID];
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRApplicationDelegate dealloc.");
#endif
}

- (void)didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    if (self.bridge != nil) {
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:self];
        [XTMemoryManager add:managedObject];
        [XTMemoryManager retain:managedObject.objectUUID];
        self.objectUUID = managedObject.objectUUID;
        JSValue *scriptObject = [self.bridge evaluateScript:@"window._xtrDelegate"];
        if (scriptObject != nil) {
            [scriptObject invokeMethod:@"resetNativeObject" withArguments:@[self.objectUUID]];
            [scriptObject invokeMethod:@"applicationDidFinishLaunchingWithOptions" withArguments:@[@"", launchOptions ?: @{}]];
        }
    }
}

+ (NSString *)xtr_window:(NSString *)objectRef {
    XTRApplicationDelegate *delegate = [XTMemoryManager find:objectRef];
    if ([delegate isKindOfClass:[XTRApplicationDelegate class]]) {
        if ([delegate.window isKindOfClass:[XTRWindow class]]) {
            return [(XTRWindow *)delegate.window objectUUID];
        }
    }
    return nil;
}

+ (void)xtr_setWindow:(NSString *)windowRef objectRef:(NSString *)objectRef {
    XTRApplicationDelegate *delegate = [XTMemoryManager find:objectRef];
    XTRWindow *window = [XTMemoryManager find:windowRef];
    if ([delegate isKindOfClass:[XTRApplicationDelegate class]] && [window isKindOfClass:[XTRWindow class]]) {
        delegate.window = window;
    }
}

- (void)exit {
    _bridge = nil;
}

- (void)setBridge:(XTUIContext *)bridge {
    if (_bridge == nil) {
        _bridge = bridge;
    }
}

- (NSString *)objectUUID {
    if (_objectUUID == nil) {
        _objectUUID = [[NSUUID UUID] UUIDString];
    }
    return _objectUUID;
}

@end
