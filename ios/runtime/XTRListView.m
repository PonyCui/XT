//
//  XTRTableView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTRListView.h"
#import "XTRUtils.h"
#import "XTRLayoutConstraint.h"
#import "XTRContext.h"
#import "XTRListCell.h"
#import "XTRContext.h"
#import <XT-Mem/XTMemoryManager.h>

@interface XTRListView ()<UIScrollViewDelegate, UITableViewDelegate, UITableViewDataSource>

@property (nonatomic, copy) NSArray<NSDictionary *> *items;

@end

@implementation XTRListView

+ (NSString *)create:(JSValue *)frame {
    XTRListView *view = [[XTRListView alloc] initWithFrame:[frame toRect]];
    view.delegate = view;
    view.dataSource = view;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"XTRListView";
}

- (void)dealloc {
    self.delegate = nil;
    self.dataSource = nil;
#ifdef LOGDEALLOC
    NSLog(@"XTRListView dealloc.");
#endif
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

+ (void)xtr_setItems:(JSValue *)items objectRef:(NSString *)objectRef {
    XTRListView *view = [XTMemoryManager find:objectRef];
    if (view) {
        view.items = [items toArray];
    }
}

+ (void)xtr_reloadData:(NSString *)objectRef {
    XTRListView *view = [XTMemoryManager find:objectRef];
    if (view) {
        [view reloadData];
    }
}

#pragma mark - UITableViewDelegate & UITableViewDatasource 

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    return [self.items count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *reuseIdentifier = @"Cell";
    if (indexPath.row < self.items.count) {
        reuseIdentifier = self.items[indexPath.row][@"reuseIdentifier"] ?: @"Cell";
    }
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:reuseIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIdentifier];
    }
    if ([[cell contentView] viewWithTag:1000] == nil) {
        if (self.scriptObject != nil) {
            UIView *innerView = [[self.scriptObject xtr_invokeMethod:@"requestRowCell" withArguments:@[@(indexPath.row)]] toView];
            if (innerView != nil) {
                innerView.tag = 1000;
                innerView.frame = cell.contentView.bounds;
                innerView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
                [[cell contentView] addSubview:innerView];
            }
        }
    }
    if ([[[cell contentView] viewWithTag:1000] isKindOfClass:[XTRListCell class]]) {
        XTRListCell *fakeCell = [[cell contentView] viewWithTag:1000];
        [fakeCell setRealCell:cell];
        if (self.scriptObject != nil) {
            [self.scriptObject xtr_invokeMethod:@"handleRenderItem"
                                        withArguments:@[
                                                        @(indexPath.row),
                                                        [JSValue fromObject:fakeCell
                                                                    context:self.context] ?: [NSNull null]
                                                        ]];
        }
    }
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (self.scriptObject != nil) {
        return [[self.scriptObject xtr_invokeMethod:@"requestRowHeight"
                                            withArguments:@[@(tableView.bounds.size.width), @(indexPath.row)]] toDouble];
    }
    return 88.0;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    if (cell != nil) {
        if ([[[cell contentView] viewWithTag:1000] isKindOfClass:[XTRListCell class]]) {
            XTRListCell *fakeCell = [[cell contentView] viewWithTag:1000];
            if (fakeCell.scriptObject != nil) {
                [fakeCell.scriptObject xtr_invokeMethod:@"handleSelected" withArguments:@[]];
            }
        }
    }
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}

@end
