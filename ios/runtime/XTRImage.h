//
//  XTRImage.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRImage;

@protocol XTRImageExport <JSExport>

@property (nonatomic, copy) NSString *objectUUID;
+ (void)xtr_fromURL:(NSString *)URLString success:(JSValue *)success failure:(JSValue *)failure;
+ (void)xtr_fromAssets:(NSString *)named path:(JSValue *)path scales:(JSValue *)scales success:(JSValue *)success failure:(JSValue *)failure;
+ (void)xtr_fromBase64:(NSString *)value scale:(NSInteger)scale success:(JSValue *)success;
- (NSDictionary *)xtr_size;
- (NSNumber *)xtr_scale;
- (NSNumber *)xtr_renderingMode;
- (NSString *)xtr_imageWithImageRenderingMode:(JSValue *)imageRenderingMode;

@end

@interface XTRImage : NSObject<XTRComponent, XTRImageExport>

@property (nonatomic, readonly) UIImage *nativeImage;
@property (nonatomic, copy) NSString *objectUUID;

@end
