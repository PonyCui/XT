//
//  XTFDatabase.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTComponent.h"
#import "XTFoundationContext.h"

@class XTFDatabase;

@protocol XTFDatabaseExport<JSExport>

+ (NSString *)create:(NSString *)name location:(NSString *)location;

+ (void)xtr_openWithResolver:(JSValue *)resolver rejector:(JSValue *)rejector objectRef:(NSString *)objectRef;

+ (void)xtr_executeQuery:(NSString *)sql
                  values:(NSArray *)values
                resolver:(JSValue *)resolver
                rejector:(JSValue *)rejector
               objectRef:(NSString *)objectRef;

+ (void)xtr_executeUpdate:(NSString *)sql
                  values:(NSArray *)values
                resolver:(JSValue *)resolver
                rejector:(JSValue *)rejector
               objectRef:(NSString *)objectRef;

+ (void)xtr_executeStatements:(NSString *)sql
                     resolver:(JSValue *)resolver
                     rejector:(JSValue *)rejector
                    objectRef:(NSString *)objectRef;

+ (void)xtr_executeTransaction:(JSValue *)execBlock
                      rollback:(BOOL)rollback
                      resolver:(JSValue *)resolver
                      rejector:(JSValue *)rejector
                     objectRef:(NSString *)objectRef;

+ (void)xtr_destoryWithResolver:(JSValue *)resolver rejector:(JSValue *)rejector objectRef:(NSString *)objectRef;

@end

@interface XTFDatabase : NSObject<XTComponent, XTFDatabaseExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
