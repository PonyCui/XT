//
//  XTRNavigationBar.m
//  XTSample
//
//  Created by 崔明辉 on 2018/1/3.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTRNavigationBar.h"
#import "XTRViewController.h"
#import "XTRImage.h"
#import "XTMemoryManager.h"

@interface XTRNavigationBar()

@property (nonatomic, strong) UINavigationBar *innerView;
@property (nonatomic, strong) UIVisualEffectView *blurView;
@property (nonatomic, strong) UINavigationItem *innerItem;
@property (nonatomic, strong) UIBarButtonItem *backItem;

@end

@implementation XTRNavigationBar

static UIImage *backButtonImage;

+ (void)load {
    backButtonImage = [UIImage imageWithData:[[NSData alloc] initWithBase64EncodedString:@"iVBORw0KGgoAAAANSUhEUgAAACcAAAA/CAMAAABU+CHxAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAD2UExURUdwTIyMjI2NjZKSkoyMjJOTk////5CQkJmZmZGRkZ+fn4yMjI2NjYyMjP///42NjYyMjIyMjIyMjIyMjIyMjKqqqoyMjL+/v42NjYyMjIyMjI2NjY2NjYyMjJCQkJCQkIyMjI2NjYyMjIyMjIyMjIyMjI2NjY+Pj4yMjJSUlI+Pj42NjYyMjIyMjIyMjI2NjYyMjIyMjI2NjYyMjKKiooyMjI2NjYyMjIyMjI2NjYyMjIyMjIyMjIyMjI2NjY2NjY2NjYyMjI2NjYyMjIyMjIyMjIyMjI2NjY2NjYyMjIyMjI2NjZCQkI2NjYyMjI+Pj4yMjIyMjJc1wu0AAABRdFJOUwDMpiH7EwEXDxwI8EHsAsX5077o3gb+BJ0z49kJ8yw1rkgmf/aKdTn9DElR2DrSlLZrSrcLiGxQYs7hxlmTgLyvRy0U2s2jJBJ29IklONsn9ywRh4UAAAF4SURBVEjHrdZnTwJBEAbgpd5x9N57kw6CoCJi723//5/RoDhzJjNMIvv5ySZ7t++7o9R+VqF8792trCO31qeHu5i51JvV5Znn9pvpN5YZUb1d1wzz5X+ZfqCZKwHshGbvOWDuMsmu4sAiC5Jlg8AaVZIN/MCKAZIFnoD52yTrfgALZknWiwCLl0h25gaWq5Hs+ABYwkWyeQpY30eyFig9NEhWR8zhIVkTsbBJKe8IsdiMYqEMYmOLYmknYpUkxZIVxJxpMqVTxDIhinViiK3IXJthxJp0TB2I1SUx1bolimlqQgdwjXa742LfR/vNuRoZoh0fuVqSnVf8/ZSa4f8xYnrWGov+r/i+/Ll/F0ka2u7ztEBD7wrno8Mc+xnBpcnAc1l+7X0QNRg4Qf2S9zFQ2Ffi/lNqIetTpaoNUT9/9X0R9f2AgW3Z+yF+j5Qq4fetx8Aafi9f1b/fX3tRmML5wODnjW2wb3bNLz/BvtzTPLSZr14E8xWsT1TC0VxUxJVlAAAAAElFTkSuQmCC"
                                                                                 options:kNilOptions] scale:3];
}

+ (NSString *)name {
    return @"XTRNavigationBar";
}

+ (NSString *)create {
    XTRNavigationBar *view = [[XTRNavigationBar alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        [self setupBlurView];
        [self setupInnerView];
        [self setupBackItem];
        [self setTranslucent:NO];
        [self setLightContent:NO];
    }
    return self;
}

- (void)setupBlurView {
    UIVisualEffect *effect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    self.blurView = [[UIVisualEffectView alloc] initWithEffect:effect];
    [self addSubview:self.blurView];
}

- (void)setupInnerView {
    _innerView = [UINavigationBar new];
    [_innerView setBackgroundImage:[UIImage new] forBarMetrics:UIBarMetricsDefault];
    _innerView.translucent = YES;
    _innerItem = [[UINavigationItem alloc] init];
    [_innerView setItems:@[_innerItem]];
    [self addSubview:_innerView];
}

- (void)setupBackItem {
    UIButton *customView = [UIButton buttonWithType:UIButtonTypeSystem];
    customView.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
    [customView setImage:backButtonImage forState:UIControlStateNormal];
    [customView addTarget:self action:@selector(onBack) forControlEvents:UIControlEventTouchUpInside];
    customView.frame = CGRectMake(0, 0, 44, 44);
    self.backItem = [[UIBarButtonItem alloc] initWithCustomView:customView];
}

- (void)setShouldShowBackBarButtonItem:(BOOL)shouldShowBackBarButtonItem {
    _shouldShowBackBarButtonItem = shouldShowBackBarButtonItem;
    [self resetItems];
}

- (void)resetItems {
    if (self.shouldShowBackBarButtonItem) {
        if (self.innerItem.leftBarButtonItems.count == 0) {
            [self.innerItem setLeftBarButtonItem:self.backItem];
        }
    }
}

- (void)onBack {
    [self.viewController.navigationController popViewControllerAnimated:YES];
}

+ (NSString *)xtr_title:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        return obj.innerItem.title ?: @"";
    }
    return @"";
}

+ (void)xtr_setTitle:(NSString *)title objectRef:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        [obj.innerItem setTitle:title];
    }
}

+ (BOOL)xtr_translucent:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        return obj.translucent;
    }
    return NO;
}

+ (void)xtr_setTranslucent:(BOOL)value objectRef:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        obj.translucent = value;
        [obj.viewController viewWillLayoutSubviews];
    }
}

