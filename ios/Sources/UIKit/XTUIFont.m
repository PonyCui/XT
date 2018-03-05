//
//  XTUIFont.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIFont.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@implementation XTUIFont

+ (NSString *)create:(JSValue *)pointSize
         fontWeight:(JSValue *)fontWeight
          fontStyle:(JSValue *)fontStyle
         familyName:(JSValue *)familyName {
    XTUIFont *obj = [XTUIFont new];
    if (familyName != nil && [familyName toString].length > 0) {
        obj.innerObject = [UIFont fontWithName:[familyName toString] size:[pointSize toDouble]];
    }
    else if ([[fontStyle toString] isEqualToString:@"italic"]) {
        obj.innerObject = [UIFont italicSystemFontOfSize:[pointSize toDouble]];
    }
    else {
        if (@available(iOS 8.2, *)) {
            switch ([fontWeight toInt32]) {
                case 100:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightUltraLight];
                    break;
                case 200:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightThin];
                    break;
                case 300:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightLight];
                    break;
                case 400:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightRegular];
                    break;
                case 500:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightMedium];
                    break;
                case 600:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightSemibold];
                    break;
                case 700:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightBold];
                    break;
                case 800:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightHeavy];
                    break;
                case 900:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightBlack];
                    break;
                default:
                    obj.innerObject = [UIFont systemFontOfSize:[pointSize toDouble] weight:UIFontWeightRegular];
                    break;
            }
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
    XTUIFont *obj = [XTUIFont new];
    obj.innerObject = font;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:obj];
    obj.objectUUID = managedObject.objectUUID;
    [XTMemoryManager add:managedObject];
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"_XTUIFont";
}

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTUIFont dealloc.");
#endif
}

+ (NSString *)xtr_familyName:(NSString *)objectRef {
    XTUIFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIFont class]]) {
        return obj.innerObject.familyName;
    }
    return nil;
}

+ (CGFloat)xtr_pointSize:(NSString *)objectRef {
    XTUIFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIFont class]]) {
        return obj.innerObject.pointSize;
    }
    return 0.0;
}

+ (NSString *)xtr_fontWeight:(NSString *)objectRef {
    XTUIFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIFont class]]) {
        NSString *UIUsageAttribute = obj.innerObject.fontDescriptor.fontAttributes[@"NSCTFontUIUsageAttribute"];
        if ([UIUsageAttribute isEqualToString:@"CTFontBlackUsage"]) {
            return @"700";
        }
        return @"400";
    }
    return nil;
}

+ (NSString *)xtr_fontStyle:(NSString *)objectRef {
    XTUIFont *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUIFont class]]) {
        NSString *UIUsageAttribute = obj.innerObject.fontDescriptor.fontAttributes[@"NSCTFontUIUsageAttribute"];
        if ([UIUsageAttribute isEqualToString:@"CTFontObliqueUsage"]) {
            return @"italic";
        }
        return @"normal";
    }
    return nil;
}

@end
