//
//  XTRModal.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTRComponent.h"

@protocol XTRModalExport<JSExport>

+ (void)showAlert:(JSValue *)params callback:(JSValue *)callback;
+ (void)showConfirm:(JSValue *)params resolver:(JSValue *)resolver rejecter:(JSValue *)rejecter;
+ (void)showPrompt:(JSValue *)params resolver:(JSValue *)resolver rejecter:(JSValue *)rejecter;

@end

@interface XTRModal : NSObject<XTRComponent, XTRModalExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
