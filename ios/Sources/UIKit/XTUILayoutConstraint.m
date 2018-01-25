//
//  XTUILayoutConstraint.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUILayoutConstraint.h"
#import "XTUIUtils.h"
#import "XTContext.h"
#import "XTUIView.h"
#import "XTMemoryManager.h"

@interface XTUILayoutConstraint ()

@end

@implementation XTUILayoutConstraint

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUILayoutConstraint dealloc.");
#endif
}

+ (NSString *)name {
    return @"_XTUILayoutConstraint";
}

+ (NSString *)create:(NSString *)firstItemRef
           firstAttr:(NSInteger)firstAttr
            relation:(NSInteger)relation
          secondItem:(NSString *)secondItemRef
          secondAttr:(NSInteger)secondAttr
            constant:(CGFloat)constant
          multiplier:(CGFloat)multiplier {
    XTUIView *firstItem = [XTMemoryManager find:firstItemRef];
    XTUIView *secondItem = [XTMemoryManager find:secondItemRef];
    NSLayoutAttribute firstAttrValue = 0;
    switch (firstAttr) {
        case 1:
            firstAttrValue = NSLayoutAttributeLeft;
            break;
        case 2:
            firstAttrValue = NSLayoutAttributeRight;
            break;
        case 3:
            firstAttrValue = NSLayoutAttributeTop;
            break;
        case 4:
            firstAttrValue = NSLayoutAttributeBottom;
            break;
        case 7:
            firstAttrValue = NSLayoutAttributeWidth;
            break;
        case 8:
            firstAttrValue = NSLayoutAttributeHeight;
            break;
        case 9:
            firstAttrValue = NSLayoutAttributeCenterX;
            break;
        case 10:
            firstAttrValue = NSLayoutAttributeCenterY;
            break;
    }
    NSLayoutRelation relationValue = NSLayoutRelationEqual;
    switch (relation) {
        case -1:
            relationValue = NSLayoutRelationLessThanOrEqual;
            break;
        case 0:
            relationValue = NSLayoutRelationEqual;
            break;
        case 1:
            relationValue = NSLayoutRelationGreaterThanOrEqual;
            break;
    }
    NSLayoutAttribute secondAttrValue = 0;
    switch (secondAttr) {
        case 1:
            secondAttrValue = NSLayoutAttributeLeft;
            break;
        case 2:
            secondAttrValue = NSLayoutAttributeRight;
            break;
        case 3:
            secondAttrValue = NSLayoutAttributeTop;
            break;
        case 4:
            secondAttrValue = NSLayoutAttributeBottom;
            break;
        case 7:
            secondAttrValue = NSLayoutAttributeWidth;
            break;
        case 8:
            secondAttrValue = NSLayoutAttributeHeight;
            break;
        case 9:
            secondAttrValue = NSLayoutAttributeCenterX;
            break;
        case 10:
            secondAttrValue = NSLayoutAttributeCenterY;
            break;
    }
    XTUILayoutConstraint *obj = [XTUILayoutConstraint new];
    obj.innerObject = [NSLayoutConstraint constraintWithItem:firstItem ?: [secondItem superview]
                                                   attribute:firstAttrValue
                                                   relatedBy:relationValue
                                                      toItem:secondItem ?: [firstItem superview]
                                                   attribute:secondAttrValue
                                                  multiplier:multiplier
                                                    constant:constant];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
    [XTMemoryManager add:managedObject];
    obj.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSArray *)xtr_constraintsWithVisualFormat:(NSString *)format views:(JSValue *)argViews {
    NSMutableDictionary *views = [NSMutableDictionary dictionary];
    [[argViews toDictionary] enumerateKeysAndObjectsUsingBlock:^(id  _Nonnull key, id  _Nonnull obj, BOOL * _Nonnull stop) {
        UIView *toView = [XTMemoryManager find:obj];
        if ([toView isKindOfClass:[UIView class]]) {
            toView.translatesAutoresizingMaskIntoConstraints = NO;
            [views setObject:toView forKey:key];
        }
    }];
    NSArray *nativeConstraints = [NSLayoutConstraint constraintsWithVisualFormat:format
                                                                         options:kNilOptions
                                                                         metrics:nil
                                                                           views:[views copy]];
    NSMutableArray *outputConstraint = [NSMutableArray array];
    for (NSLayoutConstraint *nativeConstraint in nativeConstraints) {
        XTUILayoutConstraint *obj = [XTUILayoutConstraint new];
        obj.innerObject = nativeConstraint;
        XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
        [XTMemoryManager add:managedObject];
        obj.objectUUID = managedObject.objectUUID;
        [outputConstraint addObject:managedObject.objectUUID];
    }
    return [outputConstraint copy];
}

+ (NSString *)xtr_firstItem:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        XTUIView *view = obj.innerObject.firstItem;
        if ([view isKindOfClass:[XTUIView class]]) {
            return view.objectUUID;
        }
    }
    return nil;
}

+ (NSInteger)xtr_firstAttr:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        switch (obj.innerObject.firstAttribute) {
            case 0:
                return 0;
            case NSLayoutAttributeLeft:
                return 1;
            case NSLayoutAttributeRight:
                return 2;
            case NSLayoutAttributeTop:
                return 3;
            case NSLayoutAttributeBottom:
                return 4;
            case NSLayoutAttributeWidth:
                return 7;
            case NSLayoutAttributeHeight:
                return 8;
            case NSLayoutAttributeCenterX:
                return 9;
            case NSLayoutAttributeCenterY:
                return 10;
            default:
                return 0;
        }
    }
    return 0;
}

+ (NSInteger)xtr_relation:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        switch (obj.innerObject.relation) {
            case NSLayoutRelationLessThanOrEqual:
                return -1;
            case NSLayoutRelationEqual:
                return 0;
            case NSLayoutRelationGreaterThanOrEqual:
                return 1;
            default:
                return 0;
        }
    }
    return 0;
}

+ (NSString *)xtr_secondItem:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        XTUIView *view = obj.innerObject.secondItem;
        if ([view isKindOfClass:[XTUIView class]]) {
            return view.objectUUID;
        }
    }
    return nil;
}

+ (NSInteger)xtr_secondAttr:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        switch (obj.innerObject.secondAttribute) {
            case 0:
                return 0;
            case NSLayoutAttributeLeft:
                return 1;
            case NSLayoutAttributeRight:
                return 2;
            case NSLayoutAttributeTop:
                return 3;
            case NSLayoutAttributeBottom:
                return 4;
            case NSLayoutAttributeWidth:
                return 7;
            case NSLayoutAttributeHeight:
                return 8;
            case NSLayoutAttributeCenterX:
                return 9;
            case NSLayoutAttributeCenterY:
                return 10;
            default:
                return 0;
        }
    }
    return 0;
}

+ (CGFloat)xtr_constant:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        return obj.innerObject.constant;
    }
    return 0.0;
}

+ (void)xtr_setConstant:(CGFloat)constant objectRef:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        obj.innerObject.constant = constant;
    }
}

+ (CGFloat)xtr_multiplier:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        return obj.innerObject.multiplier;
    }
    return 0.0;
}

+ (NSInteger)xtr_priority:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        return obj.innerObject.priority;
    }
    return 0.0;
}

+ (void)xtr_setPriority:(NSInteger)priority objectRef:(NSString *)objectRef {
    XTUILayoutConstraint *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILayoutConstraint class]]) {
        obj.innerObject.priority = priority;
    }
}

@end
