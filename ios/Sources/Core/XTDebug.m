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
@property (nonatomic, copy) NSSet<NSString *> *activeBreakpoints;
@property (nonatomic, strong) NSString *currentBpIdentifier;
@property (nonatomic, assign) BOOL breakpointLocking;
@property (nonatomic, assign) BOOL breakpointSteping;
@property (nonatomic, strong) NSCondition *breakpointCondition;

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

- (void)sendLog:(NSString *)string {
    NSDictionary *obj = @{
                          @"type": @"console.log",
                          @"payload": ([[string dataUsingEncoding:NSUTF8StringEncoding] base64EncodedStringWithOptions:kNilOptions] ?: @""),
                          @"bpIdentifier": self.currentBpIdentifier ?: @"",
                          };
    NSData *data = [NSJSONSerialization dataWithJSONObject:obj options:kNilOptions error:NULL];
    [self.socket send:[[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding]];
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
    self.breakpointCondition = [NSCondition new];
    [self.breakpointCondition lock];
    while (self.breakpointLocking) {
        [self.breakpointCondition wait];
    }
}

+ (void)xtr_bp:(NSString *)bpIdentifier T:(JSValue *)T S:(JSValue *)S {
    [XTDebug sharedDebugger].currentBpIdentifier = bpIdentifier;
    if ([XTDebug sharedDebugger].breakpointSteping ||
        [[[XTDebug sharedDebugger] activeBreakpoints] containsObject:bpIdentifier]) {
        [[XTDebug sharedDebugger] handleBreak:bpIdentifier
                                            T:[[[JSContext currentContext] evaluateScript:@"JSON.stringify"] callWithArguments:@[T]].toString
                                            S:[[[JSContext currentContext] evaluateScript:@"JSON.stringify"] callWithArguments:@[S]].toString];
    }
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
            self.breakpointSteping = NO;
            self.breakpointLocking = NO;
            [self.breakpointCondition signal];
            [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                [self.delegate debuggerDidReload];
            }];
        }
    }
}

- (void)handleClearBreakPoint:(NSDictionary *)obj {
    NSMutableSet *mutable = self.activeBreakpoints.mutableCopy ?: [NSMutableSet set];
    [mutable removeObject:[NSString stringWithFormat:@"%@:%@", obj[@"path"], obj[@"line"]]];
    self.activeBreakpoints = mutable;
}

- (void)handleClearBreakPoints:(NSDictionary *)obj {
    NSMutableSet *mutable = [NSMutableSet set];
    for (NSString *bpID in self.activeBreakpoints.copy) {
        if ([bpID hasPrefix:obj[@"path"]]) {
            continue;
        }
        [mutable addObject:bpID];
    }
    self.activeBreakpoints = mutable;
}

- (void)handleSetBreakPoint:(NSDictionary *)obj {
    NSMutableSet *mutable = self.activeBreakpoints.mutableCopy ?: [NSMutableSet set];
    [mutable addObject:[NSString stringWithFormat:@"%@:%@", obj[@"path"], obj[@"line"]]];
    self.activeBreakpoints = mutable;
}

- (void)handleContinue {
    self.breakpointSteping = NO;
    self.breakpointLocking = NO;
    [self.breakpointCondition signal];
}

- (void)handleStep {
    self.breakpointSteping = YES;
    self.breakpointLocking = NO;
    [self.breakpointCondition signal];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        self.breakpointSteping = NO;
    });
}

- (void)handleStop {
    self.breakpointSteping = NO;
    self.breakpointLocking = NO;
    [self.breakpointCondition signal];
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
            [self sendLog:result];
        }
    }];
}

@end
