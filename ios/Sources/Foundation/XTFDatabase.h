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

+ (NSString *)create:(NSString *)name;
+ (void)xtr_openWithResolver:(JSValue *)resolver rejector:(JSValue *)rejector objectRef:(NSString *)objectRef;

@end

@interface XTFDatabase : NSObject<XTComponent, XTFDatabaseExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
