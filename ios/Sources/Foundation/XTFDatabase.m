//
//  XTFDatabase.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTFDatabase.h"
#import "XTMemoryManager.h"
#import <FMDB/FMDB.h>

@interface XTFDatabase()

@property (nonatomic, copy) NSString *dbName;
@property (nonatomic, strong) FMDatabase *database;

@end

@implementation XTFDatabase

+ (NSString *)name {
    return @"_XTFDatabase";
}

+ (NSString *)create:(NSString *)name {
    XTFDatabase *database = [[XTFDatabase alloc] initWithNamed:name];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:database];
    managedObject.objectThreadSafe = YES;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (void)xtr_openWithResolver:(JSValue *)resolver rejector:(JSValue *)rejector objectRef:(NSString *)objectRef {
    XTFDatabase *database = [XTMemoryManager find:objectRef];
    if ([database isKindOfClass:[XTFDatabase class]]) {
        if ([database open]) {
            [resolver callWithArguments:nil];
        }
        else {
            [rejector callWithArguments:nil];
        }
    }
}

- (instancetype)initWithNamed:(NSString *)name
{
    self = [super init];
    if (self) {
        _dbName = name;
    }
    return self;
}

- (BOOL)open {
    NSError *error;
    NSString *dirPath = [NSString stringWithFormat:@"%@/xt_foundation_database",
                         NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject];
    NSString *dbPath = [NSString stringWithFormat:@"%@/%@", dirPath, self.dbName];
    if (![[NSFileManager defaultManager] fileExistsAtPath:dirPath]) {
        [[NSFileManager defaultManager] createDirectoryAtPath:dirPath
                                  withIntermediateDirectories:NO
                                                   attributes:nil
                                                        error:&error];
        if (error != nil) {
            return NO;
        }
    }
    self.database = [[FMDatabase alloc] initWithPath:dbPath];
    return [self.database open];
}

@end
