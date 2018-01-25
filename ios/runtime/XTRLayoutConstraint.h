//
//  XTRLayoutConstraint.h
//  XTSample
//
//  Created by 崔明辉 on 2017/8/29.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@class XTRLayoutConstraint;

@protocol XTRLayoutConstraintExport <JSExport>

+ (NSString *)create:(NSString *)firstItemRef
           firstAttr:(NSInteger)firstAttr
            relation:(NSInteger)relation
          secondItem:(NSString *)secondItemRef
          secondAttr:(NSInteger)secondAttr
            constant:(CGFloat)constant
          multiplier:(CGFloat)multiplier;

+ (NSArray *)xtr_constraintsWithVisualFormat:(NSString *)format views:(JSValue *)views;
+ (NSString *)xtr_firstItem:(NSString *)objectRef;
+ (NSInteger)xtr_firstAttr:(NSString *)objectRef;
+ (NSInteger)xtr_relation:(NSString *)objectRef;
+ (NSString *)xtr_secondItem:(NSString *)objectRef;
+ (NSInteger)xtr_secondAttr:(NSString *)objectRef;
+ (CGFloat)xtr_constant:(NSString *)objectRef;
+ (void)xtr_setConstant:(CGFloat)constant objectRef:(NSString *)objectRef;
+ (CGFloat)xtr_multiplier:(NSString *)objectRef;
+ (NSInteger)xtr_priority:(NSString *)objectRef;
+ (void)xtr_setPriority:(NSInteger)priority objectRef:(NSString *)objectRef;

@end

@interface XTRLayoutConstraint : NSObject<XTComponent, XTRLayoutConstraintExport>

@property (nonatomic, copy) NSString *objectUUID;
@property (nonatomic, strong) NSLayoutConstraint *innerObject;

@end
