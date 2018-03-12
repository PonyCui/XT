//
//  FooClass.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/26.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "FooClass.h"
#import "XTExtObject.h"

@implementation FooClass

+ (NSString *)sayHello {
    return @"Hello, World!";
}

+ (void)load {
    [XTExtObject registerClass:[self class]
                   initializer:^id{
                       return [FooClass new];
                   }
                        getter:^id(NSString *propKey, FooClass *obj) {
                            if ([propKey isEqualToString:@"fooValue"]) {
                                return obj.fooValue;
                            }
                            return nil;
                        }
                        setter:^(JSValue *value, NSString *propKey, FooClass *obj) {
                            if ([propKey isEqualToString:@"fooValue"] && value.isString) {
                                obj.fooValue = value.toString;
                            }
                        }
                        caller:^id(NSString *methodName, NSArray<id> *arguments, FooClass *obj) {
                            if ([methodName isEqualToString:@"callYamiedie"] &&
                                arguments.count >= 2 &&
                                [arguments[0] isKindOfClass:[NSString class]] &&
                                [arguments[1] isKindOfClass:[NSString class]]) {
                                return [obj callYamiedie:arguments[0] roleB:arguments[1]];
                            }
                            return nil;
                        }];
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _fooValue = @"Hello, World!";
    }
    return self;
}

- (NSString *)callYamiedie:(NSString *)roleA roleB:(NSString *)roleB {
    return [NSString stringWithFormat:@"%@ said: '%@ Yamiedie'.", roleB, roleA];
}

@end
