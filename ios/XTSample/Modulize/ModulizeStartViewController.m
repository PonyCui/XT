//
//  ModulizeStartViewController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "ModulizeStartViewController.h"
#import "XTRuntime.h"
#import <MBProgressHUD/MBProgressHUD.h>

@interface ModulizeStartViewController ()

@end

@implementation ModulizeStartViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"XT Sample";
}

- (IBAction)onStart:(id)sender {
    [XTRuntime startWithNamed:@"sample.min" inBundle:nil navigationController:self.navigationController];
//    [MBProgressHUD showHUDAddedTo:self.view animated:YES];
//    [XTRuntime startWithURLString:@"http://172.26.80.14:8080/dist/sample.min.js"
//             navigationController:self.navigationController
//                  completionBlock:^{
//                      [MBProgressHUD hideHUDForView:self.view animated:YES];
//                  }
//                     failureBlock:^(NSError *error) {
//                         [MBProgressHUD hideHUDForView:self.view animated:YES];
//                         UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Failure"
//                                                                             message:@"Open XTApp Failure"
//                                                                            delegate:nil
//                                                                   cancelButtonTitle:@"OK"
//                                                                   otherButtonTitles:nil, nil];
//                         [alertView show];
//    }];
}

@end
