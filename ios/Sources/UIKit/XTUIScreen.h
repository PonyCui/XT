//
//  XTUIScreen.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@protocol XTUIScreenExport <JSExport>

+ (NSDictionary *)xtr_mainScreenBounds;
+ (CGFloat)xtr_mainScreenScale;

@end

@interface XTUIScreen : NSObject<XTComponent, XTUIScreenExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
