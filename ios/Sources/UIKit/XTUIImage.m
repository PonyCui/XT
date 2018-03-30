//
//  XTUIImage.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIImage.h"
#import "XTUIUtils.h"
#import "XTContext.h"
#import "XTUIContext.h"
#import "XTMemoryManager.h"

@interface XTUIImage ()

@end

@implementation XTUIImage


- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUIImage dealloc.");
#endif
}

- (instancetype)initWithImage:(UIImage *)image
{
    self = [super init];
    if (self) {
        _image = image;
    }
    return self;
}

+ (NSString *)name {
    return @"_XTUIImage";
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
                [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                    if (image != nil) {
                        XTUIImage *obj = [[XTUIImage alloc] initWithImage:image];
                        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
                        obj.objectUUID = managedObject.objectUUID;
                        [XTMemoryManager add:managedObject];
                        if (success != nil) {
                            [success callWithArguments:@[managedObject.objectUUID ?: @""]];
                        }
                    }
                    else {
                        if (failure) {
                            [failure callWithArguments:@[error.localizedDescription ?: @"invalid image data."]];
                        }
                    }
                }];
            }
            else {
                [[NSOperationQueue mainQueue] addOperationWithBlock:^{
                    if (failure) {
                        [failure callWithArguments:@[error.localizedDescription ?: @"unknown error."]];
                    }
                }];
            }
        }] resume];
    }
    else {
        if (failure) {
            [failure callWithArguments:@[@"invalid URL"]];
        }
    }
}

+ (NSString *)xtr_fromBase64:(NSString *)value scale:(NSInteger)scale {
    NSData *data = [[NSData alloc] initWithBase64EncodedString:value options:kNilOptions];
    if (data != nil) {
        UIImage *image = [[UIImage imageWithData:data scale:scale] imageWithRenderingMode:UIImageRenderingModeAlwaysOriginal];
        if (image != nil) {
            XTUIImage *obj = [[XTUIImage alloc] initWithImage:image];
            XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
            obj.objectUUID = managedObject.objectUUID;
            [XTMemoryManager add:managedObject];
            return managedObject.objectUUID;
        }
    }
    return nil;
}

+ (NSDictionary *)xtr_size:(NSString *)objectRef {
    XTUIImage *image = [XTMemoryManager find:objectRef];
    if ([image isKindOfClass:[XTUIImage class]]) {
        return [JSValue fromSize:image.image.size];
    }
    return @{};
}

+ (CGFloat)xtr_scale:(NSString *)objectRef {
    XTUIImage *image = [XTMemoryManager find:objectRef];
    if ([image isKindOfClass:[XTUIImage class]]) {
        return image.image.scale;
    }
    return 1.0;
}

+ (NSInteger)xtr_renderingMode:(NSString *)objectRef {
    XTUIImage *image = [XTMemoryManager find:objectRef];
    if ([image isKindOfClass:[XTUIImage class]]) {
        return image.image.renderingMode;
    }
    return 0;
}

+ (NSString *)xtr_imageWithImageRenderingMode:(NSInteger)imageRenderingMode objectRef:(NSString *)objectRef {
    XTUIImage *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIImage class]]) {
        UIImage *newImage = [obj.image imageWithRenderingMode:imageRenderingMode];
        XTUIImage *newObj = [[XTUIImage alloc] initWithImage:newImage];
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:newObj];
        newObj.objectUUID = managedObject.objectUUID;
        [XTMemoryManager add:managedObject];
        return managedObject.objectUUID;
    }
    return objectRef;
}

@end
