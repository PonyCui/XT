//
//  XTUIListCell.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIListCell.h"
#import "XTContext.h"
#import "XTMemoryManager.h"

@interface XTUIListCell ()

@property (nonatomic, assign) NSInteger selectionStyle;

@end

@implementation XTUIListCell

+ (NSString *)name {
    return @"_XTUIListCell";
}

+ (NSString *)create {
    XTUIListCell *view = [[XTUIListCell alloc] initWithFrame:CGRectZero];
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSInteger)xtr_selectionStyle:(NSString *)objectRef {
    XTUIListCell *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIListCell class]]) {
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
    XTUIListCell *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIListCell class]]) {
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
    [XTUIListCell xtr_setSelectionStyle:self.selectionStyle objectRef:self.objectUUID];
}

@end
