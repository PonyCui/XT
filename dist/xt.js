/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CGRect_1 = __webpack_require__(7);
exports.CGRectMake = CGRect_1.CGRectMake;
exports.CGRectZero = CGRect_1.CGRectZero;
const UIView_1 = __webpack_require__(3);
exports.UIView = UIView_1.UIView;
const UIWindow_1 = __webpack_require__(8);
exports.UIWindow = UIWindow_1.UIWindow;
const UIApplication_1 = __webpack_require__(9);
exports.UIApplication = UIApplication_1.UIApplication;
exports.UIApplicationDelegate = UIApplication_1.UIApplicationDelegate;
const UIColor_1 = __webpack_require__(10);
exports.UIColor = UIColor_1.UIColor;
const UIScreen_1 = __webpack_require__(11);
exports.UIScreen = UIScreen_1.UIScreen;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__(6);
const I = __webpack_require__(0);
class Factory {
}
Factory.CGRectMake = I.CGRectMake;
Factory.CGRectZero = I.CGRectZero;
Factory.UIView = I.UIView;
Factory.UIApplication = I.UIApplication;
Factory.UIApplicationDelegate = I.UIApplicationDelegate;
Factory.UIWindow = I.UIWindow;
Factory.UIColor = I.UIColor;
Factory.UIScreen = I.UIScreen;
exports.Factory = Factory;
function SwitchFactory() {
    index_1.usePixi();
}
exports.SwitchFactory = SwitchFactory;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const I = __webpack_require__(0);
const PIXI = window.PIXI;
class UIView extends I.UIView {
    constructor(rect) {
        super(rect || I.CGRectZero);
        this._frame = I.CGRectZero;
        this._backgroundColor = undefined;
        this._cornerRadius = 0;
        this.bounds = I.CGRectZero;
        this.nativeObject = new PIXI.Container();
        this.nativeObject.XTView = this;
        this.nativeGraphics = new PIXI.Graphics();
        this.nativeObject.addChild(this.nativeGraphics);
        this.nativeContainer = new PIXI.Container();
        this.nativeObject.addChild(this.nativeContainer);
        if (typeof rect === "object") {
            this.frame = rect;
            this.bounds = I.CGRectMake(0, 0, rect.width, rect.height);
        }
    }
    get alpha() {
        return this.nativeObject.alpha;
    }
    set alpha(value) {
        this.nativeObject.alpha = value;
    }
    get hidden() {
        return !this.nativeObject.visible;
    }
    set hidden(value) {
        this.nativeObject.visible = !value;
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        this._frame = value;
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, value.width, value.height);
        this.nativeContainer.hitArea = this.nativeObject.hitArea;
        this.nativeObject.x = value.x;
        this.nativeObject.y = value.y;
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.draw();
    }
    get cornerRadius() {
        return this._cornerRadius;
    }
    set cornerRadius(value) {
        this._cornerRadius = value;
        this.draw();
    }
    draw() {
        if (this.nativeGraphics === undefined) {
            return;
        }
        this.nativeGraphics.clear();
        this.drawBackground();
    }
    drawBackground() {
        if (this.backgroundColor instanceof I.UIColor) {
            this.nativeGraphics.beginFill(this.backgroundColor.rgbHexNumber(), this.backgroundColor.a);
            if (this.cornerRadius > 0) {
                this.nativeGraphics.drawRoundedRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.cornerRadius);
            }
            else {
                this.nativeGraphics.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            }
        }
    }
    // Mark: View Hierarchy
    get superview() {
        if (this.nativeContainer.parent !== undefined && this.nativeContainer.parent.XTView instanceof UIView) {
            return this.nativeContainer.parent.XTView;
        }
        return undefined;
    }
    get subviews() {
        return this.nativeContainer.children.map((item) => item.XTView);
    }
    get window() {
        let current = this.superview;
        while (current !== undefined && current.XTClassName !== "UIWindow") {
            current = current.superview;
        }
        return current;
    }
    removeFromSuperview() {
        if (this.nativeContainer.parent !== undefined) {
            this.nativeContainer.parent.XTView.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            this.willMoveToWindow(undefined);
            this.nativeContainer.parent.removeChild(this.nativeObject);
            this.didMoveToSuperview();
            this.didMoveToWindow();
        }
    }
    insertSubviewAtIndex(subview, atIndex) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
    }
    exchangeSubviewAtIndex(index1, index2) {
        const child1 = this.nativeContainer.getChildAt(index1);
        const child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
    }
    addSubview(subview) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
    }
    insertSubviewBelow(subview, siblingSubview) {
        const siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex);
        }
    }
    insertSubviewAbove(subview, siblingSubview) {
        const siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0 && siblingIndex == this.subviews.length - 1) {
            this.addSubview(subview);
        }
        else if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex + 1);
        }
    }
    bringSubviewToFront(subview) {
        const currentIndex = this.subviews.indexOf(subview);
        if (currentIndex < this.subviews.length - 1 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(this.subviews.length - 1, currentIndex);
        }
    }
    sendSubviewToBack(subview) {
        const currentIndex = this.subviews.indexOf(subview);
        if (currentIndex > 0 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(0, currentIndex);
        }
    }
    didAddSubview(subview) { }
    willRemoveSubview(subview) { }
    willMoveToSuperview(newSuperview) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow) { }
    didMoveToWindow() { }
}
exports.UIView = UIView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIView {
    constructor(rect) { }
    removeFromSuperview() { }
    insertSubviewAtIndex(subview, atIndex) { }
    exchangeSubviewAtIndex(index1, index2) { }
    addSubview(subview) { }
    insertSubviewBelow(subview, siblingSubview) { }
    insertSubviewAbove(subview, siblingSubview) { }
    bringSubviewToFront(subview) { }
    sendSubviewToBack(subview) { }
    didAddSubview(subview) { }
    willRemoveSubview(subview) { }
    willMoveToSuperview(newSuperview) { }
    didMoveToSuperview() { }
    willMoveToWindow(newWindow) { }
    didMoveToWindow() { }
    isDescendantOfView(view) { return false; }
    setNeedsLayout() { }
    layoutIfNeeded() { }
    layoutSubviews() { }
}
exports.UIView = UIView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const I = __webpack_require__(0);
const PIXI = window.PIXI;
let sharedApplication = undefined;
class UIApplication extends I.UIApplication {
    constructor(canvas, delegate) {
        super();
        this.keyWindow = undefined;
        if (sharedApplication === undefined) {
            sharedApplication = this;
            I.UIScreen.mainScreen = () => {
                return new I.UIScreen(canvas.offsetWidth, canvas.offsetHeight);
            };
        }
        this.nativeObject = new PIXI.Application({ width: canvas.offsetWidth, height: canvas.offsetHeight, view: canvas, antialias: true, transparent: true });
        this.delegate = delegate;
        if (this.delegate) {
            this.delegate.applicationDidFinishLaunchingWithOptions(this, {});
        }
    }
    static sharedApplication() {
        return sharedApplication;
    }
}
exports.UIApplication = UIApplication;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __webpack_require__(1);
Factory_1.SwitchFactory();
exports.default = Factory_1.Factory;
if (window !== undefined) {
    window.XT = Factory_1.Factory;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __webpack_require__(1);
const UIView_1 = __webpack_require__(2);
const UIApplication_1 = __webpack_require__(4);
const UIWindow_1 = __webpack_require__(12);
function usePixi(force = false) {
    const use = () => {
        Factory_1.Factory.UIView = UIView_1.UIView;
        Factory_1.Factory.UIApplication = UIApplication_1.UIApplication;
        Factory_1.Factory.UIWindow = UIWindow_1.UIWindow;
    };
    if (force) {
        use();
    }
    else if (window !== undefined) {
        const $window = window;
        if ($window.PIXI !== undefined) {
            use();
        }
    }
}
exports.usePixi = usePixi;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CGRectMake(x, y, width, height) {
    return { x, y, width, height };
}
exports.CGRectMake = CGRectMake;
exports.CGRectZero = CGRectMake(0, 0, 0, 0);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(3);
class UIWindow extends UIView_1.UIView {
    makeKeyAndVisible() { }
}
exports.UIWindow = UIWindow;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIApplicationDelegate {
    applicationDidFinishLaunchingWithOptions(application, launchOptions) { }
}
exports.UIApplicationDelegate = UIApplicationDelegate;
class UIApplication {
    sharedApplication() { throw "NOT IMPLEMENT!"; }
}
exports.UIApplication = UIApplication;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIColor {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 1.0;
    }
    rgbHexNumber() {
        const r = Math.ceil(this.r * 255).toString(16);
        const g = Math.ceil(this.g * 255).toString(16);
        const b = Math.ceil(this.b * 255).toString(16);
        return parseInt("0x" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b));
    }
}
exports.UIColor = UIColor;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIScreen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    bounds() {
        return { x: 0, y: 0, width: this.width, height: this.height };
    }
}
UIScreen.mainScreen = () => new UIScreen(0, 0);
exports.UIScreen = UIScreen;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIApplication_1 = __webpack_require__(4);
const UIView_1 = __webpack_require__(2);
const PIXI = window.PIXI;
class UIWindow extends UIView_1.UIView {
    constructor(rect) {
        super(rect);
        this.XTClassName = "UIWindow";
        const application = UIApplication_1.UIApplication.sharedApplication();
        if (application instanceof UIApplication_1.UIApplication) {
            application.nativeObject.stage.addChild(this.nativeObject);
        }
        this.hidden = true;
    }
    makeKeyAndVisible() {
        const application = UIApplication_1.UIApplication.sharedApplication();
        if (application instanceof UIApplication_1.UIApplication) {
            application.keyWindow = this;
        }
        this.hidden = false;
    }
}
exports.UIWindow = UIWindow;


/***/ })
/******/ ]);
//# sourceMappingURL=xt.js.map