//
//  XTRTextView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRTextView.h"
#import "XTRUtils.h"
#import "XTRFont.h"
#import "XTRContext.h"

@interface XTRTextView ()<UITextViewDelegate>

@property (nonatomic, strong) UITextView *innerView;

@end

@implementation XTRTextView

+ (NSString *)name {
    return @"XTRTextView";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRTextView *view = [[XTRTextView alloc] initWithFrame:[frame toRect]];
    view.userInteractionEnabled = YES;
    view.innerView = [[UITextView alloc] init];
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

- (BOOL)xtr_editing {
    return self.innerView.isFirstResponder;
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

#pragma mark - UITextViewDelegate

- (BOOL)textViewShouldBeginEditing:(UITextView *)textView {
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldBeginEditing" withArguments:@[]] toBool];
    }
    return YES;
}

- (void)textViewDidBeginEditing:(UITextView *)textView {
    JSValue *value = self.scriptObject;
    if (value) {
        [value invokeMethod:@"handleDidBeginEditing" withArguments:@[]];
    }
}

- (BOOL)textViewShouldEndEditing:(UITextView *)textView {
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldEndEditing" withArguments:@[]] toBool];
    }
    return YES;
}

- (void)textViewDidEndEditing:(UITextView *)textView {
    JSValue *value = self.scriptObject;
    if (value) {
        [value invokeMethod:@"handleDidEndEditing" withArguments:@[]];
    }
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
    JSValue *value = self.scriptObject;
    if (value) {
        return [[value invokeMethod:@"handleShouldChange" withArguments:@[
                                                                          @{
                                                                              @"location": @(range.location),
                                                                              @"length": @(range.length),
                                                                              },
                                                                          text ?: [JSValue valueWithUndefinedInContext:self.context],
                                                                          ]] toBool];
    }
    return YES;
}

@end
