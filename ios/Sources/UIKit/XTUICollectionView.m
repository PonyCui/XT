//
//  XTUICollectionView.m
//  XTSample
//
//  Created by 崔明辉 on 2018/3/15.
//  Copyright © 2018年 UED Center, YY Inc. All rights reserved.
//

#import "XTUICollectionView.h"
#import "XTMemoryManager.h"
#import "XTUIUtils.h"

@interface XTUICollectionView()<UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout>

@property (nonatomic, readwrite) UICollectionView *innerView;
@property (nonatomic, copy) NSArray<NSDictionary *> *items;
@property (nonatomic, strong) UICollectionViewFlowLayout *layout;

@end

@implementation XTUICollectionView

+ (void)xtr_registerCell:(NSString *)reuseIdentifier objectRef:(NSString *)objectRef {
    XTUICollectionView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUICollectionView class]]) {
        [view.innerView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:reuseIdentifier];
    }
}

+ (void)xtr_setItems:(JSValue *)items objectRef:(NSString *)objectRef {
    XTUICollectionView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUICollectionView class]]) {
        view.items = [items toArray];
    }
}

+ (void)xtr_reloadData:(NSString *)objectRef {
    XTUICollectionView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUICollectionView class]]) {
        [view.innerView reloadData];
    }
}

+ (void)xtr_setScrollDirection:(NSInteger)value objectRef:(NSString *)objectRef {
    XTUICollectionView *view = [XTMemoryManager find:objectRef];
    if ([view isKindOfClass:[XTUICollectionView class]]) {
        if (value == 0) {
            view.layout.scrollDirection = UICollectionViewScrollDirectionVertical;
            view.innerView.alwaysBounceVertical = YES;
            view.innerView.alwaysBounceHorizontal = NO;
        }
        else if (value == 1) {
            view.layout.scrollDirection = UICollectionViewScrollDirectionHorizontal;
            view.innerView.alwaysBounceVertical = NO;
            view.innerView.alwaysBounceHorizontal = YES;
        }
    }
}

+ (NSString *)name {
    return @"_XTUICollectionView";
}

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        self.layout = [[UICollectionViewFlowLayout alloc] init];
        self.innerView = [[UICollectionView alloc] initWithFrame:CGRectZero
                                            collectionViewLayout:self.layout];
        [self.innerView setBackgroundColor:[UIColor grayColor]];
        self.innerView.alwaysBounceVertical = YES;
        self.innerView.delegate = self;
        [self.innerView setDataSource:self];
        self.innerView.contentInset = UIEdgeInsetsMake(0, 0, 0, 0);
        if (@available(iOS 11.0, *)) {
            self.innerView.contentInsetAdjustmentBehavior = UIScrollViewContentInsetAdjustmentNever;
        }
        [self.innerView registerClass:[UICollectionViewCell class] forCellWithReuseIdentifier:@"Cell"];
        [self addSubview:self.innerView];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.innerView.frame = self.bounds;
}

#pragma mark - UICollectionViewDelegate & UICollectionViewDataSource

- (nonnull __kindof UICollectionViewCell *)collectionView:(nonnull UICollectionView *)collectionView
                                   cellForItemAtIndexPath:(nonnull NSIndexPath *)indexPath {
    NSString *reuseIdentifier = @"Cell";
    if (indexPath.row < self.items.count) {
        reuseIdentifier = self.items[indexPath.row][@"reuseIdentifier"] ?: @"Cell";
    }
    UICollectionViewCell *cell;
    @try {
        cell = [collectionView dequeueReusableCellWithReuseIdentifier:reuseIdentifier forIndexPath:indexPath];
    } @catch(NSException *e) { }
    if (cell == nil) {
        cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"Cell" forIndexPath:indexPath];
    }
    XTUIView *itemView = [cell.contentView viewWithTag:-1000];
    if (itemView == nil) {
        NSString *requestViewObjectRef = [self.scriptObject invokeMethod:@"requestItemCell" withArguments:@[@(indexPath.item)]].toString;
        XTUIView *requestView = [XTMemoryManager find:requestViewObjectRef];
        if ([requestView isKindOfClass:[XTUIView class]]) {
            itemView = requestView;
            itemView.tag = -1000;
            itemView.frame = cell.contentView.bounds;
            itemView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
            [cell.contentView addSubview:itemView];
        }
    }
    [self.scriptObject invokeMethod:@"handleRenderItem" withArguments:@[
                                                                        @(indexPath.item),
                                                                        itemView.objectUUID ?: [NSNull null],
                                                                        ]];
    return cell;
}

- (NSInteger)collectionView:(nonnull UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return self.items.count;
}

- (void)collectionView:(UICollectionView *)collectionView didSelectItemAtIndexPath:(NSIndexPath *)indexPath {
    UICollectionViewCell *cell = [collectionView cellForItemAtIndexPath:indexPath];
    XTUIView *itemView = [cell.contentView viewWithTag:-1000];
    if ([itemView isKindOfClass:[XTUIView class]]) {
        [self.scriptObject invokeMethod:@"handleSelected" withArguments:@[
                                                                          @(indexPath.item),
                                                                          itemView.objectUUID ?: [NSNull null],
                                                                          ]];
    }
}

- (void)collectionView:(UICollectionView *)collectionView didHighlightItemAtIndexPath:(NSIndexPath *)indexPath {
    UICollectionViewCell *cell = [collectionView cellForItemAtIndexPath:indexPath];
    XTUIView *itemView = [cell.contentView viewWithTag:-1000];
    if ([itemView isKindOfClass:[XTUIView class]]) {
        [self.scriptObject invokeMethod:@"handleHighlighted" withArguments:@[
                                                                             @(indexPath.item),
                                                                             @(YES),
                                                                             itemView.objectUUID ?: [NSNull null],
                                                                             ]];
    }
}

- (void)collectionView:(UICollectionView *)collectionView didUnhighlightItemAtIndexPath:(NSIndexPath *)indexPath {
    UICollectionViewCell *cell = [collectionView cellForItemAtIndexPath:indexPath];
    XTUIView *itemView = [cell.contentView viewWithTag:-1000];
    if ([itemView isKindOfClass:[XTUIView class]]) {
        [self.scriptObject invokeMethod:@"handleHighlighted" withArguments:@[
                                                                             @(indexPath.item),
                                                                             @(NO),
                                                                             itemView.objectUUID ?: [NSNull null],
                                                                             ]];
    }
}

#pragma mark - UICollectionViewDelegateFlowLayout

- (CGSize)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout sizeForItemAtIndexPath:(NSIndexPath *)indexPath {
    return [self.scriptObject invokeMethod:@"requestItemSize" withArguments:@[
                                                                              @(collectionView.bounds.size.width),
                                                                              @(collectionView.bounds.size.height),
                                                                              @(indexPath.item),
                                                                              ]].toSize;
}

- (UIEdgeInsets)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout insetForSectionAtIndex:(NSInteger)section {
    return [self.scriptObject invokeMethod:@"_edgeInsets" withArguments:@[]].toInsets;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumLineSpacingForSectionAtIndex:(NSInteger)section {
    return [self.scriptObject invokeMethod:@"_lineSpacing" withArguments:@[]].toDouble;
}

- (CGFloat)collectionView:(UICollectionView *)collectionView layout:(UICollectionViewLayout *)collectionViewLayout minimumInteritemSpacingForSectionAtIndex:(NSInteger)section {
    return [self.scriptObject invokeMethod:@"_itemSpacing" withArguments:@[]].toDouble;
}

@end
