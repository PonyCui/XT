//
//  XTRFont.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRFont;

@protocol XTRFontExport <JSExport>

+ (XTRFont *)create:(JSValue *)pointSize
         fontWeight:(JSValue *)fontWeight
          fontStyle:(JSValue *)fontStyle
         familyName:(JSValue *)familyName;

- (NSString *)xtr_familyName;
- (NSNumber *)xtr_pointSize;
- (NSString *)xtr_fontWeight;
- (NSString *)xtr_fontStyle;

@end

@interface XTRFont : NSObject<XTRComponent, XTRFontExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) UIFont *innerObject;

+ (XTRFont *)create:(UIFont *)font;

@end
