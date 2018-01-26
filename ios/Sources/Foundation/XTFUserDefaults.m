//
//  XTFUserDefaults.m
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/11.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import "XTFUserDefaults.h"

@implementation XTFUserDefaults

+ (void)xtr_setObject:(JSValue *)anObject forKey:(NSString *)forKey suite:(NSString *)suite {
    NSUserDefaults *userDefaults = suite.length == 0 ? [NSUserDefaults standardUserDefaults] : [[NSUserDefaults alloc] initWithSuiteName:suite];
    if ([anObject isNumber]) {
        [userDefaults setObject:anObject.toNumber forKey:forKey];
    }
    else if ([anObject isBoolean]) {
        [userDefaults setObject:anObject.toNumber forKey:forKey];
    }
    else if ([anObject isString]) {
        [userDefaults setObject:anObject.toString forKey:forKey];
    }
    else if ([anObject isObject]) {
        [userDefaults setObject:anObject.toDictionary forKey:forKey];
    }
    else if ([anObject isArray]) {
        [userDefaults setObject:anObject.toArray forKey:forKey];
    }
    else {
        [userDefaults removeObjectForKey:forKey];
    }
}

+ (JSValue *)xtr_objectForKey:(NSString *)forKey suite:(NSString *)suite {
    NSUserDefaults *userDefaults = suite.length == 0 ? [NSUserDefaults standardUserDefaults] : [[NSUserDefaults alloc] initWithSuiteName:suite];
    id anObject = [userDefaults objectForKey:forKey];
    return anObject;
}

@end
