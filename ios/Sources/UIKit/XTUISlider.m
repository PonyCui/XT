//
//  XTUISlider.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUISlider.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTUISlider()

@property (nonatomic, strong) UISlider *innerView;

@end

@implementation XTUISlider

+ (NSString *)name {
    return @"_XTUISlider";
}

+ (CGFloat)xtr_value:(NSString *)objectRef {
    XTUISlider *view =  [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUISlider class]]) {
        return view.innerView.value;
    }
    return 0.0;
}

+ (void)xtr_setValue:(CGFloat)value animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTUISlider *view =  [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUISlider class]]) {
        [view.innerView setValue:value animated:animated];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _innerView = [[UISlider alloc] init];
        [_innerView addTarget:self action:@selector(onValueChanged) forControlEvents:UIControlEventValueChanged];
        [self addSubview:_innerView];
    }
    return self;
}

- (void)onValueChanged {
    [self.scriptObject invokeMethod:@"handleValueChanged" withArguments:@[]];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

@end
