//
//  FooClass.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/26.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@protocol FooClassExport<JSExport>

+ (NSString *)sayHello;

@end

@interface FooClass : NSObject<FooClassExport>

@property (nonatomic, strong) NSString *fooValue;

@end
