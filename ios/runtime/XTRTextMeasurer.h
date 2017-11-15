//
//  XTRTextMeasurer.h
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@protocol XTRTextMeasurer <JSExport>

+ (NSDictionary *)measureText:(JSValue *)text params:(JSValue *)params;

@end

@interface XTRTextMeasurer : NSObject<XTRComponent, XTRTextMeasurer>

@property (nonatomic, copy) NSString *objectUUID;

@end
