//
//  XTFURLSession.h
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/19.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTFoundationContext.h"

@class XTFURLSession, XTFURLSessionTask;

@protocol XTFURLSessionExport<JSExport>

+ (NSString *)dataTaskWithURL:(NSString *)URL completionHandler:(JSValue *)completionHandler;
+ (NSString *)dataTaskWithRequest:(NSString *)reqRef completionHandler:(JSValue *)completionHandler;

@end

@interface XTFURLSession : NSObject<XTFURLSessionExport>

@end
