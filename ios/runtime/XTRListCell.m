//
//  XTRListCell.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRListCell.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTRListCell ()

@property (nonatomic, assign) NSInteger selectionStyle;

@end

@implementation XTRListCell

+ (NSString *)name {
    return @"XTRListCell";
}

+ (NSString *)create {
    XTRListCell *view = [[XTRListCell alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSInteger)xtr_selectionStyle:(NSString *)objectRef {
    XTRListCell *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRListCell class]]) {
        UITableViewCell *realCell = view.realCell;
        if (realCell == nil) {
            return 0;
        }
        else if (realCell.selectionStyle == UITableViewCellSelectionStyleNone) {
            return 0;
        }
        else if (realCell.selectionStyle == UITableViewCellSelectionStyleGray) {
            return 1;
        }
        return 0;
    }
    return 0;
}

+ (void)xtr_setSelectionStyle:(NSInteger)selectionStyle objectRef:(NSString *)objectRef {
    XTRListCell *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTRListCell class]]) {
        view.selectionStyle = selectionStyle;
        UITableViewCell *realCell = view.realCell;
        if (realCell == nil) {
            return;
        }
        switch (selectionStyle) {
            case 0:
                realCell.selectionStyle = UITableViewCellSelectionStyleNone;
                break;
            case 1:
                realCell.selectionStyle = UITableViewCellSelectionStyleGray;
                break;
        }
    }
}

- (void)setRealCell:(UITableViewCell *)realCell {
    _realCell = realCell;
    [XTRListCell xtr_setSelectionStyle:self.selectionStyle objectRef:self.objectUUID];
}

@end
