//
//  XTFUserDefaults.h
//  XTFoundation
//
//  Created by 崔明辉 on 2018/1/11.
//  Copyright © 2018年 Pony. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTFUserDefaults;

@protocol XTFUserDefaultsExport<JSExport>

+ (void)xtr_setObject:(JSValue *)anObject forKey:(NSString *)forKey suite:(NSString *)suite;
+ (JSValue *)xtr_objectForKey:(NSString *)forKey suite:(NSString *)suite;

@end

@interface XTFUserDefaults : NSObject<XTFUserDefaultsExport>

@end
