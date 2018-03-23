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

typedef NSError *(^XTFTransactionExecution)(FMDatabase *database);

@interface XTFDatabase()

@property (nonatomic, copy) NSString *dbPath;
@property (nonatomic, strong) FMDatabaseQueue *databaseQueue;
@property (nonatomic, strong) NSOperationQueue *databaseOperationQueue;
@property (nonatomic, assign) BOOL inTransaction;
@property (nonatomic, strong) NSMutableArray<XTFTransactionExecution> *transactionExecutions;

@end

@implementation XTFDatabase

+ (NSString *)name {
    return @"_XTFDatabase";
}

+ (NSString *)create:(NSString *)name location:(NSString *)location {
    XTFDatabase *database = [[XTFDatabase alloc] initWithNamed:name location:location];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:database];
    database.objectUUID = managedObject.objectUUID;
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

+ (void)xtr_executeQuery:(NSString *)sql
                  values:(NSArray *)values
                resolver:(JSValue *)resolver
                rejector:(JSValue *)rejector
               objectRef:(NSString *)objectRef {
    XTFDatabase *database = [XTMemoryManager find:objectRef];
    if ([database isKindOfClass:[XTFDatabase class]]) {
        [database executeQuery:sql
                        values:values
                      resolver:^(NSArray *results){
                          [resolver callWithArguments:@[results ?: @[]]];
                      } rejector:^(NSError *error) {
                          [rejector callWithArguments:@[error.localizedDescription ?: @"Unknown Error."]];
                      }];
    }
}

+ (void)xtr_executeUpdate:(NSString *)sql
                   values:(NSArray *)values
                 resolver:(JSValue *)resolver
                 rejector:(JSValue *)rejector
                objectRef:(NSString *)objectRef {
    XTFDatabase *database = [XTMemoryManager find:objectRef];
    if ([database isKindOfClass:[XTFDatabase class]]) {
        [database executeUpdate:sql
                         values:values
                       resolver:^{
                           [resolver callWithArguments:nil];
                       } rejector:^(NSError *error) {
                           [rejector callWithArguments:@[error.localizedDescription ?: @"Unknown Error."]];
                       }];
    }
}

+ (void)xtr_executeStatements:(NSString *)sql
                     resolver:(JSValue *)resolver
                     rejector:(JSValue *)rejector
                    objectRef:(NSString *)objectRef {
    XTFDatabase *database = [XTMemoryManager find:objectRef];
    if ([database isKindOfClass:[XTFDatabase class]]) {
        [database executeStatements:sql
                      resolver:^{
                          [resolver callWithArguments:nil];
                      } rejector:^(NSError *error) {
                          [rejector callWithArguments:@[error.localizedDescription ?: @"Unknown Error."]];
                      }];
    }
}

+ (void)xtr_executeTransaction:(JSValue *)execBlock
                      rollback:(BOOL)rollback
                      resolver:(JSValue *)resolver
                      rejector:(JSValue *)rejector
                     objectRef:(NSString *)objectRef {
    XTFDatabase *database = [XTMemoryManager find:objectRef];
    if (database.inTransaction) {
        [rejector callWithArguments:@[@"Already inTransaction."]];
        return;
    }
    if ([database isKindOfClass:[XTFDatabase class]]) {
        database.inTransaction = YES;
        [execBlock callWithArguments:nil];
        [database execTransition:rollback resolver:^{
            [resolver callWithArguments:nil];
        } rejector:^(NSError *error) {
            [rejector callWithArguments:@[error.localizedDescription ?: @"Unknown Error."]];
        }];
    }
}

+ (void)xtr_destoryWithResolver:(JSValue *)resolver
                       rejector:(JSValue *)rejector
                      objectRef:(NSString *)objectRef {
    XTFDatabase *database = [XTMemoryManager find:objectRef];
    if ([database isKindOfClass:[XTFDatabase class]]) {
        if ([database destory]) {
            [resolver callWithArguments:nil];
        }
        else {
            [rejector callWithArguments:nil];
        }
    }
}

- (instancetype)initWithNamed:(NSString *)name location:(NSString *)location
{
    self = [super init];
    if (self) {
        NSString *dirPath = nil;
        if ([location isEqualToString:@"cache"]) {
            dirPath = [NSString stringWithFormat:@"%@/xt_foundation_database",
                       NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).firstObject];
        }
        else if ([location isEqualToString:@"tmp"]) {
            dirPath = [NSString stringWithFormat:@"%@/xt_foundation_database", NSTemporaryDirectory()];
        }
        else {
            dirPath = [NSString stringWithFormat:@"%@/xt_foundation_database",
                       NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject];
        }
        _dbPath = [NSString stringWithFormat:@"%@/%@", dirPath, name];
        _databaseOperationQueue = [NSOperationQueue new];
        _transactionExecutions = [NSMutableArray array];
        NSLog(@"%@", self.dbPath);
    }
    return self;
}

