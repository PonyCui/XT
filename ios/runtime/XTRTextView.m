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
#import <XT-Mem/XTMemoryManager.h>

@interface XTRTextView ()<UITextViewDelegate>

@property (nonatomic, strong) UITextView *innerView;

@end

@implementation XTRTextView

+ (NSString *)name {
    return @"XTRTextView";
}

+ (NSString *)create:(JSValue *)frame {
    XTRTextView *view = [[XTRTextView alloc] initWithFrame:[frame toRect]];
    view.userInteractionEnabled = YES;
    view.innerView = [[UITextView alloc] init];
    view.innerView.delegate = view;
    [view addSubview:view.innerView];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return view.objectUUID;
}

- (void)dealloc {
    self.innerView.delegate = nil;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

+ (NSString *)xtr_text:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.text;
    }
    return nil;
}

+ (void)xtr_setText:(NSString *)text objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.text = text;
    }
}

+ (NSString *)xtr_font:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return [XTRFont create:view.innerView.font];
    }
    return nil;
}

+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    XTRFont *font = [XTMemoryManager find:fontRef];
    if ([view isKindOfClass:[XTRTextView class]] && [font isKindOfClass:[XTRFont class]]) {
        view.innerView.font = font.innerObject;
    }
}

+ (NSDictionary *)xtr_textColor:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return [JSValue fromColor:view.innerView.textColor ?: [UIColor blackColor]];
    }
    return nil;
}

+ (void)xtr_setTextColor:(JSValue *)textColor objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.textColor = [textColor toColor];
    }
}

+ (NSInteger)xtr_textAlignment:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
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
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
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
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return [view.innerView isFirstResponder];
    }
    return NO;
}

+ (BOOL)xtr_allowAutocapitalization:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.autocapitalizationType != UITextAutocapitalizationTypeNone;
    }
    return NO;
}

+ (void)xtr_setAllowAutocapitalization:(BOOL)allowAutocapitalization objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.autocapitalizationType = allowAutocapitalization;
    }
}

+ (BOOL)xtr_allowAutocorrection:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.autocorrectionType != UITextAutocorrectionTypeNo;
    }
    return NO;
}

+ (void)xtr_setAllowAutocorrection:(BOOL)allowAutocorrection objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.autocorrectionType = allowAutocorrection ? UITextAutocorrectionTypeYes : UITextAutocorrectionTypeNo;
    }
}

+ (BOOL)xtr_allowSpellChecking:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.spellCheckingType != UITextSpellCheckingTypeNo;
    }
    return NO;
}

+ (void)xtr_setAllowSpellChecking:(BOOL)allowSpellChecking objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.spellCheckingType = allowSpellChecking ? UITextSpellCheckingTypeYes : UITextSpellCheckingTypeNo;
    }
}

+ (NSInteger)xtr_keyboardType:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.keyboardType;
    }
    return 0;
}

+ (void)xtr_setKeyboardType:(NSInteger)keyboardType objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.keyboardType = keyboardType;
    }
}

+ (NSInteger)xtr_returnKeyType:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.returnKeyType;
    }
    return 0;
}

+ (void)xtr_setReturnKeyType:(NSInteger)returnKeyType objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.returnKeyType = returnKeyType;
    }
}

+ (BOOL)xtr_enablesReturnKeyAutomatically:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.enablesReturnKeyAutomatically;
    }
    return NO;
}

+ (void)xtr_setEnablesReturnKeyAutomatically:(BOOL)enablesReturnKeyAutomatically objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.enablesReturnKeyAutomatically = enablesReturnKeyAutomatically;
    }
}

+ (BOOL)xtr_secureTextEntry:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        return view.innerView.secureTextEntry;
    }
    return NO;
}

+ (void)xtr_setSecureTextEntry:(BOOL)secureTextEntry objectRef:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        view.innerView.secureTextEntry = secureTextEntry;
    }
}

+ (void)xtr_focus:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        [view.innerView becomeFirstResponder];
    }
}

+ (void)xtr_blur:(NSString *)objectRef {
    XTRTextView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRTextView class]]) {
        [view.innerView resignFirstResponder];
    }
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
