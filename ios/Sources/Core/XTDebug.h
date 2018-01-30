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

+ (void)xtr_bp:(NSString *)bpIdentifier T:(JSValue *)T S:(JSValue *)S;

@end

@protocol XTDebugDelegate

- (void)debuggerDidTerminal;
- (void)debuggerDidReload;
- (NSString *)debuggerEval:(NSString *)code;

@end

@interface XTDebug : NSObject<XTComponent, XTRDebugExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) id<XTDebugDelegate> delegate;

+ (XTDebug *)sharedDebugger;

+ (void)debugWithIP:(NSString *)IP port:(NSInteger)port navigationController:(UINavigationController *)navigationController;

- (NSURL *)sourceURL;

- (void)sendLog:(NSString *)string;

@end
