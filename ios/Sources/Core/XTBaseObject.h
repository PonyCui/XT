//
//  XTObject.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/7.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTComponent.h"

@class XTBaseObject;

@protocol XTBaseObjectExport<JSExport>

+ (NSString *)create;

@end

@interface XTBaseObject : NSObject<XTComponent, XTBaseObjectExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;

@end
