//
//  XTUIActivityIndicatorView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@protocol XTUIActivityIndicatorViewExport <XTUIViewExport, JSExport>

+ (NSInteger)xtr_style:(NSString *)objectRef;
+ (void)xtr_setStyle:(NSInteger)value objectRef:(NSString *)objectRef;
+ (BOOL)xtr_animating:(NSString *)objectRef;
+ (BOOL)xtr_hidesWhenStopped:(NSString *)objectRef;
+ (void)xtr_setHidesWhenStopped:(BOOL)hidesWhenStopped objectRef:(NSString *)objectRef;
+ (void)xtr_startAnimating:(NSString *)objectRef;
+ (void)xtr_stopAnimating:(NSString *)objectRef;

@end

@interface XTUIActivityIndicatorView : XTUIView<XTComponent, XTUIActivityIndicatorViewExport>

@end
