//
//  XTRFont.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRFont.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@implementation XTRFont

+ (NSString *)create:(JSValue *)pointSize
         fontWeight:(JSValue *)fontWeight
          fontStyle:(JSValue *)fontStyle
         familyName:(JSValue *)familyName {
    XTRFont *obj = [XTRFont new];
    if (familyName != nil && [familyName toString].length > 0) {
        obj.innerObject = [UIFont fontWithName:[familyName toString] size:[pointSize toDouble]];
    }
    else if ([[fontStyle toString] isEqualToString:@"italic"]) {
        obj.innerObject = [UIFont italicSystemFontOfSize:[pointSize toDouble]];
    }
    else {
        if ([UIDevice currentDevice].systemVersion.floatValue >= 8.2) {
            obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:[fontWeight toDouble]];
        }
        else {
            if ([fontWeight toDouble] >= 700) {
                obj.innerObject = [UIFont boldSystemFontOfSize:[pointSize toDouble]];
            }
            else {
                obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble]];
            }
        }
    }
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
    obj.objectUUID = managedObject.objectUUID;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (NSString *)create:(UIFont *)font {
    XTRFont *obj = [XTRFont new];
    obj.innerObject = font;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
    obj.objectUUID = managedObject.objectUUID;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"XTRFont";
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTRFont dealloc.");
#endif
}

+ (NSString *)xtr_familyName:(NSString *)objectRef {
    XTRFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRFont class]]) {
        return obj.innerObject.familyName;
    }
    return nil;
}

+ (NSNumber *)xtr_pointSize:(NSString *)objectRef {
    XTRFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRFont class]]) {
        return @(obj.innerObject.pointSize);
    }
    return nil;
}

+ (NSString *)xtr_fontWeight:(NSString *)objectRef {
    XTRFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRFont class]]) {
        NSString *UIUsageAttribute = obj.innerObject.fontDescriptor.fontAttributes[@"NSCTFontUIUsageAttribute"];
        if ([UIUsageAttribute isEqualToString:@"CTFontBlackUsage"]) {
            return @"700";
        }
        return @"400";
    }
    return nil;
}

+ (NSString *)xtr_fontStyle:(NSString *)objectRef {
    XTRFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTRFont class]]) {
        NSString *UIUsageAttribute = obj.innerObject.fontDescriptor.fontAttributes[@"NSCTFontUIUsageAttribute"];
        if ([UIUsageAttribute isEqualToString:@"CTFontObliqueUsage"]) {
            return @"italic";
        }
        return @"normal";
    }
    return nil;
}

@end
