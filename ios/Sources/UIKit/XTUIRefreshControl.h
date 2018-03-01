//
//  XTUIRefreshControl.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/1.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@protocol XTUIRefreshControlExport<JSExport>

+ (NSString *)create;
+ (BOOL)xtr_enabled:(NSString *)objectRef;
+ (void)xtr_setEnabled:(BOOL)value objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_color:(NSString *)objectRef;
+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef;
+ (void)xtr_endRefreshing:(NSString *)objectRef;

@end

@interface XTUIRefreshControl : UIRefreshControl<XTComponent, XTUIRefreshControlExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
