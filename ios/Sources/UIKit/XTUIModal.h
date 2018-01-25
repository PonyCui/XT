//
//  XTUIModal.h
//  XTSample
//
//  Created by 崔明辉 on 2018/1/22.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTComponent.h"

@protocol XTUIModalExport<JSExport>

+ (void)showAlert:(JSValue *)params callback:(JSValue *)callback;
+ (void)showConfirm:(JSValue *)params resolver:(JSValue *)resolver rejected:(JSValue *)rejected;
+ (void)showPrompt:(JSValue *)params resolver:(JSValue *)resolver rejected:(JSValue *)rejected;

@end

@interface XTUIModal : NSObject<XTComponent, XTUIModalExport>

@property (nonatomic, copy) NSString *objectUUID;

@end
