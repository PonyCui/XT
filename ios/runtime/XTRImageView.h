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

+ (NSString *)create:(JSValue *)frame;
+ (void)xtr_setImage:(NSString *)imageRef objectRef:(NSString *)objectRef;

@end

@interface XTRImageView : XTRView<XTRComponent, XTRImageViewExport>

@end
