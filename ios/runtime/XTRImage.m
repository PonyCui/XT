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

@interface XTRImage ()

@property (nonatomic, strong) UIImage *nativeImage;

@end

@implementation XTRImage

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRImage dealloc.");
#endif
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.objectUUID = [[NSUUID UUID] UUIDString];
        [((XTRContext *)[JSContext currentContext]).objectRefs store:self];
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [self description]; }];
    }
    return self;
}

- (instancetype)initWithContext:(XTRContext *)context
{
    self = [super init];
    if (self) {
        self.objectUUID = [[NSUUID UUID] UUIDString];
        [context.objectRefs store:self];
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [self description]; }];
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
    XTRContext *context = (XTRContext *)[JSContext currentContext];
    NSURL *URL = [NSURL URLWithString:URLString];
    if (URL != nil) {
        [[[NSURLSession sharedSession] dataTaskWithURL:URL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
            if (error == nil && data != nil) {
                UIImage *image = [UIImage imageWithData:data scale:scale];
                if (image != nil) {
                    XTRImage *nativeObject = [[XTRImage alloc] initWithContext:context];
                    nativeObject.nativeImage = image;
                    if (success != nil) {
                        [success xtr_callWithArguments:@[nativeObject.objectUUID ?: @""] asyncResult:nil];
                    }
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

+ (void)xtr_fromAssets:(NSString *)named path:(JSValue *)path scales:(JSValue *)scales success:(JSValue *)success failure:(JSValue *)failure {
    if ([[success context] isKindOfClass:[XTRContext class]]) {
        NSURL *sourceURL = [[(XTRContext *)success.context bridge] sourceURL];
        if (sourceURL != nil) {
            CGFloat scale = 1.0;
            NSString *subfix = @".png";
            for (NSNumber *value in [scales toArray]) {
                if ([value isKindOfClass:[NSNumber class]]) {
                    if ([UIScreen mainScreen].scale == [value floatValue] && [value floatValue] > 1) {
                        subfix = [NSString stringWithFormat:@"@%dx.png", (int)[value floatValue]];
                        scale = [value floatValue];
                    }
                    else {
                        subfix = [NSString stringWithFormat:@"@%dx.png", (int)[value floatValue]];
                        scale = [value floatValue];
                    }
                }
            }
            NSURL *imageURL = [[sourceURL URLByDeletingLastPathComponent]
                               URLByAppendingPathComponent:[NSString stringWithFormat:@"%@%@%@", [path toString], named, subfix]];
            if ([imageURL.scheme isEqualToString:@"file"]) {
                if ([[NSFileManager defaultManager] fileExistsAtPath:imageURL.path]) {
                    [self xtr_fromURL:imageURL.absoluteString scale:scale success:success failure:failure];
                    return;
                }
            }
            else {
                [self xtr_fromURL:imageURL.absoluteString scale:scale success:success failure:failure];
                return;
            }
        }
    }
    UIImage *image = [UIImage imageNamed:named];
    if (image != nil) {
        XTRImage *nativeObject = [XTRImage new];
        nativeObject.nativeImage = image;
        if (success != nil) {
            [success xtr_callWithArguments:@[nativeObject.objectUUID ?: @""]];
        }
    }
    else {
        if (failure) {
            [failure xtr_callWithArguments:@[@"Image not found."]];
        }
    }
}

+ (void)xtr_fromBase64:(NSString *)value scale:(NSInteger)scale success:(JSValue *)success {
    NSData *data = [[NSData alloc] initWithBase64EncodedString:value options:kNilOptions];
    if (data != nil) {
        UIImage *image = [UIImage imageWithData:data scale:scale];
        if (image != nil) {
            XTRImage *nativeObject = [XTRImage new];
            nativeObject.nativeImage = image;
            if (success != nil) {
                [success xtr_callWithArguments:@[nativeObject.objectUUID ?: @""]];
            }
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

- (NSString *)xtr_imageWithImageRenderingMode:(JSValue *)imageRenderingMode {
    XTRImage *newNativeObject = [XTRImage new];
    newNativeObject.nativeImage = [self.nativeImage imageWithRenderingMode:[imageRenderingMode toInt32]];
    return newNativeObject.objectUUID;
}

@end
