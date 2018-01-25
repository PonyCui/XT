//
//  XTUIApplication.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTUIApplication, XTUIApplicationDelegate;

@protocol XTUIApplicationExport <JSExport>

+ (NSString *)create:(NSString *)delegateRef;
+ (NSString *)xtr_keyWindow:(NSString *)objectRef;
+ (void)xtr_exit:(NSString *)objectRef;

@end

@interface XTUIApplication : NSObject<XTComponent, XTUIApplicationExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) XTUIApplicationDelegate *delegate;

@end
