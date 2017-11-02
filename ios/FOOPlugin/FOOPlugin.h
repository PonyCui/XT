//
//  FOOPlugin.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@protocol FOOExport <JSExport>

- (NSString *)sayHello;

@end

@interface FOOPlugin : NSObject<FOOExport>

- (instancetype)initWithJSContext:(JSContext *)context;

@end
