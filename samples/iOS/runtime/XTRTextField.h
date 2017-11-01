//
//  XTRTextField.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/13.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRTextField;

@protocol XTRTextFieldExport <JSExport>

+ (XTRTextField *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSString *)xtr_text;
- (void)xtr_setText:(JSValue *)text;
- (JSValue *)xtr_font;
- (void)xtr_setFont:(JSValue *)font;
- (NSDictionary *)xtr_textColor;
- (void)xtr_setTextColor:(JSValue *)textColor;
- (NSNumber *)xtr_textAlignment;
- (void)xtr_setTextAlignment:(JSValue *)textAlignment;
- (NSString *)xtr_placeholder;
- (void)xtr_setPlaceholder:(JSValue *)placeholder;
- (NSDictionary *)xtr_placeholderColor;
- (void)xtr_setPlaceholderColor:(JSValue *)placeholderColor;
- (BOOL)xtr_clearsOnBeginEditing;
- (void)xtr_setClearsOnBeginEditing:(JSValue *)clearsOnBeginEditing;
- (BOOL)xtr_editing;
- (NSNumber *)xtr_clearButtonMode;
- (void)xtr_setClearButtonMode:(JSValue *)clearButtonMode;
- (JSValue *)xtr_leftView;
- (void)xtr_setLeftView:(JSValue *)leftView;
- (NSNumber *)xtr_leftViewMode;
- (void)xtr_setLeftViewMode:(JSValue *)leftViewMode;
- (JSValue *)xtr_rightView;
- (void)xtr_setRightView:(JSValue *)rightView;
- (NSNumber *)xtr_rightViewMode;
- (void)xtr_setRightViewMode:(JSValue *)rightViewMode;
- (BOOL)xtr_allowAutocapitalization;
- (void)xtr_setAllowAutocapitalization:(JSValue *)allowAutocapitalization;
- (BOOL)xtr_allowAutocorrection;
- (void)xtr_setAllowAutocorrection:(JSValue *)allowAutocorrection;
- (BOOL)xtr_allowSpellChecking;
- (void)xtr_setAllowSpellChecking:(JSValue *)allowSpellChecking;
- (NSNumber *)xtr_keyboardType;
- (void)xtr_setKeyboardType:(JSValue *)keyboardType;
- (NSNumber *)xtr_returnKeyType;
- (void)xtr_setReturnKeyType:(JSValue *)returnKeyType;
- (BOOL)xtr_enablesReturnKeyAutomatically;
- (void)xtr_setEnablesReturnKeyAutomatically:(JSValue *)enablesReturnKeyAutomatically;
- (BOOL)xtr_secureTextEntry;
- (void)xtr_setSecureTextEntry:(JSValue *)secureTextEntry;
- (void)xtr_focus;
- (void)xtr_blur;

@end

@interface XTRTextField : XTRView<XTRComponent, XTRTextFieldExport>

@end
