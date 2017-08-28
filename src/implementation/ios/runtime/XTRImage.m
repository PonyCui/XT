//
//  XTRImage.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRImage.h"
#import "XTRUtils.h"

@interface XTRImage ()

@property (nonatomic, strong) UIImage *nativeImage;

@end

@implementation XTRImage

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.objectUUID = [[NSUUID UUID] UUIDString];
    }
    return self;
}

+ (NSString *)name {
    return @"XTRImage";
}

+ (void)xtr_fromURL:(NSString *)URLString success:(JSValue *)success failure:(JSValue *)failure {
    NSURL *URL = [NSURL URLWithString:URLString];
    if (URL != nil) {
        [[[NSURLSession sharedSession] dataTaskWithURL:URL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
            if (error == nil && data != nil) {
                UIImage *image = [UIImage imageWithData:data];
                if (image != nil) {
                    XTRImage *nativeObject = [XTRImage new];
                    nativeObject.nativeImage = image;
                    if (success != nil) {
                        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                            [success callWithArguments:@[
                                                         [JSValue fromObject:nativeObject context:success.context]
                                                         ]];
                        }];
                    }
                }
                else {
                    if (failure) {
                        [failure callWithArguments:@[error.localizedDescription ?: @"invalid image data."]];
                    }
                }
            }
            else {
                if (failure) {
                    [failure callWithArguments:@[error.localizedDescription ?: @"unknown error."]];
                }
            }
        }] resume];
    }
    else {
        if (failure) {
            [failure callWithArguments:@[@"invalid URL"]];
        }
    }
}

+ (void)xtr_fromAssets:(NSString *)named success:(JSValue *)success failure:(JSValue *)failure {
    UIImage *image = [UIImage imageNamed:named];
    if (image != nil) {
        XTRImage *nativeObject = [XTRImage new];
        nativeObject.nativeImage = image;
        if (success != nil) {
            [success callWithArguments:@[
                                         [JSValue fromObject:nativeObject context:success.context]
                                         ]];
        }
    }
    else {
        if (failure) {
            [failure callWithArguments:@[@"Image not found."]];
        }
    }
}

- (NSDictionary *)xtr_size {
    return [JSValue fromSize:self.nativeImage.size];
}

- (NSNumber *)xtr_scale {
    return @(self.nativeImage.scale);
}

- (NSNumber *)xtr_renderingMode {
    return @(self.nativeImage.renderingMode);
}

- (JSValue *)xtr_imageWithImageRenderingMode:(JSValue *)imageRenderingMode {
    XTRImage *newNativeObject = [XTRImage new];
    newNativeObject.nativeImage = [self.nativeImage imageWithRenderingMode:[imageRenderingMode toInt32]];
    return [JSValue fromObject:newNativeObject context:imageRenderingMode.context];
}

@end
