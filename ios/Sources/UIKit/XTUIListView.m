//
//  XTUITableView.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTUIListView.h"
#import "XTUIUtils.h"
#import "XTUILayoutConstraint.h"
#import "XTContext.h"
#import "XTUIListCell.h"
#import "XTContext.h"
#import "XTUIWindow.h"
#import "XTMemoryManager.h"

@interface XTUIListView ()<UIScrollViewDelegate, UITableViewDelegate, UITableViewDataSource>

@property (nonatomic, copy) NSArray<NSDictionary *> *items;
@property (nonatomic, strong) NSMutableSet *retainViews;

@end

@implementation XTUIListView

+ (NSString *)create {
    XTUIListView *view = [[XTUIListView alloc] initWithFrame:CGRectZero];
    view.delegate = view;
    view.dataSource = view;
    XTManagedObject *managedObject = [[XTManagedObject alloc] initWithObject:view];
    [XTMemoryManager add:managedObject];
    view.context = [JSContext currentContext];
    view.objectUUID = managedObject.objectUUID;
    return managedObject.objectUUID;
}

+ (NSString *)name {
    return @"_XTUIListView";
}

+ (void)xtr_setItems:(JSValue *)items objectRef:(NSString *)objectRef {
    XTUIListView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIListView class]]) {
        view.items = [items toArray];
    }
}

+ (void)xtr_setHeaderView:(NSString *)viewRef objectRef:(NSString *)objectRef {
    UIView *view = [XTMemoryManager find:viewRef];
    XTUIListView *listView = [XTMemoryManager find:objectRef];
    if ([listView isKindOfClass:[XTUIListView class]]) {
        listView.tableHeaderView = [view isKindOfClass:[UIView class]] ? view : nil;
    }
}

+ (void)xtr_setFooterView:(NSString *)viewRef objectRef:(NSString *)objectRef {
    UIView *view = [XTMemoryManager find:viewRef];
    XTUIListView *listView = [XTMemoryManager find:objectRef];
    if ([listView isKindOfClass:[XTUIListView class]]) {
        listView.tableFooterView = [view isKindOfClass:[UIView class]] ? view : nil;
    }
}

+ (void)xtr_reloadData:(NSString *)objectRef {
    XTUIListView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUIListView class]]) {
        [view reloadData];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame style:UITableViewStyleGrouped];
    if (self) {
        self.separatorStyle = UITableViewCellSeparatorStyleNone;
        UIView *headerView = [UIView new];
        headerView.frame = CGRectMake(0, 0, 0, 0.01);
        self.tableHeaderView = headerView;
        self.tableFooterView = [UIView new];
        if (@available(iOS 11.0, *)) {
            self.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        }
        self.retainViews = [NSMutableSet set];
    }
    return self;
}

- (void)dealloc {
    self.delegate = nil;
    self.dataSource = nil;
#ifdef LOGDEALLOC
    NSLog(@"XTUIListView dealloc.");
#endif
}

- (JSValue *)scriptObject {
    return [self.context evaluateScript:[NSString stringWithFormat:@"objectRefs['%@']", self.objectUUID]];
}

- (void)setItems:(NSArray<NSDictionary *> *)items {
    _items = items;
    [_items enumerateObjectsUsingBlock:^(NSDictionary * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        {
            NSString *objectRef = obj[@"__headerViewObjectRef"];
            if ([objectRef isKindOfClass:[NSString class]]) {
                UIView *view = [XTMemoryManager find:objectRef];
                if ([view isKindOfClass:[UIView class]]) {
                    [self.retainViews addObject:view];
                }
            }
        }
        {
            NSString *objectRef = obj[@"__footerViewObjectRef"];
            if ([objectRef isKindOfClass:[NSString class]]) {
                UIView *view = [XTMemoryManager find:objectRef];
                if ([view isKindOfClass:[UIView class]]) {
                    [self.retainViews addObject:view];
                }
            }
        }
    }];
}

#pragma mark - UITableViewDelegate & UITableViewDatasource

