//
//  XTUILoadMoreControl.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/1.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUILoadMoreControl.h"
#import "XTMemoryManager.h"
#import "XTUIUtils.h"
#import "XTUIListView.h"

@interface XTUILoadMoreControl()

@property (nonatomic, strong) UIActivityIndicatorView *indicatorView;

@end

@implementation XTUILoadMoreControl

+ (NSString *)name {
    return @"_XTUILoadMoreControl";
}

+ (BOOL)xtr_enabled:(NSString *)objectRef {
    XTUILoadMoreControl *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUILoadMoreControl class]]) {
        return view.enabled;
    }
    return NO;
}

+ (void)xtr_setEnabled:(BOOL)value objectRef:(NSString *)objectRef {
    XTUILoadMoreControl *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUILoadMoreControl class]]) {
        view.enabled = value;
    }
}

+ (NSDictionary *)xtr_color:(NSString *)objectRef {
    XTUILoadMoreControl *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILoadMoreControl class]]) {
        return [JSValue fromColor:obj.indicatorView.color];
    }
    return @{};
}

+ (void)xtr_setColor:(JSValue *)color objectRef:(NSString *)objectRef {
    XTUILoadMoreControl *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILoadMoreControl class]]) {
        obj.indicatorView.color = [color toColor];
    }
}

+ (void)xtr_endLoading:(NSString *)objectRef {
    XTUILoadMoreControl *obj = [XTMemoryManager find:objectRef];
    if ([obj isKindOfClass:[XTUILoadMoreControl class]]) {
        [obj endLoading];
    }
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        _indicatorView = [[UIActivityIndicatorView alloc] initWithActivityIndicatorStyle:UIActivityIndicatorViewStyleGray];
        [self addSubview:_indicatorView];
        self.frame = CGRectMake(0, 0, 0, 44);
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.indicatorView.frame = self.bounds;
}

- (void)startLoading {
    NSLog(@"startLoading");
    self.isLoading = YES;
    [self.indicatorView startAnimating];
    XTUIListView *listView = self.listView;
    if (listView != nil) {
        UITableView *tableView = ((UITableView *)listView.innerView);
        if (tableView.tableFooterView != nil) {
            [tableView.tableFooterView addSubview:self];
            self.frame = CGRectMake(0, tableView.tableFooterView.frame.size.height, tableView.tableFooterView.frame.size.width, self.frame.size.height);
            tableView.tableFooterView.frame = CGRectMake(0,
                                                        0,
                                                        tableView.tableFooterView.frame.size.width,
                                                        tableView.tableFooterView.frame.size.height + self.frame.size.height);
            tableView.tableFooterView = tableView.tableFooterView;
        }
        else {
            tableView.tableFooterView = self;
        }
    }
    if ([self scriptObject] != nil) {
        [[self scriptObject] invokeMethod:@"handleLoad" withArguments:@[]];
    }
}

- (void)endLoading {
    self.isLoading = NO;
    [self.indicatorView stopAnimating];
    XTUIListView *listView = self.listView;
    if (listView != nil) {
        UITableView *tableView = ((UITableView *)listView.innerView);
        if (![tableView.tableFooterView isKindOfClass:[XTUILoadMoreControl class]]) {
            tableView.tableFooterView.frame = CGRectMake(0,
                                                        0,
                                                        tableView.tableFooterView.frame.size.width,
                                                        tableView.tableFooterView.frame.size.height - self.frame.size.height);
            [self removeFromSuperview];
            tableView.tableFooterView = tableView.tableFooterView;
        }
        else {
            tableView.tableFooterView = nil;
        }
    }
}

@end
