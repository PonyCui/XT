//
//  XTRCustomView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/26.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRCustomView;

@protocol XTRCustomViewProtocol <NSObject>

@optional
- (nullable id)onMessage:(nonnull JSValue *)value customView:(nonnull XTRCustomView *)customView;

@end

@protocol XTRCustomViewExport <JSExport>

+ (nonnull XTRCustomView *)create:(nonnull JSValue *)className
                            frame:(nonnull JSValue *)frame;
+ (nullable JSValue *)handleMessage:(nonnull JSValue *)value objectRef:(nonnull NSString *)objectRef;

@end

@interface XTRCustomView : XTRView<XTRComponent, XTRCustomViewExport>

+ (void)registerClass:(nonnull Class)viewClass className:(nonnull NSString *)className;
- (nullable JSValue *)emitMessage:(nonnull id)value;

@end
