//
//  XTUICustomView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/26.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUICustomView;

@protocol XTUICustomViewProtocol <NSObject>

@optional
- (nullable id)onMessage:(nonnull JSValue *)value customView:(nonnull XTUICustomView *)customView;

@end

@protocol XTUICustomViewExport <JSExport>

+ (nonnull XTUICustomView *)create:(nonnull NSString *)className;
+ (nullable JSValue *)handleMessage:(nonnull JSValue *)value objectRef:(nonnull NSString *)objectRef;

@end

@interface XTUICustomView : XTUIView<XTComponent, XTUICustomViewExport>

+ (void)registerClass:(nonnull Class)viewClass className:(nonnull NSString *)className;
- (nullable JSValue *)emitMessage:(nonnull id)value;

@end
