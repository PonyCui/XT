//
//  XTUIView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTUIView;

@protocol XTUIViewExport <JSExport>

+ (NSString *)create;
+ (NSDictionary *)xtr_frame:(NSString *)objectRef;
+ (void)xtr_setFrame:(JSValue *)frame objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_bounds:(NSString *)objectRef;
+ (void)xtr_setBounds:(JSValue *)bounds objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_center:(NSString *)objectRef;
+ (void)xtr_setCenter:(JSValue *)center objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_transform:(NSString *)objectRef;
+ (void)xtr_setTransform:(JSValue *)transform objectRef:(NSString *)objectRef;
+ (BOOL)xtr_clipsToBounds:(NSString *)objectRef;
+ (void)xtr_setClipsToBounds:(BOOL)clipsToBounds objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_backgroundColor:(NSString *)objectRef;
+ (void)xtr_setBackgroundColor:(JSValue *)backgroundColor objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_alpha:(NSString *)objectRef;
+ (void)xtr_setAlpha:(CGFloat)alpha objectRef:(NSString *)objectRef;
+ (BOOL)xtr_opaque:(NSString *)objectRef;
+ (void)xtr_setOpaque:(BOOL)opaque objectRef:(NSString *)objectRef;
+ (BOOL)xtr_hidden:(NSString *)objectRef;
+ (void)xtr_setHidden:(BOOL)hidden objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_contentMode:(NSString *)objectRef;
+ (void)xtr_setContentMode:(NSInteger)contentMode objectRef:(NSString *)objectRef;
+ (NSString *)xtr_maskView:(NSString *)objectRef;
+ (void)xtr_setMaskView:(NSString *)maskViewRef objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_tintColor:(NSString *)objectRef;
+ (void)xtr_setTintColor:(JSValue *)tintColor objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_cornerRadius:(NSString *)objectRef;
+ (void)xtr_setCornerRadius:(CGFloat)cornerRadius objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_borderWidth:(NSString *)objectRef;
+ (void)xtr_setBorderWidth:(CGFloat)borderWidth objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_borderColor:(NSString *)objectRef;
+ (void)xtr_setBorderColor:(JSValue *)borderColor objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_shadowColor:(NSString *)objectRef;
+ (void)xtr_setShadowColor:(JSValue *)shadowColor objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_shadowOpacity:(NSString *)objectRef;
+ (void)xtr_setShadowOpacity:(CGFloat)shadowOpacity objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_shadowOffset:(NSString *)objectRef;
+ (void)xtr_setShadowOffset:(JSValue *)shadowOffset objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_shadowRadius:(NSString *)objectRef;
+ (void)xtr_setShadowRadius:(CGFloat)shadowRadius objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_tag:(NSString *)objectRef;
+ (void)xtr_setTag:(NSInteger)tag objectRef:(NSString *)objectRef;
+ (NSString *)xtr_superview:(NSString *)objectRef;
+ (NSArray<NSString *> *)xtr_subviews:(NSString *)objectRef;
+ (NSString *)xtr_window:(NSString *)objectRef;
+ (void)xtr_removeFromSuperview:(NSString *)objectRef;
+ (void)xtr_insertSubviewAtIndex:(NSString *)subviewRef atIndex:(NSInteger)atIndex objectRef:(NSString *)objectRef;
+ (void)xtr_exchangeSubviewAtIndex:(NSInteger)index1 index2:(NSInteger)index2 objectRef:(NSString *)objectRef;
+ (void)xtr_addSubview:(NSString *)subviewRef  objectRef:(NSString *)objectRef;
+ (void)xtr_insertSubviewBelow:(NSString *)subviewRef siblingSubview:(NSString *)siblingSubviewRef objectRef:(NSString *)objectRef;
+ (void)xtr_insertSubviewAbove:(NSString *)subviewRef siblingSubview:(NSString *)siblingSubviewRef objectRef:(NSString *)objectRef;
+ (void)xtr_bringSubviewToFront:(NSString *)subviewRef objectRef:(NSString *)objectRef;
+ (void)xtr_sendSubviewToBack:(NSString *)subviewRef objectRef:(NSString *)objectRef;
+ (BOOL)xtr_isDescendantOfView:(NSString *)viewRef objectRef:(NSString *)objectRef;
+ (NSString *)xtr_viewWithTag:(NSInteger)tag objectRef:(NSString *)objectRef;
+ (void)xtr_setNeedsLayout:(NSString *)objectRef;
+ (void)xtr_layoutIfNeeded:(NSString *)objectRef;
+ (NSArray<NSString *> *)xtr_constraints:(NSString *)objectRef;
+ (void)xtr_addConstraint:(NSString *)valueRef objectRef:(NSString *)objectRef;
+ (void)xtr_addConstraints:(JSValue *)value objectRef:(NSString *)objectRef;
+ (void)xtr_removeConstraint:(NSString *)valueRef objectRef:(NSString *)objectRef;
+ (void)xtr_removeAllConstraints:(NSString *)objectRef;
+ (BOOL)xtr_userInteractionEnabled:(NSString *)objectRef;
+ (void)xtr_setUserInteractionEnabled:(BOOL)value objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_longPressDuration:(NSString *)objectRef;
+ (void)xtr_setLongPressDuration:(CGFloat)duration objectRef:(NSString *)objectRef;
+ (void)xtr_activeTap:(NSString *)objectRef;
+ (void)xtr_activeDoubleTap:(NSString *)objectRef;
+ (void)xtr_activeLongPress:(NSString *)objectRef;
+ (void)xtr_activePan:(NSString *)objectRef;
+ (void)xtr_animationWithDuration:(CGFloat)duration
                        animation:(JSValue *)animation
                       completion:(JSValue *)completion;
+ (void)xtr_animationWithBounciness:(CGFloat)duration
                         bounciness:(CGFloat)bounciness
                           velocity:(CGFloat)velocity
                          animation:(JSValue *)animation
                         completion:(JSValue *)completion;

@end

@interface XTUIView : UIView<XTComponent, XTUIViewExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
