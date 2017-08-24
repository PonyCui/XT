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

+ (NSDictionary *)fromRect:(CGRect)rect;
+ (NSDictionary *)fromSize:(CGSize)size;
+ (NSDictionary *)fromPoint:(CGPoint)point;
+ (NSDictionary *)fromTransform:(CGAffineTransform)transform;
- (CGAffineTransform)toTransform;
+ (NSDictionary *)fromColor:(UIColor *)color;
- (UIColor *)toColor;

@end
