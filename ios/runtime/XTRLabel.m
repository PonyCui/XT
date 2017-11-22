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

@interface XTRLabel ()

@property (nonatomic, strong) UILabel *innerView;
@property (nonatomic, assign) CGFloat lineSpace;

@end

@implementation XTRLabel

+ (NSString *)name {
    return @"XTRLabel";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRLabel *view = [[XTRLabel alloc] initWithFrame:[frame toRect]];
    view.innerView = [[UILabel alloc] init];
    [view addSubview:view.innerView];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = scriptObject.context;
    [((XTRContext *)[JSContext currentContext]).objectRefs store:view];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [view description]; }];
    return view.objectUUID;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

- (NSString *)xtr_text {
    return self.innerView.text;
}

- (void)xtr_setText:(JSValue *)text {
    self.innerView.text = [text toString];
    [self resetAttributedText];
}

- (JSValue *)xtr_font {
    if (self.innerView.font != nil) {
        return [JSValue fromObject:[XTRFont create:self.innerView.font] context:self.context];
    }
    return nil;
}

- (void)xtr_setFont:(JSValue *)font {
    XTRFont *aFont = [font toFont];
    if (aFont) {
        self.innerView.font = aFont.innerObject;
    }
}

- (NSDictionary *)xtr_textColor {
    return [JSValue fromColor:self.innerView.textColor ?: [UIColor blackColor]];
}


- (void)xtr_setTextColor:(JSValue *)textColor {
    self.innerView.textColor = [textColor toColor];
    [self resetAttributedText];
}


- (NSNumber *)xtr_textAlignment {
    switch (self.innerView.textAlignment) {
        case NSTextAlignmentLeft:
            return @(0);
        case NSTextAlignmentCenter:
            return @(1);
        case NSTextAlignmentRight:
            return @(2);
        default:
            return @(0);
    }
}


- (void)xtr_setTextAlignment:(JSValue *)textAlignment {
    switch ([textAlignment toInt32]) {
        case 0:
            self.innerView.textAlignment = NSTextAlignmentLeft;
            break;
        case 1:
            self.innerView.textAlignment = NSTextAlignmentCenter;
            break;
        case 2:
            self.innerView.textAlignment = NSTextAlignmentRight;
            break;
        default:
            break;
    }
    [self resetAttributedText];
}


- (NSNumber *)xtr_numberOfLines {
    return @(self.innerView.numberOfLines);
}


- (void)xtr_setNumberOfLines:(JSValue *)numberOfLines {
    self.innerView.numberOfLines = [numberOfLines toInt32];
    [self resetAttributedText];
}


- (NSNumber *)xtr_lineBreakMode {
    switch (self.innerView.lineBreakMode) {
        case NSLineBreakByWordWrapping:
            return @(0);
        case NSLineBreakByTruncatingTail:
            return @(4);
        default:
            return @(0);
    }
}


- (void)xtr_setLineBreakMode:(JSValue *)lineBreakMode {
    switch ([lineBreakMode toInt32]) {
        case 0:
            self.innerView.lineBreakMode = NSLineBreakByWordWrapping;
            break;
        case 4:
            self.innerView.lineBreakMode = NSLineBreakByTruncatingTail;
            break;
        default:
            break;
    }
    [self resetAttributedText];
}


- (NSNumber *)xtr_lineSpace {
    return @(self.lineSpace);
}


- (void)xtr_setLineSpace:(JSValue *)lineSpace {
    self.lineSpace = [lineSpace toDouble];
    [self resetAttributedText];
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

- (NSDictionary *)xtr_textRectForBounds:(JSValue *)bounds {
    return [JSValue fromRect:[self.innerView textRectForBounds:[bounds toRect] limitedToNumberOfLines:self.innerView.numberOfLines]];
}

@end
