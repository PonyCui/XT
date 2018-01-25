//
//  XTRDebug.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/19.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTDebug.h"
#import "XTContext.h"
#import "XTUIContext.h"
#import <SocketRocket/SRWebSocket.h>

@interface XTDebug ()<SRWebSocketDelegate>

@property (nonatomic, strong) NSURL *sourceURL;
@property (nonatomic, strong) SRWebSocket *socket;

@end

@implementation XTDebug

+ (NSString *)name {
    return @"XTRDebug";
}

+ (XTDebug *)sharedDebugger {
    static XTDebug *debuger;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        debuger = [XTDebug new];
    });
    return debuger;
}

- (void)connectWithIP:(NSString *)IP port:(NSInteger)port {
    NSString *URLString = [NSString stringWithFormat:@"ws://%@:%ld", IP, (long)port];
    if (self.socket != nil) {
        [self.socket close];
    }
    self.socket = [[SRWebSocket alloc] initWithURLRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:URLString]]];
    self.socket.delegate = self;
    [self.socket open];
}

- (void)sendLog:(NSString *)string {
    
}

+ (void)xtr_breakpoint:(NSString *)bpIdentifier {
//    NSCondition *condition = [NSCondition new];
//    __block BOOL lock = YES;
//    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
//        [condition lock];
//        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(30.0 * NSEC_PER_SEC)), dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{
//            lock = NO;
//            [condition signal];
//            [condition unlock];
//        });
//    });
//    while (lock) {
//        [condition wait];
//    }
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    [webSocket send:@"Hello, World!"];
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    if ([message isKindOfClass:[NSString class]]) {
        NSDictionary *obj = [NSJSONSerialization JSONObjectWithData:[message dataUsingEncoding:NSUTF8StringEncoding] options:kNilOptions error:NULL];
        if ([obj isKindOfClass:[NSDictionary class]] && [obj[@"action"] isKindOfClass:[NSString class]]) {
            if ([obj[@"action"] isEqualToString:@"reload"]) {
                [self handleReload:obj];
            }
        }
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        self.socket = [[SRWebSocket alloc] initWithURL:[webSocket url]];
        self.socket.delegate = self;
        [self.socket open];
    });
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.0 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        self.socket = [[SRWebSocket alloc] initWithURL:[webSocket url]];
        self.socket.delegate = self;
        [self.socket open];
    });
}

- (void)handleReload:(NSDictionary *)obj {
    if ([obj[@"source"] isKindOfClass:[NSString class]]) {
        NSData *sourceData = [[NSData alloc] initWithBase64EncodedString:obj[@"source"] options:kNilOptions];
        if (sourceData != nil) {
            NSString *tmpPath = [NSString stringWithFormat:@"%@/%u.min.js", NSTemporaryDirectory(), arc4random()];
            [sourceData writeToFile:tmpPath atomically:YES];
            self.sourceURL = [NSURL fileURLWithPath:tmpPath];
            [XTUIContext reloadDebugging];
        }
    }
}

@end
