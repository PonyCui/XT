//
//  XTRWindow.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/25.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRView.h"
#import "XTRComponent.h"

@class XTRWindow;

@protocol XTRWindowExport <JSExport>

+ (XTRWindow *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (void)xtr_makeKeyAndVisible;

@end

@interface XTRWindow : UIWindow<XTRComponent, XTRWindowExport, XTRViewExport>

@end
