//
//  XTRSwitch.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRSwitch.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRSwitch()

@property (nonatomic, strong) UISwitch *innerView;

@end

@implementation XTRSwitch

+ (NSString *)name {
    return @"XTRSwitch";
}

+ (NSString *)create {
    XTRSwitch *view = [[XTRSwitch alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (BOOL)xtr_on:(NSString *)objectRef {
    XTRSwitch *view =  [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRSwitch class]]) {
        return view.innerView.isOn;
    }
    return NO;
}

+ (void)xtr_setOn:(BOOL)value animated:(BOOL)animated objectRef:(NSString *)objectRef {
    XTRSwitch *view =  [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRSwitch class]]) {
        [view.innerView setOn:value animated:animated];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _innerView = [[UISwitch alloc] init];
        [_innerView setOnTintColor:self.tintColor];
        [_innerView addTarget:self action:@selector(onValueChanged) forControlEvents:UIControlEventValueChanged];
        [self addSubview:_innerView];
    }
    return self;
}

- (void)onValueChanged {
    [self.scriptObject invokeMethod:@"handleValueChanged" withArguments:@[]];
}

- (void)tintColorDidChange {
    [super tintColorDidChange];
    [self.innerView setOnTintColor:self.tintColor];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.center = CGPointMake(self.bounds.size.width / 2.0, self.bounds.size.height / 2.0);
}

@end
