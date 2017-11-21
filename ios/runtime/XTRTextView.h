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

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;
- (NSString *)xtr_text;
- (void)xtr_setText:(JSValue *)text;
- (JSValue *)xtr_font;
- (void)xtr_setFont:(JSValue *)font;
- (NSDictionary *)xtr_textColor;
- (void)xtr_setTextColor:(JSValue *)textColor;
- (NSNumber *)xtr_textAlignment;
- (void)xtr_setTextAlignment:(JSValue *)textAlignment;
- (BOOL)xtr_editing;
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

@interface XTRTextView : XTRView<XTRComponent, XTRTextViewExport>

@end
