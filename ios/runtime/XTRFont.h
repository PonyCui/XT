//
//  XTRFont.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTRFont;

@protocol XTRFontExport <JSExport>

+ (NSString *)create:(JSValue *)pointSize
          fontWeight:(JSValue *)fontWeight
           fontStyle:(JSValue *)fontStyle
          familyName:(JSValue *)familyName;

+ (NSString *)xtr_familyName:(NSString *)objectRef;
+ (CGFloat)xtr_pointSize:(NSString *)objectRef;
+ (NSString *)xtr_fontWeight:(NSString *)objectRef;
+ (NSString *)xtr_fontStyle:(NSString *)objectRef;

@end

@interface XTRFont : NSObject<XTComponent, XTRFontExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) UIFont *innerObject;

+ (NSString *)create:(UIFont *)font;

@end
