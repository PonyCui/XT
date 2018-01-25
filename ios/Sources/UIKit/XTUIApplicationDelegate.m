//
//  XTUIApplicationDelegate.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIApplicationDelegate.h"
#import "XTUIContext.h"
#import "XTUIUtils.h"
#import "XTUIWindow.h"
#import "XTMemoryManager.h"

@interface XTUIApplicationDelegate()

@property (nonatomic, weak) XTContext *context;

@end

@implementation XTUIApplicationDelegate

+ (NSString *)name {
    return @"_XTUIApplicationDelegate";
}

+ (NSString *)create {
    XTUIApplicationDelegate *delegate = [XTUIApplicationDelegate new];
    delegate.context = (id)[JSContext currentContext];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:delegate];
    delegate.objectUUID = managedObject.objectUUID;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUIApplicationDelegate dealloc.");
#endif
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    JSValue *scriptObject = [self scriptObject];
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"applicationDidFinishLaunchingWithOptions" withArguments:@[@"", launchOptions ?: @{}]];
    }
}

+ (NSString *)xtr_window:(NSString *)objectRef {
    XTUIApplicationDelegate *delegate = [XTMemoryManager find:objectRef];
    if ([delegate isKindOfClass:[XTUIApplicationDelegate class]]) {
        if ([delegate.window isKindOfClass:[XTUIWindow class]]) {
            return [(XTUIWindow *)delegate.window objectUUID];
        }
    }
    return nil;
}

+ (void)xtr_setWindow:(NSString *)windowRef objectRef:(NSString *)objectRef {
    XTUIApplicationDelegate *delegate = [XTMemoryManager find:objectRef];
    XTUIWindow *window = [XTMemoryManager find:windowRef];
    if ([delegate isKindOfClass:[XTUIApplicationDelegate class]] && [window isKindOfClass:[XTUIWindow class]]) {
        delegate.window = window;
    }
}

- (NSString *)objectUUID {
    if (_objectUUID == nil) {
        _objectUUID = [[NSUUID UUID] UUIDString];
    }
    return _objectUUID;
}

@end
