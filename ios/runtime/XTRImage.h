//
//  XTRImage.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTRImage;

@protocol XTRImageExport <JSExport>

+ (void)xtr_fromURL:(NSString *)URLString success:(JSValue *)success failure:(JSValue *)failure;
+ (NSString *)xtr_fromBase64:(NSString *)value scale:(NSInteger)scale;
+ (NSDictionary *)xtr_size:(NSString *)objectRef;
+ (CGFloat)xtr_scale:(NSString *)objectRef;
+ (NSInteger)xtr_renderingMode:(NSString *)objectRef;
+ (NSString *)xtr_imageWithImageRenderingMode:(NSInteger)imageRenderingMode objectRef:(NSString *)objectRef;

@end

@interface XTRImage : NSObject<XTComponent, XTRImageExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, readonly) UIImage *image;

- (instancetype)initWithImage:(UIImage *)image;

@end
