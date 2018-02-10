//
//  XTUIView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTUIUtils.h"
#import "XTUILayoutConstraint.h"
#import "XTContext.h"
#import "XTUIWindow.h"
#import "XTUIContext.h"
#import "XTMemoryManager.h"

@interface XTUIView ()

@property (nonatomic, assign) NSTimeInterval longPressDuration;
@property (nonatomic, strong) UITapGestureRecognizer *tapGestureRecognizer;
@property (nonatomic, strong) UITapGestureRecognizer *doubleTapGestureRecognizer;
@property (nonatomic, strong) UILongPressGestureRecognizer *longPressGestureRecognizer;
@property (nonatomic, strong) UIPanGestureRecognizer *panGestureRecognizer;

@end

@implementation XTUIView

+ (NSString *)name {
    return @"_XTUIView";
}

+ (NSString *)create {
    XTUIView *view = [[self alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

#ifdef LOGDEALLOC
- (void)dealloc {
    NSLog(@"XTUIView dealloc.");
}
#endif

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

+ (NSDictionary *)xtr_frame:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromRect:obj.frame];
    }
    return @{};
}

+ (void)xtr_setFrame:(JSValue *)frame objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.frame = [frame toRect];
    }
}

+ (NSDictionary *)xtr_bounds:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromRect:obj.bounds];
    }
    return @{};
}

+ (void)xtr_setBounds:(JSValue *)bounds objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.bounds = [bounds toRect];
    }
}

+ (NSDictionary *)xtr_center:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromPoint:obj.center];
    }
    return @{};
}

+ (void)xtr_setCenter:(JSValue *)center objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.center = [center toPoint];
    }
}

+ (NSDictionary *)xtr_transform:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromTransform:obj.transform];
    }
    return @{};
}

+ (void)xtr_setTransform:(JSValue *)transform objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.transform = [transform toTransform];
    }
}

+ (BOOL)xtr_clipsToBounds:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.clipsToBounds;
    }
    return NO;
}

+ (void)xtr_setClipsToBounds:(BOOL)clipsToBounds objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.clipsToBounds = clipsToBounds;
    }
}

+ (NSDictionary *)xtr_backgroundColor:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromColor:obj.backgroundColor];
    }
    return @{};
}

+ (void)xtr_setBackgroundColor:(JSValue *)backgroundColor objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.backgroundColor = [backgroundColor toColor];
    }
}

+ (CGFloat)xtr_alpha:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.alpha;
    }
    return 0.0;
}

+ (void)xtr_setAlpha:(CGFloat)alpha objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.alpha = alpha;
    }
}

+ (BOOL)xtr_opaque:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.opaque;
    }
    return NO;
}

+ (void)xtr_setOpaque:(BOOL)opaque objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.opaque = opaque;
    }
}

+ (BOOL)xtr_hidden:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.hidden;
    }
    return NO;
}

+ (void)xtr_setHidden:(BOOL)hidden objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.hidden = hidden;
    }
}

+ (NSInteger)xtr_contentMode:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.contentMode;
    }
    return 0;
}

+ (void)xtr_setContentMode:(NSInteger)contentMode objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.contentMode = contentMode;
    }
}

+ (NSString *)xtr_maskView:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        id maskView = (id)obj.maskView;
        if ([maskView conformsToProtocol:@protocol(XTComponent)]) {
            return [maskView objectUUID];
        }
    }
    return nil;
}

+ (void)xtr_setMaskView:(NSString *)maskViewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *maskView = [XTMemoryManager find:maskViewRef];
    if ([obj isKindOfClass:[UIView class]]) {
        if ([maskView isKindOfClass:[UIView class]]) {
            obj.maskView = maskView;
        }
        else {
            obj.maskView = nil;
        }
    }
}

+ (NSDictionary *)xtr_tintColor:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromColor:obj.tintColor];
    }
    return @{};
}

+ (void)xtr_setTintColor:(JSValue *)tintColor objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.tintColor = [tintColor toColor];
    }
}

+ (CGFloat)xtr_cornerRadius:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.layer.cornerRadius;
    }
    return 0;
}

+ (void)xtr_setCornerRadius:(CGFloat)cornerRadius objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.cornerRadius = cornerRadius;
    }
}

+ (CGFloat)xtr_borderWidth:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.layer.borderWidth;
    }
    return 0;
}

