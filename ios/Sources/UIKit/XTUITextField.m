//
//  XTUITextField.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/13.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUITextField.h"
#import "XTUIUtils.h"
#import "XTUIFont.h"
#import "XTContext.h"
#import "XTUIWindow.h"
#import "XTMemoryManager.h"

@interface XTUITextField ()<UITextFieldDelegate>

@property (nonatomic, strong) UITextField *innerView;
@property (nonatomic, strong) UIColor *placeholderColor;

@end

@implementation XTUITextField

+ (NSString *)name {
    return @"_XTUITextField";
}

+ (NSString *)create {
    XTUITextField *view = [[XTUITextField alloc] initWithFrame:CGRectZero];
    view.userInteractionEnabled = YES;
    view.innerView = [[UITextField alloc] init];
    view.innerView.delegate = view;
    [view addSubview:view.innerView];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)dealloc {
    self.innerView.delegate = nil;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

+ (NSString *)xtr_text:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.text ?: @"";
    }
    return nil;
}

+ (void)xtr_setText:(NSString *)text objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.text = text;
    }
}

+ (NSString *)xtr_font:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return [XTUIFont create:view.innerView.font];
    }
    return nil;
}

+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    XTUIFont *font = [XTMemoryManager find:fontRef];
    if ([view isKindOfClass:[XTUITextField class]] && [font isKindOfClass:[XTUIFont class]]) {
        view.innerView.font = font.innerObject;
    }
}

+ (NSDictionary *)xtr_textColor:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return [JSValue fromColor:view.innerView.textColor ?: [UIColor blackColor]];
    }
    return nil;
}

+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.textColor = [textColor toColor];
    }
}

+ (NSInteger)xtr_textAlignment:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        switch (view.innerView.textAlignment) {
            case NSTextAlignmentLeft:
                return 0;
            case NSTextAlignmentCenter:
                return 1;
            case NSTextAlignmentRight:
                return 2;
            default:
                return 0;
        }
    }
    return 0;
}

+ (void)xtr_setTextAlignment:(NSInteger)textAlignment objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        switch (textAlignment) {
            case 0:
                view.innerView.textAlignment = NSTextAlignmentLeft;
                break;
            case 1:
                view.innerView.textAlignment = NSTextAlignmentCenter;
                break;
            case 2:
                view.innerView.textAlignment = NSTextAlignmentRight;
                break;
            default:
                break;
        }
    }
}

+ (NSString *)xtr_placeholder:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.placeholder;
    }
    return nil;
}

+ (void)xtr_setPlaceholder:(NSString *)placeholder objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.placeholder = placeholder.length ? placeholder : nil;
    }
}

+ (NSDictionary *)xtr_placeholderColor:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return [JSValue fromColor:view.placeholderColor ?: [UIColor colorWithWhite:0.3 alpha:1.0]];
    }
    return @{};
}

+ (void)xtr_setPlaceholderColor:(JSValue *)placeholderColor objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.placeholderColor = [placeholderColor toColor];
        [view resetAttributedPlaceholder];
    }
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

+ (BOOL)xtr_clearsOnBeginEditing:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.clearsOnBeginEditing;
    }
    return NO;
}

+ (void)xtr_setClearsOnBeginEditing:(BOOL)clearsOnBeginEditing objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.clearsOnBeginEditing = clearsOnBeginEditing;
    }
}

+ (BOOL)xtr_editing:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.editing;
    }
    return NO;
}

+ (NSInteger)xtr_clearButtonMode:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.clearButtonMode;
    }
    return 0;
}

+ (void)xtr_setClearButtonMode:(NSInteger)clearButtonMode objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.clearButtonMode = clearButtonMode;
    }
}

+ (NSString *)xtr_leftView:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        XTUIView *leftView = (id)view.innerView.leftView;
        if ([leftView isKindOfClass:[XTUIView class]]) {
            return leftView.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_setLeftView:(NSString *)leftViewRef objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        UIView *leftView = [XTMemoryManager find:leftViewRef];
        if ([leftView isKindOfClass:[UIView class]]) {
            view.innerView.leftView = leftView;
        }
        else {
            view.innerView.leftView = nil;
        }
    }
}

+ (NSInteger)xtr_leftViewMode:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.leftViewMode;
    }
    return 0;
}

+ (void)xtr_setLeftViewMode:(NSInteger)leftViewMode objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.leftViewMode = leftViewMode;
    }
}

