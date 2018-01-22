//
//  XTRModal.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRModal.h"

@implementation XTRModal

+ (NSString *)name {
    return @"XTRModal";
}

+ (void)showAlert:(JSValue *)params callback:(JSValue *)callback {
    NSString *message = params.isObject ? params.toDictionary[@"message"] ?: @"" : @"";
    NSString *buttonTitle = params.isObject ? params.toDictionary[@"buttonTitle"] ?: @"好的" : @"好的";
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:message
                                                                             message:nil
                                                                      preferredStyle:UIAlertControllerStyleAlert];
    [alertController addAction:[UIAlertAction actionWithTitle:buttonTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [callback callWithArguments:@[]];
    }]];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alertController
                                                                                 animated:YES
                                                                               completion:nil];
}

+ (void)showConfirm:(JSValue *)params resolver:(JSValue *)resolver rejected:(JSValue *)rejected {
    NSString *message = params.isObject ? params.toDictionary[@"message"] ?: @"" : @"";
    NSString *confirmTitle = params.isObject ? params.toDictionary[@"confirmTitle"] ?: @"确认" : @"确认";
    NSString *cancelTitle = params.isObject ? params.toDictionary[@"cancelTitle"] ?: @"取消" : @"取消";
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:message
                                                                             message:nil
                                                                      preferredStyle:UIAlertControllerStyleAlert];
    [alertController addAction:[UIAlertAction actionWithTitle:confirmTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [resolver callWithArguments:@[]];
    }]];
    [alertController addAction:[UIAlertAction actionWithTitle:cancelTitle style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        [rejected callWithArguments:@[]];
    }]];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alertController
                                                                                 animated:YES
                                                                               completion:nil];
}

+ (void)showPrompt:(JSValue *)params resolver:(JSValue *)resolver rejected:(JSValue *)rejected {
    NSString *message = params.isObject ? params.toDictionary[@"message"] ?: @"" : @"";
    NSString *placeholder = params.isObject ? params.toDictionary[@"placeholder"] ?: nil : nil;
    NSString *defaultValue = params.isObject ? params.toDictionary[@"defaultValue"] ?: nil : nil;
    NSString *confirmTitle = params.isObject ? params.toDictionary[@"confirmTitle"] ?: @"确认" : @"确认";
    NSString *cancelTitle = params.isObject ? params.toDictionary[@"cancelTitle"] ?: @"取消" : @"取消";
    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:message
                                                                             message:nil
                                                                      preferredStyle:UIAlertControllerStyleAlert];
    [alertController addTextFieldWithConfigurationHandler:^(UITextField * _Nonnull textField) {
        textField.returnKeyType = UIReturnKeyDone;
        textField.placeholder = placeholder;
        textField.text = defaultValue;
    }];
    [alertController addAction:[UIAlertAction actionWithTitle:confirmTitle style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        [resolver callWithArguments:@[
                                      alertController.textFields.firstObject.text ?: @"",
                                      ]];
    }]];
    [alertController addAction:[UIAlertAction actionWithTitle:cancelTitle style:UIAlertActionStyleCancel handler:^(UIAlertAction * _Nonnull action) {
        [rejected callWithArguments:@[]];
    }]];
    [[UIApplication sharedApplication].keyWindow.rootViewController presentViewController:alertController
                                                                                 animated:YES
                                                                               completion:nil];
}

@end
