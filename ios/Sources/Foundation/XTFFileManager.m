//
//  XTFFileManager.m
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/17.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import "XTFFileManager.h"
#import "XTMemoryManager.h"

@implementation XTFFileManager

+ (NSString *)buildPath:(NSString *)path location:(NSInteger)location {
    NSString *baseDir;
    switch (location) {
        case 0:
            baseDir = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
            break;
        case 1:
            baseDir = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject;
            break;
        case 2:
            baseDir = NSTemporaryDirectory();
            break;
        default:
            baseDir = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject;
            break;
    }
    return [NSString stringWithFormat:@"%@/%@", baseDir, path];
}

+ (BOOL)writeData:(NSString *)dataRef path:(NSString *)path location:(NSInteger)location {
    NSData *data = [XTMemoryManager find:dataRef];
    if ([data isKindOfClass:[NSData class]]) {
        NSString *finalPath = [self buildPath:path location:location];
        [[NSFileManager defaultManager] createDirectoryAtPath:[finalPath stringByDeletingLastPathComponent]
                                  withIntermediateDirectories:YES
                                                   attributes:nil
                                                        error:NULL];
        return [data writeToFile:finalPath atomically:YES];
    }
    return NO;
}

+ (NSString *)readData:(NSString *)path location:(NSInteger)location {
    NSData *data = [NSData dataWithContentsOfFile:[self buildPath:path location:location]];
    if (data != nil) {
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:data];
        managedObject.objectThreadSafe = YES;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return nil;
}

+ (BOOL)fileExists:(NSString *)path location:(NSInteger)location {
    return [[NSFileManager defaultManager] fileExistsAtPath:[self buildPath:path location:location]];
}

+ (BOOL)deleteFile:(NSString *)path location:(NSInteger)location {
    NSError *err;
    [[NSFileManager defaultManager] removeItemAtPath:[self buildPath:path location:location] error:&err];
    return err == nil;
}

+ (NSArray<NSString *> *)list:(NSString *)path location:(NSInteger)location {
    NSMutableArray *results = [NSMutableArray array];
    NSString *finalPath = [[self buildPath:path location:location] stringByAppendingString:@"/"];
    NSEnumerator *enumerator = [[NSFileManager defaultManager] enumeratorAtPath:finalPath];
    if (enumerator != nil) {
        for (id file in enumerator) {
            if ([file isKindOfClass:[NSString class]]) {
                [results addObject:file];
            }
        }
    }
    return results.copy;
}

@end
