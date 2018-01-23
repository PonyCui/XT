//
//  XTRActivityIndicatorView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRActivityIndicatorView;

@protocol XTRActivityIndicatorViewExport <JSExport>

+ (NSString *)create;
+ (NSInteger)xtr_style:(NSString *)objectRef;
+ (void)xtr_setStyle:(NSInteger)value objectRef:(NSString *)objectRef;
+ (BOOL)xtr_animating:(NSString *)objectRef;
+ (BOOL)xtr_hidesWhenStopped:(NSString *)objectRef;
+ (void)xtr_setHidesWhenStopped:(BOOL)hidesWhenStopped objectRef:(NSString *)objectRef;
+ (void)xtr_startAnimating:(NSString *)objectRef;
+ (void)xtr_stopAnimating:(NSString *)objectRef;

@end

@interface XTRActivityIndicatorView : XTRView<XTRComponent, XTRActivityIndicatorViewExport>

@end
