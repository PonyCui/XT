//
//  XTRWebView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRWebView;

@protocol XTRWebViewExport <JSExport>

+ (NSString *)create;
+ (void)loadWithURLString:(NSString *)URLString objectRef:(NSString *)objectRef;

@end

@interface XTRWebView : XTRView<XTRComponent, XTRWebViewExport>

@end
