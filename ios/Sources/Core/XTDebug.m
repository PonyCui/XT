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
@property (nonatomic, assign) BOOL breakpointLocking;
@property (nonatomic, assign) BOOL breakpointStepping;

@end

@implementation XTDebug

+ (NSString *)name {
    return @"_XTDebug";
}

+ (XTDebug *)sharedDebugger {
    static XTDebug *debuger;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        debuger = [XTDebug new];
    });
    return debuger;
}

+ (void)debugWithIP:(NSString *)IP port:(NSInteger)port navigationController:(UINavigationController *)navigationController {
    [[XTDebug sharedDebugger] connectWithIP:IP port:port];
    [UIApplication sharedApplication].networkActivityIndicatorVisible = YES;
}

+ (void)xtr_break:(NSString *)bpIdentifier T:(NSString *)T S:(NSString *)S {
    [[XTDebug sharedDebugger] handleBreak:bpIdentifier T:T S:S];
}

+ (void)xtr_wait {
    [NSThread sleepForTimeInterval:0.1];
}

+ (BOOL)xtr_locking {
    return [XTDebug sharedDebugger].breakpointLocking;
}

+ (BOOL)xtr_stepping {
    return [XTDebug sharedDebugger].breakpointStepping;
}

- (void)connectWithIP:(NSString *)IP port:(NSInteger)port {
    NSString *URLString = [NSString stringWithFormat:@"ws://%@:%ld", IP, (long)port];
    if (self.socket != nil) {
        [self.socket close];
    }
    self.socket = [[SRWebSocket alloc] initWithURLRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:URLString]]];
    self.socket.delegate = self;
    [self.socket setDelegateOperationQueue:[NSOperationQueue new]];
    [self.socket open];
}

- (void)sendLog:(NSString *)string isEval:(BOOL)isEval {
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        NSString *currentBpIdentifier = [self.debugContext evaluateScript:@"window.XTDebug.currentBpIdentifier"].toString;
        NSDictionary *obj = @{
                              @"type": @"console.log",
                              @"payload": ([[string dataUsingEncoding:NSUTF8StringEncoding] base64EncodedStringWithOptions:kNilOptions] ?: @""),
                              @"bpIdentifier": isEval ? @"console" : currentBpIdentifier,
                              };
        NSData *data = [NSJSONSerialization dataWithJSONObject:obj options:kNilOptions error:NULL];
        [self.socket send:[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]];
    }];
}

#pragma mark - Breakpoint

- (void)sendBreak:(NSString *)bpIdentifier T:(NSString *)T S:(NSString *)S {
    NSDictionary *obj = @{
                          @"type": @"break",
                          @"bpIdentifier": bpIdentifier ?: @"",
                          @"this": T ?: @"{}",
                          @"scope": S ?: @"{}",
                          };
    NSData *data = [NSJSONSerialization dataWithJSONObject:obj options:kNilOptions error:NULL];
    [self.socket send:[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]];
}

- (void)handleBreak:(NSString *)bpIdentifier T:(NSString *)T S:(NSString *)S {
    [self sendBreak:bpIdentifier T:T S:S];
    self.breakpointLocking = YES;
}

#pragma mark - WebSocket Deleagte

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
            else if ([obj[@"action"] isEqualToString:@"clearBreakPoint"]) {
                [self handleClearBreakPoint:obj];
            }
            else if ([obj[@"action"] isEqualToString:@"clearBreakPoints"]) {
                [self handleClearBreakPoints:obj];
            }
            else if ([obj[@"action"] isEqualToString:@"setBreakPoint"]) {
                [self handleSetBreakPoint:obj];
            }
            else if ([obj[@"action"] isEqualToString:@"continue"]) {
                [self handleContinue];
            }
            else if ([obj[@"action"] isEqualToString:@"stop"]) {
                [self handleStop];
            }
            else if ([obj[@"action"] isEqualToString:@"step"]) {
                [self handleStep];
            }
            else if ([obj[@"action"] isEqualToString:@"eval"]) {
                [self handleEval:obj];
            }
        }
    }
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    self.breakpointLocking = NO;
    self.breakpointStepping = NO;
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

#pragma mark - Message Handler

- (void)handleReload:(NSDictionary *)obj {
    if ([obj[@"source"] isKindOfClass:[NSString class]]) {
        NSData *sourceData = [[NSData alloc] initWithBase64EncodedString:obj[@"source"] options:kNilOptions];
        if (sourceData != nil) {
            NSString *tmpPath = [NSString stringWithFormat:@"%@/%u.min.js", NSTemporaryDirectory(), arc4random()];
            [sourceData writeToFile:tmpPath atomically:YES];
            self.sourceURL = [NSURL fileURLWithPath:tmpPath];
            self.breakpointStepping = NO;
            self.breakpointLocking = NO;
            [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                [self.delegate debuggerDidReload];
            }];
        }
    }
}

- (void)handleClearBreakPoint:(NSDictionary *)obj {
    NSString *bpIdentifier = [NSString stringWithFormat:@"%@:%@", obj[@"path"], obj[@"line"]];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        JSValue *obj = [self.debugContext evaluateScript:@"window.XTDebug"];
        [obj invokeMethod:@"clearBreakpoint" withArguments:@[bpIdentifier]];
    }];
}

- (void)handleClearBreakPoints:(NSDictionary *)obj {
    NSString *path = obj[@"path"] ?: @"";
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        JSValue *obj = [self.debugContext evaluateScript:@"window.XTDebug"];
        [obj invokeMethod:@"clearBreakpoints" withArguments:@[path]];
    }];
}

- (void)handleSetBreakPoint:(NSDictionary *)obj {
    NSString *bpIdentifier = [NSString stringWithFormat:@"%@:%@", obj[@"path"], obj[@"line"]];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        JSValue *obj = [self.debugContext evaluateScript:@"window.XTDebug"];
        [obj invokeMethod:@"setBreakpoint" withArguments:@[bpIdentifier]];
    }];
}

- (void)handleContinue {
    self.breakpointStepping = NO;
    self.breakpointLocking = NO;
}

- (void)handleStep {
    self.breakpointStepping = YES;
    self.breakpointLocking = NO;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        self.breakpointStepping = NO;
    });
}

- (void)handleStop {
    self.breakpointStepping = NO;
    self.breakpointLocking = NO;
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        [self.delegate debuggerDidTerminal];
    }];
}

- (void)handleEval:(NSDictionary *)obj {
    if (![obj[@"expression"] isKindOfClass:[NSString class]]) {
        return;
    }
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        NSString *result = [self.delegate debuggerEval:obj[@"expression"]];
        if ([result isKindOfClass:[NSString class]]) {
            [self sendLog:result isEval:YES];
        }
    }];
}

@end
