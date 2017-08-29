//
//  XTRLayoutConstraint.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRLayoutConstraint.h"
#import "XTRUtils.h"

@interface XTRLayoutConstraint ()

@end

@implementation XTRLayoutConstraint

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.objectUUID = [[NSUUID UUID] UUIDString];
    }
    return self;
}

+ (NSString *)name {
    return @"XTRLayoutConstraint";
}

+ (XTRLayoutConstraint *)create:(JSValue *)firstItem
                      firstAttr:(JSValue *)firstAttr
                       relation:(JSValue *)relation
                     secondItem:(JSValue *)secondItem
                     secondAttr:(JSValue *)secondAttr
                       constant:(JSValue *)constant
                     multiplier:(JSValue *)multiplier
                   scriptObject:(JSValue *)scriptObject {
    XTRLayoutConstraint *nativeObject = [XTRLayoutConstraint new];
    nativeObject.innerObject = [NSLayoutConstraint constraintWithItem:[firstItem toView]
                                                            attribute:[firstAttr toLayoutAttribute]
                                                            relatedBy:[relation toLayoutRelation]
                                                               toItem:[secondItem toView]
                                                            attribute:[secondAttr toLayoutAttribute]
                                                           multiplier:[multiplier toDouble]
                                                             constant:[constant toDouble]];
    nativeObject.context = scriptObject.context;
    return nativeObject;
}

+ (NSArray *)xtr_constraintsWithVisualFormat:(JSValue *)format views:(JSValue *)argViews {
    NSMutableDictionary *views = [NSMutableDictionary dictionary];
    [[argViews toDictionary] enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        UIView *toView = [[JSValue valueWithObject:obj inContext:argViews.context] toView];
        if (toView) {
            toView.translatesAutoresizingMaskIntoConstraints = NO;
            [views setObject:toView forKey:key];
        }
    }];
    NSArray *nativeConstraints = [NSLayoutConstraint constraintsWithVisualFormat:[format toString]
                                                                         options:kNilOptions
                                                                         metrics:nil
                                                                           views:[views copy]];
    NSMutableArray *outputConstraint = [NSMutableArray array];
    for (NSLayoutConstraint *nativeConstraint in nativeConstraints) {
        XTRLayoutConstraint *v = [XTRLayoutConstraint new];
        v.innerObject = nativeConstraint;
        v.context = argViews.context;
        [outputConstraint addObject:[JSValue fromObject:v context:argViews.context] ?: [NSNull null]];
    }
    return [outputConstraint copy];
}

- (JSValue *)xtr_firstItem; {
    return [JSValue fromObject:self.innerObject.firstItem context:self.context];
}

- (NSNumber *)xtr_firstAttr; {
    switch (self.innerObject.firstAttribute) {
        case 0:
            return @(0);
        case NSLayoutAttributeLeft:
            return @(1);
        case NSLayoutAttributeRight:
            return @(2);
        case NSLayoutAttributeTop:
            return @(3);
        case NSLayoutAttributeBottom:
            return @(4);
        case NSLayoutAttributeWidth:
            return @(7);
        case NSLayoutAttributeHeight:
            return @(8);
        case NSLayoutAttributeCenterX:
            return @(9);
        case NSLayoutAttributeCenterY:
            return @(10);
        default:
            return @(0);
    }
}

- (NSNumber *)xtr_relation; {
    switch (self.innerObject.relation) {
        case NSLayoutRelationLessThanOrEqual:
            return @(-1);
        case NSLayoutRelationEqual:
            return @(0);
        case NSLayoutRelationGreaterThanOrEqual:
            return @(1);
        default:
            return @(0);
    }
}

- (JSValue *)xtr_secondItem; {
    return [JSValue fromObject:self.innerObject.secondItem context:self.context];
}

- (NSNumber *)xtr_secondAttr; {
    switch (self.innerObject.secondAttribute) {
        case 0:
            return @(0);
        case NSLayoutAttributeLeft:
            return @(1);
        case NSLayoutAttributeRight:
            return @(2);
        case NSLayoutAttributeTop:
            return @(3);
        case NSLayoutAttributeBottom:
            return @(4);
        case NSLayoutAttributeWidth:
            return @(7);
        case NSLayoutAttributeHeight:
            return @(8);
        case NSLayoutAttributeCenterX:
            return @(9);
        case NSLayoutAttributeCenterY:
            return @(10);
        default:
            return @(0);
    }
}

- (NSNumber *)xtr_constant; {
    return @(self.innerObject.constant);
}

- (void)xtr_setConstant:(JSValue *)constant; {
    self.innerObject.constant = [constant toDouble];
}

- (NSNumber *)xtr_multiplier; {
    return @(self.innerObject.multiplier);
}

- (NSNumber *)xtr_priority {
    return @(self.innerObject.priority);
}

- (void)xtr_setPriority:(JSValue *)priority {
    self.innerObject.priority = [priority toDouble];
}

@end
