//
//  XTRWindow.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRWindow.h"
#import "XTRUtils.h"
#import "XTRLayoutConstraint.h"
#import "XTRContext.h"
#import "XTRDebug.h"

@interface XTRWindow ()

@property (nonatomic, assign) NSTimeInterval longPressDuration;
@property (nonatomic, strong) UITapGestureRecognizer *tapGestureRecognizer;
@property (nonatomic, strong) UITapGestureRecognizer *doubleTapGestureRecognizer;
@property (nonatomic, strong) UILongPressGestureRecognizer *longPressGestureRecognizer;
@property (nonatomic, strong) UIPanGestureRecognizer *panGestureRecognizer;
@property (nonatomic, strong) XTRContext *context;
@property (nonatomic, strong) JSValue *scriptObject;
@property (nonatomic, strong) id keyboardWillShowObserver;
@property (nonatomic, strong) id keyboardWillHideObserver;

@end

@implementation XTRWindow

+ (NSString *)name {
    return @"XTRWindow";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRWindow *view = [[XTRWindow alloc] initWithFrame:[frame toRect]];
    [view setupDebug];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = (id)scriptObject.context;
    [view setupKeyboardNotifications];
    [((XTRContext *)[JSContext currentContext]).objectRefs store:view];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [view description]; }];
    return view.objectUUID;
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)dealloc {
    NSLog(@"XTRWindow Dealloc");
    [self unsetKeyboardNotifications];
}

- (void)setTranslatesAutoresizingMaskIntoConstraints:(BOOL)translatesAutoresizingMaskIntoConstraints {
    [super setTranslatesAutoresizingMaskIntoConstraints:YES];
}

- (void)xtr_makeKeyAndVisible {
    self.frame = [UIScreen mainScreen].bounds;
    self.context.bridge.keyWindow = self;
    if (self.context.bridge.application == [UIApplication sharedApplication]) {
        [self makeKeyAndVisible];
    }
}

- (JSValue *)xtr_rootViewController {
    return [JSValue fromObject:self.rootViewController context:self.context];
}

- (void)xtr_setRootViewController:(JSValue *)viewController {
    self.rootViewController = [viewController toViewController];
}

- (void)xtr_endEditing {
    [self endEditing:YES];
}

#pragma mark - Keyboard Notifications

- (void)setupKeyboardNotifications {
    __weak XTRWindow *welf = self;
    self.keyboardWillShowObserver = [[NSNotificationCenter defaultCenter] addObserverForName:UIKeyboardWillShowNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        __strong XTRWindow *strongSelf = welf;
        JSValue *value = strongSelf.scriptObject;
        if (value) {
            [value invokeMethod:@"handleKeyboardShow" withArguments:@[
                                                                      [JSValue fromRect:[note.userInfo[UIKeyboardFrameEndUserInfoKey] CGRectValue]],
                                                                      note.userInfo[UIKeyboardAnimationDurationUserInfoKey] ?: @(0),
                                                                      ]];
        }
    }];
    self.keyboardWillHideObserver = [[NSNotificationCenter defaultCenter] addObserverForName:UIKeyboardWillHideNotification object:nil queue:[NSOperationQueue mainQueue] usingBlock:^(NSNotification * _Nonnull note) {
        __strong XTRWindow *strongSelf = welf;
        JSValue *value = strongSelf.scriptObject;
        if (value) {
            [value invokeMethod:@"handleKeyboardHide" withArguments:@[
                                                                      note.userInfo[UIKeyboardAnimationDurationUserInfoKey] ?: @(0),
                                                                      ]];
        }
    }];
}

- (void)unsetKeyboardNotifications {
    [[NSNotificationCenter defaultCenter] removeObserver:self.keyboardWillShowObserver];
    [[NSNotificationCenter defaultCenter] removeObserver:self.keyboardWillHideObserver];
}

#pragma mark - XTRViewProtocol

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
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didAddSubview" withArguments:(subview != nil ? @[
                                                                                      [JSValue fromObject:subview context:self.context]
                                                                                      ] : @[])];
    }
}

- (void)willRemoveSubview:(UIView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willRemoveSubview" withArguments:(subview != nil ? @[
                                                                                          [JSValue fromObject:subview context:self.context]
                                                                                          ] : @[])];
    }
}

- (void)willMoveToSuperview:(UIView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToSuperview" withArguments:(newSuperview != nil ? @[
                                                                                                 [JSValue fromObject:newSuperview context:self.context]
                                                                                                 ] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(UIWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToWindow" withArguments:(newWindow != nil ? @[
                                                                                           [JSValue fromObject:newWindow context:self.context]
                                                                                           ] : @[])];
    }
}



- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject;
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
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"layoutSubviews" withArguments:@[]];
    }
}

- (NSArray *)xtr_constraints {
    NSMutableArray *output = [NSMutableArray array];
    for (NSLayoutConstraint *constraint in self.constraints) {
        XTRLayoutConstraint *v = [XTRLayoutConstraint new];
        v.innerObject = constraint;
        v.context = self.context;
        [output addObject:[JSValue fromObject:v context:self.context] ?: [NSNull null]];
    }
    return output;
}

