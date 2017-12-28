//
//  XTRTextView.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRTextView;

@protocol XTRTextViewExport <JSExport>

+ (NSString *)create:(JSValue *)frame;
+ (NSString *)xtr_text:(NSString *)objectRef;
+ (void)xtr_setText:(JSValue *)text objectRef:(NSString *)objectRef;
+ (JSValue *)xtr_font:(NSString *)objectRef;
+ (void)xtr_setFont:(JSValue *)fontRef objectRef:(NSString *)objectRef;
+ (NSDictionary *)xtr_textColor:(NSString *)objectRef;
+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef;
+ (NSInteger)xtr_textAlignment:(NSString *)objectRef;
+ (void)xtr_setTextAlignment:(NSInteger)textAlignment objectRef:(NSString *)objectRef;
+ (BOOL)xtr_editing:(NSString *)objectRef;
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

@interface XTRTextView : XTRView<XTRComponent, XTRTextViewExport>

@end
