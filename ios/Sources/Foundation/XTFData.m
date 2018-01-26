//
//  XTFData.m
//  XTFoundation
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 Pony. All rights reserved.
//

#import "XTFData.h"
#import "XTMemoryManager.h"
#import <CocoaSecurity/CocoaSecurity.h>

@implementation XTFData

+ (NSString *)createWithString:(NSString *)stringValue {
    NSData *data = [stringValue dataUsingEncoding:NSUTF8StringEncoding];
    if ([data isKindOfClass:[NSData class]]) {
        NSData *newData = [NSData dataWithData:data];
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:newData];
        managedObject.objectThreadSafe = YES;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return nil;
}

+ (NSString *)createWithBytes:(NSArray *)bytes {
    NSMutableData *data = [NSMutableData data];
    UInt8 uint8;
    for (NSNumber *u8 in bytes) {
        uint8 = (UInt8)[u8 unsignedIntValue];
        [data appendBytes:&uint8 length:1];
    }
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:data.copy];
    managedObject.objectThreadSafe = YES;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (NSString *)createWithData:(NSString *)objectRef {
    NSData *data = [XTMemoryManager find:objectRef];
    if ([data isKindOfClass:[NSData class]]) {
        NSData *newData = [NSData dataWithData:data];
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:newData];
        managedObject.objectThreadSafe = YES;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return nil;
}

+ (NSString *)createWithBase64EncodedString:(NSString *)value {
    NSData *data = [[NSData alloc] initWithBase64EncodedString:value options:kNilOptions];
    if ([data isKindOfClass:[NSData class]]) {
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:data];
        managedObject.objectThreadSafe = YES;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return nil;
}

+ (NSString *)createWithBase64EncodedData:(NSString *)objectRef {
    NSData *encodedData = [XTMemoryManager find:objectRef];
    if ([encodedData isKindOfClass:[NSData class]]) {
        NSData *newData = [[NSData alloc] initWithBase64EncodedData:encodedData options:kNilOptions];
        if ([newData isKindOfClass:[NSData class]]) {
            XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:newData];
            managedObject.objectThreadSafe = YES;
            [XTMemoryManager add:managedObject];
            return managedObject.objectUUID;
        }
    }
    return nil;
}

+ (BOOL)isEqualTo:(NSString *)toObjectRef objectRef:(NSString *)objectRef {
    NSData *toData = [XTMemoryManager find:toObjectRef];
    NSData *data = [XTMemoryManager find:objectRef];
    if ([toData isKindOfClass:[NSData class]] && [data isKindOfClass:[NSData class]]) {
        return [toData isEqual:data];
    }
    return NO;
}

+ (NSArray *)getBytes:(NSString *)objectRef {
    NSData *data = [XTMemoryManager find:objectRef];
    if ([data isKindOfClass:[NSData class]]) {
        NSMutableArray *uint8Array = [NSMutableArray array];
        for (NSUInteger i = 0; i < data.length; i++) {
            Byte byte;
            [data getBytes:&byte range:NSMakeRange(i, 1)];
            [uint8Array addObject:@(byte)];
        }
        return uint8Array;
    }
    return 0;
}

+ (NSUInteger)length:(NSString *)objectRef {
    NSData *data = [XTMemoryManager find:objectRef];
    if ([data isKindOfClass:[NSData class]]) {
        return data.length;
    }
    return 0;
}

+ (NSString *)base64EncodedData:(NSString *)objectRef {
    NSData *data = [XTMemoryManager find:objectRef];
    if ([data isKindOfClass:[NSData class]]) {
        NSData *encodedData = [data base64EncodedDataWithOptions:kNilOptions];
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:encodedData];
        managedObject.objectThreadSafe = YES;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return nil;
}

+ (NSString *)base64EncodedString:(NSString *)objectRef {
    NSData *data = [XTMemoryManager find:objectRef];
    if ([data isKindOfClass:[NSData class]]) {
        return [data base64EncodedStringWithOptions:kNilOptions];
    }
    return nil;
}

+ (NSString *)utf8String:(NSString *)objectRef {
    NSData *data = [XTMemoryManager find:objectRef];
    if ([data isKindOfClass:[NSData class]]) {
        return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
    }
    return nil;
}

+ (NSString *)md5:(NSString *)objectRef {
    NSData *hashData = [XTMemoryManager find:objectRef];
    if ([hashData isKindOfClass:[NSData class]]) {
        return [CocoaSecurity md5WithData:hashData].hex;
    }
    return @"";
}

+ (NSString *)sha1:(NSString *)objectRef {
    NSData *hashData = [XTMemoryManager find:objectRef];
    if ([hashData isKindOfClass:[NSData class]]) {
        return [CocoaSecurity sha1WithData:hashData].hex;
    }
    return @"";
}

@end
