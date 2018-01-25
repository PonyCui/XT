//
//  XTRWebView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTComponent.h"

@class XTRWebView;

@protocol XTRWebViewExport <JSExport>

+ (NSString *)create;
+ (void)xtr_loadWithURLString:(NSString *)URLString objectRef:(NSString *)objectRef;

@end

@interface XTRWebView : XTRView<XTComponent, XTRWebViewExport>

@end
