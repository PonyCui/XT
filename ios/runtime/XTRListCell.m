//
//  XTRListCell.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRListCell.h"
#import "XTRContext.h"

@interface XTRListCell ()

@end

@implementation XTRListCell

+ (NSString *)name {
    return @"XTRListCell";
}

+ (NSString *)create:(JSValue *)frame scriptObject:(JSValue *)scriptObject {
    XTRListCell *view = [[XTRListCell alloc] initWithFrame:[frame toRect]];
    view.objectUUID = [[NSUUID UUID] UUIDString];
    view.context = scriptObject.context;
    [((XTRContext *)[JSContext currentContext]).objectRefs store:view];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{ [view description]; }];
    return view.objectUUID;
}

- (NSNumber *)xtr_selectionStyle {
    UITableViewCell *realCell = self.realCell;
    if (realCell == nil) {
        return @(0);
    }
    else if (realCell.selectionStyle == UITableViewCellSelectionStyleNone) {
        return @(0);
    }
    else if (realCell.selectionStyle == UITableViewCellSelectionStyleGray) {
        return @(1);
    }
    return @(0);
}

- (void)xtr_setSelectionStyle:(JSValue *)selectionStyle {
    UITableViewCell *realCell = self.realCell;
    if (realCell == nil) {
        return;
    }
    switch ([selectionStyle toInt32]) {
        case 0:
            realCell.selectionStyle = UITableViewCellSelectionStyleNone;
            break;
        case 1:
            realCell.selectionStyle = UITableViewCellSelectionStyleGray;
            break;
    }
}

@end
