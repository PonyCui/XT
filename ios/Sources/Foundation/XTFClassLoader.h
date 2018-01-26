//
//  XTFClassLoader.h
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/21.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFClassLoader;

@protocol XTFClassLoaderExport<JSExport>

+ (BOOL)loadClass:(NSString *)className globalName:(NSString *)globalName;

@end

@interface XTFClassLoader : NSObject<XTFClassLoaderExport>

@end
