//
//  XTFNotification.h
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/21.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFNotification;

@protocol XTFNotificationExport<JSExport>

+ (NSString *)addObserver:(NSString *)name;
+ (void)removeObserver:(NSString *)handler;
+ (void)postNotification:(NSString *)name object:(JSValue *)object userInfo:(JSValue *)userInfo;

@end

@interface XTFNotification : NSObject<XTFNotificationExport>

@end
