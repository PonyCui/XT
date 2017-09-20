//
//  XTRDebug.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/19.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRDebug.h"
#import "XTRContext.h"

@interface XTRDebug ()

@property (nonatomic, strong) XTRBridge *currentBridge;

@end

@implementation XTRDebug

+ (XTRDebug *)sharedInstance {
    static XTRDebug *instance;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [XTRDebug new];
    });
    return instance;
}

+ (void)showMenu:(XTRBridge *)bridge {
    [[XTRDebug sharedInstance] setCurrentBridge:bridge];
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Debugger"
                                                        message:nil
                                                       delegate:[XTRDebug sharedInstance]
                                              cancelButtonTitle:@"Cancel"
                                              otherButtonTitles:
                              @"Reload",
                              @"Setup Bundle URL",
                              nil];
    [alertView show];
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    NSString *title = [alertView buttonTitleAtIndex:buttonIndex];
    if ([title isEqualToString:@"Reload"]) {
        [self.currentBridge reload];
    }
    else if ([title isEqualToString:@"Setup Bundle URL"]) {
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Enter SourceURL"
                                                            message:nil
                                                           delegate:self
                                                  cancelButtonTitle:@"Cancel"
                                                  otherButtonTitles:@"Continue", nil];
        alertView.tag = 1;
        alertView.alertViewStyle = UIAlertViewStylePlainTextInput;
        [[alertView textFieldAtIndex:0] setText:self.currentBridge.sourceURL.absoluteString];
        [alertView show];
    }
    else if (alertView.tag == 1 && [title isEqualToString:@"Continue"]) {
        [self.currentBridge resetSourceURL:[NSURL URLWithString:[[alertView textFieldAtIndex:0] text]]];
    }
}

@end

@implementation XTRBreakpoint

+ (void)attachBreakpoint:(XTRContext *)context {
    __weak XTRContext *weakContext = context;
    context[@"XTRBreakpoint"] = ^(JSValue * breakpointID, JSValue * scoped){
        __strong XTRContext *strongContext = weakContext;
        if (strongContext.bridge.sourceURL != nil) {
            __block BOOL keep = YES;
            while (keep) {
                dispatch_semaphore_t t = dispatch_semaphore_create(0);
                NSURL *breakpointURL = [NSURL URLWithString:[NSString stringWithFormat:@"/breakpoint/%@", [[breakpointID toString] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]
                                              relativeToURL:strongContext.bridge.sourceURL];
                [[[NSURLSession sharedSession] dataTaskWithURL:breakpointURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
                    dispatch_semaphore_signal(t);
                    if (error == nil && data != nil) {
                        NSString *res = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                        if ([res isEqualToString:@"1"]) {
                            keep = NO;
                        }
                    }
                }] resume];
                dispatch_semaphore_wait(t, DISPATCH_TIME_FOREVER);
            }
        }
    };
}

@end
