//
//  XTRView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRView;

@protocol XTRViewExport <JSExport>

@property (nonatomic, copy) NSString *objectUUID;
+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSDictionary *)xtr_frame;
- (void)xtr_setFrame:(JSValue *)frame;
- (NSDictionary *)xtr_bounds;
- (void)xtr_setBounds:(JSValue *)bounds;
- (NSDictionary *)xtr_center;
- (void)xtr_setCenter:(JSValue *)center;
- (NSDictionary *)xtr_transform;
- (void)xtr_setTransform:(JSValue *)transform;
- (BOOL)xtr_clipsToBounds;
- (void)xtr_setClipsToBounds:(JSValue *)clipsToBounds;
- (NSDictionary *)xtr_backgroundColor;
- (void)xtr_setBackgroundColor:(JSValue *)backgroundColor;
- (CGFloat)xtr_alpha;
- (void)xtr_setAlpha:(JSValue *)alpha;
- (BOOL)xtr_opaque;
- (void)xtr_setOpaque:(JSValue *)opaque;
- (BOOL)xtr_hidden;
- (void)xtr_setHidden:(JSValue *)hidden;
- (NSInteger)xtr_contentMode;
- (void)xtr_setContentMode:(JSValue *)contentMode;
- (XTRView *)xtr_maskView;
- (void)xtr_setMaskView:(JSValue *)maskView;
- (NSDictionary *)xtr_tintColor;
- (void)xtr_setTintColor:(JSValue *)tintColor;
- (CGFloat)xtr_cornerRadius;
- (void)xtr_setCornerRadius:(JSValue *)cornerRadius;
- (CGFloat)xtr_borderWidth;
- (void)xtr_setBorderWidth:(JSValue *)borderWidth;
- (NSDictionary *)xtr_borderColor;
- (void)xtr_setBorderColor:(JSValue *)borderColor;
- (NSDictionary *)xtr_shadowColor;
- (void)xtr_setShadowColor:(JSValue *)shadowColor;
- (CGFloat)xtr_shadowOpacity;
- (void)xtr_setShadowOpacity:(JSValue *)shadowOpacity;
- (NSDictionary *)xtr_shadowOffset;
- (void)xtr_setShadowOffset:(JSValue *)shadowOffset;
- (CGFloat)xtr_shadowRadius;
- (void)xtr_setShadowRadius:(JSValue *)shadowRadius;
- (NSInteger)xtr_tag;
- (void)xtr_setTag:(JSValue *)tag;
- (JSValue *)xtr_superview;
- (NSArray<JSValue *> *)xtr_subviews;
- (UIWindow *)xtr_window;
- (void)xtr_removeFromSuperview;
- (void)xtr_insertSubviewAtIndex:(JSValue *)subview atIndex:(JSValue *)atIndex;
- (void)xtr_exchangeSubviewAtIndex:(JSValue *)index1 index2:(JSValue *)index2;
- (void)xtr_addSubview:(JSValue *)subview;
- (void)xtr_insertSubviewBelow:(JSValue *)subview siblingSubview:(JSValue *)siblingSubview;
- (void)xtr_insertSubviewAbove:(JSValue *)subview siblingSubview:(JSValue *)siblingSubview;
- (void)xtr_bringSubviewToFront:(JSValue *)subview;
- (void)xtr_sendSubviewToBack:(JSValue *)subview;
- (BOOL)xtr_isDescendantOfView:(JSValue *)view;
- (JSValue *)xtr_viewWithTag:(JSValue *)tag;
- (void)xtr_setNeedsLayout;
- (void)xtr_layoutIfNeeded;
- (NSArray *)xtr_constraints;
- (void)xtr_addConstraint:(JSValue *)value;
- (void)xtr_addConstraints:(JSValue *)value;
- (void)xtr_removeConstraint:(JSValue *)value;
- (void)xtr_removeAllConstraints;
- (BOOL)xtr_userInteractionEnabled;
- (void)xtr_setUserInteractionEnabled:(JSValue *)value;
- (CGFloat)xtr_longPressDuration;
- (void)xtr_setLongPressDuration:(JSValue *)duration;
- (void)xtr_activeTap;
- (void)xtr_activeDoubleTap;
- (void)xtr_activeLongPress;
- (void)xtr_activePan;
+ (void)xtr_animationWithDuration:(JSValue *)duration
                        animation:(JSValue *)animation
                       completion:(JSValue *)completion;
+ (void)xtr_animationWithBouncinessAndSpeed:(JSValue *)duration
                                    damping:(JSValue *)damping
                                   velocity:(JSValue *)velocity
                                  animation:(JSValue *)animation
                                 completion:(JSValue *)completion;

@end

@interface XTRView : UIView<XTRComponent, XTRViewExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, weak) JSContext *context;
@property (nonatomic, readonly) JSValue *scriptObject;

@end
