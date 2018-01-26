//
//  XTFURLSessionTask.h
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/19.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTFoundationContext.h"

@class XTFURLSessionTask;

@protocol XTFURLSessionTaskExport<JSExport>

+ (void)resume:(NSString *)objectRef;
+ (void)cancel:(NSString *)objectRef;

@end

@interface XTFURLSessionTask : NSObject<XTFURLSessionTaskExport>

@end
