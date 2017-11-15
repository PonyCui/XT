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

@interface XTRApplication ()

@property (nonatomic, strong) XTRContext *context;

@end

@implementation XTRApplication

+ (XTRApplication *)create:(JSValue *)scriptObject {
    XTRApplication *app = [XTRApplication new];
    app.objectUUID = [[NSUUID UUID] UUIDString];
    app.context = (XTRContext *)scriptObject.context;
    return app;
}

+ (NSString *)name {
    return @"XTRApplication";
}

- (JSValue *)xtr_keyWindow {
    return [JSValue fromObject:self.context.bridge.keyWindow context:self.context];
}

@end
