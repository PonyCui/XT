//
//  XTUIWebView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUIWebView;

@protocol XTUIWebViewExport <XTUIViewExport, JSExport>

+ (void)xtr_loadWithURLString:(NSString *)URLString objectRef:(NSString *)objectRef;

@end

@interface XTUIWebView : XTUIView<XTComponent, XTUIWebViewExport>

@end