+ (NSString *)xtr_rightView:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        XTUIView *rightView = (id)view.innerView.rightView;
        if ([rightView isKindOfClass:[XTUIView class]]) {
            return rightView.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_setRightView:(NSString *)rightViewRef objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        UIView *rightView = [XTMemoryManager find:rightViewRef];
        if ([rightView isKindOfClass:[UIView class]]) {
            view.innerView.leftView = rightView;
        }
        else {
            view.innerView.leftView = nil;
        }
    }
}

+ (NSInteger)xtr_rightViewMode:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.rightViewMode;
    }
    return 0;
}

+ (void)xtr_setRightViewMode:(NSInteger)rightViewMode objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.rightViewMode = rightViewMode;
    }
}

+ (BOOL)xtr_allowAutocapitalization:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.autocapitalizationType != UITextAutocapitalizationTypeNone;
    }
    return NO;
}

+ (void)xtr_setAllowAutocapitalization:(BOOL)allowAutocapitalization objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.autocapitalizationType = allowAutocapitalization;
    }
}

+ (BOOL)xtr_allowAutocorrection:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.autocorrectionType != UITextAutocorrectionTypeNo;
    }
    return NO;
}

+ (void)xtr_setAllowAutocorrection:(BOOL)allowAutocorrection objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.autocorrectionType = allowAutocorrection ? UITextAutocorrectionTypeYes : UITextAutocorrectionTypeNo;
    }
}

+ (BOOL)xtr_allowSpellChecking:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.spellCheckingType != UITextSpellCheckingTypeNo;
    }
    return NO;
}

+ (void)xtr_setAllowSpellChecking:(BOOL)allowSpellChecking objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.spellCheckingType = allowSpellChecking ? UITextSpellCheckingTypeYes : UITextSpellCheckingTypeNo;
    }
}

+ (NSInteger)xtr_keyboardType:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.keyboardType;
    }
    return 0;
}

+ (void)xtr_setKeyboardType:(NSInteger)keyboardType objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.keyboardType = keyboardType;
    }
}

+ (NSInteger)xtr_returnKeyType:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.returnKeyType;
    }
    return 0;
}

+ (void)xtr_setReturnKeyType:(NSInteger)returnKeyType objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.returnKeyType = returnKeyType;
    }
}

+ (BOOL)xtr_enablesReturnKeyAutomatically:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.enablesReturnKeyAutomatically;
    }
    return NO;
}

+ (void)xtr_setEnablesReturnKeyAutomatically:(BOOL)enablesReturnKeyAutomatically objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.enablesReturnKeyAutomatically = enablesReturnKeyAutomatically;
    }
}

+ (BOOL)xtr_secureTextEntry:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        return view.innerView.secureTextEntry;
    }
    return NO;
}

+ (void)xtr_setSecureTextEntry:(BOOL)secureTextEntry objectRef:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        view.innerView.secureTextEntry = secureTextEntry;
    }
}

+ (void)xtr_focus:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        [view.innerView becomeFirstResponder];
    }
}

+ (void)xtr_blur:(NSString *)objectRef {
    XTUITextField *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextField class]]) {
        [view.innerView resignFirstResponder];
    }
}

#pragma mark - UITextFieldDelegate

- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField {
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldBeginEditing" withArguments:@[]] toBool];
    }
    return YES;
}

- (void)textFieldDidBeginEditing:(UITextField *)textField {
    [XTUIWindow setCurrentFirstResponder:self];
    [[NSNotificationCenter defaultCenter] postNotificationName:UIKeyboardWillShowNotification object:nil];
    JSValue *value = self.scriptObject;
    if (value) {
        [value invokeMethod:@"handleDidBeginEditing" withArguments:@[]];
    }
}

- (BOOL)textFieldShouldEndEditing:(UITextField *)textField {
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldEndEditing" withArguments:@[]] toBool];
    }
    return YES;
}

- (void)textFieldDidEndEditing:(UITextField *)textField {
    [XTUIWindow setCurrentFirstResponder:nil];
    JSValue *value = self.scriptObject;
    if (value) {
        [value invokeMethod:@"handleDidEndEditing" withArguments:@[]];
    }
}

- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    JSValue *value = self.scriptObject;
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
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldClear" withArguments:@[]] toBool];
    }
    return YES;
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldReturn" withArguments:@[]] toBool];
    }
    return YES;
}

@end
