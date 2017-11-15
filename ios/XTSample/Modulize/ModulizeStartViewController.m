//
//  ModulizeStartViewController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "ModulizeStartViewController.h"
#import "XTRuntime.h"

@interface ModulizeStartViewController ()

@end

@implementation ModulizeStartViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"XT Sample";
}

- (IBAction)onStart:(id)sender {
    [XTRuntime startWithNamed:@"sample.min" inBundle:nil navigationController:self.navigationController];
}

@end
