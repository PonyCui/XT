//
//  XTRContext.m
//  XTSample
//
//  Created by 崔明辉 on 2017/8/30.
//  Copyright © 2017年 UED Center, YY Inc. All rights reserved.
//

#import "XTContext.h"
#import "XTPolyfill.h"
#import "XTMemoryManager.h"
#import "XTClassLoader.h"
#import "XTDebug.h"

@interface XTContext ()

@property (nonatomic, assign) BOOL isGlobalVariableDidSetup;
@property (nonatomic, copy) NSArray<XTContext *> *childContexts;
@property (nonatomic, weak) XTContext *parentContext;

@end

@implementation XTContext

- (void)dealloc {
#ifdef LOGDEALLOC
    NSLog(@"XTContext dealloc.");
#endif
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
        [XTMemoryManager runGC:YES];
    }];
}

+ (void)attachToContext:(XTContext *)context {
    [[[self alloc] initWithParentContext:context] description];
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        [self setup];
    }
    return self;
}

- (instancetype)initWithParentContext:(XTContext *)context {
    self = [super init];
    if (self) {
        NSMutableArray<XTContext *> *mutableChildContexts = (_parentContext.childContexts ?: @[]).mutableCopy;
        [mutableChildContexts addObject:self];
        _parentContext.childContexts = [mutableChildContexts copy];
        _parentContext = context;
        [self setup];
    }
    return self;
}

- (void)setup {
    if (!self.isGlobalVariableDidSetup) {
        [self setExceptionHandler:^(JSContext *context, JSValue *exception) {
            NSLog(@"%@", [exception toString]);
        }];
        [self evaluateScript:@"var window = {}; var global = window; var objectRefs = {};"];
        [self loadCoreComponents];
        [self loadCoreScript];
        self.isGlobalVariableDidSetup = YES;
    }
}

- (void)loadCoreComponents {
    self[@"_XTClassLoader"] = [XTClassLoader class];
    self[@"_XTDebug"] = [XTDebug class];
    [XTPolyfill addPolyfills:self];
    [XTMemoryManager attachContext:self];
}

- (void)loadCoreScript {
    NSString *path = [[NSBundle mainBundle] pathForResource:@"xt.core.ios.min" ofType:@"js"];
    if (path) {
        NSString *script = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
        [self evaluateScript:script];
    }
}

- (JSValue *)evaluateScript:(NSString *)script {
    if (self.parentContext != nil) {
        return [self.parentContext evaluateScript:script];
    }
    return [super evaluateScript:script];
}

- (JSValue *)evaluateScript:(NSString *)script withSourceURL:(NSURL *)sourceURL {
    if (self.parentContext != nil) {
        return [self.parentContext evaluateScript:script withSourceURL:sourceURL];
    }
    return [super evaluateScript:script withSourceURL:sourceURL];
}

- (void)setObject:(id)object forKeyedSubscript:(NSObject<NSCopying> *)key {
    if (self.parentContext != nil) {
        [self.parentContext setObject:object forKeyedSubscript:key];
    }
    else {
        [super setObject:object forKeyedSubscript:key];
    }
}

@end
