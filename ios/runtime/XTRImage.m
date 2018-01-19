//
//  XTRImage.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRImage.h"
#import "XTRUtils.h"
#import "XTRContext.h"
#import "XTRBridge.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRImage ()

@end

@implementation XTRImage

- (instancetype)initWithImage:(UIImage *)image
{
    self = [super init];
    if (self) {
        _image = image;
    }
    return self;
}

+ (NSString *)name {
    return @"XTRImage";
}

+ (void)xtr_fromURL:(NSString *)URLString success:(JSValue *)success failure:(JSValue *)failure {
    [self xtr_fromURL:URLString scale:1.0 success:success failure:failure];
}

+ (void)xtr_fromURL:(NSString *)URLString scale:(CGFloat)scale success:(JSValue *)success failure:(JSValue *)failure {
    NSURL *URL = [NSURL URLWithString:URLString];
    if (URL != nil) {
        [[[NSURLSession sharedSession] dataTaskWithURL:URL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
            if (error == nil && data != nil) {
                UIImage *image = [[UIImage imageWithData:data scale:scale] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
                if (image != nil) {
                    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                        XTRImage *obj = [[XTRImage alloc] initWithImage:image];
                        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
                        obj.objectUUID = managedObject.objectUUID;
                        [XTMemoryManager add:managedObject];
                        if (success != nil) {
                            [success xtr_callWithArguments:@[managedObject.objectUUID ?: @""] asyncResult:nil];
                        }
                    }];
                }
                else {
                    if (failure) {
                        [failure xtr_callWithArguments:@[error.localizedDescription ?: @"invalid image data."]];
                    }
                }
            }
            else {
                if (failure) {
                    [failure xtr_callWithArguments:@[error.localizedDescription ?: @"unknown error."]];
                }
            }
        }] resume];
    }
    else {
        if (failure) {
            [failure xtr_callWithArguments:@[@"invalid URL"]];
        }
    }
}

+ (NSString *)xtr_fromBase64:(NSString *)value scale:(NSInteger)scale {
    NSData *data = [[NSData alloc] initWithBase64EncodedString:value options:kNilOptions];
    if (data != nil) {
        UIImage *image = [[UIImage imageWithData:data scale:scale] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
        if (image != nil) {
            XTRImage *obj = [[XTRImage alloc] initWithImage:image];
            XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
            obj.objectUUID = managedObject.objectUUID;
            [XTMemoryManager add:managedObject];
            return managedObject.objectUUID;
        }
    }
    return nil;
}

+ (NSDictionary *)xtr_size:(NSString *)objectRef {
    UIImage *image = [XTMemoryManager find:objectRef];
    if ([image isKindOfClass:[UIImage class]]) {
        return [JSValue fromSize:image.size];
    }
    return @{};
}

+ (CGFloat)xtr_scale:(NSString *)objectRef {
    UIImage *image = [XTMemoryManager find:objectRef];
    if ([image isKindOfClass:[UIImage class]]) {
        return image.scale;
    }
    return 1.0;
}

+ (NSInteger)xtr_renderingMode:(NSString *)objectRef {
    UIImage *image = [XTMemoryManager find:objectRef];
    if ([image isKindOfClass:[UIImage class]]) {
        return image.renderingMode;
    }
    return 0;
}

+ (NSString *)xtr_imageWithImageRenderingMode:(NSInteger)imageRenderingMode objectRef:(NSString *)objectRef {
    XTRImage *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRImage class]]) {
        UIImage *newImage = [obj.image imageWithRenderingMode:imageRenderingMode];
        XTRImage *newObj = [[XTRImage alloc] initWithImage:newImage];
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:newObj];
        newObj.objectUUID = managedObject.objectUUID;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return objectRef;
}

@end
