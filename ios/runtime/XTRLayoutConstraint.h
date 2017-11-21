//
//  XTRLayoutConstraint.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@class XTRLayoutConstraint;

@protocol XTRLayoutConstraintExport <JSExport>

@property (nonatomic, copy) NSString *objectUUID;

+ (NSString *)create:(JSValue *)firstItem
           firstAttr:(JSValue *)firstAttr
            relation:(JSValue *)relation
          secondItem:(JSValue *)secondItem
          secondAttr:(JSValue *)secondAttr
            constant:(JSValue *)constant
          multiplier:(JSValue *)multiplier
        scriptObject:(JSValue *)scriptObject;

+ (NSArray *)xtr_constraintsWithVisualFormat:(JSValue *)format views:(JSValue *)views;
- (JSValue *)xtr_firstItem;
- (NSNumber *)xtr_firstAttr;
- (NSNumber *)xtr_relation;
- (JSValue *)xtr_secondItem;
- (NSNumber *)xtr_secondAttr;
- (NSNumber *)xtr_constant;
- (void)xtr_setConstant:(JSValue *)constant;
- (NSNumber *)xtr_multiplier;
- (NSNumber *)xtr_priority;
- (void)xtr_setPriority:(JSValue *)priority;

@end

@interface XTRLayoutConstraint : NSObject<XTRComponent, XTRLayoutConstraintExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) NSLayoutConstraint *innerObject;
@property (nonatomic, strong) JSContext *context;

@end
