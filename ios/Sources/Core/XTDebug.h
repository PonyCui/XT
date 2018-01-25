//
//  XTRDebug.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/19.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <JavaScriptCore/JavaScriptCore.h>
#import "XTComponent.h"

@protocol XTRDebugExport<JSExport>

+ (void)xtr_breakpoint:(NSString *)bpIdentifier;

@end

@interface XTDebug : NSObject<XTComponent, XTRDebugExport>

@property (nonatomic, copy) NSString *objectUUID;

+ (XTDebug *)sharedDebugger;
- (NSURL *)sourceURL;
- (void)connectWithIP:(NSString *)IP port:(NSInteger)port;
- (void)sendLog:(NSString *)string;

@end
