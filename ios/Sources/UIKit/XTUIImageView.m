//
//  XTUIImageView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIImageView.h"
#import "XTUIUtils.h"
#import "XTUIImage.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTUIImageView ()

@property (nonatomic, strong) XTUIImage *privateImage;
@property (nonatomic, strong) UIImageView *innerView;

@end

@implementation XTUIImageView

+ (NSString *)name {
    return @"_XTUIImageView";
}

+ (NSString *)xtr_image:(NSString *)objectRef {
    XTUIImageView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIImageView class]]) {
        return view.privateImage.objectUUID;
    }
    return nil;
}

+ (void)xtr_setImage:(NSString *)imageRef objectRef:(NSString *)objectRef {
    XTUIImageView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIImageView class]]) {
        XTUIImage *img = [XTMemoryManager find:imageRef];
        if ([img isKindOfClass:[XTUIImage class]]) {
            view.privateImage = img;
            view.innerView.image = img.image;
        }
        else {
            view.privateImage = nil;
            view.innerView.image = nil;
        }
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _innerView = [[UIImageView alloc] init];
        [self addSubview:_innerView];
        self.userInteractionEnabled = NO;
    }
    return self;
}

- (CGSize)intrinsicContentSize {
    return self.innerView.intrinsicContentSize;
}

- (void)setContentMode:(UIViewContentMode)contentMode {
    [super setContentMode:contentMode];
    self.innerView.contentMode = contentMode;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

@end
