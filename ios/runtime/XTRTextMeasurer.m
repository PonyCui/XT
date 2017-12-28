//
//  XTRTextMeasurer.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRTextMeasurer.h"
#import "XTRUtils.h"
#import "XTRFont.h"
#import <XT-Mem/XTMemoryManager.h>

@implementation XTRTextMeasurer

+ (NSString *)name {
    return @"XTRTextMeasurer";
}

+ (NSDictionary *)measureText:(NSString *)argText params:(JSValue *)argParams {
    NSString *text = argText;
    JSValue *params = argParams;
    if (text != nil && params != nil) {
        XTRFont *font = [params[@"font"] isKindOfClass:[JSValue class]] ? [XTMemoryManager find:params[@"font"].toString] : nil;
        if (![font isKindOfClass:[XTRFont class]]) {
            font = nil;
        }
        NSInteger numberOfLines = [params[@"numberOfLines"] isKindOfClass:[JSValue class]] && [params[@"numberOfLines"] isNumber]
        ? [[params[@"numberOfLines"] toNumber] integerValue] : 1;
        CGFloat letterSpace = [params[@"letterSpace"] isKindOfClass:[JSValue class]] && [params[@"letterSpace"] isNumber]
        ? [[params[@"letterSpace"] toNumber] floatValue] : 0;
        CGFloat lineSpace = [params[@"lineSpace"] isKindOfClass:[JSValue class]] && [params[@"lineSpace"] isNumber]
        ? [[params[@"lineSpace"] toNumber] floatValue] : 0;
        NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
        paragraphStyle.lineSpacing = lineSpace;
        NSAttributedString *attributedString = [[NSAttributedString alloc]
                                                initWithString:text
                                                attributes:@{
                                                             NSFontAttributeName: font.innerObject ?: [UIFont systemFontOfSize:14],
                                                             NSKernAttributeName: @(letterSpace),
                                                             NSParagraphStyleAttributeName: paragraphStyle,
                                                             }];
        if ([params[@"inRect"] isKindOfClass:[JSValue class]]) {
            CGSize inSize = [params[@"inRect"] toRect].size;
            CGRect textBounds = [attributedString boundingRectWithSize:inSize
                                                               options:numberOfLines != 1 ? NSStringDrawingUsesFontLeading | NSStringDrawingUsesLineFragmentOrigin : kNilOptions
                                                               context:NULL];
            return [JSValue fromRect:textBounds];
        }
    }
    return @{};
}

@end