- (void)scrollViewDidScroll:(UIScrollView *)scrollView {
    JSValue *value = self.scriptObject;
    if (value != nil) {
        [value invokeMethod:@"handleScroll" withArguments:@[]];
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
    if (section < self.items.count) {
        NSString *objectRef = self.items[section][@"__headerViewObjectRef"];
        if ([objectRef isKindOfClass:[NSString class]]) {
            UIView *view = [XTMemoryManager find:objectRef];
            if ([view isKindOfClass:[UIView class]]) {
                return view.frame.size.height;
            }
        }
    }
    return 0.1;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    if (section < self.items.count) {
        NSString *objectRef = self.items[section][@"__headerViewObjectRef"];
        if ([objectRef isKindOfClass:[NSString class]]) {
            UIView *view = [XTMemoryManager find:objectRef];
            if ([view isKindOfClass:[UIView class]]) {
                return view;
            }
        }
    }
    return nil;
}


- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section {
    if (section < self.items.count) {
        NSString *objectRef = self.items[section][@"__footerViewObjectRef"];
        if ([objectRef isKindOfClass:[NSString class]]) {
            UIView *view = [XTMemoryManager find:objectRef];
            if ([view isKindOfClass:[UIView class]]) {
                return view.frame.size.height;
            }
        }
    }
    return 0.1;
}

- (UIView *)tableView:(UITableView *)tableView viewForFooterInSection:(NSInteger)section {
    if (section < self.items.count) {
        NSString *objectRef = self.items[section][@"__footerViewObjectRef"];
        if ([objectRef isKindOfClass:[NSString class]]) {
            UIView *view = [XTMemoryManager find:objectRef];
            if ([view isKindOfClass:[UIView class]]) {
                return view;
            }
        }
    }
    return nil;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [self.items count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    if (section < self.items.count) {
        NSArray *items = self.items[section][@"items"];
        if ([items isKindOfClass:[NSArray class]]) {
            return items.count;
        }
    }
    return 0;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    NSString *reuseIdentifier = @"Cell";
    if (indexPath.row < self.items.count) {
        reuseIdentifier = self.items[indexPath.row][@"reuseIdentifier"] ?: @"Cell";
    }
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:reuseIdentifier];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:reuseIdentifier];
        cell.backgroundColor = [UIColor clearColor];
    }
    if ([[cell contentView] viewWithTag:1000] == nil) {
        if (self.scriptObject != nil) {
            NSString *innerViewRef = [self.scriptObject invokeMethod:@"requestRowCell" withArguments:@[@(indexPath.row), @(indexPath.section)]].toString;
            UIView *innerView = [XTMemoryManager find:innerViewRef];
            if ([innerView isKindOfClass:[UIView class]]) {
                innerView.tag = 1000;
                innerView.frame = cell.contentView.bounds;
                innerView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
                [[cell contentView] addSubview:innerView];
            }
        }
    }
    if ([[[cell contentView] viewWithTag:1000] isKindOfClass:[XTUIListCell class]]) {
        XTUIListCell *fakeCell = [[cell contentView] viewWithTag:1000];
        [fakeCell setRealCell:cell];
        if (self.scriptObject != nil) {
            [self.scriptObject invokeMethod:@"handleRenderItem"
                                        withArguments:@[
                                                        @(indexPath.row),
                                                        @(indexPath.section),
                                                        (fakeCell.objectUUID ?: [NSNull null]),
                                                        ]];
        }
    }
    return cell;
}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (self.scriptObject != nil) {
        return [[self.scriptObject invokeMethod:@"requestRowHeight"
                                            withArguments:@[@(tableView.bounds.size.width), @(indexPath.row), @(indexPath.section)]] toDouble];
    }
    return 88.0;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    if (cell != nil) {
        if ([[[cell contentView] viewWithTag:1000] isKindOfClass:[XTUIListCell class]]) {
            XTUIListCell *fakeCell = [[cell contentView] viewWithTag:1000];
            if (fakeCell.scriptObject != nil) {
                [fakeCell.scriptObject invokeMethod:@"handleSelected" withArguments:@[]];
            }
        }
    }
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
}

- (void)tableView:(UITableView *)tableView didHighlightRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    if (cell != nil) {
        if ([[[cell contentView] viewWithTag:1000] isKindOfClass:[XTUIListCell class]]) {
            XTUIListCell *fakeCell = [[cell contentView] viewWithTag:1000];
            if (fakeCell.scriptObject != nil) {
                [fakeCell.scriptObject invokeMethod:@"didHighlighted" withArguments:@[@(YES)]];
            }
        }
    }
}

- (void)tableView:(UITableView *)tableView didUnhighlightRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];
    if (cell != nil) {
        if ([[[cell contentView] viewWithTag:1000] isKindOfClass:[XTUIListCell class]]) {
            XTUIListCell *fakeCell = [[cell contentView] viewWithTag:1000];
            if (fakeCell.scriptObject != nil) {
                [fakeCell.scriptObject invokeMethod:@"didHighlighted" withArguments:@[@(NO)]];
            }
        }
    }
}

#pragma mark - View callbacks

- (void)didAddSubview:(XTUIView *)subview {
    [super didAddSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didAddSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                   ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willRemoveSubview:(XTUIView *)subview {
    [super willRemoveSubview:subview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willRemoveSubview" withArguments:([subview conformsToProtocol:@protocol(XTComponent)]
                                                                       ? @[[subview objectUUID] ?: @""] : @[])];
    }
}

- (void)willMoveToSuperview:(XTUIView *)newSuperview {
    [super willMoveToSuperview:newSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToSuperview" withArguments:([newSuperview conformsToProtocol:@protocol(XTComponent)]
                                                                         ? @[[newSuperview objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToSuperview {
    [super didMoveToSuperview];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToSuperview" withArguments:@[]];
    }
}

- (void)willMoveToWindow:(XTUIWindow *)newWindow {
    [super willMoveToWindow:newWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"willMoveToWindow" withArguments:([newWindow conformsToProtocol:@protocol(XTComponent)]
                                                                      ? @[[newWindow objectUUID] ?: @""] : @[])];
    }
}

- (void)didMoveToWindow {
    [super didMoveToWindow];
    JSValue *scriptObject = self.scriptObject;
    if (scriptObject != nil) {
        [scriptObject invokeMethod:@"didMoveToWindow" withArguments:@[]];
    }
}

@end
