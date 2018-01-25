//
//  ModulizeStartViewController.m
//  XTSample
//
//  Created by 崔明辉 on 2017/11/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "ModulizeStartViewController.h"
#import "XTRuntime.h"
#import "XTRDebug.h"
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
}

- (IBAction)onDebug:(id)sender {
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:@"Enter IP & Port"
                                                                             message:nil
                                                                      preferredStyle:UIAlertControllerStyleAlert];
    [alertController addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.text = [[NSUserDefaults standardUserDefaults] valueForKey:@"XTDebugIP"] ?: @"127.0.0.1";
        textField.placeholder = @"IP Address";
    }];
    [alertController addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.text = [[NSUserDefaults standardUserDefaults] valueForKey:@"XTDebugPort"] ?: @"8081";
        textField.placeholder = @"Port";
    }];
    [alertController addAction:[UIAlertAction actionWithTitle:@"Cancel" style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        
    }]];
    [alertController addAction:[UIAlertAction actionWithTitle:@"Go" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [[NSUserDefaults standardUserDefaults] setValue:alertController.textFields[0].text ?: @"" forKey:@"XTDebugIP"];
        [[NSUserDefaults standardUserDefaults] setValue:alertController.textFields[1].text ?: @"" forKey:@"XTDebugPort"];
        [XTRuntime debugWithIP:alertController.textFields[0].text
                          port:alertController.textFields[1].text.integerValue
          navigationController:self.navigationController];
    }]];
    [self presentViewController:alertController animated:YES completion:nil];
}

@end
