//
//  XTFClassLoader.m
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/21.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import "XTFClassLoader.h"

@implementation XTFClassLoader

+ (BOOL)loadClass:(NSString *)className globalName:(NSString *)globalName {
    Class clazz = NSClassFromString(className);
    if (clazz != NULL) {
        [JSContext currentContext][globalName] = clazz;
        return YES;
    }
    return NO;
}

@end
