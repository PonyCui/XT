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

+ (XTRView *)create:(JSValue *)frame;
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
- (NSInteger)xtr_alpha;
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

@end

@interface XTRView : UIView<XTRComponent, XTRViewExport>

@end
