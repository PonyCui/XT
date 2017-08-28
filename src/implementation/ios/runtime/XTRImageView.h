//
//  XTRImageView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/28.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRImageView;

@protocol XTRImageViewExport <JSExport>

+ (XTRImageView *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (void)xtr_setImage:(JSValue *)image;

@end

@interface XTRImageView : XTRView<XTRComponent, XTRImageViewExport>

@end
