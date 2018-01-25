//
//  XTUIApplication.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIApplication.h"
#import "XTUIUtils.h"
#import "XTContext.h"
#import "XTUIContext.h"
#import "XTUIViewController.h"
#import "XTUIWindow.h"
#import "XTMemoryManager.h"

@interface XTUIApplication ()

@property (nonatomic, weak) XTContext *context;

@end

@implementation XTUIApplication

+ (NSString *)create:(NSString *)delegateRef {
    XTUIApplication *app = [XTUIApplication new];
    app.context = (id)[JSContext currentContext];
    XTUIApplicationDelegate *delegate = [XTMemoryManager find:delegateRef];
    if ([delegate isKindOfClass:[XTUIApplicationDelegate class]]) {
        app.delegate = delegate;
    }
    if ([app.context isKindOfClass:[XTUIContext class]]) {
        [(XTUIContext *)app.context setApplication:app];
    }
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:app];
    app.objectUUID = managedObject.objectUUID;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"_XTUIApplication";
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUIApplication dealloc.");
#endif
}

+ (NSString *)xtr_keyWindow:(NSString *)objectRef {
    XTUIApplication *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIApplication class]] && [obj.context isKindOfClass:[XTUIContext class]]) {
        XTUIWindow *keyWindow = (id)[(XTUIContext *)obj.context application].delegate.window;
        if ([keyWindow isKindOfClass:[XTUIWindow class]]) {
            return keyWindow.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_exit:(NSString *)objectRef {
    XTUIApplication *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIApplication class]] && [obj.context isKindOfClass:[XTUIContext class]]) {
//        XTUIViewController *keyViewController = [(XTUIContext *)obj.context keyViewController];
//        if ([keyViewController isKindOfClass:[XTUIViewController class]] && keyViewController.exitAction) {
//            keyViewController.exitAction(keyViewController);
//        }
    }
    
}

@end
