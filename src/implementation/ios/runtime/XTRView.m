//
//  XTRView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRUtils.h"

@interface XTRView ()

@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) JSManagedValue *scriptObject;

@end

@implementation XTRView

+ (NSString *)name {
    return @"XTRView";
}

+ (XTRView *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRView *view = [[XTRView alloc] initWithFrame:[frame toRect]];
    view.context = scriptObject.context;
    view.scriptObject = [JSManagedValue managedValueWithValue:scriptObject andOwner:view];
    return view;
}

- (NSDictionary *)xtr_frame {
    return [JSValue fromRect:self.frame];
}

- (void)xtr_setFrame:(JSValue *)frame {
    self.frame = [frame toRect];
}

- (NSDictionary *)xtr_bounds {
    return [JSValue fromRect:self.bounds];
}

- (void)xtr_setBounds:(JSValue *)bounds {
    self.bounds = [bounds toRect];
}

- (NSDictionary *)xtr_center {
    return [JSValue fromPoint:self.center];
}

- (void)xtr_setCenter:(JSValue *)center {
    self.center = [center toPoint];
}

- (NSDictionary *)xtr_transform {
    return [JSValue fromTransform:self.transform];
}

- (void)xtr_setTransform:(JSValue *)transform {
    self.transform = [transform toTransform];
}

- (BOOL)xtr_clipsToBounds {
    return self.clipsToBounds;
}

- (void)xtr_setClipsToBounds:(JSValue *)clipsToBounds {
    self.clipsToBounds = [clipsToBounds toBool];
}

- (NSDictionary *)xtr_backgroundColor {
    if (self.backgroundColor != nil) {
        return [JSValue fromColor: self.backgroundColor];
    }
    return nil;
}

- (void)xtr_setBackgroundColor:(JSValue *)backgroundColor {
    self.backgroundColor = [backgroundColor toColor];
}

- (CGFloat)xtr_alpha {
    return self.alpha;
}

- (void)xtr_setAlpha:(JSValue *)alpha {
    self.alpha = [alpha toDouble];
}

- (BOOL)xtr_opaque {
    return self.opaque;
}

- (void)xtr_setOpaque:(JSValue *)opaque {
    self.opaque = [opaque toBool];
}

- (BOOL)xtr_hidden {
    return self.hidden;
}

- (void)xtr_setHidden:(JSValue *)hidden {
    self.hidden = [hidden toBool];
}

- (NSInteger)xtr_contentMode {
    return self.contentMode;
}

- (void)xtr_setContentMode:(JSValue *)contentMode {
    self.contentMode = [contentMode toInt32];
}

- (XTRView *)xtr_maskView {
    return nil;
}

- (void)xtr_setMaskView:(JSValue *)maskView {
    
}

- (NSDictionary *)xtr_tintColor {
    if (self.tintColor != nil) {
        return [JSValue fromColor:self.tintColor];
    }
    else {
        return nil;
    }
}

- (void)xtr_setTintColor:(JSValue *)tintColor {
    self.tintColor = [tintColor toColor];
}

- (CGFloat)xtr_cornerRadius {
    return self.layer.cornerRadius;
}

- (void)xtr_setCornerRadius:(JSValue *)cornerRadius {
    self.layer.cornerRadius = [cornerRadius toDouble];
}

- (CGFloat)xtr_borderWidth {
    return self.layer.borderWidth;
}

- (void)xtr_setBorderWidth:(JSValue *)borderWidth {
    self.layer.borderWidth = [borderWidth toDouble];
}

- (NSDictionary *)xtr_borderColor {
    return [JSValue fromColor:[UIColor colorWithCGColor:self.layer.borderColor]];
}

- (void)xtr_setBorderColor:(JSValue *)borderColor {
    self.layer.borderColor = [[borderColor toColor] CGColor];
}

- (NSDictionary *)xtr_shadowColor {
    return [JSValue fromColor:[UIColor colorWithCGColor:self.layer.shadowColor]];
}

- (void)xtr_setShadowColor:(JSValue *)shadowColor {
    self.layer.shadowColor = [[shadowColor toColor] CGColor];
}

- (CGFloat)xtr_shadowOpacity {
    return (CGFloat)self.layer.shadowOpacity;
}

- (void)xtr_setShadowOpacity:(JSValue *)shadowOpacity {
    self.layer.shadowOpacity = (float)[shadowOpacity toDouble];
}

