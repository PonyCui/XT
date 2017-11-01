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
@property (nonatomic, assign) BOOL breakpointsEnabled;

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
                              ([XTRDebug sharedInstance].breakpointsEnabled ? @"Disable Breakpoints" : @"Enable Breakpoints"),
                              nil];
    [alertView show];
}

- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {
    NSString *title = [alertView buttonTitleAtIndex:buttonIndex];
    if ([title isEqualToString:@"Reload"]) {
        [self.currentBridge reload];
    }
    else if ([title isEqualToString:@"Setup Bundle URL"]) {
        UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Enter SourceURL / PinCode"
                                                            message:nil
                                                           delegate:self
                                                  cancelButtonTitle:@"Cancel"
                                                  otherButtonTitles:@"Continue", nil];
        alertView.tag = 1;
        alertView.alertViewStyle = UIAlertViewStylePlainTextInput;
        [[alertView textFieldAtIndex:0] setClearButtonMode:UITextFieldViewModeAlways];
        [[alertView textFieldAtIndex:0] setText:self.currentBridge.sourceURL.absoluteString];
        [alertView show];
    }
    else if ([title isEqualToString:@"Enable Breakpoints"]) {
        self.breakpointsEnabled = YES;
    }
    else if ([title isEqualToString:@"Disable Breakpoints"]) {
        self.breakpointsEnabled = NO;
    }
    else if (alertView.tag == 1 && [title isEqualToString:@"Continue"]) {
        if ([[alertView textFieldAtIndex:0] text].length == 6 || [[alertView textFieldAtIndex:0] text].length == 1) {
            [self resetSourceURLViaPinCode:[[alertView textFieldAtIndex:0] text]];
        }
        else {
            [self.currentBridge resetSourceURL:[NSURL URLWithString:[[alertView textFieldAtIndex:0] text]]];
            [self sendConnectedMessage];
        }
    }
}

- (void)resetSourceURLViaPinCode:(NSString *)code {
    UIAlertView *connecting = [[UIAlertView alloc] initWithTitle:@"Connecting" message:nil delegate:nil cancelButtonTitle:@"Cancel" otherButtonTitles:nil, nil];
    [connecting show];
    if ([code isEqualToString:@"0"]) {
        [[[NSURLSession sharedSession] dataTaskWithURL:[NSURL URLWithString:@"http://127.0.0.1:8083/"] completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
            if (error == nil && data != nil) {
                NSString *files = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                for (NSString *file in [files componentsSeparatedByString:@"\n"]) {
                    if ([file hasSuffix:@"ios.min.js"]) {
                        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                            [self.currentBridge resetSourceURL:[NSURL URLWithString:file]];
                            [self sendConnectedMessage];
                            [connecting dismissWithClickedButtonIndex:0 animated:YES];
                        });
                    }
                }
            }
        }] resume];
        return;
    }
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:[NSString stringWithFormat:@"https://zax3y00w.api.lncld.net/1.1/classes/Pin?where=%%7B%%22PinCode%%22%%3A%@%%7D&limit=1&&order=-updatedAt&&", code]]];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setValue:@"zAx3Y00WjcMeXeuaxfw9HSsQ-gzGzoHsz" forHTTPHeaderField:@"X-LC-Id"];
    [request setValue:@"pKOyX7Czry2YS9y6KR6G4X34" forHTTPHeaderField:@"X-LC-Key"];
    [request setHTTPMethod:@"GET"];
    [[[NSURLSession sharedSession] dataTaskWithRequest:request completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
        [[NSOperationQueue mainQueue] addOperationWithBlock:^{
            if (error == nil && data != nil) {
                __block BOOL found = NO;
                NSDictionary *obj = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:NULL];
                if ([obj[@"results"] isKindOfClass:[NSArray class]] &&
                    0 < [obj[@"results"] count] &&
                    [obj[@"results"][0][@"services"] isKindOfClass:[NSArray class]]) {
                    for (NSString *service in obj[@"results"][0][@"services"]) {
                        [[[NSURLSession sharedSession] dataTaskWithURL:[NSURL URLWithString:service] completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) {
                            if (found) {
                                return ;
                            }
                            if (error == nil && data != nil) {
                                NSString *files = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                                for (NSString *file in [files componentsSeparatedByString:@"\n"]) {
                                    if ([file hasSuffix:@"ios.min.js"]) {
                                        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                                            [self.currentBridge resetSourceURL:[NSURL URLWithString:file]];
                                            [self sendConnectedMessage];
                                            [connecting dismissWithClickedButtonIndex:0 animated:YES];
                                        });
                                        found = YES;
                                    }
                                }
                            }
                        }] resume];
                    }
                }
                else {
                    [[[UIAlertView alloc] initWithTitle:@"Invalid PinCode"
                                                message:nil
                                               delegate:nil
                                      cancelButtonTitle:@"OK"
                                      otherButtonTitles:nil, nil] show];
                }
            }
            else {
                [[[UIAlertView alloc] initWithTitle:@"PinCode Failure"
                                            message:error.localizedDescription
                                           delegate:nil
                                  cancelButtonTitle:@"OK"
                                  otherButtonTitles:nil, nil] show];
            }
        }];
    }] resume];
}

- (void)sendConnectedMessage {
    NSURL *connectedURL = [NSURL URLWithString:[NSString stringWithFormat:@"/connected/%@", [[[UIDevice currentDevice] name] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]
                                  relativeToURL:self.currentBridge.sourceURL];
    [[[NSURLSession sharedSession] dataTaskWithURL:connectedURL completionHandler:^(NSData * _Nullable data, NSURLResponse * _Nullable response, NSError * _Nullable error) { }] resume];
}

@end

@implementation XTRBreakpoint

+ (void)attachBreakpoint:(XTRContext *)context {
    __weak XTRContext *weakContext = context;
    context[@"XTRBreakpoint"] = ^(JSValue * breakpointID, JSValue * scoped){
        if (![XTRDebug sharedInstance].breakpointsEnabled) {
            return ;
        }
        __strong XTRContext *strongContext = weakContext;
        if (strongContext.bridge.sourceURL != nil) {
            __block BOOL keep = YES;
            while (keep) {
                NSURL *breakpointURL = [NSURL URLWithString:[NSString stringWithFormat:@"/breakpoint/%@", [[breakpointID toString] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]
                                              relativeToURL:strongContext.bridge.sourceURL];
                NSURLRequest *request = [NSURLRequest requestWithURL:breakpointURL cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:3600];
                NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:NULL error:NULL];
                if (data != nil) {
                    NSString *res = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
                    if ([res isEqualToString:@"1"]) {
                        keep = NO;
                    }
                    else {
                        JSValue *evalResult = [scoped callWithArguments:@[res ?: @""]];
                        NSURL *evalResultURL = [NSURL URLWithString:[NSString stringWithFormat:@"/evalresult/%@", [[evalResult toString]    stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]]
                                                      relativeToURL:strongContext.bridge.sourceURL];
                        NSURLRequest *request = [NSURLRequest requestWithURL:evalResultURL cachePolicy:NSURLRequestReloadIgnoringLocalAndRemoteCacheData timeoutInterval:10];
                        [NSURLConnection sendSynchronousRequest:request returningResponse:NULL error:NULL];
                    }
                }
                else {
                    keep = NO;
                }
            }
        }
    };
}

@end
