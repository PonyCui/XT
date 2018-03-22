//
//  XTFoundation.m
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/18.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import "XTFoundationContext.h"
#import "XTMemoryManager.h"
#import "XTFURLRequest.h"
#import "XTFURLSession.h"
#import "XTFURLSessionTask.h"
#import "XTFData.h"
#import "XTFURLResponse.h"
#import "XTFUserDefaults.h"
#import "XTFFileManager.h"
#import "XTFNotification.h"
#import "XTFWebSocket.h"
#import "XTFDatabase.h"

@implementation XTFoundationContext

- (void)setup {
    [self loadComponents];
    [self loadScript];
}

- (void)loadComponents {
    self[@"_XTFURLRequest"] = [XTFURLRequest class];
    self[@"_XTFURLResponse"] = [XTFURLResponse class];
    self[@"_XTFURLSession"] = [XTFURLSession class];
    self[@"_XTFURLSessionTask"] = [XTFURLSessionTask class];
    self[@"_XTFData"] = [XTFData class];
    self[@"_XTFUserDefaults"] = [XTFUserDefaults class];
    self[@"_XTFFileManager"] = [XTFFileManager class];
    self[@"_XTFNotification"] = [XTFNotification class];
    self[@"_XTFWebSocket"] = [XTFWebSocket class];
    self[@"_XTFDatabase"] = [XTFDatabase class];
}

- (void)loadScript {
    NSString *path = [[NSBundle mainBundle] pathForResource:@"xt.foundation.ios.min" ofType:@"js"];
    if (path) {
        NSString *script = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
        [self evaluateScript:script];
    }
}

@end