+ (void)xtr_setBorderWidth:(CGFloat)borderWidth objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.borderWidth = borderWidth;
    }
}

+ (NSDictionary *)xtr_borderColor:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromColor:[UIColor colorWithCGColor:obj.layer.borderColor]];
    }
    return @{};
}

+ (void)xtr_setBorderColor:(JSValue *)borderColor objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.borderColor = [borderColor toColor].CGColor;
    }
}

+ (NSDictionary *)xtr_shadowColor:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromColor:[UIColor colorWithCGColor:obj.layer.shadowColor]];
    }
    return @{};
}

+ (void)xtr_setShadowColor:(JSValue *)shadowColor objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.shadowColor = [shadowColor toColor].CGColor;
    }
}

+ (CGFloat)xtr_shadowOpacity:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return (CGFloat)obj.layer.shadowOpacity;
    }
    return 0;
}

+ (void)xtr_setShadowOpacity:(CGFloat)shadowOpacity objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.shadowOpacity = shadowOpacity;
    }
}

+ (NSDictionary *)xtr_shadowOffset:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return [JSValue fromSize:obj.layer.shadowOffset];
    }
    return @{};
}

+ (void)xtr_setShadowOffset:(JSValue *)shadowOffset objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.shadowOffset = [shadowOffset toSize];
    }
}

+ (CGFloat)xtr_shadowRadius:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.layer.shadowRadius;
    }
    return 0;
}

+ (void)xtr_setShadowRadius:(CGFloat)shadowRadius objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.layer.shadowRadius = shadowRadius;
    }
}

+ (NSInteger)xtr_tag:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.tag;
    }
    return 0;
}

+ (void)xtr_setTag:(NSInteger)tag objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.tag = tag;
    }
}

+ (NSString *)xtr_superview:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        id superview = (id)obj.superview;
        if ([superview conformsToProtocol:@protocol(XTComponent)]) {
            return [superview objectUUID];
        }
    }
    return nil;
}

+ (NSArray<NSString *> *)xtr_subviews:(NSString *)objectRef {
    NSMutableArray *subviews = [NSMutableArray array];
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        for (id subview in obj.subviews) {
            if ([subview conformsToProtocol:@protocol(XTComponent)]) {
                [subviews addObject:[subview objectUUID] ?: @""];
            }
        }
    }
    return [subviews copy];
}

+ (NSString *)xtr_window:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        id window = (id)obj.window;
        if ([window conformsToProtocol:@protocol(XTComponent)]) {
            return [window objectUUID];
        }
        else if ([obj isKindOfClass:[XTUIView class]]) {
            XTUIContext *bridge = (id)[(XTUIView *)obj context];
            if ([bridge isKindOfClass:[XTUIContext class]]) {
                XTUIWindow *window = (id)bridge.application.delegate.window;
                if ([window isKindOfClass:[XTUIWindow class]]) {
                    return window.objectUUID;
                }
            }
        }
        else if ([window isKindOfClass:[UIWindow class]]) {
            XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:window];
            [XTMemoryManager add:managedObject];
            return managedObject.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_removeFromSuperview:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        [obj removeFromSuperview];
    }
}

+ (void)xtr_insertSubviewAtIndex:(NSString *)subviewRef atIndex:(NSInteger)atIndex objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *subview = [XTMemoryManager find:subviewRef];
    if ([obj isKindOfClass:[UIView class]] && [subview isKindOfClass:[UIView class]]) {
        [obj insertSubview:subview atIndex:atIndex];
    }
}

+ (void)xtr_exchangeSubviewAtIndex:(NSInteger)index1 index2:(NSInteger)index2 objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        [obj exchangeSubviewAtIndex:index1 withSubviewAtIndex:index2];
    }
}

+ (void)xtr_addSubview:(NSString *)subviewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *subview = [XTMemoryManager find:subviewRef];
    if ([obj isKindOfClass:[UIView class]] && [subview isKindOfClass:[UIView class]]) {
        [obj addSubview:subview];
    }
}

+ (void)xtr_insertSubviewBelow:(NSString *)subviewRef siblingSubview:(NSString *)siblingSubviewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *subview = [XTMemoryManager find:subviewRef];
    UIView *siblingSubview = [XTMemoryManager find:siblingSubviewRef];
    if ([obj isKindOfClass:[UIView class]] && [subview isKindOfClass:[UIView class]] && [siblingSubview isKindOfClass:[UIView class]]) {
        [obj insertSubview:subview belowSubview:siblingSubview];
    }
}

