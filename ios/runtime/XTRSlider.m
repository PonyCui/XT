//
//  XTRSlider.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRSlider.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTRSlider()

@property (nonatomic, strong) UISlider *innerView;

@end

@implementation XTRSlider

+ (NSString *)name {
    return @"XTRSlider";
}

+ (NSString *)create {
    XTRSlider *view = [[XTRSlider alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (CGFloat)xtr_value:(NSString *)objectRef {
    XTRSlider *view =  [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRSlider class]]) {
        return view.innerView.value;
    }
    return 0.0;
}

+ (void)xtr_setValue:(CGFloat)value animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTRSlider *view =  [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRSlider class]]) {
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
