//
//  XTRTextField.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/13.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRTextField.h"
#import "XTRUtils.h"
#import "XTRFont.h"
#import "XTRContext.h"

@interface XTRTextField ()<UITextFieldDelegate>

@property (nonatomic, strong) UITextField *innerView;
@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) JSManagedValue *scriptObject;
@property (nonatomic, strong) UIColor *placeholderColor;

@end

@implementation XTRTextField

+ (NSString *)name {
    return @"XTRTextField";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRTextField *view = [[XTRTextField alloc] initWithFrame:[frame toRect]];
    view.userInteractionEnabled = YES;
    view.innerView = [[UITextField alloc] init];
    view.innerView.delegate = view;
    [view addSubview:view.innerView];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = scriptObject.context;
    [((XTRContext *)[JSContext currentContext]).objectRefs store:view];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [view description]; }];
    return view.objectUUID;
}

- (void)dealloc {
    self.innerView.delegate = nil;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

- (NSString *)xtr_text {
    return self.innerView.text;
}

- (void)xtr_setText:(JSValue *)text {
    self.innerView.text = [text toString];
}

- (JSValue *)xtr_font {
    if (self.innerView.font != nil) {
        return [JSValue fromObject:[XTRFont create:self.innerView.font] context:self.context];
    }
    return nil;
}

- (void)xtr_setFont:(JSValue *)font {
    XTRFont *aFont = [font toFont];
    if (aFont) {
        self.innerView.font = aFont.innerObject;
    }
}

- (NSDictionary *)xtr_textColor {
    return [JSValue fromColor:self.innerView.textColor ?: [UIColor blackColor]];
}

- (void)xtr_setTextColor:(JSValue *)textColor {
    self.innerView.textColor = [textColor toColor];
}

- (NSNumber *)xtr_textAlignment {
    switch (self.innerView.textAlignment) {
        case NSTextAlignmentLeft:
            return @(0);
        case NSTextAlignmentCenter:
            return @(1);
        case NSTextAlignmentRight:
            return @(2);
        default:
            return @(0);
    }
}

- (void)xtr_setTextAlignment:(JSValue *)textAlignment {
    switch ([textAlignment toInt32]) {
        case 0:
            self.innerView.textAlignment = NSTextAlignmentLeft;
            break;
        case 1:
            self.innerView.textAlignment = NSTextAlignmentCenter;
            break;
        case 2:
            self.innerView.textAlignment = NSTextAlignmentRight;
            break;
        default:
            break;
    }
}

- (NSString *)xtr_placeholder {
    return self.innerView.placeholder;
}

- (void)xtr_setPlaceholder:(JSValue *)placeholder {
    self.innerView.placeholder = [placeholder toString];
    [self resetAttributedPlaceholder];
}

- (NSDictionary *)xtr_placeholderColor {
    return [JSValue fromColor:self.placeholderColor ?: [UIColor colorWithWhite:0.3 alpha:1.0]];
}

- (void)xtr_setPlaceholderColor:(JSValue *)textColor {
    self.placeholderColor = [textColor toColor];
    [self resetAttributedPlaceholder];
}

- (void)resetAttributedPlaceholder {
    if (self.innerView.placeholder != nil) {
        [self.innerView setAttributedPlaceholder:[[NSAttributedString alloc]
                                                  initWithString:self.innerView.placeholder
                                                      attributes:@{
                                                                   NSForegroundColorAttributeName: self.placeholderColor ?: [UIColor colorWithWhite:0.7 alpha:1.0]
                                                                   }]];
    }
}

- (BOOL)xtr_clearsOnBeginEditing {
    return self.innerView.clearsOnBeginEditing;
}

- (void)xtr_setClearsOnBeginEditing:(JSValue *)clearsOnBeginEditing {
    self.innerView.clearsOnBeginEditing = [clearsOnBeginEditing toBool];
}

- (BOOL)xtr_editing {
    return self.innerView.editing;
}

- (NSNumber *)xtr_clearButtonMode {
    return @(self.innerView.clearButtonMode);
}

- (void)xtr_setClearButtonMode:(JSValue *)clearButtonMode{
    self.innerView.clearButtonMode = [clearButtonMode toInt32];
}

- (JSValue *)xtr_leftView {
    return [JSValue fromObject:self.innerView.leftView context:self.context];
}

- (void)xtr_setLeftView:(JSValue *)leftView {
    self.innerView.leftView = [leftView toView];
}

- (NSNumber *)xtr_leftViewMode {
    return @(self.innerView.leftViewMode);
}

- (void)xtr_setLeftViewMode:(JSValue *)leftViewMode {
    self.innerView.leftViewMode = [leftViewMode toInt32];
}

- (JSValue *)xtr_rightView {
    return [JSValue fromObject:self.innerView.rightView context:self.context];
}

- (void)xtr_setRightView:(JSValue *)rightView {
    self.innerView.rightView = [rightView toView];
}

- (NSNumber *)xtr_rightViewMode {
    return @(self.innerView.rightViewMode);
}

- (void)xtr_setRightViewMode:(JSValue *)rightViewMode {
    self.innerView.rightViewMode = [rightViewMode toInt32];
}

- (BOOL)xtr_allowAutocapitalization {
    return self.innerView.autocapitalizationType != UITextAutocapitalizationTypeNone;
}

- (void)xtr_setAllowAutocapitalization:(JSValue *)allowAutocapitalization {
    self.innerView.autocapitalizationType = [allowAutocapitalization toBool] ? UITextAutocapitalizationTypeSentences : UITextAutocapitalizationTypeNone;
}

- (BOOL)xtr_allowAutocorrection {
    return self.innerView.autocorrectionType != UITextAutocorrectionTypeNo;
}

- (void)xtr_setAllowAutocorrection:(JSValue *)allowAutocorrection {
    self.innerView.autocorrectionType = [allowAutocorrection toBool] ? UITextAutocorrectionTypeYes : UITextAutocorrectionTypeNo;
}

- (BOOL)xtr_allowSpellChecking {
    return self.innerView.spellCheckingType != UITextSpellCheckingTypeNo;
}
- (void)xtr_setAllowSpellChecking:(JSValue *)allowSpellChecking {
    self.innerView.spellCheckingType = [allowSpellChecking toBool] ? UITextSpellCheckingTypeYes : UITextSpellCheckingTypeNo;
}

- (NSNumber *)xtr_keyboardType {
    return @(self.innerView.keyboardType);
}

- (void)xtr_setKeyboardType:(JSValue *)keyboardType {
    self.innerView.keyboardType = [keyboardType toInt32];
}

- (NSNumber *)xtr_returnKeyType {
    return @(self.innerView.returnKeyType);
}

- (void)xtr_setReturnKeyType:(JSValue *)returnKeyType {
    self.innerView.returnKeyType = [returnKeyType toInt32];
}

- (BOOL)xtr_enablesReturnKeyAutomatically {
    return self.innerView.enablesReturnKeyAutomatically;
}

- (void)xtr_setEnablesReturnKeyAutomatically:(JSValue *)enablesReturnKeyAutomatically {
    self.innerView.enablesReturnKeyAutomatically = [enablesReturnKeyAutomatically toBool];
}

- (BOOL)xtr_secureTextEntry {
    return self.innerView.secureTextEntry;
}

- (void)xtr_setSecureTextEntry:(JSValue *)secureTextEntry {
    self.innerView.secureTextEntry = [secureTextEntry toBool];
}

- (void)xtr_focus {
    [self.innerView becomeFirstResponder];
}

- (void)xtr_blur {
    [self.innerView resignFirstResponder];
}

#pragma mark - UITextFieldDelegate

- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField {
    JSValue *value = self.scriptObject.value;
    if (value) {
        return [[value invokeMethod:@"handleShouldBeginEditing" withArguments:@[]] toBool];
    }
    return YES;
}

- (void)textFieldDidBeginEditing:(UITextField *)textField {
    JSValue *value = self.scriptObject.value;
    if (value) {
        [value invokeMethod:@"handleDidBeginEditing" withArguments:@[]];
    }
}

- (BOOL)textFieldShouldEndEditing:(UITextField *)textField {
    JSValue *value = self.scriptObject.value;
    if (value) {
        return [[value invokeMethod:@"handleShouldEndEditing" withArguments:@[]] toBool];
    }
    return YES;
}

- (void)textFieldDidEndEditing:(UITextField *)textField {
    JSValue *value = self.scriptObject.value;
    if (value) {
        [value invokeMethod:@"handleDidEndEditing" withArguments:@[]];
    }
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    JSValue *value = self.scriptObject.value;
    if (value) {
        return [[value invokeMethod:@"handleShouldChange" withArguments:@[
                                                                          @{
                                                                              @"location": @(range.location),
                                                                              @"length": @(range.length),
                                                                              },
                                                                          string ?: [JSValue valueWithUndefinedInContext:self.context],
                                                                          ]] toBool];
    }
    return YES;
}

- (BOOL)textFieldShouldClear:(UITextField *)textField {
    JSValue *value = self.scriptObject.value;
    if (value) {
        return [[value invokeMethod:@"handleShouldClear" withArguments:@[]] toBool];
    }
    return YES;
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    JSValue *value = self.scriptObject.value;
    if (value) {
        return [[value invokeMethod:@"handleShouldReturn" withArguments:@[]] toBool];
    }
    return YES;
}

@end
