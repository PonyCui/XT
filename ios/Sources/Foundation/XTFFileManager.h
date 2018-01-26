//
//  XTFFileManager.h
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/17.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFFileManager;

@protocol XTFFileManagerExport<JSExport>

+ (BOOL)writeData:(NSString *)dataRef path:(NSString *)path location:(NSInteger)location;
+ (NSString *)readData:(NSString *)path location:(NSInteger)location;
+ (BOOL)fileExists:(NSString *)path location:(NSInteger)location;
+ (BOOL)deleteFile:(NSString *)path location:(NSInteger)location;
+ (NSArray<NSString *> *)list:(NSString *)path location:(NSInteger)location;

@end

@interface XTFFileManager : NSObject<XTFFileManagerExport>

@end
