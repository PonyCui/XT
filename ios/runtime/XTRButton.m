//
//  XTRButton.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRButton.h"
#import "XTRUtils.h"
#import "XTRImage.h"
#import "XTRFont.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRButton ()

@property (nonatomic, strong) UIButton *innerView;
@property (nonatomic, assign) BOOL vertical;
@property (nonatomic, assign) CGFloat inset;
@property (nonatomic, assign) BOOL highlighted;

@end

@implementation XTRButton

+ (NSString *)name {
    return @"XTRButton";
}

+ (NSString *)create {
    XTRButton *view = [[XTRButton alloc] initWithFrame:CGRectZero];
    view.innerView = [UIButton buttonWithType:UIButtonTypeSystem];
    view.innerView.adjustsImageWhenHighlighted = NO;
    [view.innerView setTitleColor:view.tintColor forState:UIControlStateNormal];
    [view.innerView addTarget:view action:@selector(onTouchUpInside) forControlEvents:UIControlEventTouchUpInside];
    [view.innerView addTarget:view action:@selector(onTouchStart) forControlEvents:UIControlEventTouchDown];
    [view.innerView addTarget:view action:@selector(onTouchEvent) forControlEvents:UIControlEventAllTouchEvents];
    [view addSubview:view.innerView];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

+ (NSString *)xtr_title:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        return [obj.innerView titleForState:UIControlStateNormal];
    }
    return nil;
}

+ (void)xtr_setTitle:(JSValue *)title objectRef:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        [obj.innerView setTitle:[title toString] forState:UIControlStateNormal];
        [obj resetInset];
    }
}

+ (NSString *)xtr_font:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        return [XTRFont create:[[obj.innerView titleLabel] font]];
    }
    return nil;
}

+ (void)xtr_setFont:(NSString *)fontRef objectRef:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    XTRFont *font = [XTMemoryManager find:fontRef];
    if ([obj isKindOfClass:[XTRButton class]] && [font isKindOfClass:[XTRFont class]]) {
        [obj.innerView.titleLabel setFont:font.innerObject];
    }
}

+ (NSString *)xtr_image:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        XTRImage *image = (id)[obj.innerView imageForState:UIControlStateNormal];
        if ([image isKindOfClass:[XTRImage class]]) {
            return image.objectUUID;
        }
    }
    return nil;
}

+ (void)xtr_setImage:(NSString *)imageRef objectRef:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        XTRImage *img = [XTMemoryManager find:imageRef];
        if ([img isKindOfClass:[XTRImage class]]) {
            [obj.innerView setImage:img.image forState:UIControlStateNormal];
            [obj resetInset];
        }
        else {
            [obj.innerView setImage:nil forState:UIControlStateNormal];
            [obj resetInset];
        }
    }
}

+ (NSDictionary *)xtr_color:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        UIColor *color = [obj.innerView titleColorForState:UIControlStateNormal];
        if ([color isKindOfClass:[UIColor class]]) {
            return [JSValue fromColor:color];
        }
    }
    return @{};
}

+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        [obj.innerView setTitleColor:[color toColor] forState:UIControlStateNormal];
    }
}

+ (BOOL)xtr_vertical:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        return obj.vertical;
    }
    return NO;
}

+ (void)xtr_setVertical:(BOOL)vertical objectRef:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        obj.vertical = vertical;
    }
}

+ (CGFloat)xtr_inset:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        return obj.inset;
    }
    return 0;
}

+ (void)xtr_setInset:(CGFloat)inset objectRef:(NSString *)objectRef {
    XTRButton *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRButton class]]) {
        obj.inset = inset;
    }
}

- (void)resetInset {
    if (self.vertical) {
        [self.innerView setImageEdgeInsets:UIEdgeInsetsMake(0, 0, 0, 0)];
        [self.innerView setTitleEdgeInsets:UIEdgeInsetsMake(0, 0, 0, 0)];
        [self layoutIfNeeded];
        self.innerView.imageEdgeInsets = UIEdgeInsetsMake(-(self.innerView.imageView.frame.size.height + self.innerView.titleLabel.frame.size.height + self.inset) / 2.0,
                                                          (self.innerView.frame.size.width / 2.0 - self.innerView.imageView.center.x) * 2,
                                                          0.0,
                                                          0.0);
        
        self.innerView.titleEdgeInsets = UIEdgeInsetsMake((self.innerView.imageView.frame.size.height + self.innerView.titleLabel.frame.size.height + self.inset) / 2.0,
                                                          (self.innerView.frame.size.width / 2.0 - self.innerView.titleLabel.center.x) * 2,
                                                          0.0,
                                                          0.0);
    }
    else {
        [self.innerView setImageEdgeInsets:UIEdgeInsetsMake(0, 0, 0, self.inset)];
        [self.innerView setTitleEdgeInsets:UIEdgeInsetsMake(0, self.inset, 0, 0)];
    }
}

- (void)onTouchUpInside {
    JSValue *value = self.scriptObject;
    if (value != nil) {
        [value invokeMethod:@"handleTouchUpInside" withArguments:@[]];
    }
}

- (void)onTouchStart {
    self.highlighted = NO;
}

- (void)onTouchEvent {
    if (self.highlighted != self.innerView.highlighted) {
        self.highlighted = self.innerView.highlighted;
        JSValue *value = self.scriptObject;
        if (value != nil) {
            [value invokeMethod:@"handleHighlighted" withArguments:@[@(self.highlighted)]];
        }
        
    }
}

@end