+ (void)xtr_insertSubviewAbove:(NSString *)subviewRef siblingSubview:(NSString *)siblingSubviewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *subview = [XTMemoryManager find:subviewRef];
    UIView *siblingSubview = [XTMemoryManager find:siblingSubviewRef];
    if ([obj isKindOfClass:[UIView class]] && [subview isKindOfClass:[UIView class]] && [siblingSubview isKindOfClass:[UIView class]]) {
        [obj insertSubview:subview aboveSubview:siblingSubview];
    }
}

+ (void)xtr_bringSubviewToFront:(NSString *)subviewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *subview = [XTMemoryManager find:subviewRef];
    if ([obj isKindOfClass:[UIView class]] && [subview isKindOfClass:[UIView class]]) {
        [obj bringSubviewToFront:subview];
    }
}

+ (void)xtr_sendSubviewToBack:(NSString *)subviewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *subview = [XTMemoryManager find:subviewRef];
    if ([obj isKindOfClass:[UIView class]] && [subview isKindOfClass:[UIView class]]) {
        [obj sendSubviewToBack:subview];
    }
}

- (void)didAddSubview:(XTUIView *)subview {
    [super didAddSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_didAddSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                   ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willRemoveSubview:(XTUIView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_willRemoveSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                       ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willMoveToSuperview:(XTUIView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_willMoveToSuperview" withArguments:([newSuperview conformsToProtocol:@protocol(XTComponent)]
                                                                         ? @[[newSuperview objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(XTUIWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_willMoveToWindow" withArguments:([newWindow conformsToProtocol:@protocol(XTComponent)]
                                                                      ? @[[newWindow objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"_didMoveToWindow" withArguments:@[]];
    }
}

+ (BOOL)xtr_isDescendantOfView:(NSString *)viewRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    UIView *view = [XTMemoryManager find:viewRef];
    if ([obj isKindOfClass:[UIView class]] && [view isKindOfClass:[UIView class]]) {
        return [obj isDescendantOfView:view];
    }
    return NO;
}

+ (NSString *)xtr_viewWithTag:(NSInteger)tag objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        id view = [obj viewWithTag:tag];
        if ([view conformsToProtocol:@protocol(XTComponent)]) {
            return [view objectUUID];
        }
    }
    return nil;
}

+ (void)xtr_setNeedsLayout:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        [obj setNeedsLayout];
    }
}

+ (void)xtr_layoutIfNeeded:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        [obj layoutIfNeeded];
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"layoutSubviews" withArguments:@[]];
    }
}

+ (NSArray<NSString *> *)xtr_constraints:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    NSMutableArray *output = [NSMutableArray array];
    if ([obj isKindOfClass:[UIView class]]) {
        for (XTUILayoutConstraint *constraint in obj.constraints) {
            [output addObject:constraint.objectUUID ?: @""];
        }
    }
    return output.copy;
}

+ (void)xtr_addConstraint:(NSString *)valueRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    XTUILayoutConstraint *constraint = [XTMemoryManager find:valueRef];
    if ([obj isKindOfClass:[UIView class]] && [constraint isKindOfClass:[XTUILayoutConstraint class]]) {
        [obj addConstraint:constraint.innerObject];
    }
}

+ (void)xtr_addConstraints:(JSValue *)value objectRef:(NSString *)objectRef {
    NSArray *constraintsRef = [value toArray];
    for (NSString *constraintRef in constraintsRef) {
        [self xtr_addConstraint:constraintRef objectRef:objectRef];
    }
}

+ (void)xtr_removeConstraint:(NSString *)valueRef objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    XTUILayoutConstraint *constraint = [XTMemoryManager find:valueRef];
    if ([obj isKindOfClass:[UIView class]] && [constraint isKindOfClass:[XTUILayoutConstraint class]]) {
        [obj removeConstraint:constraint.innerObject];
    }
}

+ (void)xtr_removeAllConstraints:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        [obj removeConstraints:obj.constraints];
    }
}

+ (BOOL)xtr_userInteractionEnabled:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        return obj.userInteractionEnabled;
    }
    return NO;
}

+ (void)xtr_setUserInteractionEnabled:(BOOL)value objectRef:(NSString *)objectRef {
    UIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[UIView class]]) {
        obj.userInteractionEnabled = value;
    }
}

