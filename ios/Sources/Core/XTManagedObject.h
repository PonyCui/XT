//
//  XTManagedObject.h
//  XTMem
//
//  Created by 崔明辉 on 2017/12/27.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface XTManagedOwner : NSObject

@property (nonatomic, weak) id owner;

@end

@interface XTManagedObject : NSObject

@property (nonatomic, readonly) NSString *objectUUID;
@property (nonatomic, assign)   BOOL      objectThreadSafe;
@property (nonatomic, weak)     NSThread *objectThread;
@property (nonatomic, weak)     id        weakRef;
@property (nonatomic, strong)   id        strongRef;
@property (nonatomic, assign)   NSInteger xtRetainCount;
@property (nonatomic, copy)     NSArray  *owners;

- (instancetype)initWithObject:(id)anObject;

@end
