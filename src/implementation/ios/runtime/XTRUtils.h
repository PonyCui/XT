//
//  XTRUtils.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>

@interface XTRUtils : NSObject

@end

@interface JSValue (XTRUtils)

+ (nonnull NSDictionary *)fromRect:(CGRect)rect;
+ (nonnull NSDictionary *)fromSize:(CGSize)size;
+ (nonnull NSDictionary *)fromPoint:(CGPoint)point;
+ (nonnull NSDictionary *)fromTransform:(CGAffineTransform)transform;
- (CGAffineTransform)toTransform;
+ (nonnull NSDictionary *)fromColor:(nonnull UIColor *)color;
- (nullable UIColor *)toColor;
+ (nullable JSValue *)fromView:(nullable UIView *)view context:(nonnull JSContext *)context;
- (nullable UIView *)toView;
- (nullable UIWindow *)toWindow;

@end
