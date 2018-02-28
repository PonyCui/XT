//
//  XTUIUtils.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>

@class XTUIFont;

@interface XTUIUtils : NSObject

@end

@interface JSValue (XTUIUtils)

+ (nonnull NSDictionary *)fromRect:(CGRect)rect;
+ (nonnull NSDictionary *)fromInsets:(UIEdgeInsets)insets;
+ (nonnull NSDictionary *)fromSize:(CGSize)size;
+ (nonnull NSDictionary *)fromPoint:(CGPoint)point;
+ (nonnull NSDictionary *)fromTransform:(CGAffineTransform)transform;
- (CGAffineTransform)toTransform;
+ (nonnull NSDictionary *)fromColor:(nonnull UIColor *)color;
- (nullable UIColor *)toColor;
+ (nullable JSValue *)fromObject:(nullable id)object context:(nonnull JSContext *)context;
- (UIEdgeInsets)toInsets;

@end
