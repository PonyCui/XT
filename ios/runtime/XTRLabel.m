//
//  XTRLabel.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRLabel.h"
#import "XTRUtils.h"
#import "XTRFont.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRLabel ()

@property (nonatomic, strong) UILabel *innerView;
@property (nonatomic, assign) CGFloat lineSpace;

@end

@implementation XTRLabel

+ (NSString *)name {
    return @"XTRLabel";
}

+ (NSString *)create {
    XTRLabel *view = [[XTRLabel alloc] initWithFrame:CGRectZero];
    view.innerView = [[UILabel alloc] init];
    [view addSubview:view.innerView];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.userInteractionEnabled = NO;
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

+ (NSString *)xtr_text:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        return obj.innerView.text ?: @"";
    }
    return nil;
}

+ (void)xtr_setText:(NSString *)text objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        obj.innerView.text = text;
        [obj resetAttributedText];
    }
}

+ (NSString *)xtr_font:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        return [XTRFont create:obj.innerView.font];
    }
    return nil;
}

+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    XTRFont *font = [XTMemoryManager find:fontRef];
    if ([obj isKindOfClass:[XTRLabel class]] && [font isKindOfClass:[XTRFont class]]) {
        obj.innerView.font = font.innerObject;
    }
}

+ (NSDictionary *)xtr_textColor:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        return [JSValue fromColor:obj.innerView.textColor ?: [UIColor blackColor]];
    }
    return nil;
}

+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        obj.innerView.textColor = [textColor toColor];
        [obj resetAttributedText];
    }
}

+ (NSInteger)xtr_textAlignment:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        switch (obj.innerView.textAlignment) {
            case NSTextAlignmentLeft:
                return 0;
            case NSTextAlignmentCenter:
                return 1;
            case NSTextAlignmentRight:
                return 2;
            default:
                return 0;
        }
    }
    return 0;
}

+ (void)xtr_setTextAlignment:(NSInteger)textAlignment objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        switch (textAlignment) {
            case 0:
                obj.innerView.textAlignment = NSTextAlignmentLeft;
                break;
            case 1:
                obj.innerView.textAlignment = NSTextAlignmentCenter;
                break;
            case 2:
                obj.innerView.textAlignment = NSTextAlignmentRight;
                break;
            default:
                break;
        }
        [obj resetAttributedText];
    }
}

+ (NSInteger)xtr_numberOfLines:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        return obj.innerView.numberOfLines;
    }
    return 0;
}

+ (void)xtr_setNumberOfLines:(NSInteger)numberOfLines objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        obj.innerView.numberOfLines = numberOfLines;
    }
}

+ (NSInteger)xtr_lineBreakMode:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        switch (obj.innerView.lineBreakMode) {
            case NSLineBreakByWordWrapping:
                return 0;
            case NSLineBreakByTruncatingTail:
                return 4;
            default:
                return 0;
        }
    }
    return 0;
}

+ (void)xtr_setLineBreakMode:(NSInteger)lineBreakMode objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        switch (lineBreakMode) {
            case 0:
                obj.innerView.lineBreakMode = NSLineBreakByWordWrapping;
                break;
            case 4:
                obj.innerView.lineBreakMode = NSLineBreakByTruncatingTail;
                break;
            default:
                break;
        }
        [obj resetAttributedText];
    }
}

+ (CGFloat)xtr_lineSpace:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        return obj.lineSpace;
    }
    return 0;
}

+ (void)xtr_setLineSpace:(CGFloat)lineSpace objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        obj.lineSpace = lineSpace;
        [obj resetAttributedText];
    }
}

- (void)resetAttributedText {
    if (self.lineSpace > 0) {
        NSMutableAttributedString *text = [[NSMutableAttributedString alloc] initWithAttributedString:self.innerView.attributedText];
        NSMutableParagraphStyle *paragraphStyle = [NSMutableParagraphStyle new];
        paragraphStyle.lineSpacing = self.lineSpace;
        paragraphStyle.alignment = self.innerView.textAlignment;
        [text setAttributes:@{
                              NSParagraphStyleAttributeName: paragraphStyle,
                              } range:NSMakeRange(0, text.length)];
        self.innerView.attributedText = text;
    }
}

+ (NSDictionary *)xtr_textRectForBounds:(JSValue *)bounds objectRef:(NSString *)objectRef {
    XTRLabel *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRLabel class]]) {
        return [JSValue fromRect:[obj.innerView textRectForBounds:[bounds toRect] limitedToNumberOfLines:obj.innerView.numberOfLines]];
    }
    return @{};
}

@end
