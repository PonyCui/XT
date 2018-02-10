//
//  XTUIButton.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIButton.h"
#import "XTUIUtils.h"
#import "XTUIImage.h"
#import "XTUIFont.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTUIButton ()

@property (nonatomic, strong) UIButton *innerView;
@property (nonatomic, assign) BOOL vertical;
@property (nonatomic, assign) CGFloat inset;
@property (nonatomic, assign) BOOL highlighted;

@end

@implementation XTUIButton

+ (NSString *)name {
    return @"_XTUIButton";
}

+ (NSString *)xtr_title:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        return [obj.innerView titleForState:UIControlStateNormal];
    }
    return nil;
}

+ (void)xtr_setTitle:(NSString *)title objectRef:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        [obj.innerView setTitle:title forState:UIControlStateNormal];
        [obj resetInset];
    }
}

+ (NSString *)xtr_font:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        return [XTUIFont create:[[obj.innerView titleLabel] font]];
    }
    return nil;
}

+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    XTUIFont *font = [XTMemoryManager find:fontRef];
    if ([obj isKindOfClass:[XTUIButton class]] && [font isKindOfClass:[XTUIFont class]]) {
        [obj.innerView.titleLabel setFont:font.innerObject];
    }
}

+ (NSString *)xtr_image:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        XTUIImage *image = (id)[obj.innerView imageForState:UIControlStateNormal];
        if ([image isKindOfClass:[XTUIImage class]]) {
            return image.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_setImage:(NSString *)imageRef objectRef:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        XTUIImage *img = [XTMemoryManager find:imageRef];
        if ([img isKindOfClass:[XTUIImage class]]) {
            [obj.innerView setImage:img.image forState:UIControlStateNormal];
            [obj resetInset];
        }
        else {
            [obj.innerView setImage:nil forState:UIControlStateNormal];
            [obj resetInset];
        }
    }
}

+ (NSDictionary *)xtr_color:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        UIColor *color = [obj.innerView titleColorForState:UIControlStateNormal];
        if ([color isKindOfClass:[UIColor class]]) {
            return [JSValue fromColor:color];
        }
    }
    return @{};
}

+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        [obj.innerView setTitleColor:[color toColor] forState:UIControlStateNormal];
    }
}

+ (BOOL)xtr_vertical:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        return obj.vertical;
    }
    return NO;
}

+ (void)xtr_setVertical:(BOOL)vertical objectRef:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        obj.vertical = vertical;
    }
}

+ (CGFloat)xtr_inset:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        return obj.inset;
    }
    return 0;
}

+ (void)xtr_setInset:(CGFloat)inset objectRef:(NSString *)objectRef {
    XTUIButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIButton class]]) {
        obj.inset = inset;
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _innerView = [UIButton buttonWithType:UIButtonTypeSystem];
        _innerView.adjustsImageWhenHighlighted = NO;
        [_innerView setTitleColor:self.tintColor forState:UIControlStateNormal];
        [_innerView addTarget:self action:@selector(onTouchUpInside) forControlEvents:UIControlEventTouchUpInside];
        [_innerView addTarget:self action:@selector(onTouchStart) forControlEvents:UIControlEventTouchDown];
        [_innerView addTarget:self action:@selector(onTouchEvent) forControlEvents:UIControlEventAllTouchEvents];
        [self addSubview:_innerView];
    }
    return self;
}

- (void)resetInset {
    if (self.vertical) {
        [self.innerView setImageEdgeInsets:UIEdgeInsetsMake(0, 0, 0, 0)];
        [self.innerView setTitleEdgeInsets:UIEdgeInsetsMake(0, 0, 0, 0)];
        [self layoutIfNeeded];
        self.innerView.imageEdgeInsets = UIEdgeInsetsMake(-(self.innerView.imageView.frame.size.height + self.innerView.titleLabel.frame.size.height + self.inset) / 2.0,
                                                          (self.innerView.frame.size.width / 2.0 - self.innerView.imageView.center.x) * 2,
                                                          0.0,
                                                          0.0);
        
        self.innerView.titleEdgeInsets = UIEdgeInsetsMake((self.innerView.imageView.frame.size.height + self.innerView.titleLabel.frame.size.height + self.inset) / 2.0,
                                                          (self.innerView.frame.size.width / 2.0 - self.innerView.titleLabel.center.x) * 2,
                                                          0.0,
                                                          0.0);
    }
    else {
        [self.innerView setImageEdgeInsets:UIEdgeInsetsMake(0, 0, 0, self.inset)];
        [self.innerView setTitleEdgeInsets:UIEdgeInsetsMake(0, self.inset, 0, 0)];
    }
}

- (void)onTouchUpInside {
    JSValue *value = self.scriptObject;
    if (value != nil) {
        [value invokeMethod:@"handleTouchUpInside" withArguments:@[]];
    }
}

- (void)onTouchStart {
    self.highlighted = NO;
}

- (void)onTouchEvent {
    if (self.highlighted != self.innerView.highlighted) {
        self.highlighted = self.innerView.highlighted;
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"handleHighlighted" withArguments:@[@(self.highlighted)]];
        }
        
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

@end
