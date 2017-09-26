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
- (void)onMessage:(JSValue *)value customView:(XTRCustomView *)customView;

@end

@protocol XTRCustomViewExport <JSExport>

+ (XTRCustomView *)create:(JSValue *)className frame:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (void)handleMessage:(JSValue *)value;

@end

@interface XTRCustomView : XTRView<XTRComponent, XTRCustomViewExport>

+ (void)registerClass:(Class)viewClass className:(NSString *)className;
- (void)emitMessage:(id)value;

@end
