//
//  XTRDebug.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/19.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRBridge.h"

@interface XTRDebug : NSObject<UIAlertViewDelegate>

+ (void)showMenu:(XTRBridge *)bridge;

@end

@interface XTRBreakpoint: NSObject

+ (void)attachBreakpoint:(JSContext *)context;

@end
