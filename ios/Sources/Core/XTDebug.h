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

+ (NSArray<NSString *> *)xtr_activeBreakpoints;
+ (void)xtr_break:(NSString *)bpIdentifier T:(NSString *)T S:(NSString *)S;
+ (void)xtr_wait;
+ (BOOL)xtr_locking;
+ (BOOL)xtr_stepping;

@end

@protocol XTDebugDelegate

- (void)debuggerDidTerminal;
- (void)debuggerDidReload;
- (NSString *)debuggerEval:(NSString *)code;

@end

@class XTContext;

@interface XTDebug : NSObject<XTComponent, XTRDebugExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) id<XTDebugDelegate> delegate;
@property (nonatomic, strong) XTContext *debugContext;

+ (XTDebug *)sharedDebugger;

+ (void)debugWithIP:(NSString *)IP port:(NSInteger)port navigationController:(UINavigationController *)navigationController;

- (NSURL *)sourceURL;

- (void)sendLog:(NSString *)string isEval:(BOOL)isEval;

@end
