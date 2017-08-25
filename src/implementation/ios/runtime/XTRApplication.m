//
//  XTRApplication.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRApplication.h"
#import "XTRUtils.h"

@interface XTRApplication ()

@property (nonatomic, strong) JSContext *context;

@end

@implementation XTRApplication

+ (XTRApplication *)create:(JSValue *)scriptObject {
    XTRApplication *app = [XTRApplication new];
    app.context = scriptObject.context;
    return app;
}

+ (NSString *)name {
    return @"XTRApplication";
}

- (JSValue *)xtr_keyWindow {
    return [JSValue fromView:[UIApplication sharedApplication].keyWindow context:self.context];
}

@end
