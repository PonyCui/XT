//
//  XTRButton.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRButton.h"
#import "XTRUtils.h"
#import "XTRImage.h"
#import "XTRFont.h"

@interface XTRButton ()

@property (nonatomic, strong) UIButton *innerView;
@property (nonatomic, assign) BOOL vertical;
@property (nonatomic, assign) CGFloat inset;
@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) JSManagedValue *scriptObject;

@end

@implementation XTRButton

+ (NSString *)name {
    return @"XTRButton";
}

+ (XTRButton *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRButton *view = [[XTRButton alloc] initWithFrame:[frame toRect]];
    view.innerView = [UIButton buttonWithType:UIButtonTypeSystem];
    view.innerView.adjustsImageWhenHighlighted = NO;
    [view.innerView setTitleColor:view.tintColor forState:UIControlStateNormal];
    [view addSubview:view.innerView];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = scriptObject.context;
    view.scriptObject = [JSManagedValue managedValueWithValue:scriptObject andOwner:view];
    return view;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

- (NSString *)xtr_title {
    return [self.innerView titleForState:UIControlStateNormal];
}

- (void)xtr_setTitle:(JSValue *)title {
    [self.innerView setTitle:[title toString] forState:UIControlStateNormal];
    [self resetInset];
}

- (JSValue *)xtr_font {
    return [JSValue fromObject:[XTRFont create:[[self.innerView titleLabel] font]] context:self.context];
}

- (void)xtr_setFont:(JSValue *)font {
    [self.innerView.titleLabel setFont:[font toFont].innerObject];
}

- (JSValue *)xtr_image {
    return [JSValue fromObject:[self.innerView imageForState:UIControlStateNormal] context:self.context];
}

- (void)xtr_setImage:(JSValue *)image {
    [self.innerView setImage:[[image toImage] nativeImage] forState:UIControlStateNormal];
    [self resetInset];
}

- (NSDictionary *)xtr_color; {
    return [JSValue fromColor:[self.innerView titleColorForState:UIControlStateNormal]];
}

- (void)xtr_setColor:(JSValue *)color; {
    [self.innerView setTitleColor:[color toColor] forState:UIControlStateNormal];
}

- (BOOL)xtr_vertical; {
    return self.vertical;
}

- (void)xtr_setVertical:(JSValue *)vertical; {
    self.vertical = [vertical toBool];
    [self resetInset];
}

- (NSNumber *)xtr_inset; {
    return @(self.inset);
}

- (void)xtr_setInset:(JSValue *)inset; {
    self.inset = [inset toDouble];
    [self resetInset];
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

@end