- (BOOL)open {
    NSError *error;
    NSString *dirPath = [self.dbPath stringByDeletingLastPathComponent];
    if (![[NSFileManager defaultManager] fileExistsAtPath:dirPath]) {
        [[NSFileManager defaultManager] createDirectoryAtPath:dirPath
                                  withIntermediateDirectories:NO
                                                   attributes:nil
                                                        error:&error];
        if (error != nil) {
            return NO;
        }
    }
    self.databaseQueue = [FMDatabaseQueue databaseQueueWithPath:self.dbPath];
    return YES;
}

- (void)executeQuery:(NSString *)sql
              values:(NSArray *)values
            resolver:(void(^)(NSArray *results))resolver
            rejector:(void(^)(NSError *))rejector {
    if (self.inTransaction) {
        [self.transactionExecutions addObject:^NSError *(FMDatabase *db){
            return [NSError errorWithDomain:@"XTFDatabase"
                                       code:-1
                                   userInfo:@{NSLocalizedDescriptionKey: @"Do not executeQuery while runing transaction."}];
        }];
        return;
    }
    NSOperationQueue *javascriptOperationQueue = [NSOperationQueue currentQueue];
    [self.databaseOperationQueue addOperationWithBlock:^{
        [self.databaseQueue inDatabase:^(FMDatabase * _Nonnull db) {
            NSError *error;
            FMResultSet *rs = [db executeQuery:sql values:values error:&error];
            if (error == nil) {
                NSMutableArray *results = [NSMutableArray array];
                while ([rs next]) {
                    [results addObject:rs.resultDictionary ?: @{}];
                }
                [rs close];
                [javascriptOperationQueue addOperationWithBlock:^{
                    resolver(results);
                }];
            }
            else {
                [javascriptOperationQueue addOperationWithBlock:^{
                    rejector(error);
                }];
            }
        }];
    }];
}

- (void)executeUpdate:(NSString *)sql
               values:(NSArray *)values
             resolver:(void(^)(void))resolver
             rejector:(void(^)(NSError *))rejector {
    if (self.inTransaction) {
        [self.transactionExecutions addObject:^NSError *(FMDatabase *db){
            NSError *error;
            [db executeUpdate:sql values:values error:&error];
            return error;
        }];
        return;
    }
    NSOperationQueue *javascriptOperationQueue = [NSOperationQueue currentQueue];
    [self.databaseOperationQueue addOperationWithBlock:^{
        [self.databaseQueue inDatabase:^(FMDatabase * _Nonnull db) {
            NSError *error;
            [db executeUpdate:sql values:values error:&error];
            [javascriptOperationQueue addOperationWithBlock:^{
                if (error == nil) {
                    resolver();
                }
                else {
                    rejector(error);
                }
            }];
        }];
    }];
}

- (void)executeStatements:(NSString *)statements
                 resolver:(void(^)(void))resolver
                 rejector:(void(^)(NSError *))rejector {
    if (self.inTransaction) {
        [self.transactionExecutions addObject:^NSError *(FMDatabase *db){
            BOOL succeed = [db executeStatements:statements];
            return succeed ? [NSError errorWithDomain:@"XTFDatabase" code:-1 userInfo:nil] : nil;
        }];
        return;
    }
    NSOperationQueue *javascriptOperationQueue = [NSOperationQueue currentQueue];
    [self.databaseOperationQueue addOperationWithBlock:^{
        [self.databaseQueue inDatabase:^(FMDatabase * _Nonnull db) {
            BOOL succeed = [db executeStatements:statements];
            [javascriptOperationQueue addOperationWithBlock:^{
                if (succeed) {
                    resolver();
                }
                else {
                    rejector(nil);
                }
            }];
        }];
    }];
}

- (void)execTransition:(BOOL)argRollback resolver:(void(^)(void))resolver rejector:(void(^)(NSError *))rejector {
    NSOperationQueue *javascriptOperationQueue = [NSOperationQueue currentQueue];
    [self.databaseOperationQueue addOperationWithBlock:^{
        [self.databaseQueue inTransaction:^(FMDatabase * _Nonnull db, BOOL * _Nonnull rollback) {
            for (XTFTransactionExecution execution in self.transactionExecutions) {
                NSError *error = execution(db);
                if (error != nil) {
                    if (argRollback) {
                        *rollback = YES;
                    }
                    [self clearTranaction];
                    [javascriptOperationQueue addOperationWithBlock:^{
                        rejector(error);
                    }];
                    break;
                }
            }
            [self clearTranaction];
            [javascriptOperationQueue addOperationWithBlock:^{
                resolver();
            }];
        }];
    }];
}

- (void)clearTranaction {
    self.inTransaction = NO;
    [self.transactionExecutions removeAllObjects];
}

- (BOOL)destory {
    NSError *error;
    [self.databaseQueue close];
    if (![[NSFileManager defaultManager] fileExistsAtPath:self.dbPath]) {
        return YES;
    }
    [[NSFileManager defaultManager] removeItemAtPath:self.dbPath error:&error];
    return error == nil;
}

@end
