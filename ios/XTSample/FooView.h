//
//  FooView.h
//  XTSample
//
//  Created by 崔明辉 on 2018/3/13.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "XTUIExtView.h"

@interface FooView : UIView<XTExtViewProtocol>

@property (nonatomic, weak) XTUIExtView *extView;
@property (nonatomic, strong) NSString *fooColor;

@end
