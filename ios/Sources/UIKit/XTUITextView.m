//
//  XTUITextView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/15.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUITextView.h"
#import "XTUIUtils.h"
#import "XTUIFont.h"
#import "XTContext.h"
#import "XTUIWindow.h"
#import "XTMemoryManager.h"

@interface XTUITextView ()<UITextViewDelegate>

@property (nonatomic, strong) UITextView *innerView;

@end

@implementation XTUITextView

+ (NSString *)name {
    return @"_XTUITextView";
}

+ (NSString *)xtr_text:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.text ?: @"";
    }
    return nil;
}

+ (void)xtr_setText:(NSString *)text objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.text = text;
    }
}

+ (NSString *)xtr_font:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return [XTUIFont create:view.innerView.font];
    }
    return nil;
}

+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    XTUIFont *font = [XTMemoryManager find:fontRef];
    if ([view isKindOfClass:[XTUITextView class]] && [font isKindOfClass:[XTUIFont class]]) {
        view.innerView.font = font.innerObject;
    }
}

+ (NSDictionary *)xtr_textColor:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return [JSValue fromColor:view.innerView.textColor ?: [UIColor blackColor]];
    }
    return nil;
}

+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.textColor = [textColor toColor];
    }
}

+ (NSInteger)xtr_textAlignment:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
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
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
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

+ (BOOL)xtr_editing:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return [view.innerView isFirstResponder];
    }
    return NO;
}

+ (BOOL)xtr_allowAutocapitalization:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.autocapitalizationType != UITextAutocapitalizationTypeNone;
    }
    return NO;
}

+ (void)xtr_setAllowAutocapitalization:(BOOL)allowAutocapitalization objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.autocapitalizationType = allowAutocapitalization;
    }
}

+ (BOOL)xtr_allowAutocorrection:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.autocorrectionType != UITextAutocorrectionTypeNo;
    }
    return NO;
}

+ (void)xtr_setAllowAutocorrection:(BOOL)allowAutocorrection objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.autocorrectionType = allowAutocorrection ? UITextAutocorrectionTypeYes : UITextAutocorrectionTypeNo;
    }
}

+ (BOOL)xtr_allowSpellChecking:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.spellCheckingType != UITextSpellCheckingTypeNo;
    }
    return NO;
}

+ (void)xtr_setAllowSpellChecking:(BOOL)allowSpellChecking objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.spellCheckingType = allowSpellChecking ? UITextSpellCheckingTypeYes : UITextSpellCheckingTypeNo;
    }
}

+ (NSInteger)xtr_keyboardType:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.keyboardType;
    }
    return 0;
}

+ (void)xtr_setKeyboardType:(NSInteger)keyboardType objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.keyboardType = keyboardType;
    }
}

+ (NSInteger)xtr_returnKeyType:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.returnKeyType;
    }
    return 0;
}

+ (void)xtr_setReturnKeyType:(NSInteger)returnKeyType objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.returnKeyType = returnKeyType;
    }
}

+ (BOOL)xtr_enablesReturnKeyAutomatically:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.enablesReturnKeyAutomatically;
    }
    return NO;
}

+ (void)xtr_setEnablesReturnKeyAutomatically:(BOOL)enablesReturnKeyAutomatically objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.enablesReturnKeyAutomatically = enablesReturnKeyAutomatically;
    }
}

+ (BOOL)xtr_secureTextEntry:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        return view.innerView.secureTextEntry;
    }
    return NO;
}

+ (void)xtr_setSecureTextEntry:(BOOL)secureTextEntry objectRef:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        view.innerView.secureTextEntry = secureTextEntry;
    }
}

+ (void)xtr_focus:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        [view.innerView becomeFirstResponder];
    }
}

+ (void)xtr_blur:(NSString *)objectRef {
    XTUITextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUITextView class]]) {
        [view.innerView resignFirstResponder];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _innerView = [[UITextView alloc] init];
        _innerView.delegate = self;
        [self addSubview:_innerView];
    }
    return self;
}

- (void)dealloc {
    self.innerView.delegate = nil;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
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
    [XTUIWindow setCurrentFirstResponder:self];
    [[NSNotificationCenter defaultCenter] postNotificationName:UIKeyboardWillShowNotification object:nil];
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
    [XTUIWindow setCurrentFirstResponder:nil];
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
