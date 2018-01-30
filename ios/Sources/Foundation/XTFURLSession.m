
//
//  XTFURLSession.m
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/19.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import "XTFURLSession.h"
#import "XTFURLSessionTask.h"
#import "XTFData.h"
#import "XTMemoryManager.h"

@interface XTFURLSessionResult: NSObject

@property (nonatomic, strong) JSValue *completionHandler;
@property (nonatomic, strong) NSData *data;
@property (nonatomic, strong) NSURLResponse *response;
@property (nonatomic, strong) NSError *error;

@end

@implementation XTFURLSessionResult

@end

@implementation XTFURLSession

+ (NSString *)dataTaskWithURL:(NSString *)URL completionHandler:(JSValue *)completionHandler {
    NSThread *currentThread = [NSThread currentThread];
    JSManagedValue *managedValue = [JSManagedValue managedValueWithValue:completionHandler];
    NSURLSessionTask *task = [[NSURLSession sharedSession] dataTaskWithURL:[NSURL URLWithString:URL] completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        JSValue *handler = managedValue.value;
        if (handler) {
            XTFURLSessionResult *result = [XTFURLSessionResult new];
            result.completionHandler = handler;
            result.data = data;
            result.response = response;
            result.error = error;
            [self performSelector:@selector(emitResult:)
                         onThread:currentThread
                       withObject:result
                    waitUntilDone:NO];
        }
    }];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:task];
    managedObject.objectThreadSafe = YES;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (NSString *)dataTaskWithRequest:(NSString *)reqRef completionHandler:(JSValue *)completionHandler {
    NSURLRequest *request = [XTMemoryManager find:reqRef];
    if (![request isKindOfClass:[NSURLRequest class]]) { return @""; }
    NSThread *currentThread = [NSThread currentThread];
    JSManagedValue *managedValue = [JSManagedValue managedValueWithValue:completionHandler];
    NSURLSessionTask *task = [[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        JSValue *handler = managedValue.value;
        if (handler) {
            XTFURLSessionResult *result = [XTFURLSessionResult new];
            result.completionHandler = handler;
            result.data = data;
            result.response = response;
            result.error = error;
            [self performSelector:@selector(emitResult:)
                         onThread:currentThread
                       withObject:result
                    waitUntilDone:NO];
        }
    }];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:task];
    managedObject.objectThreadSafe = YES;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (void)emitResult:(XTFURLSessionResult *)result {
    NSString *dataRef;
    NSString *responseRef;
    if (result.data != nil) {
        XTManagedObject *dataManagedObject = [[XTManagedObject alloc] initWithObject:result.data];
        dataManagedObject.objectThreadSafe = YES;
        [XTMemoryManager add:dataManagedObject];
        dataRef = dataManagedObject.objectUUID;
    }
    if (result.response != nil) {
        XTManagedObject *responseManagedObject = [[XTManagedObject alloc] initWithObject:result.response];
        responseManagedObject.objectThreadSafe = YES;
        [XTMemoryManager add:responseManagedObject];
        responseRef = responseManagedObject.objectUUID;
    }
    [result.completionHandler callWithArguments:@[
                                                  dataRef ?: [NSNull null],
                                                  responseRef ?: [NSNull null],
                                                  result.error.localizedDescription ?: [NSNull null],
                                                  ]];
}

@end
