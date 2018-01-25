//
//  XTPolyfill.h
//  XTPolyfill
//
//  Created by 崔明辉 on 2017/10/11.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface XTPolyfill : NSObject

+ (void)addPolyfills:(JSContext *)context;

@end