- (NSDictionary *)xtr_shadowOffset{
    return [JSValue fromSize:self.layer.shadowOffset];
}

- (void)xtr_setShadowOffset:(JSValue *)shadowOffset{
    self.layer.shadowOffset = [shadowOffset toSize];
}

- (CGFloat)xtr_shadowRadius{
    return self.layer.shadowRadius;
}

- (void)xtr_setShadowRadius:(JSValue *)shadowRadius{
    self.layer.shadowRadius = [shadowRadius toDouble];
}

- (NSInteger)xtr_tag{
    return self.tag;
}

- (void)xtr_setTag:(JSValue *)tag{
    self.tag = [tag toInt32];
}

- (JSValue *)xtr_superview {
    return [JSValue fromObject:self.superview context:self.context];
}

- (NSArray<JSValue *> *)xtr_subviews {
    NSMutableArray *subviews = [NSMutableArray array];
    for (UIView *subview in self.subviews) {
        [subviews addObject:[JSValue fromObject:subview context:self.context] ?: [NSNull null]];
    }
    return [subviews copy];
}

- (UIWindow *)xtr_window {
    return self.window;
}

- (void)xtr_removeFromSuperview {
    [self removeFromSuperview];
}

- (void)xtr_insertSubviewAtIndex:(JSValue *)subview atIndex:(JSValue *)atIndex {
    UIView *view = [subview toView];
    if (view) {
        [self insertSubview:view atIndex:[atIndex toInt32]];
    }
}

- (void)xtr_exchangeSubviewAtIndex:(JSValue *)index1 index2:(JSValue *)index2 {
    [self exchangeSubviewAtIndex:[index1 toInt32] withSubviewAtIndex:[index2 toInt32]];
}

- (void)xtr_addSubview:(JSValue *)subview {
    UIView *view = [subview toView];
    if (view) {
        [self addSubview:view];
    }
}

- (void)xtr_insertSubviewBelow:(JSValue *)subview siblingSubview:(JSValue *)siblingSubview {
    UIView *view = [subview toView];
    UIView *siblingView = [siblingSubview toView];
    if (view && siblingView) {
        [self insertSubview:view belowSubview:siblingView];
    }
}

- (void)xtr_insertSubviewAbove:(JSValue *)subview siblingSubview:(JSValue *)siblingSubview {
    UIView *view = [subview toView];
    UIView *siblingView = [siblingSubview toView];
    if (view && siblingView) {
        [self insertSubview:view aboveSubview:siblingView];
    }
}

- (void)xtr_bringSubviewToFront:(JSValue *)subview {
    UIView *view = [subview toView];
    if (view) {
        [self bringSubviewToFront:view];
    }
}

- (void)xtr_sendSubviewToBack:(JSValue *)subview {
    UIView *view = [subview toView];
    if (view) {
        [self sendSubviewToBack:view];
    }
}

- (void)didAddSubview:(UIView *)subview {
    [super didAddSubview:subview];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didAddSubview" withArguments:(subview != nil ? @[
                                                                                      [JSValue fromObject:subview context:self.context]
                                                                                      ] : @[])];
    }
}

- (void)willRemoveSubview:(UIView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willRemoveSubview" withArguments:(subview != nil ? @[
                                                                                          [JSValue fromObject:subview context:self.context]
                                                                                          ] : @[])];
    }
}

- (void)willMoveToSuperview:(UIView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToSuperview" withArguments:(newSuperview != nil ? @[
                                                                                                 [JSValue fromObject:newSuperview context:self.context]
                                                                                                 ] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(UIWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToWindow" withArguments:(newWindow != nil ? @[
                                                                                           [JSValue fromObject:newWindow context:self.context]
                                                                                           ] : @[])];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToWindow" withArguments:@[]];
    }
}

- (BOOL)xtr_isDescendantOfView:(JSValue *)view {
    UIView *aView = [view toView];
    if (aView) {
        return [self isDescendantOfView:aView];
    }
    return NO;
}

- (JSValue *)xtr_viewWithTag:(JSValue *)tag {
    return [JSValue fromObject:[self viewWithTag:[tag toInt32]] context:self.context];
}

- (void)xtr_setNeedsLayout {
    [self setNeedsLayout];
}

- (void)xtr_layoutIfNeeded {
    [self layoutIfNeeded];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    JSValue *scriptObject = self.scriptObject.value;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"layoutSubviews" withArguments:@[]];
    }
}

@end
