//
//  XTUIExtView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/13.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"

@class XTUIExtView;

@protocol XTExtViewExport<XTUIViewExport, JSExport>

+ (void)xtr_initWithViewClass:(NSString *)viewClass objectRef:(NSString *)objectRef;
+ (id)xtr_getValue:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (void)xtr_setValue:(JSValue *)value propKey:(NSString *)propKey objectRef:(NSString *)objectRef;
+ (id)xtr_callMethod:(NSString *)methodName arguments:(NSArray *)arguments objectRef:(NSString *)objectRef;

@end

@protocol XTExtViewProtocol

@required
@property (nonatomic, weak) XTUIExtView *extView;

@optional
- (id)onGetValue:(NSString *)propKey;
- (void)onSetValue:(NSString *)propKey value:(id)value;
- (id)onCallMethod:(NSString *)methodName args:(NSArray *)args;

@end

@interface XTUIExtView : XTUIView <XTExtViewExport>

- (id)invokeMethod:(NSString *)methodName args:(NSArray *)args;

@end