+ (CGFloat)xtr_longPressDuration:(NSString *)objectRef {
    XTUIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIView class]]) {
        return obj.longPressDuration;
    }
    return 0;
}

+ (void)xtr_setLongPressDuration:(CGFloat)duration objectRef:(NSString *)objectRef {
    XTUIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIView class]]) {
        obj.longPressDuration = duration;
    }
}

+ (void)xtr_activeTap:(NSString *)objectRef {
    XTUIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIView class]]) {
        if (obj.tapGestureRecognizer == nil) {
            obj.tapGestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:obj action:@selector(handleTap)];
            [obj addGestureRecognizer:obj.tapGestureRecognizer];
        }
        if (obj.doubleTapGestureRecognizer != nil) {
            [obj.tapGestureRecognizer requireGestureRecognizerToFail:obj.doubleTapGestureRecognizer];
        }
    }
}

- (void)handleTap {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handleTap" withArguments:@[]];
    }
}

+ (void)xtr_activeDoubleTap:(NSString *)objectRef {
    XTUIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIView class]]) {
        if (obj.doubleTapGestureRecognizer == nil) {
            obj.doubleTapGestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:obj action:@selector(handleDoubleTap)];
            obj.doubleTapGestureRecognizer.numberOfTapsRequired = 2;
            [obj addGestureRecognizer:obj.doubleTapGestureRecognizer];
        }
        if (obj.tapGestureRecognizer != nil) {
            [obj.tapGestureRecognizer requireGestureRecognizerToFail:obj.doubleTapGestureRecognizer];
        }
    }
}

- (void)handleDoubleTap {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handleDoubleTap" withArguments:@[]];
    }
}

+ (void)xtr_activeLongPress:(NSString *)objectRef {
    XTUIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIView class]]) {
        if (obj.longPressGestureRecognizer == nil) {
            obj.longPressGestureRecognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:obj action:@selector(handleLongPress:)];
            [obj addGestureRecognizer:obj.longPressGestureRecognizer];
        }
        obj.longPressGestureRecognizer.minimumPressDuration = obj.longPressDuration > 0 ? obj.longPressDuration : 0.25;
    }
}

- (void)handleLongPress:(UILongPressGestureRecognizer *)sender {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handleLongPress" withArguments:@[
                                                                      @(sender.state),
                                                                      [JSValue fromPoint:[sender locationInView:self]],
                                                                      [JSValue fromPoint:[sender locationInView:self.window]],
                                                                      ]];
    }
}

+ (void)xtr_activePan:(NSString *)objectRef {
    XTUIView *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIView class]]) {
        if (obj.panGestureRecognizer == nil) {
            obj.panGestureRecognizer = [[UIPanGestureRecognizer alloc] initWithTarget:obj action:@selector(handlePan:)];
            [obj addGestureRecognizer:obj.panGestureRecognizer];
        }
    }
}

- (void)handlePan:(UIPanGestureRecognizer *)sender {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handlePan"
                     withArguments:@[
                                        @(sender.state),
                                        [JSValue fromPoint:[sender locationInView:self]],
                                        [JSValue fromPoint:[sender locationInView:self.window]],
                                        [JSValue fromPoint:[sender velocityInView:nil]],
                                        [JSValue fromPoint:[sender translationInView:nil]],
                                    ]];
    }
}

+ (void)xtr_animationWithDuration:(CGFloat)duration
                        animation:(JSValue *)animation
                       completion:(JSValue *)completion {
    [UIView animateWithDuration:duration animations:^{
        if ([animation isObject]) {
            [animation callWithArguments:@[]];
        }
    } completion:^(BOOL finished) {
        if ([completion isObject]) {
            [completion callWithArguments:@[]];
        }
    }];
}

+ (void)xtr_animationWithBounciness:(CGFloat)duration
                         bounciness:(CGFloat)bounciness
                           velocity:(CGFloat)velocity
                          animation:(JSValue *)animation
                         completion:(JSValue *)completion {
    CGFloat damping = 1.0 - (bounciness / 100.0);
    [UIView animateWithDuration:duration
                          delay:0.0
         usingSpringWithDamping:damping
          initialSpringVelocity:velocity
                        options:kNilOptions
                     animations:^{
                         if ([animation isObject]) {
                             [animation callWithArguments:@[]];
                         }
                     } completion:^(BOOL finished) {
                         if ([completion isObject]) {
                             [completion callWithArguments:@[]];
                         }
                     }];
}

@end
