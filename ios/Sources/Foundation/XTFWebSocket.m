//
//  XTFWebSocket.m
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/24.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import "XTFWebSocket.h"
#import <SocketRocket/SRWebSocket.h>
#import "XTMemoryManager.h"

@interface XTFWebSocket()<SRWebSocketDelegate>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) SRWebSocket *socket;
@property (nonatomic, weak) JSContext *context;

@end

@implementation XTFWebSocket

+ (NSString *)create:(NSString *)URLString {
    XTFWebSocket *instance = [[XTFWebSocket alloc] init];
    instance.context = [JSContext currentContext];
    instance.socket = [[SRWebSocket alloc] initWithURL:[NSURL URLWithString:URLString]];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:instance];
    instance.objectUUID = managedObject.objectUUID;
    managedObject.objectThreadSafe = YES;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (void)xtr_sendData:(NSString *)dataRef objectRef:(NSString *)objectRef {
    XTFWebSocket *obj = [XTMemoryManager find:objectRef];
    NSData *data = [XTMemoryManager find:dataRef];
    if ([obj isKindOfClass:[XTFWebSocket class]] && [data isKindOfClass:[NSData class]]) {
        [obj.socket send:data];
    }
}

+ (void)xtr_sendString:(NSString *)string objectRef:(NSString *)objectRef {
    XTFWebSocket *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTFWebSocket class]]) {
        [obj.socket send:string];
    }
}

+ (void)xtr_close:(NSString *)objectRef {
    XTFWebSocket *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTFWebSocket class]]) {
        [obj.socket close];
    }
}

- (void)setSocket:(SRWebSocket *)socket {
    _socket = socket;
    socket.delegate = self;
    [socket performSelector:@selector(open) withObject:nil afterDelay:0.1];
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)webSocketDidOpen:(SRWebSocket *)webSocket {
    [[self scriptObject] invokeMethod:@"handleOpen" withArguments:@[]];
}

- (void)webSocket:(SRWebSocket *)webSocket didCloseWithCode:(NSInteger)code reason:(NSString *)reason wasClean:(BOOL)wasClean {
    [[self scriptObject] invokeMethod:@"handleClose" withArguments:@[@(code), reason ?: @""]];
}

- (void)webSocket:(SRWebSocket *)webSocket didFailWithError:(NSError *)error {
    [[self scriptObject] invokeMethod:@"handleFail" withArguments:@[error.localizedDescription ?: @""]];
}

- (void)webSocket:(SRWebSocket *)webSocket didReceiveMessage:(id)message {
    if ([message isKindOfClass:[NSData class]]) {
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:message];
        managedObject.objectThreadSafe = YES;
        [XTMemoryManager add:managedObject];
        [[self scriptObject] invokeMethod:@"handleDataMessage" withArguments:@[managedObject.objectUUID]];
    }
    else if ([message isKindOfClass:[NSString class]]) {
        [[self scriptObject] invokeMethod:@"handleStringMessage" withArguments:@[message]];
    }
}

@end
