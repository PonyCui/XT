//
//  XTRTextField.m
//  XTSample
//
//  Created by 崔明辉 on 2017/9/13.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRTextField.h"

@interface XTRTextField ()

@property (nonatomic, strong) UITextField *innerView;
@property (nonatomic, strong) JSContext *context;
@property (nonatomic, strong) JSManagedValue *scriptObject;

@end

@implementation XTRTextField

+ (NSString *)name {
    return @"XTRTextField";
}

+ (XTRTextField *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRTextField *view = [[XTRTextField alloc] initWithFrame:[frame toRect]];
    view.userInteractionEnabled = YES;
    view.innerView = [[UITextField alloc] init];
    [view addSubview:view.innerView];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = scriptObject.context;
    view.scriptObject = [JSManagedValue managedValueWithValue:scriptObject andOwner:view];
    return view;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

@end