+ (BOOL)xtr_lightContent:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        return obj.lightContent;
    }
    return NO;
}

+ (void)xtr_setLightContent:(BOOL)value objectRef:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        obj.lightContent = value;
    }
}

+ (void)xtr_setLeftBarButtonItems:(JSValue *)value objectRef:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        NSMutableArray *barButtonItems = [NSMutableArray array];
        if (value.isArray) {
            [value.toArray enumerateObjectsUsingBlock:^(id  _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
                if ([item isKindOfClass:[NSDictionary class]]) {
                    if ([item[@"customView"] isKindOfClass:[NSString class]]) {
                        UIView *customView = [XTMemoryManager find:item[@"customView"]];
                        if ([customView isKindOfClass:[UIView class]]) {
                            UIBarButtonItem *btnItem = [[UIBarButtonItem alloc] initWithCustomView:customView];
                            btnItem.tag = idx;
                            [barButtonItems addObject:btnItem];
                        }
                    }
                    else if ([item[@"image"] isKindOfClass:[NSString class]]) {
                        XTRImage *img = [XTMemoryManager find:item[@"image"]];
                        if ([img isKindOfClass:[XTRImage class]]) {
                            UIBarButtonItem *btnItem = [[UIBarButtonItem alloc] initWithImage:img.image
                                                                                        style:UIBarButtonItemStylePlain
                                                                                       target:obj
                                                                                       action:@selector(handleLeftButtonTouchUpInside:)];
                            btnItem.tag = idx;
                            [barButtonItems addObject:btnItem];
                        }
                    }
                    else if ([item[@"title"] isKindOfClass:[NSString class]]) {
                        UIBarButtonItem *btnItem = [[UIBarButtonItem alloc] initWithTitle:item[@"title"]
                                                                                    style:UIBarButtonItemStylePlain
                                                                                   target:obj
                                                                                   action:@selector(handleLeftButtonTouchUpInside:)];
                        btnItem.tag = idx;
                        [barButtonItems addObject:btnItem];
                    }
                }
            }];
        }
        [obj.innerItem setLeftBarButtonItems:barButtonItems];
        [obj resetItems];
    }
}

- (void)handleLeftButtonTouchUpInside:(UIBarButtonItem *)sender {
    if (self.scriptObject) {
        [self.scriptObject invokeMethod:@"handleLeftButtonTouchUpInside" withArguments:@[@(sender.tag)]];
    }
}

+ (void)xtr_setRightBarButtonItems:(JSValue *)value objectRef:(NSString *)objectRef {
    XTRNavigationBar *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRNavigationBar class]]) {
        NSMutableArray *barButtonItems = [NSMutableArray array];
        if (value.isArray) {
            [value.toArray enumerateObjectsUsingBlock:^(id  _Nonnull item, NSUInteger idx, BOOL * _Nonnull stop) {
                if ([item isKindOfClass:[NSDictionary class]]) {
                    if ([item[@"customView"] isKindOfClass:[NSString class]]) {
                        UIView *customView = [XTMemoryManager find:item[@"customView"]];
                        if ([customView isKindOfClass:[UIView class]]) {
                            UIBarButtonItem *btnItem = [[UIBarButtonItem alloc] initWithCustomView:customView];
                            btnItem.tag = idx;
                            [barButtonItems addObject:btnItem];
                        }
                    }
                    else if ([item[@"image"] isKindOfClass:[NSString class]]) {
                        XTRImage *img = [XTMemoryManager find:item[@"image"]];
                        if ([img isKindOfClass:[XTRImage class]]) {
                            UIBarButtonItem *btnItem = [[UIBarButtonItem alloc] initWithImage:img.image
                                                                                        style:UIBarButtonItemStylePlain
                                                                                       target:obj
                                                                                       action:@selector(handleRightButtonTouchUpInside:)];
                            btnItem.tag = idx;
                            [barButtonItems addObject:btnItem];
                        }
                    }
                    else if ([item[@"title"] isKindOfClass:[NSString class]]) {
                        UIBarButtonItem *btnItem = [[UIBarButtonItem alloc] initWithTitle:item[@"title"]
                                                                                    style:UIBarButtonItemStylePlain
                                                                                   target:obj
                                                                                   action:@selector(handleRightButtonTouchUpInside:)];
                        btnItem.tag = idx;
                        [barButtonItems addObject:btnItem];
                    }
                }
            }];
        }
        [obj.innerItem setRightBarButtonItems:barButtonItems];
        [obj resetItems];
    }
}

- (void)handleRightButtonTouchUpInside:(UIBarButtonItem *)sender {
    if (self.scriptObject) {
        [self.scriptObject invokeMethod:@"handleRightButtonTouchUpInside" withArguments:@[@(sender.tag)]];
    }
}

- (void)setTranslucent:(BOOL)translucent {
    _translucent = translucent;
    self.blurView.hidden = !translucent;
    [self.innerView setShadowImage:[UIImage new]];
}

- (void)setLightContent:(BOOL)lightContent {
    _lightContent = lightContent;
    self.innerView.barStyle = lightContent ? UIBarStyleBlack : UIBarStyleDefault;
    self.innerView.tintColor = lightContent ? [UIColor whiteColor] : [UIColor blackColor];
    self.viewController.navigationBarLightContent = lightContent;
}

- (void)setViewController:(XTRViewController *)viewController {
    _viewController = viewController;
    if (viewController.title != nil) {
        self.innerItem.title = viewController.title;
    }
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.blurView.frame = self.bounds;
    self.innerView.frame = CGRectMake(0, self.bounds.size.height - 44.0, self.bounds.size.width, 44.0);
}

@end
