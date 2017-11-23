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

@interface XTRApplication ()

@property (nonatomic, weak) XTRContext *context;

@end

@implementation XTRApplication

+ (NSString *)create:(JSValue *)scriptObject {
    XTRApplication *app = [XTRApplication new];
    app.objectUUID = [[NSUUID UUID] UUIDString];
    app.context = (XTRContext *)scriptObject.context;
    [((XTRContext *)[JSContext currentContext]).objectRefs retain:app];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [app description]; }];
    return app.objectUUID;
}

+ (NSString *)name {
    return @"XTRApplication";
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRApplication dealloc.");
#endif
}

- (JSValue *)xtr_keyWindow {
    return [JSValue fromObject:self.context.bridge.keyWindow context:self.context];
}

- (void)xtr_exit {
    XTRViewController *keyViewController = self.context.bridge.keyViewController;
    if ([keyViewController isKindOfClass:[XTRViewController class]] && keyViewController.exitAction) {
        keyViewController.exitAction(keyViewController);
    }
}

@end
