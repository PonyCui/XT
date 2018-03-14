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

- (id)onCallMethod:(NSString *)methodName args:(NSArray *)args {
    if ([methodName isEqualToString:@"callYamiedie"] && args.count == 2 && [args[0] isKindOfClass:[NSString class]] && [args[1] isKindOfClass:[NSString class]]) {
        return [self callYamiedie:args[0] roleB:args[1]];
    }
    return nil;
}

- (NSString *)callYamiedie:(NSString *)roleA roleB:(NSString *)roleB {
    [self invokeMethod:@"handleNativeCall" args:@[]];
    return [NSString stringWithFormat:@"%@ said: '%@ Yamiedie'.", roleB, roleA];
}

@end
