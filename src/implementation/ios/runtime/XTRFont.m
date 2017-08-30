//
//  XTRFont.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRFont.h"

@implementation XTRFont

+ (XTRFont *)create:(JSValue *)pointSize
         fontWeight:(JSValue *)fontWeight
          fontStyle:(JSValue *)fontStyle
         familyName:(JSValue *)familyName {
    XTRFont *nativeObject = [XTRFont new];
    if (familyName != nil && [familyName toString].length > 0) {
        nativeObject.innerObject = [UIFont fontWithName:[familyName toString] size:[pointSize toDouble]];
    }
    else if ([[fontStyle toString] isEqualToString:@"italic"]) {
        nativeObject.innerObject = [UIFont italicSystemFontOfSize:[pointSize toDouble]];
    }
    else {
        if ([UIDevice currentDevice].systemVersion.floatValue >= 8.2) {
            nativeObject.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:[fontWeight toDouble]];
        }
        else {
            if ([fontWeight toDouble] >= 700) {
                nativeObject.innerObject = [UIFont boldSystemFontOfSize:[pointSize toDouble]];
            }
            else {
                nativeObject.innerObject = [UIFont systemFontOfSize:[pointSize toDouble]];
            }
        }
    }
    return nativeObject;
}

+ (XTRFont *)create:(UIFont *)font {
    XTRFont *nativeObject = [XTRFont new];
    nativeObject.innerObject = font;
    return nativeObject;
}

+ (NSString *)name {
    return @"XTRFont";
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _objectUUID = [[NSUUID UUID] UUIDString];
    }
    return self;
}

- (NSString *)xtr_familyName {
    return self.innerObject.familyName;
}

- (NSNumber *)xtr_pointSize {
    return @(self.innerObject.pointSize);
}

- (NSString *)xtr_fontWeight {
    NSString *UIUsageAttribute = self.innerObject.fontDescriptor.fontAttributes[@"NSCTFontUIUsageAttribute"];
    if ([UIUsageAttribute isEqualToString:@"CTFontBlackUsage"]) {
        return @"700";
    }
    return @"400";
}

- (NSString *)xtr_fontStyle {
    NSString *UIUsageAttribute = self.innerObject.fontDescriptor.fontAttributes[@"NSCTFontUIUsageAttribute"];
    if ([UIUsageAttribute isEqualToString:@"CTFontObliqueUsage"]) {
        return @"italic";
    }
    return @"normal";
}

@end
