//
//  XTUILoadMoreControl.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/1.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIView.h"
#import "XTComponent.h"

@class XTUIListView, XTUICollectionView;

@protocol XTUILoadMoreControlExport<XTUIViewExport, JSExport>

+ (BOOL)xtr_enabled:(NSString *)objectRef;
+ (void)xtr_setEnabled:(BOOL)value objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_color:(NSString *)objectRef;
+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef;
+ (void)xtr_endLoading:(NSString *)objectRef;

@end

@interface XTUILoadMoreControl: XTUIView<XTComponent, XTUILoadMoreControlExport>

@property (nonatomic, assign) BOOL enabled;
@property (nonatomic, assign) BOOL isLoading;
@property (nonatomic, weak) XTUIListView *listView;
@property (nonatomic, weak) XTUICollectionView *collectionView;

- (void)startLoading;

@end
