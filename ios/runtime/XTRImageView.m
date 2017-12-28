//
//  XTRImageView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRImageView.h"
#import "XTRUtils.h"
#import "XTRImage.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRImageView ()

@property (nonatomic, strong) XTRImage *privateImage;
@property (nonatomic, strong) UIImageView *innerView;

@end

@implementation XTRImageView

+ (NSString *)name {
    return @"XTRImageView";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRImageView *view = [[XTRImageView alloc] initWithFrame:[frame toRect]];
    view.innerView = [[UIImageView alloc] init];
    [view addSubview:view.innerView];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = scriptObject.context;
    [((XTRContext *)[JSContext currentContext]).objectRefs store:view];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [view description]; }];
    return view.objectUUID;
}

- (void)xtr_setImage:(JSValue *)image {
    id obj = [XTMemoryManager find:[image toString]];
    if ([obj isKindOfClass:[UIImage class]]) {
        self.privateImage = obj;
        self.innerView.image = obj;
    }
    else {
        self.privateImage = nil;
        self.innerView.image = nil;
    }
}

- (CGSize)intrinsicContentSize {
    return self.innerView.intrinsicContentSize;
}

- (void)setContentMode:(UIViewContentMode)contentMode {
    [super setContentMode:contentMode];
    self.innerView.contentMode = contentMode;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

@end
