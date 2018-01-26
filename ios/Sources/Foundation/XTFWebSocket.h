//
//  XTFWebSocket.h
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/24.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFWebSocket;

@protocol XTFWebSocketExport<JSExport>

+ (NSString *)create:(NSString *)URLString;
+ (void)xtr_sendData:(NSString *)dataRef objectRef:(NSString *)objectRef;
+ (void)xtr_sendString:(NSString *)string objectRef:(NSString *)objectRef;
+ (void)xtr_close:(NSString *)objectRef;

@end

@interface XTFWebSocket : NSObject<XTFWebSocketExport>

@end