- (void)xtr_addConstraint:(JSValue *)value {
    XTRLayoutConstraint *constraint = [value toLayoutConstraint];
    if (constraint) {
        [self addConstraint:constraint.innerObject];
    }
}

- (void)xtr_addConstraints:(JSValue *)value {
    NSArray *argConstraints = [value toArray];
    for (NSDictionary *cValue in argConstraints) {
        XTRLayoutConstraint *cObject = [[JSValue valueWithObject:cValue inContext:self.context] toLayoutConstraint];
        if (cObject) {
            [self addConstraint:cObject.innerObject];
        }
    }
}

- (void)xtr_removeConstraint:(JSValue *)value {
    XTRLayoutConstraint *constraint = [value toLayoutConstraint];
    if (constraint) {
        [self removeConstraint:constraint.innerObject];
    }
}

- (void)xtr_removeAllConstraints {
    [self removeConstraints:self.constraints];
}

- (BOOL)xtr_userInteractionEnabled {
    return self.userInteractionEnabled;
}

- (void)xtr_setUserInteractionEnabled:(JSValue *)value {
    self.userInteractionEnabled = [value toBool];
}

- (CGFloat)xtr_longPressDuration {
    return self.longPressDuration;
}

- (void)xtr_setLongPressDuration:(JSValue *)duration {
    self.longPressDuration = [duration toDouble];
}

- (void)xtr_activeTap {
    if (self.tapGestureRecognizer == nil) {
        self.tapGestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleTap)];
        [self addGestureRecognizer:self.tapGestureRecognizer];
    }
    if (self.doubleTapGestureRecognizer != nil) {
        [self.tapGestureRecognizer requireGestureRecognizerToFail:self.doubleTapGestureRecognizer];
    }
}

- (void)handleTap {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handleTap" withArguments:@[]];
    }
}

- (void)xtr_activeDoubleTap {
    if (self.doubleTapGestureRecognizer == nil) {
        self.doubleTapGestureRecognizer = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(handleDoubleTap)];
        self.doubleTapGestureRecognizer.numberOfTapsRequired = 2;
        [self addGestureRecognizer:self.doubleTapGestureRecognizer];
    }
    if (self.tapGestureRecognizer != nil) {
        [self.tapGestureRecognizer requireGestureRecognizerToFail:self.doubleTapGestureRecognizer];
    }
}

- (void)handleDoubleTap {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handleDoubleTap" withArguments:@[]];
    }
}

- (void)xtr_activeLongPress {
    if (self.longPressGestureRecognizer == nil) {
        self.longPressGestureRecognizer = [[UILongPressGestureRecognizer alloc] initWithTarget:self action:@selector(handleLongPress:)];
        [self addGestureRecognizer:self.longPressGestureRecognizer];
    }
    self.longPressGestureRecognizer.minimumPressDuration = self.longPressDuration > 0 ? self.longPressDuration : 0.25;
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

- (void)xtr_activePan {
    if (self.panGestureRecognizer == nil) {
        self.panGestureRecognizer = [[UIPanGestureRecognizer alloc] initWithTarget:self action:@selector(handlePan:)];
        [self addGestureRecognizer:self.panGestureRecognizer];
    }
}

- (void)handlePan:(UIPanGestureRecognizer *)sender {
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"handlePan" withArguments:@[
                                                                @(sender.state),
                                                                [JSValue fromPoint:[sender locationInView:self]],
                                                                [JSValue fromPoint:[sender locationInView:self.window]],
                                                                ]];
    }
}

+ (void)xtr_animationWithDuration:(JSValue *)duration
                        animation:(JSValue *)animation
                       completion:(JSValue *)completion {
    [UIView animateWithDuration:[duration toDouble] animations:^{
        if ([animation isObject]) {
            [animation xtr_callWithArguments:@[]];
        }
    } completion:^(BOOL finished) {
        if ([completion isObject]) {
            [completion xtr_callWithArguments:@[]];
        }
    }];
}

+ (void)xtr_animationWithBouncinessAndSpeed:(JSValue *)duration
                                    damping:(JSValue *)damping
                                   velocity:(JSValue *)velocity
                                  animation:(JSValue *)animation
                                 completion:(JSValue *)completion {
    [UIView animateWithDuration:[duration toDouble]
                          delay:0.0
         usingSpringWithDamping:[damping toDouble]
          initialSpringVelocity:[velocity toDouble]
                        options:kNilOptions
                     animations:^{
                         if ([animation isObject]) {
                             [animation xtr_callWithArguments:@[]];
                         }
                     } completion:^(BOOL finished) {
                         if ([completion isObject]) {
                             [completion xtr_callWithArguments:@[]];
                         }
                     }];
}

#pragma mark - XTRDEBUG

- (void)setupDebug {
    UITapGestureRecognizer *debugGesture = [[UITapGestureRecognizer alloc] init];
    debugGesture.numberOfTouchesRequired = 3;
    debugGesture.numberOfTapsRequired = 3;
    [debugGesture addTarget:self action:@selector(onDebug)];
    [self addGestureRecognizer:debugGesture];
}

#if TARGET_OS_SIMULATOR

- (void)motionBegan:(UIEventSubtype)motion withEvent:(UIEvent *)event {
    [self onDebug];
}

#endif

- (void)onDebug {
    [XTRDebug showMenu:self.context.bridge];
}

@end
