//
//  XTUITextMeasurer.h
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@protocol XTUITextMeasurer <JSExport>

+ (NSDictionary *)measureText:(NSString *)text params:(JSValue *)params;

@end

@interface XTUITextMeasurer : NSObject<XTComponent, XTUITextMeasurer>

@property (nonatomic, copy) NSString *objectUUID;

@end
