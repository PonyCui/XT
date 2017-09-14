//
//  XTRTextField.h
//  XTSample
//
//  Created by 崔明辉 on 2017/9/13.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRView.h"
#import "XTRComponent.h"

@class XTRTextField;

@protocol XTRTextFieldExport <JSExport>

+ (XTRTextField *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject;

@end

@interface XTRTextField : XTRView<XTRComponent, XTRTextFieldExport>

@end
