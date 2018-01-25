//
//  XTRDebug.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/19.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTRComponent.h"

@protocol XTRDebugExport<JSExport>

+ (void)xtr_breakpoint:(NSString *)bpIdentifier;

@end

@interface XTRDebug : NSObject<XTRComponent, XTRDebugExport>

@property (nonatomic, copy) NSString *objectUUID;

+ (XTRDebug *)sharedDebugger;
- (NSURL *)sourceURL;
- (void)connectWithIP:(NSString *)IP port:(NSInteger)port;
- (void)sendLog:(NSString *)string;

@end
