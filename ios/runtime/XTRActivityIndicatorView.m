//
//  XTRActivityIndicatorView.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/23.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRActivityIndicatorView.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTRActivityIndicatorView()

@property (nonatomic, strong) UIActivityIndicatorView *innerView;

@end

@implementation XTRActivityIndicatorView

+ (NSString *)name {
    return @"XTRActivityIndicatorView";
}

+ (NSString *)create {
    XTRActivityIndicatorView *view = [[XTRActivityIndicatorView alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSInteger)xtr_style:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        if (view.innerView.activityIndicatorViewStyle == UIActivityIndicatorViewStyleWhite) {
            return 0;
        }
        else if (view.innerView.activityIndicatorViewStyle == UIActivityIndicatorViewStyleWhiteLarge) {
            return 1;
        }
    }
    return 0;
}

+ (void)xtr_setStyle:(NSInteger)value objectRef:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        if (value == 0) {
            view.innerView.activityIndicatorViewStyle = UIActivityIndicatorViewStyleWhite;
        }
        else if (value == 1) {
            view.innerView.activityIndicatorViewStyle = UIActivityIndicatorViewStyleWhiteLarge;
        }
        view.innerView.color = view.tintColor;
    }
}

+ (BOOL)xtr_animating:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        return view.innerView.animating;
    }
    return NO;
}

+ (BOOL)xtr_hidesWhenStopped:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        return view.innerView.hidesWhenStopped;
    }
    return NO;
}

+ (void)xtr_setHidesWhenStopped:(BOOL)hidesWhenStopped objectRef:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        view.innerView.hidesWhenStopped = hidesWhenStopped;
    }
}

+ (void)xtr_startAnimating:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        [view.innerView startAnimating];
    }
}

+ (void)xtr_stopAnimating:(NSString *)objectRef {
    XTRActivityIndicatorView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRActivityIndicatorView class]]) {
        [view.innerView stopAnimating];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _innerView = [UIActivityIndicatorView new];
        _innerView.color = self.tintColor;
        self.userInteractionEnabled = NO;
        [self addSubview:_innerView];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.center = CGPointMake(self.bounds.size.width / 2.0, self.bounds.size.height / 2.0);
}

- (void)tintColorDidChange {
    [super tintColorDidChange];
    self.innerView.color = self.tintColor;
}

@end
