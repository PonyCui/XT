//
//  XTRBridge.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/24.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRBridge.h"
#import "XTRComponent.h"
#import "XTRApplication.h"
#import "XTRView.h"
#import "XTRWindow.h"
#import "XTRApplicationDelegate.h"
#import "XTRViewController.h"
#import "XTRNavigationController.h"
#import "XTRScreen.h"
#import <JavaScriptCore/JavaScriptCore.h>

@interface XTRBridge ()

@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) XTRApplicationDelegate *appDelegate;

@end

@implementation XTRBridge

static NSString *globalBridgeScript;

+ (void)setGlobalBridgeScript:(NSString *)argGlobalBridgeScript {
    globalBridgeScript = argGlobalBridgeScript;
}

- (instancetype)initWithAppDelegate:(XTRApplicationDelegate *)appDelegate
{
    self = [super init];
    if (self) {
        _appDelegate = appDelegate;
        _context = [[JSContext alloc] init];
        [_context evaluateScript:@"var window = {}"];
        self.components = @[
                            [XTRApplication class],
                            [XTRApplicationDelegate class],
                            [XTRView class],
                            [XTRWindow class],
                            [XTRViewController class],
                            [XTRNavigationController class],
                            [XTRScreen class],
                            ];
        [_context evaluateScript:globalBridgeScript];
    }
    return self;
}

- (void)setComponents:(NSArray<Class> *)components {
    _components = components;
    for (Class component in components) {
        if ([component conformsToProtocol:@protocol(XTRComponent)]) {
            self.context[[component name]] = component;
        }
    }
}

@end
