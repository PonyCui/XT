//
//  XTRTextField.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/13.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTComponent.h"

@class XTRTextField;

@protocol XTRTextFieldExport <JSExport>

+ (NSString *)create;
+ (NSString *)xtr_text:(NSString *)objectRef;
+ (void)xtr_setText:(NSString *)text objectRef:(NSString *)objectRef;
+ (NSString *)xtr_font:(NSString *)objectRef;
+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_textColor:(NSString *)objectRef;
+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_textAlignment:(NSString *)objectRef;
+ (void)xtr_setTextAlignment:(NSInteger)textAlignment objectRef:(NSString *)objectRef;
+ (NSString *)xtr_placeholder:(NSString *)objectRef;
+ (void)xtr_setPlaceholder:(NSString *)placeholder objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_placeholderColor:(NSString *)objectRef;
+ (void)xtr_setPlaceholderColor:(JSValue *)placeholderColor objectRef:(NSString *)objectRef;
+ (BOOL)xtr_clearsOnBeginEditing:(NSString *)objectRef;
+ (void)xtr_setClearsOnBeginEditing:(BOOL)clearsOnBeginEditing objectRef:(NSString *)objectRef;
+ (BOOL)xtr_editing:(NSString *)objectRef;
+ (NSInteger)xtr_clearButtonMode:(NSString *)objectRef;
+ (void)xtr_setClearButtonMode:(NSInteger)clearButtonMode objectRef:(NSString *)objectRef;
+ (NSString *)xtr_leftView:(NSString *)objectRef;
+ (void)xtr_setLeftView:(NSString *)leftViewRef objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_leftViewMode:(NSString *)objectRef;
+ (void)xtr_setLeftViewMode:(NSInteger)leftViewMode objectRef:(NSString *)objectRef;
+ (NSString *)xtr_rightView:(NSString *)objectRef;
+ (void)xtr_setRightView:(NSString *)rightViewRef objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_rightViewMode:(NSString *)objectRef;
+ (void)xtr_setRightViewMode:(NSInteger)rightViewMode objectRef:(NSString *)objectRef;
+ (BOOL)xtr_allowAutocapitalization:(NSString *)objectRef;
+ (void)xtr_setAllowAutocapitalization:(BOOL)allowAutocapitalization objectRef:(NSString *)objectRef;
+ (BOOL)xtr_allowAutocorrection:(NSString *)objectRef;
+ (void)xtr_setAllowAutocorrection:(BOOL)allowAutocorrection objectRef:(NSString *)objectRef;
+ (BOOL)xtr_allowSpellChecking:(NSString *)objectRef;
+ (void)xtr_setAllowSpellChecking:(BOOL)allowSpellChecking objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_keyboardType:(NSString *)objectRef;
+ (void)xtr_setKeyboardType:(NSInteger)keyboardType objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_returnKeyType:(NSString *)objectRef;
+ (void)xtr_setReturnKeyType:(NSInteger)returnKeyType objectRef:(NSString *)objectRef;
+ (BOOL)xtr_enablesReturnKeyAutomatically:(NSString *)objectRef;
+ (void)xtr_setEnablesReturnKeyAutomatically:(BOOL)enablesReturnKeyAutomatically objectRef:(NSString *)objectRef;
+ (BOOL)xtr_secureTextEntry:(NSString *)objectRef;
+ (void)xtr_setSecureTextEntry:(BOOL)secureTextEntry objectRef:(NSString *)objectRef;
+ (void)xtr_focus:(NSString *)objectRef;
+ (void)xtr_blur:(NSString *)objectRef;

@end

@interface XTRTextField : XTRView<XTComponent, XTRTextFieldExport>

@end
