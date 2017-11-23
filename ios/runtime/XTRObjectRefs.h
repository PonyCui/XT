//
//  XTRObjectRefs.h
//  XTSample
//
//  Created by 崔明辉 on 2017/11/16.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@interface XTRObjectRefs : NSObject

- (void)store:(id<XTRComponent>)object;

- (void)retain:(id<XTRComponent>)object;

- (id<XTRComponent>)restore:(NSString *)objectUUID;

- (void)addOwner:(JSValue *)child owner:(JSValue *)owner;

@end
