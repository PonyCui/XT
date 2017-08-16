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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CGRect_1 = __webpack_require__(2);
exports.CGRectMake = CGRect_1.CGRectMake;
exports.CGRectZero = CGRect_1.CGRectZero;
exports.CGRectEqual = CGRect_1.CGRectEqual;
exports.CGPointMake = CGRect_1.CGPointMake;
exports.CGPointZero = CGRect_1.CGPointZero;
exports.CGSizeMake = CGRect_1.CGSizeMake;
exports.CGSizeZero = CGRect_1.CGSizeZero;
exports.CGRectInside = CGRect_1.CGRectInside;
exports.CGPointEqual = CGRect_1.CGPointEqual;
exports.CGSizeEqual = CGRect_1.CGSizeEqual;
var UIView_1 = __webpack_require__(1);
exports.UIView = UIView_1.UIView;
var UIWindow_1 = __webpack_require__(3);
exports.UIWindow = UIWindow_1.UIWindow;
var UIApplication_1 = __webpack_require__(4);
exports.UIApplication = UIApplication_1.UIApplication;
exports.UIApplicationDelegate = UIApplication_1.UIApplicationDelegate;
var UIColor_1 = __webpack_require__(5);
exports.UIColor = UIColor_1.UIColor;
var UIScreen_1 = __webpack_require__(6);
exports.UIScreen = UIScreen_1.UIScreen;
var CGTransformMatrix_1 = __webpack_require__(7);
exports.CGTransformMatrix = CGTransformMatrix_1.CGTransformMatrix;
var NSLayoutConstraint_1 = __webpack_require__(8);
exports.NSLayoutConstraint = NSLayoutConstraint_1.NSLayoutConstraint;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InteractionState;
(function (InteractionState) {
    InteractionState[InteractionState["Began"] = 0] = "Began";
    InteractionState[InteractionState["Changed"] = 1] = "Changed";
    InteractionState[InteractionState["Ended"] = 2] = "Ended";
    InteractionState[InteractionState["Cancelled"] = 3] = "Cancelled";
})(InteractionState = exports.InteractionState || (exports.InteractionState = {}));
var SwipeDirection;
(function (SwipeDirection) {
    SwipeDirection[SwipeDirection["ToLeft"] = 0] = "ToLeft";
    SwipeDirection[SwipeDirection["ToRight"] = 1] = "ToRight";
    SwipeDirection[SwipeDirection["ToTop"] = 2] = "ToTop";
    SwipeDirection[SwipeDirection["ToBottom"] = 3] = "ToBottom";
})(SwipeDirection = exports.SwipeDirection || (exports.SwipeDirection = {}));
var UIView = (function () {
    function UIView(rect) {
    }
    UIView.prototype.tintColorDidChange = function () { };
    UIView.prototype.removeFromSuperview = function () { };
    UIView.prototype.insertSubviewAtIndex = function (subview, atIndex) { };
    UIView.prototype.exchangeSubviewAtIndex = function (index1, index2) { };
    UIView.prototype.addSubview = function (subview) { };
    UIView.prototype.insertSubviewBelow = function (subview, siblingSubview) { };
    UIView.prototype.insertSubviewAbove = function (subview, siblingSubview) { };
    UIView.prototype.bringSubviewToFront = function (subview) { };
    UIView.prototype.sendSubviewToBack = function (subview) { };
    UIView.prototype.didAddSubview = function (subview) { };
    UIView.prototype.willRemoveSubview = function (subview) { };
    UIView.prototype.willMoveToSuperview = function (newSuperview) { };
    UIView.prototype.didMoveToSuperview = function () { };
    UIView.prototype.willMoveToWindow = function (newWindow) { };
    UIView.prototype.didMoveToWindow = function () { };
    UIView.prototype.isDescendantOfView = function (view) { return false; };
    UIView.prototype.viewWithTag = function (tag) { return undefined; };
    UIView.prototype.setNeedsLayout = function () { };
    UIView.prototype.layoutIfNeeded = function () { };
    UIView.prototype.layoutSubviews = function () { };
    UIView.prototype.addConstraint = function (constraint) { };
    UIView.prototype.addConstraints = function (constraints) { };
    UIView.prototype.removeConstraint = function (constraint) { };
    UIView.prototype.removeAllConstraints = function () { };
    // Mark: View Animation
    UIView.prototype.animationWithDuration = function (duration, animations, completion) { };
    UIView.prototype.animationWithSpring = function (duration, damping, velocity, animations, completion) { };
    // Mark: View Interactive
    UIView.InteractionState = InteractionState;
    UIView.SwipeDirection = SwipeDirection;
    return UIView;
}());
exports.UIView = UIView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CGPointMake(x, y) {
    return { x: x, y: y };
}
exports.CGPointMake = CGPointMake;
function CGPointEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
}
exports.CGPointEqual = CGPointEqual;
exports.CGPointZero = CGPointMake(0, 0);
function CGSizeMake(width, height) {
    return { width: width, height: height };
}
exports.CGSizeMake = CGSizeMake;
function CGSizeEqual(size1, size2) {
    return size1.width === size2.width && size1.height === size2.height;
}
exports.CGSizeEqual = CGSizeEqual;
exports.CGSizeZero = CGSizeMake(0, 0);
function CGRectMake(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}
exports.CGRectMake = CGRectMake;
exports.CGRectZero = CGRectMake(0, 0, 0, 0);
function CGRectEqual(rect1, rect2) {
    return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
}
exports.CGRectEqual = CGRectEqual;
function CGRectInside(rect1, rect2) {
    return rect2.x > rect1.x && rect2.x + rect2.width < rect1.x + rect1.width && rect2.y > rect1.y && rect2.y + rect2.height < rect1.y + rect1.height;
}
exports.CGRectInside = CGRectInside;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = __webpack_require__(1);
var UIWindow = (function (_super) {
    __extends(UIWindow, _super);
    function UIWindow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIWindow.prototype.makeKeyAndVisible = function () { };
    return UIWindow;
}(UIView_1.UIView));
exports.UIWindow = UIWindow;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIApplicationDelegate = (function () {
    function UIApplicationDelegate() {
    }
    UIApplicationDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) { };
    return UIApplicationDelegate;
}());
exports.UIApplicationDelegate = UIApplicationDelegate;
var UIApplication = (function () {
    function UIApplication() {
    }
    UIApplication.prototype.sharedApplication = function () { throw "NOT IMPLEMENT!"; };
    return UIApplication;
}());
exports.UIApplication = UIApplication;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIColor = (function () {
    function UIColor(r, g, b, a) {
        this.r = Math.min(1.0, Math.max(0.0, r));
        this.g = Math.min(1.0, Math.max(0.0, g));
        ;
        this.b = Math.min(1.0, Math.max(0.0, b));
        ;
        this.a = a == undefined ? 1.0 : Math.min(1.0, Math.max(0.0, a));
        ;
    }
    UIColor.prototype.rgbHexNumber = function () {
        var r = Math.ceil(this.r * 255).toString(16);
        var g = Math.ceil(this.g * 255).toString(16);
        var b = Math.ceil(this.b * 255).toString(16);
        return parseInt("0x" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b));
    };
    UIColor.prototype.equals = function (toColor) {
        if (toColor instanceof UIColor) {
            return this.r === toColor.r && this.g === toColor.g && this.b === toColor.b && this.a === toColor.a;
        }
        return false;
    };
    return UIColor;
}());
exports.UIColor = UIColor;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIScreen = (function () {
    function UIScreen(width, height, scale) {
        this.width = width;
        this.height = height;
        this.scale = scale;
    }
    UIScreen.prototype.bounds = function () {
        return { x: 0, y: 0, width: this.width, height: this.height };
    };
    UIScreen.withScale = function (value) {
        return value * UIScreen.mainScreen().scale;
    };
    UIScreen.outScale = function (value) {
        return value / UIScreen.mainScreen().scale;
    };
    UIScreen.mainScreen = function () { return new UIScreen(0, 0, 1); };
    return UIScreen;
}());
exports.UIScreen = UIScreen;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CGTransformMatrix = (function () {
    function CGTransformMatrix(a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    return CGTransformMatrix;
}());
exports.CGTransformMatrix = CGTransformMatrix;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Attribute;
(function (Attribute) {
    Attribute[Attribute["Const"] = 0] = "Const";
    Attribute[Attribute["Left"] = 1] = "Left";
    Attribute[Attribute["Right"] = 2] = "Right";
    Attribute[Attribute["Top"] = 3] = "Top";
    Attribute[Attribute["Bottom"] = 4] = "Bottom";
    Attribute[Attribute["Width"] = 7] = "Width";
    Attribute[Attribute["Height"] = 8] = "Height";
    Attribute[Attribute["CenterX"] = 9] = "CenterX";
    Attribute[Attribute["CenterY"] = 10] = "CenterY";
})(Attribute = exports.Attribute || (exports.Attribute = {}));
var Relation;
(function (Relation) {
    Relation[Relation["Less"] = -1] = "Less";
    Relation[Relation["Equal"] = 0] = "Equal";
    Relation[Relation["Greater"] = 1] = "Greater";
})(Relation = exports.Relation || (exports.Relation = {}));
var NSLayoutConstraint = (function () {
    function NSLayoutConstraint(firstItem, firstAttr, relation, secondItem, secondAttr, constant, multiplier) {
        if (constant === void 0) { constant = 0; }
        if (multiplier === void 0) { multiplier = 1; }
        this.relation = Relation.Equal;
        this.constant = 0;
        this.multiplier = 1;
        this.priority = 750;
        this.firstItem = firstItem;
        this.firstAttr = firstAttr;
        this.relation = relation || Relation.Equal;
        this.secondItem = secondItem;
        this.secondAttr = secondAttr;
        this.constant = constant;
        this.multiplier = multiplier;
    }
    NSLayoutConstraint.constraintsWithVisualFormat = function (format, views) { return []; };
    NSLayoutConstraint.Attribute = Attribute;
    NSLayoutConstraint.Relation = Relation;
    return NSLayoutConstraint;
}());
exports.NSLayoutConstraint = NSLayoutConstraint;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var I = __webpack_require__(0);
var PIXI = window.PIXI;
var sharedApplication = undefined;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (requestAnimationFrame === undefined) {
    requestAnimationFrame = function (trigger) {
        setTimeout(trigger, 16);
    };
}
var displayStartTime = 0;
var UIApplication = (function (_super) {
    __extends(UIApplication, _super);
    function UIApplication(canvas, delegate) {
        var _this = _super.call(this) || this;
        _this.keyWindow = undefined;
        _this.isDirty = false;
        _this.dirtyTargets = [];
        if (sharedApplication === undefined) {
            sharedApplication = _this;
            var scale_1 = Math.floor(window.devicePixelRatio);
            I.UIScreen.mainScreen = function () {
                return new I.UIScreen(canvas.offsetWidth, canvas.offsetHeight, scale_1);
            };
        }
        UIApplication.resetCanvas(canvas, function () {
            _this.nativeObject = new PIXI.Application({ width: I.UIScreen.withScale(canvas.offsetWidth), height: I.UIScreen.withScale(canvas.offsetHeight), view: canvas, antialias: true, transparent: false });
            _this.nativeObject.stop();
            if (window.DEBUG === true) {
                window.nativeObject = _this.nativeObject;
                var renderStartTime_1 = 0;
                _this.nativeObject.renderer.on("prerender", function () {
                    renderStartTime_1 = performance.now();
                });
                _this.nativeObject.renderer.on("postrender", function () {
                    console.log("[PIXI]: Render Time > " + (performance.now() - renderStartTime_1));
                    console.log("[PIXI]: Display Time > " + (performance.now() - displayStartTime));
                });
            }
            _this.delegate = delegate;
            if (_this.delegate) {
                _this.delegate.applicationDidFinishLaunchingWithOptions(_this, {});
            }
        });
        return _this;
    }
    UIApplication.resetCanvas = function (canvas, callback) {
        canvas.style.width = "375";
        canvas.style.height = document.body.offsetHeight.toString();
        setTimeout(callback);
    };
    UIApplication.sharedApplication = function () {
        return sharedApplication;
    };
    UIApplication.prototype.remarkRenderable = function () {
        if (this.keyWindow !== undefined) {
            var allViews = this.combineViews(this.keyWindow, { x: 0, y: 0 });
            var opaqueRects = [];
            var _loop_1 = function (index) {
                var view = allViews[index];
                if (view._childRenderable === true) {
                    view.nativeObject.renderable = true;
                    return "continue";
                }
                if (view.transform !== undefined) {
                    view.nativeObject.renderable = true;
                }
                else if (opaqueRects.filter(function (item) { return I.CGRectInside(item, view._absRect); }).length == 0) {
                    if (view.opaque === true) {
                        opaqueRects.push(view._absRect);
                    }
                    view.nativeObject.renderable = true;
                }
                else {
                    view.nativeObject.renderable = false;
                }
                if (view.nativeObject.renderable === true) {
                    var current = view.superview;
                    while (current !== undefined) {
                        current._childRenderable = true;
                        current = current.superview;
                    }
                }
            };
            for (var index = allViews.length - 1; index >= 0; index--) {
                _loop_1(index);
            }
        }
    };
    UIApplication.prototype.combineViews = function (view, absPoint) {
        var _this = this;
        var views = view.subviews;
        view.subviews.forEach(function (subview) {
            subview._absRect = { x: absPoint.x + subview.frame.x, y: absPoint.y + subview.frame.y, width: absPoint.x + subview.frame.width, height: absPoint.y + subview.frame.height };
            view._childRenderable = false;
        });
        view.subviews.forEach(function (subview) {
            var subviewss = _this.combineViews(subview, { x: absPoint.x + subview.frame.x, y: absPoint.y + subview.frame.y });
            subviewss.forEach(function (subview) {
                views.push(subview);
            });
        });
        return views;
    };
    UIApplication.prototype.setNeedsDisplay = function (target) {
        var _this = this;
        if (this.dirtyTargets.indexOf(target) < 0) {
            this.dirtyTargets.push(target);
        }
        if (this.isDirty === true) {
            return;
        }
        this.isDirty = true;
        requestAnimationFrame(function () {
            if (window.DEBUG) {
                displayStartTime = performance.now();
            }
            _this.remarkRenderable();
            var stillDirty = false;
            for (var index = 0; index < _this.dirtyTargets.length; index++) {
                var element = _this.dirtyTargets[index];
                if (element.nativeObject.renderable === true) {
                    stillDirty = true;
                    break;
                }
            }
            if (stillDirty) {
                _this.nativeObject.render();
            }
            _this.dirtyTargets = [];
            _this.isDirty = false;
        });
    };
    UIApplication.prototype.displayNow = function () {
        if (window.DEBUG) {
            displayStartTime = performance.now();
        }
        this.remarkRenderable();
        this.nativeObject.render();
        this.dirtyTargets = [];
    };
    return UIApplication;
}(I.UIApplication));
exports.UIApplication = UIApplication;
var displayPaused = false;
function setNeedsDisplay(target) {
    if (sharedApplication !== undefined && displayPaused === false) {
        sharedApplication.setNeedsDisplay(target);
    }
}
exports.setNeedsDisplay = setNeedsDisplay;
function displayPause() {
    displayPaused = true;
}
exports.displayPause = displayPause;
function displayNow() {
    displayPaused = false;
    if (sharedApplication !== undefined) {
        sharedApplication.displayNow();
    }
}
exports.displayNow = displayNow;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(18);
var I = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.CGPointMake = I.CGPointMake;
    Factory.CGPointEqual = I.CGPointEqual;
    Factory.CGPointZero = I.CGPointZero;
    Factory.CGRectMake = I.CGRectMake;
    Factory.CGRectZero = I.CGRectZero;
    Factory.CGRectEqual = I.CGRectEqual;
    Factory.CGRectInside = I.CGRectInside;
    Factory.CGSizeMake = I.CGSizeMake;
    Factory.CGSizeZero = I.CGSizeZero;
    Factory.CGSizeEqual = I.CGSizeEqual;
    Factory.UIView = I.UIView;
    Factory.UIApplication = I.UIApplication;
    Factory.UIApplicationDelegate = I.UIApplicationDelegate;
    Factory.UIWindow = I.UIWindow;
    Factory.UIColor = I.UIColor;
    Factory.UIScreen = I.UIScreen;
    Factory.CGTransformMatrix = I.CGTransformMatrix;
    Factory.NSLayoutConstraint = I.NSLayoutConstraint;
    return Factory;
}());
exports.Factory = Factory;
function SwitchFactory() {
    index_1.usePixi();
}
exports.SwitchFactory = SwitchFactory;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(clearImmediate, setImmediate) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var I = __webpack_require__(0);
var UIApplication_1 = __webpack_require__(9);
var Rebound = __webpack_require__(24);
var PIXI = window.PIXI;
var AutoLayout = __webpack_require__(14);
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (requestAnimationFrame === undefined) {
    requestAnimationFrame = function (trigger) {
        setTimeout(trigger, 16);
    };
}
var UIView = (function (_super) {
    __extends(UIView, _super);
    function UIView(rect) {
        var _this = _super.call(this, rect || I.CGRectZero) || this;
        // Mark: View Geometry
        _this._frame = I.CGRectZero;
        _this._bounds = I.CGRectZero;
        // Mark: View Rendering
        _this._clipsToBounds = false;
        _this._backgroundColor = undefined;
        _this._opaque = false;
        _this._tintColor = new I.UIColor(0.0, 122.0 / 255.0, 1.0);
        // Mark: View Layer-Back Rendering
        _this._cornerRadius = 0;
        _this._borderWidth = 0;
        _this._borderColor = undefined;
        _this.layoutTimer = undefined;
        // Mark: View LayoutConstraint
        _this._layoutID = UIView.generateLayoutUUID();
        _this._constraints = [];
        // Mark: View Interactive
        _this._userInteractionEnabled = false;
        _this._isTapActived = false;
        _this._isTouchActived = false;
        _this._maybeTap = false;
        _this._maybeLongPress = false;
        _this._maybePan = false;
        _this._isLongPress = false;
        _this._isPan = false;
        _this._firstTapped = false;
        _this._firstTapPoint = { x: 0, y: 0 };
        _this._secondTapped = false;
        _this._animationProps = {};
        _this.nativeObject = new PIXI.Container();
        _this.nativeObject.XTView = _this;
        _this.nativeGraphics = new PIXI.Graphics();
        _this.nativeObject.addChild(_this.nativeGraphics);
        _this.nativeContainer = new PIXI.Container();
        _this.nativeObject.addChild(_this.nativeContainer);
        if (typeof rect === "object") {
            _this.frame = rect;
        }
        return _this;
    }
    Object.defineProperty(UIView.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        set: function (value) {
            if (I.CGRectEqual(this._frame, value)) {
                return;
            }
            if (UIView._animationEnabled) {
                if (this._frame.x != value.x) {
                    UIView.addAnimation(this, "frameX", this._frame.x, value.x);
                }
                if (this._frame.y != value.y) {
                    UIView.addAnimation(this, "frameY", this._frame.y, value.y);
                }
                if (this._frame.width != value.width) {
                    UIView.addAnimation(this, "frameWidth", this._frame.width, value.width);
                }
                if (this._frame.height != value.height) {
                    UIView.addAnimation(this, "frameHeight", this._frame.height, value.height);
                }
                return;
            }
            this._frame = value;
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
            this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, I.UIScreen.withScale(value.width), I.UIScreen.withScale(value.height));
            this.nativeContainer.hitArea = this.nativeObject.hitArea;
            this.nativeObject.x = I.UIScreen.withScale(value.x);
            this.nativeObject.y = I.UIScreen.withScale(value.y);
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "frameX", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { x: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "frameY", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { y: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "frameWidth", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { width: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "frameHeight", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { height: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bounds", {
        get: function () {
            return this._bounds;
        },
        set: function (value) {
            if (I.CGRectEqual(this._bounds, value)) {
                return;
            }
            if (UIView._animationEnabled) {
                if (this._bounds.x != value.x) {
                    UIView.addAnimation(this, "boundsX", this._bounds.x, value.x);
                }
                if (this._bounds.y != value.y) {
                    UIView.addAnimation(this, "boundsY", this._bounds.y, value.y);
                }
                if (this._bounds.width != value.width) {
                    UIView.addAnimation(this, "boundsWidth", this._bounds.width, value.width);
                }
                if (this._bounds.height != value.height) {
                    UIView.addAnimation(this, "boundsHeight", this._bounds.height, value.height);
                }
                return;
            }
            this._bounds = value;
            this.draw();
            UIApplication_1.setNeedsDisplay(this);
            this.setNeedsLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "boundsX", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { x: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "boundsY", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { y: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "boundsWidth", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { width: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "boundsHeight", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { height: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "center", {
        get: function () {
            return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
        },
        set: function (value) {
            var newFrame = this.frame;
            newFrame.x = value.x - newFrame.width / 2.0;
            newFrame.y = value.y - newFrame.height / 2.0;
            this.frame = newFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "transform", {
        get: function () {
            return this._transform;
        },
        set: function (value) {
            this._transform = value;
            if (value) {
                var transform = new PIXI.Transform();
                var matrix = new PIXI.Matrix();
                matrix.fromArray([value.a, value.b, value.tx, value.c, value.d, value.ty]);
                transform.setFromMatrix(matrix);
                this.nativeObject.setTransform(this.frame.x, this.frame.y, transform.scale.x, transform.scale.y, transform.rotation, transform.skew.x, transform.skew.y, transform.pivot.x, transform.pivot.y);
            }
            else {
                this.nativeObject.setTransform(this.frame.x, this.frame.y, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0);
            }
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "clipsToBounds", {
        get: function () {
            return this._clipsToBounds;
        },
        set: function (value) {
            this._clipsToBounds = value;
            this.applyMask();
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.applyMask = function () {
        if (this.clipsToBounds) {
            if (this.maskView === undefined) {
                this.maskView = new UIView(this.bounds);
                this.maskView.backgroundColor = new I.UIColor(1, 1, 1);
            }
            this.addSubview(this.maskView);
            this.nativeObject.mask = this.maskView.nativeGraphics;
        }
        else {
            if (this.maskView !== undefined) {
                this.maskView.removeFromSuperview();
            }
            this.nativeObject.mask = undefined;
        }
        UIApplication_1.setNeedsDisplay(this);
    };
    Object.defineProperty(UIView.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            if (this._backgroundColor instanceof I.UIColor && this._backgroundColor.equals(value)) {
                return;
            }
            if (UIView._animationEnabled && this._backgroundColor && value) {
                if (this._backgroundColor.a != value.a) {
                    UIView.addAnimation(this, "backgroundColorA", this._backgroundColor.a, value.a);
                }
                if (this._backgroundColor.r != value.r) {
                    UIView.addAnimation(this, "backgroundColorR", this._backgroundColor.r, value.r);
                }
                if (this._backgroundColor.g != value.g) {
                    UIView.addAnimation(this, "backgroundColorG", this._backgroundColor.g, value.g);
                }
                if (this._backgroundColor.b != value.b) {
                    UIView.addAnimation(this, "backgroundColorB", this._backgroundColor.b, value.b);
                }
                return;
            }
            this._backgroundColor = value;
            this.draw();
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "backgroundColorA", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.UIColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "backgroundColorR", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.UIColor(value, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "backgroundColorG", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.UIColor(this.backgroundColor.r, value, this.backgroundColor.b, this.backgroundColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "backgroundColorB", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.UIColor(this.backgroundColor.r, this.backgroundColor.g, value, this.backgroundColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "opaque", {
        get: function () {
            if (this._opaque === true) {
                return true;
            }
            else if (this.backgroundColor && this.backgroundColor.a >= 1 && !this.hidden && this.alpha >= 1 && this.cornerRadius == 0) {
                return true;
            }
            return this._opaque;
        },
        set: function (value) {
            this._opaque = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "alpha", {
        get: function () {
            return this.nativeObject.alpha;
        },
        set: function (value) {
            if (this.nativeObject.alpha === value) {
                return;
            }
            if (UIView._animationEnabled) {
                UIView.addAnimation(this, "alpha", this.nativeObject.alpha, value);
                return;
            }
            this.nativeObject.alpha = value;
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "hidden", {
        get: function () {
            return !this.nativeObject.visible;
        },
        set: function (value) {
            if (this.nativeObject.visible === value) {
                return;
            }
            this.nativeObject.visible = !value;
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "maskView", {
        get: function () {
            return this._maskView;
        },
        set: function (value) {
            if (this._maskView !== undefined) {
                this._maskView.removeFromSuperview();
            }
            this._maskView = value;
            this.applyMask();
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "tintColor", {
        get: function () {
            return this._tintColor;
        },
        set: function (value) {
            if (this._tintColor instanceof I.UIColor && this._tintColor.equals(value)) {
                return;
            }
            this._tintColor = value;
            this.tintColorDidChange();
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.tintColorDidChange = function () {
        this.subviews.forEach(function (subview) { subview.tintColorDidChange(); });
    };
    Object.defineProperty(UIView.prototype, "cornerRadius", {
        get: function () {
            return this._cornerRadius;
        },
        set: function (value) {
            if (this._cornerRadius === value) {
                return;
            }
            if (UIView._animationEnabled) {
                UIView.addAnimation(this, "cornerRadius", this._cornerRadius, value);
                return;
            }
            this._cornerRadius = value;
            this.draw();
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "borderWidth", {
        get: function () {
            return this._borderWidth;
        },
        set: function (value) {
            if (this._borderWidth === value) {
                return;
            }
            if (UIView._animationEnabled) {
                UIView.addAnimation(this, "borderWidth", this._borderWidth, value);
                return;
            }
            this._borderWidth = value;
            this.draw();
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (value) {
            if (this._borderColor === value) {
                return;
            }
            if (UIView._animationEnabled && this._borderColor && value) {
                if (this._borderColor.a != value.a) {
                    UIView.addAnimation(this, "borderColorA", this._borderColor.a, value.a);
                }
                if (this._borderColor.r != value.r) {
                    UIView.addAnimation(this, "borderColorR", this._borderColor.r, value.r);
                }
                if (this._borderColor.g != value.g) {
                    UIView.addAnimation(this, "borderColorG", this._borderColor.g, value.g);
                }
                if (this._borderColor.b != value.b) {
                    UIView.addAnimation(this, "borderColorB", this._borderColor.b, value.b);
                }
                return;
            }
            this._borderColor = value;
            this.draw();
            UIApplication_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "borderColorA", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.UIColor(this.borderColor.r, this.borderColor.g, this.borderColor.b, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "borderColorR", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.UIColor(value, this.borderColor.g, this.borderColor.b, this.borderColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "borderColorG", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.UIColor(this.borderColor.r, value, this.borderColor.b, this.borderColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "borderColorB", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.UIColor(this.borderColor.r, this.borderColor.g, value, this.borderColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.draw = function () {
        if (this.nativeGraphics === undefined || this.bounds.width == 0 || this.bounds.height == 0) {
            return;
        }
        this.nativeGraphics.clear();
        this.drawGraphics();
    };
    UIView.prototype.drawGraphics = function () {
        if (this.backgroundColor instanceof I.UIColor) {
            this.nativeGraphics.beginFill(this.backgroundColor.rgbHexNumber(), this.backgroundColor.a);
            if (this.borderWidth > 0 && this.borderColor instanceof I.UIColor) {
                this.nativeGraphics.lineStyle(I.UIScreen.withScale(this.borderWidth), this.borderColor.rgbHexNumber(), this.borderColor.a);
            }
            var scaledBounds = {
                x: I.UIScreen.withScale(this.bounds.x),
                y: I.UIScreen.withScale(this.bounds.y),
                width: I.UIScreen.withScale(this.bounds.width),
                height: I.UIScreen.withScale(this.bounds.height),
            };
            if (this.cornerRadius > 0) {
                if (this.cornerRadius == Math.min(this.bounds.width, this.bounds.height) / 2.0) {
                    if (scaledBounds.width > scaledBounds.height) {
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.height / 2.0, scaledBounds.y + scaledBounds.height / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width - scaledBounds.height / 2.0, scaledBounds.y + scaledBounds.height / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawRect(scaledBounds.x + scaledBounds.height / 2.0, scaledBounds.y, scaledBounds.width - scaledBounds.height, scaledBounds.height);
                    }
                    else if (scaledBounds.width < scaledBounds.height) {
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width / 2.0, scaledBounds.y + scaledBounds.width / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width / 2.0, scaledBounds.y + scaledBounds.height - scaledBounds.width / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                        this.nativeGraphics.drawRect(scaledBounds.x, scaledBounds.y + scaledBounds.width / 2.0, scaledBounds.width, scaledBounds.height - scaledBounds.width);
                    }
                    else {
                        this.nativeGraphics.drawCircle(scaledBounds.x + scaledBounds.width / 2.0, scaledBounds.y + scaledBounds.height / 2.0, Math.min(scaledBounds.width, scaledBounds.height) / 2.0);
                    }
                }
                else {
                    this.nativeGraphics.drawRoundedRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height, I.UIScreen.withScale(this.cornerRadius));
                }
            }
            else {
                this.nativeGraphics.drawRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height);
            }
        }
    };
    Object.defineProperty(UIView.prototype, "superview", {
        get: function () {
            var parent = undefined;
            if (this.nativeContainer.parent && this.nativeContainer.parent.parent && this.nativeContainer.parent.parent.parent) {
                parent = this.nativeContainer.parent.parent.parent;
            }
            if (parent !== undefined && parent.XTView instanceof UIView) {
                return parent.XTView;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "subviews", {
        get: function () {
            return this.nativeContainer.children.map(function (item) { return item.XTView; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "window", {
        get: function () {
            var current = this.superview;
            while (current !== undefined && current.XTClassName !== "UIWindow") {
                current = current.superview;
            }
            return current;
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.removeFromSuperview = function () {
        if (this.superview !== undefined) {
            this.nativeContainer.parent.XTView.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            this.willMoveToWindow(undefined);
            this.nativeObject.parent.removeChild(this.nativeObject);
            this.didMoveToSuperview();
            this.didMoveToWindow();
            UIApplication_1.setNeedsDisplay(this);
        }
    };
    UIView.prototype.insertSubviewAtIndex = function (subview, atIndex) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        UIApplication_1.setNeedsDisplay(this);
    };
    UIView.prototype.exchangeSubviewAtIndex = function (index1, index2) {
        var child1 = this.nativeContainer.getChildAt(index1);
        var child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
        UIApplication_1.setNeedsDisplay(this);
    };
    UIView.prototype.addSubview = function (subview) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        UIApplication_1.setNeedsDisplay(this);
    };
    UIView.prototype.insertSubviewBelow = function (subview, siblingSubview) {
        var siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex);
        }
    };
    UIView.prototype.insertSubviewAbove = function (subview, siblingSubview) {
        var siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0 && siblingIndex == this.subviews.length - 1) {
            this.addSubview(subview);
        }
        else if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex + 1);
        }
    };
    UIView.prototype.bringSubviewToFront = function (subview) {
        var currentIndex = this.subviews.indexOf(subview);
        if (currentIndex < this.subviews.length - 1 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(this.subviews.length - 1, currentIndex);
        }
    };
    UIView.prototype.sendSubviewToBack = function (subview) {
        var currentIndex = this.subviews.indexOf(subview);
        if (currentIndex > 0 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(0, currentIndex);
        }
    };
    UIView.prototype.didAddSubview = function (subview) { };
    UIView.prototype.willRemoveSubview = function (subview) { };
    UIView.prototype.willMoveToSuperview = function (newSuperview) { };
    UIView.prototype.didMoveToSuperview = function () { };
    UIView.prototype.willMoveToWindow = function (newWindow) { };
    UIView.prototype.didMoveToWindow = function () { };
    UIView.prototype.isDescendantOfView = function (view) {
        var current = this;
        while (current !== undefined) {
            if (current === view) {
                return true;
            }
            current = current.superview;
        }
        return false;
    };
    UIView.prototype.viewWithTag = function (tag) {
        if (this.tag !== undefined && this.tag === tag) {
            return this;
        }
        else {
            var target = this.subviews.filter(function (item) { return item.viewWithTag(tag); });
            if (target.length > 0) {
                return target[0];
            }
        }
        return undefined;
    };
    UIView.prototype.setNeedsLayout = function () {
        var _this = this;
        if (this.layoutTimer !== undefined) {
            clearImmediate(this.layoutTimer);
        }
        this.layoutTimer = setImmediate(function () {
            _this.layoutSubviews();
        });
    };
    UIView.prototype.layoutIfNeeded = function () {
        this.layoutSubviews();
    };
    UIView.prototype.layoutSubviews = function () {
        if (this._constraints.length > 0) {
            var viewMapping_1 = {};
            this._constraints.forEach(function (item) {
                if (item.firstItem !== undefined) {
                    viewMapping_1[item.firstItem._layoutID] = item.firstItem;
                }
                if (item.secondItem !== undefined) {
                    viewMapping_1[item.secondItem._layoutID] = item.secondItem;
                }
            });
            var view = new AutoLayout.View({
                constraints: this._constraints.map(function (item) { return item.toALObject(); }),
                width: this.bounds.width,
                height: this.bounds.height,
            });
            for (var layoutID in view.subViews) {
                var value = view.subViews[layoutID];
                if (viewMapping_1[layoutID] !== undefined) {
                    viewMapping_1[layoutID].frame = {
                        x: value.left,
                        y: value.top,
                        width: value.width,
                        height: value.height,
                    };
                }
            }
        }
    };
    UIView.generateLayoutUUID = function () {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    };
    Object.defineProperty(UIView.prototype, "constraints", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.addConstraint = function (constraint) {
        this._constraints.push(constraint);
        this.setNeedsLayout();
    };
    UIView.prototype.addConstraints = function (constraints) {
        var _this = this;
        constraints.forEach(function (constraint) { return _this._constraints.push(constraint); });
        this.setNeedsLayout();
    };
    UIView.prototype.removeConstraint = function (constraint) {
        var idx = this._constraints.indexOf(constraint);
        if (idx >= 0) {
            this._constraints.splice(idx, 1);
        }
        this.setNeedsLayout();
    };
    UIView.prototype.removeAllConstraints = function () {
        this._constraints = [];
        this.setNeedsLayout();
    };
    Object.defineProperty(UIView.prototype, "userInteractionEnabled", {
        get: function () {
            return this._userInteractionEnabled;
        },
        set: function (value) {
            this._userInteractionEnabled = value;
            this.nativeObject.interactive = value;
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.activeTap = function () {
        var _this = this;
        if (this._isTapActived === true) {
            return;
        }
        if (this._onTap !== undefined || this._onDoubleTap !== undefined) {
            this.activeTouch();
            var onTap = function () {
                if (_this._onDoubleTap !== undefined) {
                    if (_this._firstTapped !== true && _this._maybeTap === true) {
                        _this._firstTapped = true;
                        setTimeout(function () {
                            if (_this._onTap !== undefined && _this._secondTapped === false && _this._maybeTap === true) {
                                if (_this._isLongPress === false) {
                                    _this._onTap && _this._onTap();
                                }
                            }
                            _this._firstTapped = false;
                        }, 250);
                    }
                    else if (_this._firstTapped === true && _this._maybeTap === true) {
                        _this._secondTapped = true;
                        if (_this._isLongPress === false) {
                            _this._onDoubleTap && _this._onDoubleTap();
                        }
                    }
                }
                else if (_this._maybeTap === true) {
                    if (_this._isLongPress === false) {
                        _this._onTap && _this._onTap();
                    }
                }
            };
            this.nativeObject.on('click', onTap);
            this.nativeObject.on('tap', onTap);
            this._isTapActived = true;
        }
    };
    UIView.prototype.activeTouch = function () {
        if (this._isTouchActived === true) {
            return;
        }
        this.nativeObject.on('pointerdown', this.handleTouchStart.bind(this));
        this.nativeObject.on('pointermove', this.handleTouchMove.bind(this));
        this.nativeObject.on('pointerup', this.handleTouchEnd.bind(this));
        this.nativeObject.on('pointerupoutside', this.handleTouchEnd.bind(this));
        this._isTouchActived = true;
    };
    UIView.prototype.requestTouchPointInView = function (event) {
        var absPoint = {
            x: I.UIScreen.outScale(event.data.global.x),
            y: I.UIScreen.outScale(event.data.global.y),
        };
        var viewPoint = {
            x: absPoint.x,
            y: absPoint.y,
        };
        var currentView = this;
        while (currentView.superview !== undefined) {
            viewPoint.x -= currentView.frame.x;
            viewPoint.y -= currentView.frame.y;
            currentView = currentView.superview;
        }
        return viewPoint;
    };
    UIView.prototype.requestTouchPointInWindow = function (event) {
        var absPoint = {
            x: I.UIScreen.outScale(event.data.global.x),
            y: I.UIScreen.outScale(event.data.global.y),
        };
        return absPoint;
    };
    UIView.prototype.handleTouchStart = function (event) {
        var _this = this;
        if (this._onPan !== undefined) {
            this._maybePan = true;
            this._isPan = false;
        }
        if (this._onLongPress !== undefined) {
            this._maybeLongPress = true;
            this._isLongPress = false;
            setTimeout(function () {
                if (_this._maybeLongPress === true) {
                    _this._isLongPress = true;
                    _this._onLongPress && _this._onLongPress(I.UIView.InteractionState.Began);
                }
            }, 300);
        }
        if (this._onTap !== undefined || this._onDoubleTap !== undefined) {
            this._maybeTap = true;
            this._firstTapPoint = __assign({}, event.data.global);
            this._secondTapped = false;
        }
    };
    UIView.prototype.handleTouchMove = function (event) {
        if (this._isLongPress === true) {
            this._maybePan = false;
            this._onLongPress && this._onLongPress(I.UIView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._isPan === true) {
            this._onPan && this._onPan(I.UIView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._maybePan === true) {
            if (event.data.global.x - this._firstTapPoint.x > I.UIScreen.withScale(8) || event.data.global.y - this._firstTapPoint.y > I.UIScreen.withScale(8)) {
                this._isPan = true;
                this._maybeTap = false;
                this._maybeLongPress = false;
                this._onPan && this._onPan(I.UIView.InteractionState.Began, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            }
        }
        else if (this._maybeTap === true || this._maybeLongPress === true) {
            if (event.data.global.x - this._firstTapPoint.x > I.UIScreen.withScale(12) || event.data.global.y - this._firstTapPoint.y > I.UIScreen.withScale(12)) {
                this._maybeTap = false;
                this._maybeLongPress = false;
            }
        }
    };
    UIView.prototype.handleTouchEnd = function (event) {
        if (this._isLongPress !== true) {
            this._maybeLongPress = false;
        }
        if (this._isPan === true) {
            this._onPan && this._onPan(I.UIView.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybePan = false;
            this._isPan = false;
        }
        else if (this._isLongPress === true) {
            this._onLongPress && this._onLongPress(I.UIView.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybeTap = false;
            this._isLongPress = false;
        }
    };
    Object.defineProperty(UIView.prototype, "onTap", {
        set: function (value) {
            this._onTap = value;
            this.activeTap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "onDoubleTap", {
        set: function (value) {
            this._onDoubleTap = value;
            this.activeTap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "onLongPress", {
        set: function (value) {
            this._onLongPress = value;
            this.activeTouch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "onPan", {
        set: function (value) {
            this._onPan = value;
            this.activeTouch();
        },
        enumerable: true,
        configurable: true
    });
    UIView.commonAnimation = function (animations, runAnimation) {
        UIView._animationEnabled = true;
        animations();
        var animationViewProps = [];
        UIView._animationViews.forEach(function (view) {
            for (var propName in view._animationProps) {
                var element = view._animationProps[propName];
                animationViewProps.push({ view: view, propName: propName, from: element.from, to: element.to });
            }
            view._animationProps = {};
        });
        var startTime = performance.now();
        var runnable = function () {
            UIApplication_1.displayPause();
            if (!runAnimation(startTime, animationViewProps)) {
                requestAnimationFrame(runnable);
            }
            UIApplication_1.displayNow();
        };
        runnable();
        UIView._animationViews = [];
        UIView._animationEnabled = false;
    };
    UIView.animationWithDuration = function (duration, animations, completion) {
        this.commonAnimation(animations, function (startTime, animationViewProps) {
            var currentTime = performance.now();
            var delta = currentTime - startTime;
            animationViewProps.forEach(function (item) {
                var currentValue = (item.to - item.from) * Math.min(1.0, delta / (duration * 1000));
                item.view[item.propName] = item.from + currentValue;
            });
            if (delta < (duration * 1000)) {
                return false;
            }
            else {
                completion && completion();
                return true;
            }
        });
    };
    UIView.animationWithBouncinessAndSpeed = function (bounciness, speed, animations, completion) {
        var springSystem = new Rebound.SpringSystem();
        var rested = false;
        this.commonAnimation(animations, function (startTime, animationViewProps) {
            animationViewProps.forEach(function (item) {
                var spring = springSystem.createSpringWithBouncinessAndSpeed(bounciness, speed);
                spring.addListener({
                    onSpringUpdate: function (spring) {
                        item.view[item.propName] = spring.getCurrentValue();
                    },
                    onSpringAtRest: function () {
                        if (!rested) {
                            rested = true;
                            completion && completion();
                        }
                    }
                });
                spring.setCurrentValue(item.from);
                spring.setEndValue(item.to);
            });
            return true;
        });
    };
    UIView.addAnimation = function (view, propName, from, to) {
        if (UIView._animationViews.indexOf(view) < 0) {
            UIView._animationViews.push(view);
        }
        view._animationProps[propName] = { from: from, to: to };
    };
    // Mark: View Animation
    UIView._animationEnabled = false;
    UIView._animationViews = [];
    return UIView;
}(I.UIView));
exports.UIView = UIView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12).clearImmediate, __webpack_require__(12).setImmediate))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(19);
var global = __webpack_require__(21);
exports.setImmediate = global.setImmediate;
exports.clearImmediate = global.clearImmediate;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/**
* AutoLayout.js is licensed under the MIT license. If a copy of the
* MIT-license was not distributed with this file, You can obtain one at:
* http://opensource.org/licenses/mit-license.html.
*
* @author: Hein Rutjes (IjzerenHein)
* @license MIT
* @copyright Gloey Apps, 2017
*
* @library autolayout.js
* @version 0.7.0
*/
/**
* Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
* Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
*
* Use of this source code is governed by the LGPL, which can be found in the
* COPYING.LGPL file.
*/
(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AutoLayout = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var c = require('cassowary/bin/c');
'use strict';

/**
 * Layout attributes.
 * @enum {String}
 */
var Attribute = {
  CONST: 'const',
  NOTANATTRIBUTE: 'const',
  VARIABLE: 'var',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
  WIDTH: 'width',
  HEIGHT: 'height',
  CENTERX: 'centerX',
  CENTERY: 'centerY',
  /*LEADING: 'leading',
  TRAILING: 'trailing'*/
  /** Used by the extended VFL syntax. */
  ZINDEX: 'zIndex'
};

/**
 * Relation types.
 * @enum {String}
 */
var Relation = {
  /** Less than or equal */
  LEQ: 'leq',
  /** Equal */
  EQU: 'equ',
  /** Greater than or equal */
  GEQ: 'geq'
};

/**
 * Layout priorities.
 * @enum {String}
 */
var Priority = {
  REQUIRED: 1000,
  DEFAULTHIGH: 750,
  DEFAULTLOW: 250
  //FITTINGSIZELEVEL: 50,
};

var parser = function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { visualFormatString: peg$parsevisualFormatString },
        peg$startRuleFunction = peg$parsevisualFormatString,
        peg$c0 = peg$FAILED,
        peg$c1 = null,
        peg$c2 = ":",
        peg$c3 = { type: "literal", value: ":", description: "\":\"" },
        peg$c4 = [],
        peg$c5 = function peg$c5(o, superto, view, views, tosuper) {
      return {
        orientation: o ? o[0] : 'horizontal',
        cascade: (superto || []).concat([view], [].concat.apply([], views), tosuper || [])
      };
    },
        peg$c6 = "H",
        peg$c7 = { type: "literal", value: "H", description: "\"H\"" },
        peg$c8 = "V",
        peg$c9 = { type: "literal", value: "V", description: "\"V\"" },
        peg$c10 = function peg$c10(orient) {
      return orient == 'H' ? 'horizontal' : 'vertical';
    },
        peg$c11 = "|",
        peg$c12 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c13 = function peg$c13() {
      return { view: null };
    },
        peg$c14 = "[",
        peg$c15 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c16 = "]",
        peg$c17 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c18 = function peg$c18(view, predicates) {
      return extend(view, predicates ? { constraints: predicates } : {});
    },
        peg$c19 = "-",
        peg$c20 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c21 = function peg$c21(predicateList) {
      return predicateList;
    },
        peg$c22 = function peg$c22() {
      return [{ relation: 'equ', constant: 'default', $parserOffset: offset() }];
    },
        peg$c23 = "",
        peg$c24 = function peg$c24() {
      return [{ relation: 'equ', constant: 0, $parserOffset: offset() }];
    },
        peg$c25 = function peg$c25(n) {
      return [{ relation: 'equ', constant: n, $parserOffset: offset() }];
    },
        peg$c26 = "(",
        peg$c27 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c28 = ",",
        peg$c29 = { type: "literal", value: ",", description: "\",\"" },
        peg$c30 = ")",
        peg$c31 = { type: "literal", value: ")", description: "\")\"" },
        peg$c32 = function peg$c32(p, ps) {
      return [p].concat(ps.map(function (p) {
        return p[1];
      }));
    },
        peg$c33 = "@",
        peg$c34 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c35 = function peg$c35(r, o, p) {
      return extend({ relation: 'equ' }, r || {}, o, p ? p[1] : {});
    },
        peg$c36 = "==",
        peg$c37 = { type: "literal", value: "==", description: "\"==\"" },
        peg$c38 = function peg$c38() {
      return { relation: 'equ', $parserOffset: offset() };
    },
        peg$c39 = "<=",
        peg$c40 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c41 = function peg$c41() {
      return { relation: 'leq', $parserOffset: offset() };
    },
        peg$c42 = ">=",
        peg$c43 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c44 = function peg$c44() {
      return { relation: 'geq', $parserOffset: offset() };
    },
        peg$c45 = /^[0-9]/,
        peg$c46 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c47 = function peg$c47(digits) {
      return { priority: parseInt(digits.join(""), 10) };
    },
        peg$c48 = function peg$c48(n) {
      return { constant: n };
    },
        peg$c49 = /^[a-zA-Z_]/,
        peg$c50 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c51 = /^[a-zA-Z0-9_]/,
        peg$c52 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c53 = function peg$c53(f, v) {
      return { view: f + v };
    },
        peg$c54 = ".",
        peg$c55 = { type: "literal", value: ".", description: "\".\"" },
        peg$c56 = function peg$c56(digits, decimals) {
      return parseFloat(digits.concat(".").concat(decimals).join(""), 10);
    },
        peg$c57 = function peg$c57(digits) {
      return parseInt(digits.join(""), 10);
    },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === '\u2028' || ch === '\u2029') {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return '\\x' + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return '\\u0' + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return '\\u' + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsevisualFormatString() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseorientation();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c2;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsesuperview();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseconnection();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c1;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseview();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseconnection();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseview();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsesuperview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c1;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c5(s1, s2, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseorientation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 72) {
        s1 = peg$c6;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c7);
        }
      }
      if (s1 === peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 86) {
          s1 = peg$c8;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c10(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsesuperview() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c11;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c12);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c13();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseview() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c14;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c15);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseviewName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsepredicateListWithParens();
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s4 = peg$c16;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c18(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c19;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicateList();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 45) {
            s3 = peg$c19;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c20);
            }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c21(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c19;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c22();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$c23;
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c24();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsepredicateList() {
      var s0;

      s0 = peg$parsesimplePredicate();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepredicateListWithParens();
      }

      return s0;
    }

    function peg$parsesimplePredicate() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c25(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsepredicateListWithParens() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c26;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c27);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c28;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsepredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c28;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c29);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c30;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c32(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c1;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c33;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c34);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c1;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c35(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c36) {
        s1 = peg$c36;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c37);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c38();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c39) {
          s1 = peg$c39;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c41();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c42) {
            s1 = peg$c42;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c44();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseobjectOfPredicate() {
      var s0;

      s0 = peg$parseconstant();
      if (s0 === peg$FAILED) {
        s0 = peg$parseviewName();
      }

      return s0;
    }

    function peg$parsepriority() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c45.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c46);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c47(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c48(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseviewName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c49.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c50);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c49.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c50);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c51.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c52);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c51.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c52);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c53(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c45.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c46);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c54;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c55);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c45.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c46);
            }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c45.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c46);
                }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c56(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c45.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c46);
              }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c57(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function extend(dst) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          dst[k] = arguments[i][k];
        }
      }
      return dst;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
}();

var parserExt = function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { visualFormatStringExt: peg$parsevisualFormatStringExt },
        peg$startRuleFunction = peg$parsevisualFormatStringExt,
        peg$c0 = peg$FAILED,
        peg$c1 = "C:",
        peg$c2 = { type: "literal", value: "C:", description: "\"C:\"" },
        peg$c3 = [],
        peg$c4 = null,
        peg$c5 = function peg$c5(view, attribute, attributes, comments) {
      return {
        type: 'attribute',
        view: view.view,
        attributes: [attribute].concat(attributes)
      };
    },
        peg$c6 = function peg$c6(attr, predicates) {
      return { attr: attr, predicates: predicates };
    },
        peg$c7 = ":",
        peg$c8 = { type: "literal", value: ":", description: "\":\"" },
        peg$c9 = function peg$c9(o, superto, view, views, tosuper, comments) {
      return {
        type: 'vfl',
        orientation: o ? o[0] : 'horizontal',
        cascade: (superto || []).concat(view, [].concat.apply([], views), tosuper || [])
      };
    },
        peg$c10 = "HV",
        peg$c11 = { type: "literal", value: "HV", description: "\"HV\"" },
        peg$c12 = function peg$c12() {
      return 'horzvert';
    },
        peg$c13 = "H",
        peg$c14 = { type: "literal", value: "H", description: "\"H\"" },
        peg$c15 = function peg$c15() {
      return 'horizontal';
    },
        peg$c16 = "V",
        peg$c17 = { type: "literal", value: "V", description: "\"V\"" },
        peg$c18 = function peg$c18() {
      return 'vertical';
    },
        peg$c19 = "Z",
        peg$c20 = { type: "literal", value: "Z", description: "\"Z\"" },
        peg$c21 = function peg$c21() {
      return 'zIndex';
    },
        peg$c22 = " ",
        peg$c23 = { type: "literal", value: " ", description: "\" \"" },
        peg$c24 = "//",
        peg$c25 = { type: "literal", value: "//", description: "\"//\"" },
        peg$c26 = { type: "any", description: "any character" },
        peg$c27 = "|",
        peg$c28 = { type: "literal", value: "|", description: "\"|\"" },
        peg$c29 = function peg$c29() {
      return { view: null };
    },
        peg$c30 = "[",
        peg$c31 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c32 = ",",
        peg$c33 = { type: "literal", value: ",", description: "\",\"" },
        peg$c34 = "]",
        peg$c35 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c36 = function peg$c36(view, views) {
      return views.length ? [view].concat([].concat.apply([], views)) : view;
    },
        peg$c37 = function peg$c37(view, predicates, cascadedViews) {
      return extend(extend(view, predicates ? { constraints: predicates } : {}), cascadedViews ? {
        cascade: cascadedViews
      } : {});
    },
        peg$c38 = function peg$c38(views, connection) {
      return [].concat([].concat.apply([], views), [connection]);
    },
        peg$c39 = "->",
        peg$c40 = { type: "literal", value: "->", description: "\"->\"" },
        peg$c41 = function peg$c41() {
      return [{ relation: 'none' }];
    },
        peg$c42 = "-",
        peg$c43 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c44 = function peg$c44(predicateList) {
      return predicateList;
    },
        peg$c45 = function peg$c45() {
      return [{ relation: 'equ', constant: 'default' }];
    },
        peg$c46 = "~",
        peg$c47 = { type: "literal", value: "~", description: "\"~\"" },
        peg$c48 = function peg$c48() {
      return [{ relation: 'equ', equalSpacing: true }];
    },
        peg$c49 = "",
        peg$c50 = function peg$c50() {
      return [{ relation: 'equ', constant: 0 }];
    },
        peg$c51 = function peg$c51(p) {
      return [{ relation: 'equ', multiplier: p.multiplier }];
    },
        peg$c52 = function peg$c52(n) {
      return [{ relation: 'equ', constant: n }];
    },
        peg$c53 = "(",
        peg$c54 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c55 = ")",
        peg$c56 = { type: "literal", value: ")", description: "\")\"" },
        peg$c57 = function peg$c57(p, ps) {
      return [p].concat(ps.map(function (p) {
        return p[1];
      }));
    },
        peg$c58 = "@",
        peg$c59 = { type: "literal", value: "@", description: "\"@\"" },
        peg$c60 = function peg$c60(r, o, p) {
      return extend({ relation: 'equ' }, r || {}, o, p ? p[1] : {});
    },
        peg$c61 = function peg$c61(r, o, p) {
      return extend({ relation: 'equ', equalSpacing: true }, r || {}, o, p ? p[1] : {});
    },
        peg$c62 = "==",
        peg$c63 = { type: "literal", value: "==", description: "\"==\"" },
        peg$c64 = function peg$c64() {
      return { relation: 'equ' };
    },
        peg$c65 = "<=",
        peg$c66 = { type: "literal", value: "<=", description: "\"<=\"" },
        peg$c67 = function peg$c67() {
      return { relation: 'leq' };
    },
        peg$c68 = ">=",
        peg$c69 = { type: "literal", value: ">=", description: "\">=\"" },
        peg$c70 = function peg$c70() {
      return { relation: 'geq' };
    },
        peg$c71 = /^[0-9]/,
        peg$c72 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c73 = function peg$c73(digits) {
      return { priority: parseInt(digits.join(""), 10) };
    },
        peg$c74 = function peg$c74(n) {
      return { constant: n };
    },
        peg$c75 = function peg$c75(n) {
      return { constant: -n };
    },
        peg$c76 = "+",
        peg$c77 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c78 = "%",
        peg$c79 = { type: "literal", value: "%", description: "\"%\"" },
        peg$c80 = function peg$c80(n) {
      return { view: null, multiplier: n / 100 };
    },
        peg$c81 = function peg$c81(n) {
      return { view: null, multiplier: n / -100 };
    },
        peg$c82 = function peg$c82(vn, a, m, c) {
      return { view: vn.view, attribute: a ? a : undefined, multiplier: m ? m : 1, constant: c ? c : undefined };
    },
        peg$c83 = ".left",
        peg$c84 = { type: "literal", value: ".left", description: "\".left\"" },
        peg$c85 = function peg$c85() {
      return 'left';
    },
        peg$c86 = ".right",
        peg$c87 = { type: "literal", value: ".right", description: "\".right\"" },
        peg$c88 = function peg$c88() {
      return 'right';
    },
        peg$c89 = ".top",
        peg$c90 = { type: "literal", value: ".top", description: "\".top\"" },
        peg$c91 = function peg$c91() {
      return 'top';
    },
        peg$c92 = ".bottom",
        peg$c93 = { type: "literal", value: ".bottom", description: "\".bottom\"" },
        peg$c94 = function peg$c94() {
      return 'bottom';
    },
        peg$c95 = ".width",
        peg$c96 = { type: "literal", value: ".width", description: "\".width\"" },
        peg$c97 = function peg$c97() {
      return 'width';
    },
        peg$c98 = ".height",
        peg$c99 = { type: "literal", value: ".height", description: "\".height\"" },
        peg$c100 = function peg$c100() {
      return 'height';
    },
        peg$c101 = ".centerX",
        peg$c102 = { type: "literal", value: ".centerX", description: "\".centerX\"" },
        peg$c103 = function peg$c103() {
      return 'centerX';
    },
        peg$c104 = ".centerY",
        peg$c105 = { type: "literal", value: ".centerY", description: "\".centerY\"" },
        peg$c106 = function peg$c106() {
      return 'centerY';
    },
        peg$c107 = "/",
        peg$c108 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c109 = function peg$c109(n) {
      return 1 / n;
    },
        peg$c110 = "/+",
        peg$c111 = { type: "literal", value: "/+", description: "\"/+\"" },
        peg$c112 = "/-",
        peg$c113 = { type: "literal", value: "/-", description: "\"/-\"" },
        peg$c114 = function peg$c114(n) {
      return -1 / n;
    },
        peg$c115 = "*",
        peg$c116 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c117 = function peg$c117(n) {
      return n;
    },
        peg$c118 = "*+",
        peg$c119 = { type: "literal", value: "*+", description: "\"*+\"" },
        peg$c120 = "*-",
        peg$c121 = { type: "literal", value: "*-", description: "\"*-\"" },
        peg$c122 = function peg$c122(n) {
      return -n;
    },
        peg$c123 = /^[a-zA-Z_]/,
        peg$c124 = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
        peg$c125 = /^[a-zA-Z0-9_]/,
        peg$c126 = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
        peg$c127 = function peg$c127(f, v, r) {
      return { view: f + v, range: r, $parserOffset: offset() };
    },
        peg$c128 = function peg$c128(f, v) {
      return { view: f + v, $parserOffset: offset() };
    },
        peg$c129 = "..",
        peg$c130 = { type: "literal", value: "..", description: "\"..\"" },
        peg$c131 = function peg$c131(d) {
      return parseInt(d);
    },
        peg$c132 = ".",
        peg$c133 = { type: "literal", value: ".", description: "\".\"" },
        peg$c134 = function peg$c134(digits, decimals) {
      return parseFloat(digits.concat(".").concat(decimals).join(""), 10);
    },
        peg$c135 = function peg$c135(digits) {
      return parseInt(digits.join(""), 10);
    },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === '\u2028' || ch === '\u2029') {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return '\\x' + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return '\\u0' + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return '\\u' + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsevisualFormatStringExt() {
      var s0;

      s0 = peg$parsevisualFormatString();
      if (s0 === peg$FAILED) {
        s0 = peg$parsevisualFormatStringConstraintExpression();
      }

      return s0;
    }

    function peg$parsevisualFormatStringConstraintExpression() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c1) {
        s1 = peg$c1;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c2);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseviewName();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseattributePredicate();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parseattributePredicate();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parseattributePredicate();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecomments();
              if (s5 === peg$FAILED) {
                s5 = peg$c4;
              }
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c5(s2, s3, s4, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattributePredicate() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parseattribute();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicateListWithParens();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c6(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsevisualFormatString() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = peg$parseorientation();
      if (s2 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 58) {
          s3 = peg$c7;
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c8);
          }
        }
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = peg$parsesuperview();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseconnection();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$c0;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$c0;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseviewGroup();
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$currPos;
            s6 = peg$parseconnection();
            if (s6 !== peg$FAILED) {
              s7 = peg$parseviewGroup();
              if (s7 !== peg$FAILED) {
                s6 = [s6, s7];
                s5 = s6;
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            } else {
              peg$currPos = s5;
              s5 = peg$c0;
            }
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseviewGroup();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseconnection();
              if (s6 !== peg$FAILED) {
                s7 = peg$parsesuperview();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$c0;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$c0;
              }
              if (s5 === peg$FAILED) {
                s5 = peg$c4;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsecomments();
                if (s6 === peg$FAILED) {
                  s6 = peg$c4;
                }
                if (s6 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c9(s1, s2, s3, s4, s5, s6);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseorientation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c10) {
        s1 = peg$c10;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c11);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c12();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 72) {
          s1 = peg$c13;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c14);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c15();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 86) {
            s1 = peg$c16;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c18();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 90) {
              s1 = peg$c19;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c20);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c21();
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parsecomments() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (input.charCodeAt(peg$currPos) === 32) {
        s2 = peg$c22;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c22;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }
      }
      if (s1 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c24) {
          s2 = peg$c24;
          peg$currPos += 2;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c25);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (input.length > peg$currPos) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c26);
            }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (input.length > peg$currPos) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c26);
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s1 = [s1, s2, s3];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsesuperview() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 124) {
        s1 = peg$c27;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c28);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c29();
      }
      s0 = s1;

      return s0;
    }

    function peg$parseviewGroup() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 91) {
        s1 = peg$c30;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c31);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseview();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c32;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c33);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parseview();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c32;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c33);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseview();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s4 = peg$c34;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c35);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c36(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseview() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parseviewNameRange();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicateListWithParens();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsecascadedViews();
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsecascadedViews() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 58) {
        s1 = peg$c7;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c8);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$parseconnection();
        if (s4 !== peg$FAILED) {
          s5 = peg$parseviewGroup();
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$c0;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parseconnection();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseviewGroup();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$c0;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseconnection();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c38(s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseconnection() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c39) {
        s1 = peg$c39;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c40);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c41();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c42;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsepredicateList();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s3 = peg$c42;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c43);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c44(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 45) {
            s1 = peg$c42;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c45();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 126) {
              s1 = peg$c46;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c47);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parseequalSpacingPredicateList();
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 126) {
                  s3 = peg$c46;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c47);
                  }
                }
                if (s3 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c44(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 126) {
                s1 = peg$c46;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c47);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c48();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$c49;
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c50();
                }
                s0 = s1;
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsepredicateList() {
      var s0;

      s0 = peg$parsesimplePredicate();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepredicateListWithParens();
      }

      return s0;
    }

    function peg$parsesimplePredicate() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsepercentage();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c51(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c52(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function peg$parsepredicateListWithParens() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c53;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c54);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsepredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c32;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c33);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsepredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c32;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c33);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsepredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c55;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c56);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c57(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsepredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c58;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c59);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c60(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseequalSpacingPredicateList() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 40) {
        s1 = peg$c53;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c54);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseequalSpacingPredicate();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s5 = peg$c32;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c33);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parseequalSpacingPredicate();
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$c0;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 44) {
              s5 = peg$c32;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c33);
              }
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parseequalSpacingPredicate();
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$c0;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$c0;
            }
          }
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s4 = peg$c55;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c56);
              }
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c57(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseequalSpacingPredicate() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parserelation();
      if (s1 === peg$FAILED) {
        s1 = peg$c4;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parseobjectOfPredicate();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 64) {
            s4 = peg$c58;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c59);
            }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsepriority();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$c0;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$c0;
          }
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c61(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserelation() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c62) {
        s1 = peg$c62;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c63);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c64();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c65) {
          s1 = peg$c65;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c66);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c67();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c68) {
            s1 = peg$c68;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c69);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c70();
          }
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseobjectOfPredicate() {
      var s0;

      s0 = peg$parsepercentage();
      if (s0 === peg$FAILED) {
        s0 = peg$parseconstant();
        if (s0 === peg$FAILED) {
          s0 = peg$parseviewPredicate();
        }
      }

      return s0;
    }

    function peg$parsepriority() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c71.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c72);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c71.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c72);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c73(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseconstant() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c74(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c42;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c75(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c76;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c77);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsenumber();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c74(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parsepercentage() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$parsenumber();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 37) {
          s2 = peg$c78;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c79);
          }
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c80(s1);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 45) {
          s1 = peg$c42;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 37) {
              s3 = peg$c78;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c79);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c81(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 43) {
            s1 = peg$c76;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c77);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsenumber();
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 37) {
                s3 = peg$c78;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c79);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c80(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parseviewPredicate() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseviewName();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseattribute();
        if (s2 === peg$FAILED) {
          s2 = peg$c4;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsemultiplier();
          if (s3 === peg$FAILED) {
            s3 = peg$c4;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseconstantExpr();
            if (s4 === peg$FAILED) {
              s4 = peg$c4;
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c82(s1, s2, s3, s4);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parseattribute() {
      var s0, s1;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 5) === peg$c83) {
        s1 = peg$c83;
        peg$currPos += 5;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c84);
        }
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c85();
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c86) {
          s1 = peg$c86;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c87);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c88();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 4) === peg$c89) {
            s1 = peg$c89;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c90);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c91();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 7) === peg$c92) {
              s1 = peg$c92;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c93);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c94();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 6) === peg$c95) {
                s1 = peg$c95;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c96);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c97();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 7) === peg$c98) {
                  s1 = peg$c98;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c99);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c100();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.substr(peg$currPos, 8) === peg$c101) {
                    s1 = peg$c101;
                    peg$currPos += 8;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c102);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c103();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.substr(peg$currPos, 8) === peg$c104) {
                      s1 = peg$c104;
                      peg$currPos += 8;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c105);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$reportedPos = s0;
                      s1 = peg$c106();
                    }
                    s0 = s1;
                  }
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsemultiplier() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 47) {
        s1 = peg$c107;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c108);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c109(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c110) {
          s1 = peg$c110;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c111);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c109(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c112) {
            s1 = peg$c112;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c113);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsenumber();
            if (s2 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c114(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.charCodeAt(peg$currPos) === 42) {
              s1 = peg$c115;
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c116);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parsenumber();
              if (s2 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c117(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c118) {
                s1 = peg$c118;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c119);
                }
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parsenumber();
                if (s2 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c117(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c120) {
                  s1 = peg$c120;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c121);
                  }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parsenumber();
                  if (s2 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c122(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parseconstantExpr() {
      var s0, s1, s2;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c42;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c43);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsenumber();
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c122(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 43) {
          s1 = peg$c76;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c77);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsenumber();
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c117(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseviewNameRange() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c123.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c124);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c123.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c124);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c125.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c126);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c125.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c126);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          s3 = peg$parserange();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c127(s1, s2, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c123.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c124);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c123.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c124);
              }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          s2 = input.substring(s1, peg$currPos);
        }
        s1 = s2;
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          if (peg$c125.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c126);
            }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c125.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c126);
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s3 = input.substring(s2, peg$currPos);
          }
          s2 = s3;
          if (s2 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c128(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      }

      return s0;
    }

    function peg$parseviewName() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      s2 = [];
      if (peg$c123.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c124);
        }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$c123.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c124);
            }
          }
        }
      } else {
        s2 = peg$c0;
      }
      if (s2 !== peg$FAILED) {
        s2 = input.substring(s1, peg$currPos);
      }
      s1 = s2;
      if (s1 !== peg$FAILED) {
        s2 = peg$currPos;
        s3 = [];
        if (peg$c125.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c126);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c125.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c126);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s3 = input.substring(s2, peg$currPos);
        }
        s2 = s3;
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c128(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parserange() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 2) === peg$c129) {
        s1 = peg$c129;
        peg$currPos += 2;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c130);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c71.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c72);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c71.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c72);
              }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c131(s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c71.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c72);
        }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c71.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c72);
            }
          }
        }
      } else {
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 46) {
          s2 = peg$c132;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c133);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = [];
          if (peg$c71.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c72);
            }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c71.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c72);
                }
              }
            }
          } else {
            s3 = peg$c0;
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c134(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c71.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c72);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c71.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c72);
              }
            }
          }
        } else {
          s1 = peg$c0;
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c135(s1);
        }
        s0 = s1;
      }

      return s0;
    }

    function extend(dst) {
      for (var i = 1; i < arguments.length; i++) {
        for (var k in arguments[i]) {
          dst[k] = arguments[i][k];
        }
      }
      return dst;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
}();

var Orientation = {
  HORIZONTAL: 1,
  VERTICAL: 2,
  ZINDEX: 4
};

/**
 * Helper function that inserts equal spacers (~).
 * @private
 */
function _processEqualSpacer(context, stackView) {

  // Determine unique name for the spacer
  context.equalSpacerIndex = context.equalSpacerIndex || 1;
  var name = '_~' + context.lineIndex + ':' + context.equalSpacerIndex + '~';
  if (context.equalSpacerIndex > 1) {

    // Ensure that all spacers have the same width/height
    context.constraints.push({
      view1: '_~' + context.lineIndex + ':1~',
      attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      relation: context.relation.relation || Relation.EQU,
      view2: name,
      attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      priority: context.relation.priority
    });
  }
  context.equalSpacerIndex++;

  // Enforce view/proportional width/height
  if (context.relation.view || context.relation.multiplier && context.relation.multiplier !== 1) {
    context.constraints.push({
      view1: name,
      attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      relation: context.relation.relation || Relation.EQU,
      view2: context.relation.view,
      attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      priority: context.relation.priority,
      multiplier: context.relation.multiplier
    });
    context.relation.multiplier = undefined;
  } else if (context.relation.constant) {
    context.constraints.push({
      view1: name,
      attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
      relation: Relation.EQU,
      view2: null,
      attr2: Attribute.CONST,
      priority: context.relation.priority,
      constant: context.relation.constant
    });
    context.relation.constant = undefined;
  }

  // Add constraint
  for (var i = 0; i < context.prevViews.length; i++) {
    var prevView = context.prevViews[i];
    switch (context.orientation) {
      case Orientation.HORIZONTAL:
        context.prevAttr = prevView !== stackView ? Attribute.RIGHT : Attribute.LEFT;
        context.curAttr = Attribute.LEFT;
        break;
      case Orientation.VERTICAL:
        context.prevAttr = prevView !== stackView ? Attribute.BOTTOM : Attribute.TOP;
        context.curAttr = Attribute.TOP;
        break;
      case Orientation.ZINDEX:
        context.prevAttr = Attribute.ZINDEX;
        context.curAttr = Attribute.ZINDEX;
        context.relation.constant = prevView !== stackView ? 'default' : 0;
        break;
    }
    context.constraints.push({
      view1: prevView,
      attr1: context.prevAttr,
      relation: context.relation.relation,
      view2: name,
      attr2: context.curAttr,
      priority: context.relation.priority
    });
  }
  context.prevViews = [name];
}

/**
 * Helper function that inserts proportional spacers (-12%-).
 * @private
 */
function _processProportionalSpacer(context, stackView) {
  context.proportionalSpacerIndex = context.proportionalSpacerIndex || 1;
  var name = '_-' + context.lineIndex + ':' + context.proportionalSpacerIndex + '-';
  context.proportionalSpacerIndex++;
  context.constraints.push({
    view1: name,
    attr1: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
    relation: context.relation.relation || Relation.EQU,
    view2: context.relation.view, // or relative to the stackView... food for thought
    attr2: context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT,
    priority: context.relation.priority,
    multiplier: context.relation.multiplier
  });
  context.relation.multiplier = undefined;

  // Add constraint
  for (var i = 0; i < context.prevViews.length; i++) {
    var prevView = context.prevViews[i];
    switch (context.orientation) {
      case Orientation.HORIZONTAL:
        context.prevAttr = prevView !== stackView ? Attribute.RIGHT : Attribute.LEFT;
        context.curAttr = Attribute.LEFT;
        break;
      case Orientation.VERTICAL:
        context.prevAttr = prevView !== stackView ? Attribute.BOTTOM : Attribute.TOP;
        context.curAttr = Attribute.TOP;
        break;
      case Orientation.ZINDEX:
        context.prevAttr = Attribute.ZINDEX;
        context.curAttr = Attribute.ZINDEX;
        context.relation.constant = prevView !== stackView ? 'default' : 0;
        break;
    }
    context.constraints.push({
      view1: prevView,
      attr1: context.prevAttr,
      relation: context.relation.relation,
      view2: name,
      attr2: context.curAttr,
      priority: context.relation.priority
    });
  }
  context.prevViews = [name];
}

/**
 * In case of a stack-view, set constraints for opposite orientations
 * @private
 */
function _processStackView(context, name, subView) {
  var viewName = void 0;
  for (var orientation = 1; orientation <= 4; orientation *= 2) {
    if (subView.orientations & orientation && subView.stack.orientation !== orientation && !(subView.stack.processedOrientations & orientation)) {
      subView.stack.processedOrientations = subView.stack.processedOrientations | orientation;
      viewName = viewName || {
        name: name,
        type: 'stack'
      };
      for (var i = 0, j = subView.stack.subViews.length; i < j; i++) {
        if (orientation === Orientation.ZINDEX) {
          context.constraints.push({
            view1: viewName,
            attr1: Attribute.ZINDEX,
            relation: Relation.EQU,
            view2: subView.stack.subViews[i],
            attr2: Attribute.ZINDEX
          });
        } else {
          context.constraints.push({
            view1: viewName,
            attr1: orientation === Orientation.VERTICAL ? Attribute.HEIGHT : Attribute.WIDTH,
            relation: Relation.EQU,
            view2: subView.stack.subViews[i],
            attr2: orientation === Orientation.VERTICAL ? Attribute.HEIGHT : Attribute.WIDTH
          });
          context.constraints.push({
            view1: viewName,
            attr1: orientation === Orientation.VERTICAL ? Attribute.TOP : Attribute.LEFT,
            relation: Relation.EQU,
            view2: subView.stack.subViews[i],
            attr2: orientation === Orientation.VERTICAL ? Attribute.TOP : Attribute.LEFT
          });
        }
      }
    }
  }
}

/**
 * Recursive helper function converts a view-name and a range to a series
 * of view-names (e.g. [child1, child2, child3, ...]).
 * @private
 */
function _getRange(name, range) {
  if (range === true) {
    range = name.match(/\.\.\d+$/);
    if (range) {
      name = name.substring(0, name.length - range[0].length);
      range = parseInt(range[0].substring(2));
    }
  }
  if (!range) {
    return [name];
  }
  var start = name.match(/\d+$/);
  var res = [];
  var i;
  if (start) {
    name = name.substring(0, name.length - start[0].length);
    for (i = parseInt(start); i <= range; i++) {
      res.push(name + i);
    }
  } else {
    res.push(name);
    for (i = 2; i <= range; i++) {
      res.push(name + i);
    }
  }
  return res;
}

/**
 * Recursive helper function that processes the cascaded data.
 * @private
 */
function _processCascade(context, cascade, parentItem) {
  var stackView = parentItem ? parentItem.view : null;
  var subViews = [];
  var curViews = [];
  var subView = void 0;
  if (stackView) {
    cascade.push({ view: stackView });
    curViews.push(stackView);
  }
  for (var i = 0; i < cascade.length; i++) {
    var item = cascade[i];
    if (!Array.isArray(item) && item.hasOwnProperty('view') || Array.isArray(item) && item[0].view && !item[0].relation) {
      var items = Array.isArray(item) ? item : [item];
      for (var z = 0; z < items.length; z++) {
        item = items[z];
        var viewRange = item === ',' ? [] : item.view ? _getRange(item.view, item.range) : [null];
        for (var r = 0; r < viewRange.length; r++) {
          var curView = viewRange[r];
          curViews.push(curView);

          //
          // Add this view to the collection of subViews
          //
          if (curView !== stackView) {
            subViews.push(curView);
            subView = context.subViews[curView];
            if (!subView) {
              subView = { orientations: 0 };
              context.subViews[curView] = subView;
            }
            subView.orientations = subView.orientations | context.orientation;
            if (subView.stack) {
              _processStackView(context, curView, subView);
            }
          }

          //
          // Process the relationship between this and the previous views
          //
          if (context.prevViews !== undefined && curView !== undefined && context.relation) {
            if (context.relation.relation !== 'none') {
              for (var p = 0; p < context.prevViews.length; p++) {
                var prevView = context.prevViews[p];
                switch (context.orientation) {
                  case Orientation.HORIZONTAL:
                    context.prevAttr = prevView !== stackView ? Attribute.RIGHT : Attribute.LEFT;
                    context.curAttr = curView !== stackView ? Attribute.LEFT : Attribute.RIGHT;
                    break;
                  case Orientation.VERTICAL:
                    context.prevAttr = prevView !== stackView ? Attribute.BOTTOM : Attribute.TOP;
                    context.curAttr = curView !== stackView ? Attribute.TOP : Attribute.BOTTOM;
                    break;
                  case Orientation.ZINDEX:
                    context.prevAttr = Attribute.ZINDEX;
                    context.curAttr = Attribute.ZINDEX;
                    context.relation.constant = !prevView ? 0 : context.relation.constant || 'default';
                    break;
                }
                context.constraints.push({
                  view1: prevView,
                  attr1: context.prevAttr,
                  relation: context.relation.relation,
                  view2: curView,
                  attr2: context.curAttr,
                  multiplier: context.relation.multiplier,
                  constant: context.relation.constant === 'default' || !context.relation.constant ? context.relation.constant : -context.relation.constant,
                  priority: context.relation.priority
                });
              }
            }
          }

          //
          // Process view size constraints
          //
          var constraints = item.constraints;
          if (constraints) {
            for (var n = 0; n < constraints.length; n++) {
              context.prevAttr = context.horizontal ? Attribute.WIDTH : Attribute.HEIGHT;
              context.curAttr = constraints[n].view || constraints[n].multiplier ? constraints[n].attribute || context.prevAttr : constraints[n].variable ? Attribute.VARIABLE : Attribute.CONST;
              context.constraints.push({
                view1: curView,
                attr1: context.prevAttr,
                relation: constraints[n].relation,
                view2: constraints[n].view,
                attr2: context.curAttr,
                multiplier: constraints[n].multiplier,
                constant: constraints[n].constant,
                priority: constraints[n].priority
              });
            }
          }

          //
          // Process cascaded data (child stack-views)
          //
          if (item.cascade) {
            _processCascade(context, item.cascade, item);
          }
        }
      }
    } else if (item !== ',') {
      context.prevViews = curViews;
      curViews = [];
      context.relation = item[0];
      if (context.prevViews !== undefined) {
        if (context.relation.equalSpacing) {
          _processEqualSpacer(context, stackView);
        }
        if (context.relation.multiplier) {
          _processProportionalSpacer(context, stackView);
        }
      }
    }
  }

  if (stackView) {
    subView = context.subViews[stackView];
    if (!subView) {
      subView = { orientations: context.orientation };
      context.subViews[stackView] = subView;
    } else if (subView.stack) {
      var err = new Error('A stack named "' + stackView + '" has already been created');
      err.column = parentItem.$parserOffset + 1;
      throw err;
    }
    subView.stack = {
      orientation: context.orientation,
      processedOrientations: context.orientation,
      subViews: subViews
    };
    _processStackView(context, stackView, subView);
  }
}

var metaInfoCategories = ['viewport', 'spacing', 'colors', 'shapes', 'widths', 'heights'];

/**
 * VisualFormat
 *
 * @namespace VisualFormat
 */

var VisualFormat = function () {
  function VisualFormat() {
    _classCallCheck(this, VisualFormat);
  }

  _createClass(VisualFormat, null, [{
    key: 'parseLine',


    /**
     * Parses a single line of vfl into an array of constraint definitions.
     *
     * When the visual-format could not be succesfully parsed an exception is thrown containing
     * additional info about the parse error and column position.
     *
     * @param {String} visualFormat Visual format string (cannot contain line-endings!).
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @param {Number} [options.lineIndex] Line-index used when auto generating equal-spacing constraints.
     * @return {Array} Array of constraint definitions.
     */
    value: function parseLine(visualFormat, options) {
      if (visualFormat.length === 0 || options && options.extended && visualFormat.indexOf('//') === 0) {
        return [];
      }
      var res = options && options.extended ? parserExt.parse(visualFormat) : parser.parse(visualFormat);
      if (options && options.outFormat === 'raw') {
        return [res];
      }
      var context = {
        constraints: [],
        lineIndex: (options ? options.lineIndex : undefined) || 1,
        subViews: (options ? options.subViews : undefined) || {}
      };
      if (res.type === 'attribute') {
        for (var n = 0; n < res.attributes.length; n++) {
          var attr = res.attributes[n];
          for (var m = 0; m < attr.predicates.length; m++) {
            var predicate = attr.predicates[m];
            context.constraints.push({
              view1: res.view,
              attr1: attr.attr,
              relation: predicate.relation,
              view2: predicate.view,
              attr2: predicate.attribute || attr.attr,
              multiplier: predicate.multiplier,
              constant: predicate.constant,
              priority: predicate.priority
            });
          }
        }
      } else {
        switch (res.orientation) {
          case 'horizontal':
            context.orientation = Orientation.HORIZONTAL;
            context.horizontal = true;
            _processCascade(context, res.cascade, null);
            break;
          case 'vertical':
            context.orientation = Orientation.VERTICAL;
            _processCascade(context, res.cascade, null);
            break;
          case 'horzvert':
            context.orientation = Orientation.HORIZONTAL;
            context.horizontal = true;
            _processCascade(context, res.cascade, null);
            context = {
              constraints: context.constraints,
              lineIndex: context.lineIndex,
              subViews: context.subViews,
              orientation: Orientation.VERTICAL
            };
            _processCascade(context, res.cascade, null);
            break;
          case 'zIndex':
            context.orientation = Orientation.ZINDEX;
            _processCascade(context, res.cascade, null);
            break;
        }
      }
      return context.constraints;
    }

    /**
     * Parses one or more visual format strings into an array of constraint definitions.
     *
     * When the visual-format could not be succesfully parsed an exception is thrown containing
     * additional info about the parse error and column position.
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {Boolean} [options.extended] When set to true uses the extended syntax (default: false).
     * @param {Boolean} [options.strict] When set to false trims any leading/trailing spaces and ignores empty lines (default: true).
     * @param {String} [options.lineSeparator] String that defines the end of a line (default `\n`).
     * @param {String} [options.outFormat] Output format (`constraints` or `raw`) (default: `constraints`).
     * @return {Array} Array of constraint definitions.
     */

  }, {
    key: 'parse',
    value: function parse(visualFormat, options) {
      var lineSeparator = options && options.lineSeparator ? options.lineSeparator : '\n';
      if (!Array.isArray(visualFormat) && visualFormat.indexOf(lineSeparator) < 0) {
        try {
          return this.parseLine(visualFormat, options);
        } catch (err) {
          err.source = visualFormat;
          throw err;
        }
      }

      // Decompose visual-format into an array of strings, and within those strings
      // search for line-endings, and treat each line as a seperate visual-format.
      visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
      var lines = void 0;
      var constraints = [];
      var lineIndex = 0;
      var line = void 0;
      var parseOptions = {
        lineIndex: lineIndex,
        extended: options && options.extended,
        strict: options && options.strict !== undefined ? options.strict : true,
        outFormat: options ? options.outFormat : undefined,
        subViews: {}
      };
      try {
        for (var i = 0; i < visualFormat.length; i++) {
          lines = visualFormat[i].split(lineSeparator);
          for (var j = 0; j < lines.length; j++) {
            line = lines[j];
            lineIndex++;
            parseOptions.lineIndex = lineIndex;
            if (!parseOptions.strict) {
              line = line.trim();
            }
            if (parseOptions.strict || line.length) {
              constraints = constraints.concat(this.parseLine(line, parseOptions));
            }
          }
        }
      } catch (err) {
        err.source = line;
        err.line = lineIndex;
        throw err;
      }
      return constraints;
    }

    /**
     * Parses meta information from the comments in the VFL.
     *
     * Additional meta information can be specified in the comments
     * for previewing and rendering purposes. For instance, the view-port
     * aspect-ratio, sub-view widths and colors, can be specified. The
     * following example renders three colored circles in the visual-format editor:
     *
     * ```vfl
     * //viewport aspect-ratio:3/1 max-height:300
     * //colors red:#FF0000 green:#00FF00 blue:#0000FF
     * //shapes red:circle green:circle blue:circle
     * H:|-[row:[red(green,blue)]-[green]-[blue]]-|
     * V:|[row]|
     * ```
     *
     * Supported categories and properties:
     *
     * |Category|Property|Example|
     * |--------|--------|-------|
     * |`viewport`|`aspect-ratio:{width}/{height}`|`//viewport aspect-ratio:16/9`|
     * ||`width:[{number}/intrinsic]`|`//viewport width:10`|
     * ||`height:[{number}/intrinsic]`|`//viewport height:intrinsic`|
     * ||`min-width:{number}`|
     * ||`max-width:{number}`|
     * ||`min-height:{number}`|
     * ||`max-height:{number}`|
     * |`spacing`|`[{number}/array]`|`//spacing:8` or `//spacing:[10, 20, 5]`|
     * |`widths`|`{view-name}:[{number}/intrinsic]`|`//widths subview1:100`|
     * |`heights`|`{view-name}:[{number}/intrinsic]`|`//heights subview1:intrinsic`|
     * |`colors`|`{view-name}:{color}`|`//colors redview:#FF0000 blueview:#00FF00`|
     * |`shapes`|`{view-name}:[circle/square]`|`//shapes avatar:circle`|
     *
     * @param {String|Array} visualFormat One or more visual format strings.
     * @param {Object} [options] Configuration options.
     * @param {String} [options.lineSeparator] String that defines the end of a line (default `\n`).
     * @param {String} [options.prefix] When specified, also processes the categories using that prefix (e.g. "-dev-viewport max-height:10").
     * @return {Object} meta-info
     */

  }, {
    key: 'parseMetaInfo',
    value: function parseMetaInfo(visualFormat, options) {
      var lineSeparator = options && options.lineSeparator ? options.lineSeparator : '\n';
      var prefix = options ? options.prefix : undefined;
      visualFormat = Array.isArray(visualFormat) ? visualFormat : [visualFormat];
      var metaInfo = {};
      var key;
      for (var k = 0; k < visualFormat.length; k++) {
        var lines = visualFormat[k].split(lineSeparator);
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          for (var c = 0; c < metaInfoCategories.length; c++) {
            for (var s = 0; s < (prefix ? 2 : 1); s++) {
              var category = metaInfoCategories[c];
              var prefixedCategory = (s === 0 ? '' : prefix) + category;
              if (line.indexOf('//' + prefixedCategory + ' ') === 0) {
                var items = line.substring(3 + prefixedCategory.length).split(' ');
                for (var j = 0; j < items.length; j++) {
                  metaInfo[category] = metaInfo[category] || {};
                  var item = items[j].split(':');
                  var names = _getRange(item[0], true);
                  for (var r = 0; r < names.length; r++) {
                    metaInfo[category][names[r]] = item.length > 1 ? item[1] : '';
                  }
                }
              } else if (line.indexOf('//' + prefixedCategory + ':') === 0) {
                metaInfo[category] = line.substring(3 + prefixedCategory.length);
              }
            }
          }
        }
      }
      if (metaInfo.viewport) {
        var viewport = metaInfo.viewport;
        var aspectRatio = viewport['aspect-ratio'];
        if (aspectRatio) {
          aspectRatio = aspectRatio.split('/');
          viewport['aspect-ratio'] = parseInt(aspectRatio[0]) / parseInt(aspectRatio[1]);
        }
        if (viewport.height !== undefined) {
          viewport.height = viewport.height === 'intrinsic' ? true : parseInt(viewport.height);
        }
        if (viewport.width !== undefined) {
          viewport.width = viewport.width === 'intrinsic' ? true : parseInt(viewport.width);
        }
        if (viewport['max-height'] !== undefined) {
          viewport['max-height'] = parseInt(viewport['max-height']);
        }
        if (viewport['max-width'] !== undefined) {
          viewport['max-width'] = parseInt(viewport['max-width']);
        }
        if (viewport['min-height'] !== undefined) {
          viewport['min-height'] = parseInt(viewport['min-height']);
        }
        if (viewport['min-width'] !== undefined) {
          viewport['min-width'] = parseInt(viewport['min-width']);
        }
      }
      if (metaInfo.widths) {
        for (key in metaInfo.widths) {
          var width = metaInfo.widths[key] === 'intrinsic' ? true : parseInt(metaInfo.widths[key]);
          metaInfo.widths[key] = width;
          if (width === undefined || isNaN(width)) {
            delete metaInfo.widths[key];
          }
        }
      }
      if (metaInfo.heights) {
        for (key in metaInfo.heights) {
          var height = metaInfo.heights[key] === 'intrinsic' ? true : parseInt(metaInfo.heights[key]);
          metaInfo.heights[key] = height;
          if (height === undefined || isNaN(height)) {
            delete metaInfo.heights[key];
          }
        }
      }
      if (metaInfo.spacing) {
        var value = JSON.parse(metaInfo.spacing);
        metaInfo.spacing = value;
        if (Array.isArray(value)) {
          for (var sIdx = 0, len = value.length; sIdx < len; sIdx++) {
            if (isNaN(value[sIdx])) {
              delete metaInfo.spacing;
              break;
            }
          }
        } else if (value === undefined || isNaN(value)) {
          delete metaInfo.spacing;
        }
      }
      return metaInfo;
    }
  }]);

  return VisualFormat;
}();

/**
 * A SubView is automatically generated when constraints are added to a View.
 *
 * @namespace SubView
 */


var SubView = function () {
  function SubView(options) {
    _classCallCheck(this, SubView);

    this._name = options.name;
    this._type = options.type;
    this._solver = options.solver;
    this._attr = {};
    if (!options.name) {
      if (true) {
        this._attr[Attribute.LEFT] = new c.Variable();
        this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.LEFT], c.Strength.required));
        this._attr[Attribute.TOP] = new c.Variable();
        this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.TOP], c.Strength.required));
        this._attr[Attribute.ZINDEX] = new c.Variable();
        this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.ZINDEX], c.Strength.required));
      } else {
        this._attr[Attribute.LEFT] = new kiwi.Variable();
        this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.LEFT], kiwi.Operator.Eq, 0));
        this._attr[Attribute.TOP] = new kiwi.Variable();
        this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.TOP], kiwi.Operator.Eq, 0));
        this._attr[Attribute.ZINDEX] = new kiwi.Variable();
        this._solver.addConstraint(new kiwi.Constraint(this._attr[Attribute.ZINDEX], kiwi.Operator.Eq, 0));
      }
    }
  }

  _createClass(SubView, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        left: this.left,
        top: this.top,
        width: this.width,
        height: this.height
      };
    }
  }, {
    key: 'toString',
    value: function toString() {
      JSON.stringify(this.toJSON(), undefined, 2);
    }

    /**
     * Name of the sub-view.
     * @readonly
     * @type {String}
     */

  }, {
    key: 'getValue',


    /**
     * Gets the value of one of the attributes.
     *
     * @param {String|Attribute} attr Attribute name (e.g. 'right', 'centerY', Attribute.TOP).
     * @return {Number} value or `undefined`
     */
    value: function getValue(attr) {
      return this._attr[attr] ? this._attr[attr].value() : undefined;
    }

    /**
     * @private
     */

  }, {
    key: '_getAttr',
    value: function _getAttr(attr) {
      if (this._attr[attr]) {
        return this._attr[attr];
      }
      this._attr[attr] = true ? new c.Variable() : new kiwi.Variable();
      switch (attr) {
        case Attribute.RIGHT:
          this._getAttr(Attribute.LEFT);
          this._getAttr(Attribute.WIDTH);
          if (true) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.LEFT], this._attr[Attribute.WIDTH])));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.LEFT].plus(this._attr[Attribute.WIDTH])));
          }
          break;
        case Attribute.BOTTOM:
          this._getAttr(Attribute.TOP);
          this._getAttr(Attribute.HEIGHT);
          if (true) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.TOP], this._attr[Attribute.HEIGHT])));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.TOP].plus(this._attr[Attribute.HEIGHT])));
          }
          break;
        case Attribute.CENTERX:
          this._getAttr(Attribute.LEFT);
          this._getAttr(Attribute.WIDTH);
          if (true) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.LEFT], c.divide(this._attr[Attribute.WIDTH], 2))));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.LEFT].plus(this._attr[Attribute.WIDTH].divide(2))));
          }
          break;
        case Attribute.CENTERY:
          this._getAttr(Attribute.TOP);
          this._getAttr(Attribute.HEIGHT);
          if (true) {
            this._solver.addConstraint(new c.Equation(this._attr[attr], c.plus(this._attr[Attribute.TOP], c.divide(this._attr[Attribute.HEIGHT], 2))));
          } else {
            this._solver.addConstraint(new kiwi.Constraint(this._attr[attr], kiwi.Operator.Eq, this._attr[Attribute.TOP].plus(this._attr[Attribute.HEIGHT].divide(2))));
          }
          break;
      }
      if (false) {
        this._solver.updateVariables();
      }
      return this._attr[attr];
    }

    /**
     * @private
     */

  }, {
    key: '_getAttrValue',
    value: function _getAttrValue(attr) {
      if (true) {
        return this._getAttr(attr).value;
      } else {
        return this._getAttr(attr).value();
      }
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }

    /**
     * Left value (`Attribute.LEFT`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'left',
    get: function get() {
      return this._getAttrValue(Attribute.LEFT);
    }

    /**
     * Right value (`Attribute.RIGHT`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'right',
    get: function get() {
      return this._getAttrValue(Attribute.RIGHT);
    }

    /**
     * Width value (`Attribute.WIDTH`).
     * @type {Number}
     */

  }, {
    key: 'width',
    get: function get() {
      return this._getAttrValue(Attribute.WIDTH);
    }

    /**
     * Height value (`Attribute.HEIGHT`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this._getAttrValue(Attribute.HEIGHT);
    }

    /**
     * Intrinsic width of the sub-view.
     *
     * Use this property to explicitely set the width of the sub-view, e.g.:
     * ```javascript
     * var view = new AutoLayout.View(AutoLayout.VisualFormat.parse('|[child1][child2]|'), {
     *   width: 500
     * });
     * view.subViews.child1.intrinsicWidth = 100;
     * console.log('child2 width: ' + view.subViews.child2.width); // 400
     * ```
     *
     * @type {Number}
     */

  }, {
    key: 'intrinsicWidth',
    get: function get() {
      return this._intrinsicWidth;
    },
    set: function set(value) {
      if (value !== undefined && value !== this._intrinsicWidth) {
        var attr = this._getAttr(Attribute.WIDTH);
        if (this._intrinsicWidth === undefined) {
          if (true) {
            this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
          } else {
            this._solver.addEditVariable(attr, kiwi.Strength.create(this._name ? 998 : 999, 1000, 1000));
          }
        }
        this._intrinsicWidth = value;
        this._solver.suggestValue(attr, value);
        if (true) {
          this._solver.resolve();
        } else {
          this._solver.updateVariables();
        }
      }
    }

    /**
     * Intrinsic height of the sub-view.
     *
     * See `intrinsicWidth`.
     *
     * @type {Number}
     */

  }, {
    key: 'intrinsicHeight',
    get: function get() {
      return this._intrinsicHeight;
    },
    set: function set(value) {
      if (value !== undefined && value !== this._intrinsicHeight) {
        var attr = this._getAttr(Attribute.HEIGHT);
        if (this._intrinsicHeight === undefined) {
          if (true) {
            this._solver.addEditVar(attr, new c.Strength('required', this._name ? 998 : 999, 1000, 1000));
          } else {
            this._solver.addEditVariable(attr, kiwi.Strength.create(this._name ? 998 : 999, 1000, 1000));
          }
        }
        this._intrinsicHeight = value;
        this._solver.suggestValue(attr, value);
        if (true) {
          this._solver.resolve();
        } else {
          this._solver.updateVariables();
        }
      }
    }

    /**
     * Top value (`Attribute.TOP`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'top',
    get: function get() {
      return this._getAttrValue(Attribute.TOP);
    }

    /**
     * Bottom value (`Attribute.BOTTOM`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'bottom',
    get: function get() {
      return this._getAttrValue(Attribute.BOTTOM);
    }

    /**
     * Horizontal center (`Attribute.CENTERX`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'centerX',
    get: function get() {
      return this._getAttrValue(Attribute.CENTERX);
    }

    /**
     * Vertical center (`Attribute.CENTERY`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'centerY',
    get: function get() {
      return this._getAttrValue(Attribute.CENTERY);
    }

    /**
     * Z-index (`Attribute.ZINDEX`).
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'zIndex',
    get: function get() {
      return this._getAttrValue(Attribute.ZINDEX);
    }

    /**
     * Returns the type of the sub-view.
     * @readonly
     * @type {String}
     */

  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }]);

  return SubView;
}();

var defaultPriorityStrength = true ? new c.Strength('defaultPriority', 0, 1000, 1000) : kiwi.Strength.create(0, 1000, 1000);

function _getConst(name, value) {
  if (true) {
    var vr = new c.Variable({ value: value });
    this._solver.addConstraint(new c.StayConstraint(vr, c.Strength.required, 0));
    return vr;
  } else {
    var _vr = new kiwi.Variable();
    this._solver.addConstraint(new kiwi.Constraint(_vr, kiwi.Operator.Eq, value));
    return _vr;
  }
}

function _getSubView(viewName) {
  if (!viewName) {
    return this._parentSubView;
  } else if (viewName.name) {
    this._subViews[viewName.name] = this._subViews[viewName.name] || new SubView({
      name: viewName.name,
      solver: this._solver
    });
    this._subViews[viewName.name]._type = this._subViews[viewName.name]._type || viewName.type;
    return this._subViews[viewName.name];
  } else {
    this._subViews[viewName] = this._subViews[viewName] || new SubView({
      name: viewName,
      solver: this._solver
    });
    return this._subViews[viewName];
  }
}

function _getSpacing(constraint) {
  var index = 4;
  if (!constraint.view1 && constraint.attr1 === 'left') {
    index = 3;
  } else if (!constraint.view1 && constraint.attr1 === 'top') {
    index = 0;
  } else if (!constraint.view2 && constraint.attr2 === 'right') {
    index = 1;
  } else if (!constraint.view2 && constraint.attr2 === 'bottom') {
    index = 2;
  } else {
    switch (constraint.attr1) {
      case 'left':
      case 'right':
      case 'centerX':
      case 'leading':
      case 'trailing':
        index = 4;
        break;
      case 'zIndex':
        index = 6;
        break;
      default:
        index = 5;
    }
  }
  this._spacingVars = this._spacingVars || new Array(7);
  this._spacingExpr = this._spacingExpr || new Array(7);
  if (!this._spacingVars[index]) {
    if (true) {
      this._spacingVars[index] = new c.Variable();
      this._solver.addEditVar(this._spacingVars[index]);
      this._spacingExpr[index] = c.minus(0, this._spacingVars[index]);
    } else {
      this._spacingVars[index] = new kiwi.Variable();
      this._solver.addEditVariable(this._spacingVars[index], kiwi.Strength.create(999, 1000, 1000));
      this._spacingExpr[index] = this._spacingVars[index].multiply(-1);
    }
    this._solver.suggestValue(this._spacingVars[index], this._spacing[index]);
  }
  return this._spacingExpr[index];
}

function _addConstraint(constraint) {
  //this.constraints.push(constraint);
  var relation = void 0;
  var multiplier = constraint.multiplier !== undefined ? constraint.multiplier : 1;
  var constant = constraint.constant !== undefined ? constraint.constant : 0;
  if (constant === 'default') {
    constant = _getSpacing.call(this, constraint);
  }
  var attr1 = _getSubView.call(this, constraint.view1)._getAttr(constraint.attr1);
  var attr2 = void 0;
  if (true) {
    if (constraint.attr2 === Attribute.CONST) {
      attr2 = _getConst.call(this, undefined, constraint.constant);
    } else {
      attr2 = _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
      if (multiplier !== 1 && constant) {
        attr2 = c.plus(c.times(attr2, multiplier), constant);
      } else if (constant) {
        attr2 = c.plus(attr2, constant);
      } else if (multiplier !== 1) {
        attr2 = c.times(attr2, multiplier);
      }
    }
    var strength = constraint.priority !== undefined && constraint.priority < 1000 ? new c.Strength('priority', 0, constraint.priority, 1000) : defaultPriorityStrength;
    switch (constraint.relation) {
      case Relation.EQU:
        relation = new c.Equation(attr1, attr2, strength);
        break;
      case Relation.GEQ:
        relation = new c.Inequality(attr1, c.GEQ, attr2, strength);
        break;
      case Relation.LEQ:
        relation = new c.Inequality(attr1, c.LEQ, attr2, strength);
        break;
      default:
        throw 'Invalid relation specified: ' + constraint.relation;
    }
  } else {
    if (constraint.attr2 === Attribute.CONST) {
      attr2 = _getConst.call(this, undefined, constraint.constant);
    } else {
      attr2 = _getSubView.call(this, constraint.view2)._getAttr(constraint.attr2);
      if (multiplier !== 1 && constant) {
        attr2 = attr2.multiply(multiplier).plus(constant);
      } else if (constant) {
        attr2 = attr2.plus(constant);
      } else if (multiplier !== 1) {
        attr2 = attr2.multiply(multiplier);
      }
    }
    var _strength = constraint.priority !== undefined && constraint.priority < 1000 ? kiwi.Strength.create(0, constraint.priority, 1000) : defaultPriorityStrength;
    switch (constraint.relation) {
      case Relation.EQU:
        relation = new kiwi.Constraint(attr1, kiwi.Operator.Eq, attr2, _strength);
        break;
      case Relation.GEQ:
        relation = new kiwi.Constraint(attr1, kiwi.Operator.Ge, attr2, _strength);
        break;
      case Relation.LEQ:
        relation = new kiwi.Constraint(attr1, kiwi.Operator.Le, attr2, _strength);
        break;
      default:
        throw 'Invalid relation specified: ' + constraint.relation;
    }
  }
  this._solver.addConstraint(relation);
}

function _compareSpacing(old, newz) {
  if (old === newz) {
    return true;
  }
  if (!old || !newz) {
    return false;
  }
  for (var i = 0; i < 7; i++) {
    if (old[i] !== newz[i]) {
      return false;
    }
  }
  return true;
}

/**
 * AutoLayoutJS API reference.
 *
 * ### Index
 *
 * |Entity|Type|Description|
 * |---|---|---|
 * |[AutoLayout](#autolayout)|`namespace`|Top level AutoLayout object.|
 * |[VisualFormat](#autolayoutvisualformat--object)|`namespace`|Parses VFL into constraints.|
 * |[View](#autolayoutview)|`class`|Main entity for adding & evaluating constraints.|
 * |[SubView](#autolayoutsubview--object)|`class`|SubView's are automatically created when constraints are added to views. They give access to the evaluated results.|
 * |[Attribute](#autolayoutattribute--enum)|`enum`|Attribute types that are supported when adding constraints.|
 * |[Relation](#autolayoutrelation--enum)|`enum`|Relationship types that are supported when adding constraints.|
 * |[Priority](#autolayoutpriority--enum)|`enum`|Default priority values for when adding constraints.|
 *
 * ### AutoLayout
 *
 * @module AutoLayout
 */

var View = function () {

  /**
   * @class View
   * @param {Object} [options] Configuration options.
   * @param {Number} [options.width] Initial width of the view.
   * @param {Number} [options.height] Initial height of the view.
   * @param {Number|Object} [options.spacing] Spacing for the view (default: 8) (see `setSpacing`).
   * @param {Array} [options.constraints] One or more constraint definitions (see `addConstraints`).
   */
  function View(options) {
    _classCallCheck(this, View);

    this._solver = true ? new c.SimplexSolver() : new kiwi.Solver();
    this._subViews = {};
    //this._spacing = undefined;
    this._parentSubView = new SubView({
      solver: this._solver
    });
    this.setSpacing(options && options.spacing !== undefined ? options.spacing : 8);
    //this.constraints = [];
    if (options) {
      if (options.width !== undefined || options.height !== undefined) {
        this.setSize(options.width, options.height);
      }
      if (options.constraints) {
        this.addConstraints(options.constraints);
      }
    }
  }

  /**
   * Sets the width and height of the view.
   *
   * @param {Number} width Width of the view.
   * @param {Number} height Height of the view.
   * @return {View} this
   */


  _createClass(View, [{
    key: 'setSize',
    value: function setSize(width, height /*, depth*/) {
      this._parentSubView.intrinsicWidth = width;
      this._parentSubView.intrinsicHeight = height;
      return this;
    }

    /**
     * Width that was set using `setSize`.
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'setSpacing',


    /**
     * Sets the spacing for the view.
     *
     * The spacing can be set for 7 different variables:
     * `top`, `right`, `bottom`, `left`, `width`, `height` and `zIndex`. The `left`-spacing is
     * used when a spacer is used between the parent-view and a sub-view (e.g. `|-[subView]`).
     * The same is true for the `right`, `top` and `bottom` spacers. The `width` and `height` are
     * used for spacers in between sub-views (e.g. `[view1]-[view2]`).
     *
     * Instead of using the full spacing syntax, it is also possible to use shorthand notations:
     *
     * |Syntax|Type|Description|
     * |---|---|---|
     * |`[top, right, bottom, left, width, height, zIndex]`|Array(7)|Full syntax including z-index **(clockwise order)**.|
     * |`[top, right, bottom, left, width, height]`|Array(6)|Full horizontal & vertical spacing syntax (no z-index) **(clockwise order)**.|
     * |`[horizontal, vertical, zIndex]`|Array(3)|Horizontal = left, right, width, vertical = top, bottom, height.|
     * |`[horizontal, vertical]`|Array(2)|Horizontal = left, right, width, vertical = top, bottom, height, z-index = 1.|
     * |`spacing`|Number|Horizontal & vertical spacing are all the same, z-index = 1.|
     *
     * Examples:
     * ```javascript
     * view.setSpacing(10); // horizontal & vertical spacing 10
     * view.setSpacing([10, 15, 2]); // horizontal spacing 10, vertical spacing 15, z-axis spacing 2
     * view.setSpacing([10, 20, 10, 20, 5, 5]); // top, right, bottom, left, horizontal, vertical
     * view.setSpacing([10, 20, 10, 20, 5, 5, 1]); // top, right, bottom, left, horizontal, vertical, z
     * ```
     *
     * @param {Number|Array} spacing
     * @return {View} this
     */
    value: function setSpacing(spacing) {
      // convert spacing into array: [top, right, bottom, left, horz, vert, z-index]
      switch (Array.isArray(spacing) ? spacing.length : -1) {
        case -1:
          spacing = [spacing, spacing, spacing, spacing, spacing, spacing, 1];break;
        case 1:
          spacing = [spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], spacing[0], 1];break;
        case 2:
          spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1], 1];break;
        case 3:
          spacing = [spacing[1], spacing[0], spacing[1], spacing[0], spacing[0], spacing[1], spacing[2]];break;
        case 6:
          spacing = [spacing[0], spacing[1], spacing[2], spacing[3], spacing[4], spacing[5], 1];break;
        case 7:
          break;
        default:
          throw 'Invalid spacing syntax';
      }
      if (!_compareSpacing(this._spacing, spacing)) {
        this._spacing = spacing;
        // update spacing variables
        if (this._spacingVars) {
          for (var i = 0; i < this._spacingVars.length; i++) {
            if (this._spacingVars[i]) {
              this._solver.suggestValue(this._spacingVars[i], this._spacing[i]);
            }
          }
          if (true) {
            this._solver.resolve();
          } else {
            this._solver.updateVariables();
          }
        }
      }
      return this;
    }

    /**
     * Adds a constraint definition.
     *
     * A constraint definition has the following format:
     *
     * ```javascript
     * constraint: {
     *   view1: {String},
     *   attr1: {AutoLayout.Attribute},
     *   relation: {AutoLayout.Relation},
     *   view2: {String},
     *   attr2: {AutoLayout.Attribute},
     *   multiplier: {Number},
     *   constant: {Number},
     *   priority: {Number}(0..1000)
     * }
     * ```
     * @param {Object} constraint Constraint definition.
     * @return {View} this
     */

  }, {
    key: 'addConstraint',
    value: function addConstraint(constraint) {
      _addConstraint.call(this, constraint);
      if (false) {
        this._solver.updateVariables();
      }
      return this;
    }

    /**
     * Adds one or more constraint definitions.
     *
     * A constraint definition has the following format:
     *
     * ```javascript
     * constraint: {
     *   view1: {String},
     *   attr1: {AutoLayout.Attribute},
     *   relation: {AutoLayout.Relation},
     *   view2: {String},
     *   attr2: {AutoLayout.Attribute},
     *   multiplier: {Number},
     *   constant: {Number},
     *   priority: {Number}(0..1000)
     * }
     * ```
     * @param {Array} constraints One or more constraint definitions.
     * @return {View} this
     */

  }, {
    key: 'addConstraints',
    value: function addConstraints(constraints) {
      for (var j = 0; j < constraints.length; j++) {
        _addConstraint.call(this, constraints[j]);
      }
      if (false) {
        this._solver.updateVariables();
      }
      return this;
    }

    /**
     * Dictionary of `SubView` objects that have been created when adding constraints.
     * @readonly
     * @type {Object.SubView}
     */

  }, {
    key: 'width',
    get: function get() {
      return this._parentSubView.intrinsicWidth;
    }

    /**
     * Height that was set using `setSize`.
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'height',
    get: function get() {
      return this._parentSubView.intrinsicHeight;
    }

    /**
     * Width that is calculated from the constraints and the `.intrinsicWidth` of
     * the sub-views.
     *
     * When the width has been explicitely set using `setSize`, the fittingWidth
     * will **always** be the same as the explicitely set width. To calculate the size
     * based on the content, use:
     * ```javascript
     * var view = new AutoLayout.View({
     *   constraints: VisualFormat.parse('|-[view1]-[view2]-'),
     *   spacing: 20
     * });
     * view.subViews.view1.intrinsicWidth = 100;
     * view.subViews.view2.intrinsicWidth = 100;
     * console.log('fittingWidth: ' + view.fittingWidth); // 260
     * ```
     *
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'fittingWidth',
    get: function get() {
      return this._parentSubView.width;
    }

    /**
     * Height that is calculated from the constraints and the `.intrinsicHeight` of
     * the sub-views.
     *
     * See `.fittingWidth`.
     *
     * @readonly
     * @type {Number}
     */

  }, {
    key: 'fittingHeight',
    get: function get() {
      return this._parentSubView.height;
    }
  }, {
    key: 'subViews',
    get: function get() {
      return this._subViews;
    }

    /**
     * Checks whether the constraints incompletely specify the location
     * of the subViews.
     * @private
     */
    //get hasAmbiguousLayout() {
    // Todo
    //}

  }]);

  return View;
}();

//import DOM from './DOM';

/**
 * AutoLayout.
 *
 * @namespace AutoLayout
 * @property {Attribute} Attribute
 * @property {Relation} Relation
 * @property {Priority} Priority
 * @property {VisualFormat} VisualFormat
 * @property {View} View
 * @property {SubView} SubView
 */


var AutoLayout = {
  Attribute: Attribute,
  Relation: Relation,
  Priority: Priority,
  VisualFormat: VisualFormat,
  View: View,
  SubView: SubView
  //DOM: DOM
};

module.exports = AutoLayout;

},{"cassowary/bin/c":2}],2:[function(require,module,exports){
/**
 * Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
 * Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
 *
 * Use of this source code is governed by the LGPL, which can be found in the
 * COPYING.LGPL file.
 *
 * This is a compiled version of Cassowary/JS. For source versions or to
 * contribute, see the github project:
 *
 *  https://github.com/slightlyoff/cassowary-js-refactor
 *
 */

(function() {
(function(a){"use strict";try{(function(){}).bind(a)}catch(b){Object.defineProperty(Function.prototype,"bind",{value:function(a){var b=this;return function(){return b.apply(a,arguments)}},enumerable:!1,configurable:!0,writable:!0})}var c=a.HTMLElement!==void 0,d=function(a){for(var b=null;a&&a!=Object.prototype;){if(a.tagName){b=a.tagName;break}a=a.prototype}return b||"div"},e=1e-8,f={},g=function(a,b){if(a&&b){if("function"==typeof a[b])return a[b];var c=a.prototype;if(c&&"function"==typeof c[b])return c[b];if(c!==Object.prototype&&c!==Function.prototype)return"function"==typeof a.__super__?g(a.__super__,b):void 0}},h=a.c={debug:!1,trace:!1,verbose:!1,traceAdded:!1,GC:!1,GEQ:1,LEQ:2,inherit:function(b){var e=null,g=null;b["extends"]&&(g=b["extends"],delete b["extends"]),b.initialize&&(e=b.initialize,delete b.initialize);var h=e||function(){};Object.defineProperty(h,"__super__",{value:g?g:Object,enumerable:!1,configurable:!0,writable:!1}),b._t&&(f[b._t]=h);var i=h.prototype=Object.create(g?g.prototype:Object.prototype);if(this.extend(i,b),c&&g&&g.prototype instanceof a.HTMLElement){var j=h,k=d(i),l=function(a){return a.__proto__=i,j.apply(a,arguments),i.created&&a.created(),i.decorate&&a.decorate(),a};this.extend(i,{upgrade:l}),h=function(){return l(a.document.createElement(k))},h.prototype=i,this.extend(h,{ctor:j})}return h},extend:function(a,b){return this.own(b,function(c){var d=Object.getOwnPropertyDescriptor(b,c);try{"function"==typeof d.get||"function"==typeof d.set?Object.defineProperty(a,c,d):"function"==typeof d.value||"_"===c.charAt(0)?(d.writable=!0,d.configurable=!0,d.enumerable=!1,Object.defineProperty(a,c,d)):a[c]=b[c]}catch(e){}}),a},own:function(b,c,d){return Object.getOwnPropertyNames(b).forEach(c,d||a),b},traceprint:function(a){h.verbose&&console.log(a)},fnenterprint:function(a){console.log("* "+a)},fnexitprint:function(a){console.log("- "+a)},assert:function(a,b){if(!a)throw new h.InternalError("Assertion failed: "+b)},plus:function(a,b){return a instanceof h.Expression||(a=new h.Expression(a)),b instanceof h.Expression||(b=new h.Expression(b)),a.plus(b)},minus:function(a,b){return a instanceof h.Expression||(a=new h.Expression(a)),b instanceof h.Expression||(b=new h.Expression(b)),a.minus(b)},times:function(a,b){return("number"==typeof a||a instanceof h.Variable)&&(a=new h.Expression(a)),("number"==typeof b||b instanceof h.Variable)&&(b=new h.Expression(b)),a.times(b)},divide:function(a,b){return("number"==typeof a||a instanceof h.Variable)&&(a=new h.Expression(a)),("number"==typeof b||b instanceof h.Variable)&&(b=new h.Expression(b)),a.divide(b)},approx:function(a,b){if(a===b)return!0;var c,d;return c=a instanceof h.Variable?a.value:a,d=b instanceof h.Variable?b.value:b,0==c?e>Math.abs(d):0==d?e>Math.abs(c):Math.abs(c-d)<Math.abs(c)*e},_inc:function(a){return function(){return a++}}(0),parseJSON:function(a){return JSON.parse(a,function(a,b){if("object"!=typeof b||"string"!=typeof b._t)return b;var c=b._t,d=f[c];if(c&&d){var e=g(d,"fromJSON");if(e)return e(b,d)}return b})}};"function"==typeof require&&"undefined"!=typeof module&&"undefined"==typeof load&&(a.exports=h)})(this),function(a){"use strict";var b=function(a){var b=a.hashCode?a.hashCode:""+a;return b},c=function(a,b){Object.keys(a).forEach(function(c){b[c]=a[c]})},d={};a.HashTable=a.inherit({initialize:function(){this.size=0,this._store={},this._keyStrMap={},this._deleted=0},set:function(a,c){var d=b(a);this._store.hasOwnProperty(d)||this.size++,this._store[d]=c,this._keyStrMap[d]=a},get:function(a){if(!this.size)return null;a=b(a);var c=this._store[a];return c!==void 0?this._store[a]:null},clear:function(){this.size=0,this._store={},this._keyStrMap={}},_compact:function(){var a={};c(this._store,a),this._store=a},_compactThreshold:100,_perhapsCompact:function(){this._size>64||this._deleted>this._compactThreshold&&(this._compact(),this._deleted=0)},"delete":function(a){a=b(a),this._store.hasOwnProperty(a)&&(this._deleted++,delete this._store[a],this.size>0&&this.size--)},each:function(a,b){if(this.size){this._perhapsCompact();var c=this._store,d=this._keyStrMap;Object.keys(this._store).forEach(function(e){a.call(b||null,d[e],c[e])},this)}},escapingEach:function(a,b){if(this.size){this._perhapsCompact();for(var c=this,e=this._store,f=this._keyStrMap,g=d,h=Object.keys(e),i=0;h.length>i;i++)if(function(d){c._store.hasOwnProperty(d)&&(g=a.call(b||null,f[d],e[d]))}(h[i]),g){if(void 0!==g.retval)return g;if(g.brk)break}}},clone:function(){var b=new a.HashTable;return this.size&&(b.size=this.size,c(this._store,b._store),c(this._keyStrMap,b._keyStrMap)),b},equals:function(b){if(b===this)return!0;if(!(b instanceof a.HashTable)||b._size!==this._size)return!1;for(var c=Object.keys(this._store),d=0;c.length>d;d++){var e=c[d];if(this._keyStrMap[e]!==b._keyStrMap[e]||this._store[e]!==b._store[e])return!1}return!0},toString:function(){var b="";return this.each(function(a,c){b+=a+" => "+c+"\n"}),b}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.HashSet=a.inherit({_t:"c.HashSet",initialize:function(){this.storage=[],this.size=0},add:function(a){var b=this.storage;b.indexOf(a),-1==b.indexOf(a)&&b.push(a),this.size=this.storage.length},values:function(){return this.storage},has:function(a){var b=this.storage;return-1!=b.indexOf(a)},"delete":function(a){var b=this.storage.indexOf(a);return-1==b?null:(this.storage.splice(b,1)[0],this.size=this.storage.length,void 0)},clear:function(){this.storage.length=0},each:function(a,b){this.size&&this.storage.forEach(a,b)},escapingEach:function(a,b){this.size&&this.storage.forEach(a,b)},toString:function(){var a=this.size+" {",b=!0;return this.each(function(c){b?b=!1:a+=", ",a+=c}),a+="}\n"},toJSON:function(){var a=[];return this.each(function(b){a.push(b.toJSON())}),{_t:"c.HashSet",data:a}},fromJSON:function(b){var c=new a.HashSet;return b.data&&(c.size=b.data.length,c.storage=b.data),c}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Error=a.inherit({initialize:function(a){a&&(this._description=a)},_name:"c.Error",_description:"An error has occured in Cassowary",set description(a){this._description=a},get description(){return"("+this._name+") "+this._description},get message(){return this.description},toString:function(){return this.description}});var b=function(b,c){return a.inherit({"extends":a.Error,initialize:function(){a.Error.apply(this,arguments)},_name:b||"",_description:c||""})};a.ConstraintNotFound=b("c.ConstraintNotFound","Tried to remove a constraint never added to the tableu"),a.InternalError=b("c.InternalError"),a.NonExpression=b("c.NonExpression","The resulting expression would be non"),a.NotEnoughStays=b("c.NotEnoughStays","There are not enough stays to give specific values to every variable"),a.RequiredFailure=b("c.RequiredFailure","A required constraint cannot be satisfied"),a.TooDifficult=b("c.TooDifficult","The constraints are too difficult to solve")}(this.c||module.parent.exports||{}),function(a){"use strict";var b=1e3;a.SymbolicWeight=a.inherit({_t:"c.SymbolicWeight",initialize:function(){this.value=0;for(var a=1,c=arguments.length-1;c>=0;--c)this.value+=arguments[c]*a,a*=b},toJSON:function(){return{_t:this._t,value:this.value}}})}(this.c||module.parent.exports||{}),function(a){a.Strength=a.inherit({initialize:function(b,c,d,e){this.name=b,this.symbolicWeight=c instanceof a.SymbolicWeight?c:new a.SymbolicWeight(c,d,e)},get required(){return this===a.Strength.required},toString:function(){return this.name+(this.isRequired?"":":"+this.symbolicWeight)}}),a.Strength.required=new a.Strength("<Required>",1e3,1e3,1e3),a.Strength.strong=new a.Strength("strong",1,0,0),a.Strength.medium=new a.Strength("medium",0,1,0),a.Strength.weak=new a.Strength("weak",0,0,1)}(this.c||("undefined"!=typeof module?module.parent.exports.c:{})),function(a){"use strict";a.AbstractVariable=a.inherit({isDummy:!1,isExternal:!1,isPivotable:!1,isRestricted:!1,_init:function(b,c){this.hashCode=a._inc(),this.name=(c||"")+this.hashCode,b&&(b.name!==void 0&&(this.name=b.name),b.value!==void 0&&(this.value=b.value),b.prefix!==void 0&&(this._prefix=b.prefix))},_prefix:"",name:"",value:0,toJSON:function(){var a={};return this._t&&(a._t=this._t),this.name&&(a.name=this.name),this.value!==void 0&&(a.value=this.value),this._prefix&&(a._prefix=this._prefix),this._t&&(a._t=this._t),a},fromJSON:function(b,c){var d=new c;return a.extend(d,b),d},toString:function(){return this._prefix+"["+this.name+":"+this.value+"]"}}),a.Variable=a.inherit({_t:"c.Variable","extends":a.AbstractVariable,initialize:function(b){this._init(b,"v");var c=a.Variable._map;c&&(c[this.name]=this)},isExternal:!0}),a.DummyVariable=a.inherit({_t:"c.DummyVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"d")},isDummy:!0,isRestricted:!0,value:"dummy"}),a.ObjectiveVariable=a.inherit({_t:"c.ObjectiveVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"o")},value:"obj"}),a.SlackVariable=a.inherit({_t:"c.SlackVariable","extends":a.AbstractVariable,initialize:function(a){this._init(a,"s")},isPivotable:!0,isRestricted:!0,value:"slack"})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Point=a.inherit({initialize:function(b,c,d){if(b instanceof a.Variable)this._x=b;else{var e={value:b};d&&(e.name="x"+d),this._x=new a.Variable(e)}if(c instanceof a.Variable)this._y=c;else{var f={value:c};d&&(f.name="y"+d),this._y=new a.Variable(f)}},get x(){return this._x},set x(b){b instanceof a.Variable?this._x=b:this._x.value=b},get y(){return this._y},set y(b){b instanceof a.Variable?this._y=b:this._y.value=b},toString:function(){return"("+this.x+", "+this.y+")"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Expression=a.inherit({initialize:function(b,c,d){a.GC&&console.log("new c.Expression"),this.constant="number"!=typeof d||isNaN(d)?0:d,this.terms=new a.HashTable,b instanceof a.AbstractVariable?this.setVariable(b,"number"==typeof c?c:1):"number"==typeof b&&(isNaN(b)?console.trace():this.constant=b)},initializeFromHash:function(b,c){return a.verbose&&(console.log("*******************************"),console.log("clone c.initializeFromHash"),console.log("*******************************")),a.GC&&console.log("clone c.Expression"),this.constant=b,this.terms=c.clone(),this},multiplyMe:function(a){this.constant*=a;var b=this.terms;return b.each(function(c,d){b.set(c,d*a)}),this},clone:function(){a.verbose&&(console.log("*******************************"),console.log("clone c.Expression"),console.log("*******************************"));var b=new a.Expression;return b.initializeFromHash(this.constant,this.terms),b},times:function(b){if("number"==typeof b)return this.clone().multiplyMe(b);if(this.isConstant)return b.times(this.constant);if(b.isConstant)return this.times(b.constant);throw new a.NonExpression},plus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,1):b instanceof a.Variable?this.clone().addVariable(b,1):void 0},minus:function(b){return b instanceof a.Expression?this.clone().addExpression(b,-1):b instanceof a.Variable?this.clone().addVariable(b,-1):void 0},divide:function(b){if("number"==typeof b){if(a.approx(b,0))throw new a.NonExpression;return this.times(1/b)}if(b instanceof a.Expression){if(!b.isConstant)throw new a.NonExpression;return this.times(1/b.constant)}},addExpression:function(b,c,d,e){return b instanceof a.AbstractVariable&&(b=new a.Expression(b),a.trace&&console.log("addExpression: Had to cast a var to an expression")),c=c||1,this.constant+=c*b.constant,b.terms.each(function(a,b){this.addVariable(a,b*c,d,e)},this),this},addVariable:function(b,c,d,e){null==c&&(c=1),a.trace&&console.log("c.Expression::addVariable():",b,c);var f=this.terms.get(b);if(f){var g=f+c;0==g||a.approx(g,0)?(e&&e.noteRemovedVariable(b,d),this.terms.delete(b)):this.setVariable(b,g)}else a.approx(c,0)||(this.setVariable(b,c),e&&e.noteAddedVariable(b,d));return this},setVariable:function(a,b){return this.terms.set(a,b),this},anyPivotableVariable:function(){if(this.isConstant)throw new a.InternalError("anyPivotableVariable called on a constant");var b=this.terms.escapingEach(function(a){return a.isPivotable?{retval:a}:void 0});return b&&void 0!==b.retval?b.retval:null},substituteOut:function(b,c,d,e){a.trace&&(a.fnenterprint("CLE:substituteOut: "+b+", "+c+", "+d+", ..."),a.traceprint("this = "+this));var f=this.setVariable.bind(this),g=this.terms,h=g.get(b);g.delete(b),this.constant+=h*c.constant,c.terms.each(function(b,c){var i=g.get(b);if(i){var j=i+h*c;a.approx(j,0)?(e.noteRemovedVariable(b,d),g.delete(b)):f(b,j)}else f(b,h*c),e&&e.noteAddedVariable(b,d)}),a.trace&&a.traceprint("Now this is "+this)},changeSubject:function(a,b){this.setVariable(a,this.newSubject(b))},newSubject:function(b){a.trace&&a.fnenterprint("newSubject:"+b);var c=1/this.terms.get(b);return this.terms.delete(b),this.multiplyMe(-c),c},coefficientFor:function(a){return this.terms.get(a)||0},get isConstant(){return 0==this.terms.size},toString:function(){var b="",c=!1;if(!a.approx(this.constant,0)||this.isConstant){if(b+=this.constant,this.isConstant)return b;c=!0}return this.terms.each(function(a,d){c&&(b+=" + "),b+=d+"*"+a,c=!0}),b},equals:function(b){return b===this?!0:b instanceof a.Expression&&b.constant===this.constant&&b.terms.equals(this.terms)},Plus:function(a,b){return a.plus(b)},Minus:function(a,b){return a.minus(b)},Times:function(a,b){return a.times(b)},Divide:function(a,b){return a.divide(b)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.AbstractConstraint=a.inherit({initialize:function(b,c){this.hashCode=a._inc(),this.strength=b||a.Strength.required,this.weight=c||1},isEditConstraint:!1,isInequality:!1,isStayConstraint:!1,get required(){return this.strength===a.Strength.required},toString:function(){return this.strength+" {"+this.weight+"} ("+this.expression+")"}});var b=a.AbstractConstraint.prototype.toString,c=function(b,c,d){a.AbstractConstraint.call(this,c||a.Strength.strong,d),this.variable=b,this.expression=new a.Expression(b,-1,b.value)};a.EditConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isEditConstraint:!0,toString:function(){return"edit:"+b.call(this)}}),a.StayConstraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(){c.apply(this,arguments)},isStayConstraint:!0,toString:function(){return"stay:"+b.call(this)}});var d=a.Constraint=a.inherit({"extends":a.AbstractConstraint,initialize:function(b,c,d){a.AbstractConstraint.call(this,c,d),this.expression=b}});a.Inequality=a.inherit({"extends":a.Constraint,_cloneOrNewCle:function(b){return b.clone?b.clone():new a.Expression(b)},initialize:function(b,c,e,f,g){var h=b instanceof a.Expression,i=e instanceof a.Expression,j=b instanceof a.AbstractVariable,k=e instanceof a.AbstractVariable,l="number"==typeof b,m="number"==typeof e;if((h||l)&&k){var n=b,o=c,p=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else if(j&&(i||m)){var n=e,o=c,p=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(n),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addVariable(p);else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(p,-1)}}else{if(h&&m){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.LEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.GEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(l&&i){var s=e,o=c,t=b,q=f,r=g;if(d.call(this,this._cloneOrNewCle(s),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(t));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(t),-1)}return this}if(h&&i){var s=b,o=c,t=e,q=f,r=g;if(d.call(this,this._cloneOrNewCle(t),q,r),o==a.GEQ)this.expression.multiplyMe(-1),this.expression.addExpression(this._cloneOrNewCle(s));else{if(o!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(s),-1)}}else{if(h)return d.call(this,b,c,e);if(c==a.GEQ)d.call(this,new a.Expression(e),f,g),this.expression.multiplyMe(-1),this.expression.addVariable(b);else{if(c!=a.LEQ)throw new a.InternalError("Invalid operator in c.Inequality constructor");d.call(this,new a.Expression(e),f,g),this.expression.addVariable(b,-1)}}}},isInequality:!0,toString:function(){return d.prototype.toString.call(this)+" >= 0) id: "+this.hashCode}}),a.Equation=a.inherit({"extends":a.Constraint,initialize:function(b,c,e,f){if(b instanceof a.Expression&&!c||c instanceof a.Strength)d.call(this,b,c,e);else if(b instanceof a.AbstractVariable&&c instanceof a.Expression){var g=b,h=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.AbstractVariable&&"number"==typeof c){var g=b,k=c,i=e,j=f;d.call(this,new a.Expression(k),i,j),this.expression.addVariable(g,-1)}else if(b instanceof a.Expression&&c instanceof a.AbstractVariable){var h=b,g=c,i=e,j=f;d.call(this,h.clone(),i,j),this.expression.addVariable(g,-1)}else{if(!(b instanceof a.Expression||b instanceof a.AbstractVariable||"number"==typeof b)||!(c instanceof a.Expression||c instanceof a.AbstractVariable||"number"==typeof c))throw"Bad initializer to c.Equation";b=b instanceof a.Expression?b.clone():new a.Expression(b),c=c instanceof a.Expression?c.clone():new a.Expression(c),d.call(this,b,e,f),this.expression.addExpression(c,-1)}a.assert(this.strength instanceof a.Strength,"_strength not set")},toString:function(){return d.prototype.toString.call(this)+" = 0)"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.EditInfo=a.inherit({initialize:function(a,b,c,d,e){this.constraint=a,this.editPlus=b,this.editMinus=c,this.prevEditConstant=d,this.index=e},toString:function(){return"<cn="+this.constraint+", ep="+this.editPlus+", em="+this.editMinus+", pec="+this.prevEditConstant+", index="+this.index+">"}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Tableau=a.inherit({initialize:function(){this.columns=new a.HashTable,this.rows=new a.HashTable,this._infeasibleRows=new a.HashSet,this._externalRows=new a.HashSet,this._externalParametricVars=new a.HashSet},noteRemovedVariable:function(b,c){a.trace&&console.log("c.Tableau::noteRemovedVariable: ",b,c);var d=this.columns.get(b);c&&d&&d.delete(c)},noteAddedVariable:function(a,b){b&&this.insertColVar(a,b)},getInternalInfo:function(){var a="Tableau Information:\n";return a+="Rows: "+this.rows.size,a+=" (= "+(this.rows.size-1)+" constraints)",a+="\nColumns: "+this.columns.size,a+="\nInfeasible Rows: "+this._infeasibleRows.size,a+="\nExternal basic variables: "+this._externalRows.size,a+="\nExternal parametric variables: ",a+=this._externalParametricVars.size,a+="\n"},toString:function(){var a="Tableau:\n";return this.rows.each(function(b,c){a+=b,a+=" <==> ",a+=c,a+="\n"}),a+="\nColumns:\n",a+=this.columns,a+="\nInfeasible rows: ",a+=this._infeasibleRows,a+="External basic variables: ",a+=this._externalRows,a+="External parametric variables: ",a+=this._externalParametricVars},insertColVar:function(b,c){var d=this.columns.get(b);d||(d=new a.HashSet,this.columns.set(b,d)),d.add(c)},addRow:function(b,c){a.trace&&a.fnenterprint("addRow: "+b+", "+c),this.rows.set(b,c),c.terms.each(function(a){this.insertColVar(a,b),a.isExternal&&this._externalParametricVars.add(a)},this),b.isExternal&&this._externalRows.add(b),a.trace&&a.traceprint(""+this)},removeColumn:function(b){a.trace&&a.fnenterprint("removeColumn:"+b);var c=this.columns.get(b);c?(this.columns.delete(b),c.each(function(a){var c=this.rows.get(a);c.terms.delete(b)},this)):a.trace&&console.log("Could not find var",b,"in columns"),b.isExternal&&(this._externalRows.delete(b),this._externalParametricVars.delete(b))},removeRow:function(b){a.trace&&a.fnenterprint("removeRow:"+b);var c=this.rows.get(b);return a.assert(null!=c),c.terms.each(function(c){var e=this.columns.get(c);null!=e&&(a.trace&&console.log("removing from varset:",b),e.delete(b))},this),this._infeasibleRows.delete(b),b.isExternal&&this._externalRows.delete(b),this.rows.delete(b),a.trace&&a.fnexitprint("returning "+c),c},substituteOut:function(b,c){a.trace&&a.fnenterprint("substituteOut:"+b+", "+c),a.trace&&a.traceprint(""+this);var d=this.columns.get(b);d.each(function(a){var d=this.rows.get(a);d.substituteOut(b,c,a,this),a.isRestricted&&0>d.constant&&this._infeasibleRows.add(a)},this),b.isExternal&&(this._externalRows.add(b),this._externalParametricVars.delete(b)),this.columns.delete(b)},columnsHasKey:function(a){return!!this.columns.get(a)}})}(this.c||module.parent.exports||{}),function(a){var b=a.Tableau,c=b.prototype,d=1e-8,e=a.Strength.weak;a.SimplexSolver=a.inherit({"extends":a.Tableau,initialize:function(){a.Tableau.call(this),this._stayMinusErrorVars=[],this._stayPlusErrorVars=[],this._errorVars=new a.HashTable,this._markerVars=new a.HashTable,this._objective=new a.ObjectiveVariable({name:"Z"}),this._editVarMap=new a.HashTable,this._editVarList=[],this._slackCounter=0,this._artificialCounter=0,this._dummyCounter=0,this.autoSolve=!0,this._fNeedsSolving=!1,this._optimizeCount=0,this.rows.set(this._objective,new a.Expression),this._stkCedcns=[0],a.trace&&a.traceprint("objective expr == "+this.rows.get(this._objective))},addLowerBound:function(b,c){var d=new a.Inequality(b,a.GEQ,new a.Expression(c));return this.addConstraint(d)},addUpperBound:function(b,c){var d=new a.Inequality(b,a.LEQ,new a.Expression(c));return this.addConstraint(d)},addBounds:function(a,b,c){return this.addLowerBound(a,b),this.addUpperBound(a,c),this},add:function(){for(var a=0;arguments.length>a;a++)this.addConstraint(arguments[a]);return this},addConstraint:function(b){a.trace&&a.fnenterprint("addConstraint: "+b);var c=Array(2),d=Array(1),e=this.newExpression(b,c,d);if(d=d[0],this.tryAddingDirectly(e)||this.addWithArtificialVariable(e),this._fNeedsSolving=!0,b.isEditConstraint){var f=this._editVarMap.size,g=c[0],h=c[1];!g instanceof a.SlackVariable&&console.warn("cvEplus not a slack variable =",g),!h instanceof a.SlackVariable&&console.warn("cvEminus not a slack variable =",h),a.debug&&console.log("new c.EditInfo("+b+", "+g+", "+h+", "+d+", "+f+")");var i=new a.EditInfo(b,g,h,d,f);this._editVarMap.set(b.variable,i),this._editVarList[f]={v:b.variable,info:i}}return this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},addConstraintNoException:function(b){a.trace&&a.fnenterprint("addConstraintNoException: "+b);try{return this.addConstraint(b),!0}catch(c){return!1}},addEditVar:function(b,c){return a.trace&&a.fnenterprint("addEditVar: "+b+" @ "+c),this.addConstraint(new a.EditConstraint(b,c||a.Strength.strong))},beginEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this._infeasibleRows.clear(),this._resetStayConstants(),this._stkCedcns.push(this._editVarMap.size),this},endEdit:function(){return a.assert(this._editVarMap.size>0,"_editVarMap.size > 0"),this.resolve(),this._stkCedcns.pop(),this.removeEditVarsTo(this._stkCedcns[this._stkCedcns.length-1]),this},removeAllEditVars:function(){return this.removeEditVarsTo(0)},removeEditVarsTo:function(b){try{for(var c=this._editVarList.length,d=b;c>d;d++)this._editVarList[d]&&this.removeConstraint(this._editVarMap.get(this._editVarList[d].v).constraint);return this._editVarList.length=b,a.assert(this._editVarMap.size==b,"_editVarMap.size == n"),this}catch(e){throw new a.InternalError("Constraint not found in removeEditVarsTo")}},addPointStays:function(b){return a.trace&&console.log("addPointStays",b),b.forEach(function(a,b){this.addStay(a.x,e,Math.pow(2,b)),this.addStay(a.y,e,Math.pow(2,b))},this),this},addStay:function(b,c,d){var f=new a.StayConstraint(b,c||e,d||1);return this.addConstraint(f)},removeConstraint:function(a){return this.removeConstraintInternal(a),this},removeConstraintInternal:function(b){a.trace&&a.fnenterprint("removeConstraintInternal: "+b),a.trace&&a.traceprint(""+this),this._fNeedsSolving=!0,this._resetStayConstants();var c=this.rows.get(this._objective),d=this._errorVars.get(b);a.trace&&a.traceprint("eVars == "+d),null!=d&&d.each(function(e){var f=this.rows.get(e);null==f?c.addVariable(e,-b.weight*b.strength.symbolicWeight.value,this._objective,this):c.addExpression(f,-b.weight*b.strength.symbolicWeight.value,this._objective,this),a.trace&&a.traceprint("now eVars == "+d)},this);var e=this._markerVars.get(b);if(this._markerVars.delete(b),null==e)throw new a.InternalError("Constraint not found in removeConstraintInternal");if(a.trace&&a.traceprint("Looking to remove var "+e),null==this.rows.get(e)){var f=this.columns.get(e);a.trace&&a.traceprint("Must pivot -- columns are "+f);var g=null,h=0;f.each(function(b){if(b.isRestricted){var c=this.rows.get(b),d=c.coefficientFor(e);if(a.trace&&a.traceprint("Marker "+e+"'s coefficient in "+c+" is "+d),0>d){var f=-c.constant/d;(null==g||h>f||a.approx(f,h)&&b.hashCode<g.hashCode)&&(h=f,g=b)}}},this),null==g&&(a.trace&&a.traceprint("exitVar is still null"),f.each(function(a){if(a.isRestricted){var b=this.rows.get(a),c=b.coefficientFor(e),d=b.constant/c;(null==g||h>d)&&(h=d,g=a)}},this)),null==g&&(0==f.size?this.removeColumn(e):f.escapingEach(function(a){return a!=this._objective?(g=a,{brk:!0}):void 0},this)),null!=g&&this.pivot(e,g)}if(null!=this.rows.get(e)&&this.removeRow(e),null!=d&&d.each(function(a){a!=e&&this.removeColumn(a)},this),b.isStayConstraint){if(null!=d)for(var j=0;this._stayPlusErrorVars.length>j;j++)d.delete(this._stayPlusErrorVars[j]),d.delete(this._stayMinusErrorVars[j])}else if(b.isEditConstraint){a.assert(null!=d,"eVars != null");var k=this._editVarMap.get(b.variable);this.removeColumn(k.editMinus),this._editVarMap.delete(b.variable)}return null!=d&&this._errorVars.delete(d),this.autoSolve&&(this.optimize(this._objective),this._setExternalVariables()),this},reset:function(){throw a.trace&&a.fnenterprint("reset"),new a.InternalError("reset not implemented")},resolveArray:function(b){a.trace&&a.fnenterprint("resolveArray"+b);var c=b.length;this._editVarMap.each(function(a,d){var e=d.index;c>e&&this.suggestValue(a,b[e])},this),this.resolve()},resolvePair:function(a,b){this.suggestValue(this._editVarList[0].v,a),this.suggestValue(this._editVarList[1].v,b),this.resolve()},resolve:function(){a.trace&&a.fnenterprint("resolve()"),this.dualOptimize(),this._setExternalVariables(),this._infeasibleRows.clear(),this._resetStayConstants()},suggestValue:function(b,c){a.trace&&console.log("suggestValue("+b+", "+c+")");var d=this._editVarMap.get(b);if(!d)throw new a.Error("suggestValue for variable "+b+", but var is not an edit variable");var e=c-d.prevEditConstant;return d.prevEditConstant=c,this.deltaEditConstant(e,d.editPlus,d.editMinus),this},solve:function(){return this._fNeedsSolving&&(this.optimize(this._objective),this._setExternalVariables()),this},setEditedValue:function(b,c){if(!this.columnsHasKey(b)&&null==this.rows.get(b))return b.value=c,this;if(!a.approx(c,b.value)){this.addEditVar(b),this.beginEdit();try{this.suggestValue(b,c)}catch(d){throw new a.InternalError("Error in setEditedValue")}this.endEdit()}return this},addVar:function(b){if(!this.columnsHasKey(b)&&null==this.rows.get(b)){try{this.addStay(b)}catch(c){throw new a.InternalError("Error in addVar -- required failure is impossible")}a.trace&&a.traceprint("added initial stay on "+b)}return this},getInternalInfo:function(){var a=c.getInternalInfo.call(this);return a+="\nSolver info:\n",a+="Stay Error Variables: ",a+=this._stayPlusErrorVars.length+this._stayMinusErrorVars.length,a+=" ("+this._stayPlusErrorVars.length+" +, ",a+=this._stayMinusErrorVars.length+" -)\n",a+="Edit Variables: "+this._editVarMap.size,a+="\n"},getDebugInfo:function(){return""+this+this.getInternalInfo()+"\n"},toString:function(){var a=c.getInternalInfo.call(this);return a+="\n_stayPlusErrorVars: ",a+="["+this._stayPlusErrorVars+"]",a+="\n_stayMinusErrorVars: ",a+="["+this._stayMinusErrorVars+"]",a+="\n",a+="_editVarMap:\n"+this._editVarMap,a+="\n"},getConstraintMap:function(){return this._markerVars},addWithArtificialVariable:function(b){a.trace&&a.fnenterprint("addWithArtificialVariable: "+b);var c=new a.SlackVariable({value:++this._artificialCounter,prefix:"a"}),d=new a.ObjectiveVariable({name:"az"}),e=b.clone();a.trace&&a.traceprint("before addRows:\n"+this),this.addRow(d,e),this.addRow(c,b),a.trace&&a.traceprint("after addRows:\n"+this),this.optimize(d);var f=this.rows.get(d);if(a.trace&&a.traceprint("azTableauRow.constant == "+f.constant),!a.approx(f.constant,0))throw this.removeRow(d),this.removeColumn(c),new a.RequiredFailure;var g=this.rows.get(c);if(null!=g){if(g.isConstant)return this.removeRow(c),this.removeRow(d),void 0;var h=g.anyPivotableVariable();this.pivot(h,c)}a.assert(null==this.rows.get(c),"rowExpression(av) == null"),this.removeColumn(c),this.removeRow(d)},tryAddingDirectly:function(b){a.trace&&a.fnenterprint("tryAddingDirectly: "+b);var c=this.chooseSubject(b);return null==c?(a.trace&&a.fnexitprint("returning false"),!1):(b.newSubject(c),this.columnsHasKey(c)&&this.substituteOut(c,b),this.addRow(c,b),a.trace&&a.fnexitprint("returning true"),!0)},chooseSubject:function(b){a.trace&&a.fnenterprint("chooseSubject: "+b);var c=null,d=!1,e=!1,f=b.terms,g=f.escapingEach(function(a,b){if(d){if(!a.isRestricted&&!this.columnsHasKey(a))return{retval:a}}else if(a.isRestricted){if(!e&&!a.isDummy&&0>b){var f=this.columns.get(a);(null==f||1==f.size&&this.columnsHasKey(this._objective))&&(c=a,e=!0)}}else c=a,d=!0},this);if(g&&void 0!==g.retval)return g.retval;if(null!=c)return c;var h=0,g=f.escapingEach(function(a,b){return a.isDummy?(this.columnsHasKey(a)||(c=a,h=b),void 0):{retval:null}},this);if(g&&void 0!==g.retval)return g.retval;if(!a.approx(b.constant,0))throw new a.RequiredFailure;return h>0&&b.multiplyMe(-1),c},deltaEditConstant:function(b,c,d){a.trace&&a.fnenterprint("deltaEditConstant :"+b+", "+c+", "+d);var e=this.rows.get(c);if(null!=e)return e.constant+=b,0>e.constant&&this._infeasibleRows.add(c),void 0;var f=this.rows.get(d);if(null!=f)return f.constant+=-b,0>f.constant&&this._infeasibleRows.add(d),void 0;var g=this.columns.get(d);g||console.log("columnVars is null -- tableau is:\n"+this),g.each(function(a){var c=this.rows.get(a),e=c.coefficientFor(d);c.constant+=e*b,a.isRestricted&&0>c.constant&&this._infeasibleRows.add(a)},this)},dualOptimize:function(){a.trace&&a.fnenterprint("dualOptimize:");for(var b=this.rows.get(this._objective);this._infeasibleRows.size;){var c=this._infeasibleRows.values()[0];this._infeasibleRows.delete(c);var d=null,e=this.rows.get(c);if(e&&0>e.constant){var g,f=Number.MAX_VALUE,h=e.terms;if(h.each(function(c,e){if(e>0&&c.isPivotable){var h=b.coefficientFor(c);g=h/e,(f>g||a.approx(g,f)&&c.hashCode<d.hashCode)&&(d=c,f=g)}}),f==Number.MAX_VALUE)throw new a.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(d,c)}}},newExpression:function(b,c,d){a.trace&&(a.fnenterprint("newExpression: "+b),a.traceprint("cn.isInequality == "+b.isInequality),a.traceprint("cn.required == "+b.required));var e=b.expression,f=new a.Expression(e.constant),g=new a.SlackVariable,h=new a.DummyVariable,i=new a.SlackVariable,j=new a.SlackVariable,k=e.terms;if(k.each(function(a,b){var c=this.rows.get(a);c?f.addExpression(c,b):f.addVariable(a,b)},this),b.isInequality){if(a.trace&&a.traceprint("Inequality, adding slack"),++this._slackCounter,g=new a.SlackVariable({value:this._slackCounter,prefix:"s"}),f.setVariable(g,-1),this._markerVars.set(b,g),!b.required){++this._slackCounter,i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(i,1);
var l=this.rows.get(this._objective);l.setVariable(i,b.strength.symbolicWeight.value*b.weight),this.insertErrorVar(b,i),this.noteAddedVariable(i,this._objective)}}else if(b.required)a.trace&&a.traceprint("Equality, required"),++this._dummyCounter,h=new a.DummyVariable({value:this._dummyCounter,prefix:"d"}),f.setVariable(h,1),this._markerVars.set(b,h),a.trace&&a.traceprint("Adding dummyVar == d"+this._dummyCounter);else{a.trace&&a.traceprint("Equality, not required"),++this._slackCounter,j=new a.SlackVariable({value:this._slackCounter,prefix:"ep"}),i=new a.SlackVariable({value:this._slackCounter,prefix:"em"}),f.setVariable(j,-1),f.setVariable(i,1),this._markerVars.set(b,j);var l=this.rows.get(this._objective);a.trace&&console.log(l);var m=b.strength.symbolicWeight.value*b.weight;0==m&&(a.trace&&a.traceprint("cn == "+b),a.trace&&a.traceprint("adding "+j+" and "+i+" with swCoeff == "+m)),l.setVariable(j,m),this.noteAddedVariable(j,this._objective),l.setVariable(i,m),this.noteAddedVariable(i,this._objective),this.insertErrorVar(b,i),this.insertErrorVar(b,j),b.isStayConstraint?(this._stayPlusErrorVars.push(j),this._stayMinusErrorVars.push(i)):b.isEditConstraint&&(c[0]=j,c[1]=i,d[0]=e.constant)}return 0>f.constant&&f.multiplyMe(-1),a.trace&&a.fnexitprint("returning "+f),f},optimize:function(b){a.trace&&a.fnenterprint("optimize: "+b),a.trace&&a.traceprint(""+this),this._optimizeCount++;var c=this.rows.get(b);a.assert(null!=c,"zRow != null");for(var g,h,e=null,f=null;;){if(g=0,h=c.terms,h.escapingEach(function(a,b){return a.isPivotable&&g>b?(g=b,e=a,{brk:1}):void 0},this),g>=-d)return;a.trace&&console.log("entryVar:",e,"objectiveCoeff:",g);var i=Number.MAX_VALUE,j=this.columns.get(e),k=0;if(j.each(function(b){if(a.trace&&a.traceprint("Checking "+b),b.isPivotable){var c=this.rows.get(b),d=c.coefficientFor(e);a.trace&&a.traceprint("pivotable, coeff = "+d),0>d&&(k=-c.constant/d,(i>k||a.approx(k,i)&&b.hashCode<f.hashCode)&&(i=k,f=b))}},this),i==Number.MAX_VALUE)throw new a.InternalError("Objective function is unbounded in optimize");this.pivot(e,f),a.trace&&a.traceprint(""+this)}},pivot:function(b,c){a.trace&&console.log("pivot: ",b,c);var d=!1;d&&console.time(" SimplexSolver::pivot"),null==b&&console.warn("pivot: entryVar == null"),null==c&&console.warn("pivot: exitVar == null"),d&&console.time("  removeRow");var e=this.removeRow(c);d&&console.timeEnd("  removeRow"),d&&console.time("  changeSubject"),e.changeSubject(c,b),d&&console.timeEnd("  changeSubject"),d&&console.time("  substituteOut"),this.substituteOut(b,e),d&&console.timeEnd("  substituteOut"),d&&console.time("  addRow"),this.addRow(b,e),d&&console.timeEnd("  addRow"),d&&console.timeEnd(" SimplexSolver::pivot")},_resetStayConstants:function(){a.trace&&console.log("_resetStayConstants");for(var b=0;this._stayPlusErrorVars.length>b;b++){var c=this.rows.get(this._stayPlusErrorVars[b]);null==c&&(c=this.rows.get(this._stayMinusErrorVars[b])),null!=c&&(c.constant=0)}},_setExternalVariables:function(){a.trace&&a.fnenterprint("_setExternalVariables:"),a.trace&&a.traceprint(""+this),this._externalParametricVars.each(function(b){null!=this.rows.get(b)?a.trace&&console.log("Error: variable"+b+" in _externalParametricVars is basic"):b.value=0},this),this._externalRows.each(function(a){var b=this.rows.get(a);a.value!=b.constant&&(a.value=b.constant)},this),this._fNeedsSolving=!1,this.onsolved()},onsolved:function(){},insertErrorVar:function(b,c){a.trace&&a.fnenterprint("insertErrorVar:"+b+", "+c);var d=this._errorVars.get(c);d||(d=new a.HashSet,this._errorVars.set(b,d)),d.add(c)}})}(this.c||module.parent.exports||{}),function(a){"use strict";a.Timer=a.inherit({initialize:function(){this.isRunning=!1,this._elapsedMs=0},start:function(){return this.isRunning=!0,this._startReading=new Date,this},stop:function(){return this.isRunning=!1,this._elapsedMs+=new Date-this._startReading,this},reset:function(){return this.isRunning=!1,this._elapsedMs=0,this},elapsedTime:function(){return this.isRunning?(this._elapsedMs+(new Date-this._startReading))/1e3:this._elapsedMs/1e3}})}(this.c||module.parent.exports||{}),__cassowary_parser=function(){function a(a){return'"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\x08/g,"\\b").replace(/\t/g,"\\t").replace(/\n/g,"\\n").replace(/\f/g,"\\f").replace(/\r/g,"\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g,escape)+'"'}var b={parse:function(b,c){function k(a){g>e||(e>g&&(g=e,h=[]),h.push(a))}function l(){var a,b,c,d,f;if(d=e,f=e,a=z(),null!==a){if(c=m(),null!==c)for(b=[];null!==c;)b.push(c),c=m();else b=null;null!==b?(c=z(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)}else a=null,e=f;return null!==a&&(a=function(a,b){return b}(d,a[1])),null===a&&(e=d),a}function m(){var a,b,c,d;return c=e,d=e,a=P(),null!==a?(b=s(),null!==b?a=[a,b]:(a=null,e=d)):(a=null,e=d),null!==a&&(a=function(a,b){return b}(c,a[0])),null===a&&(e=c),a}function n(){var a;return b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),a}function o(){var a;return/^[a-zA-Z]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[a-zA-Z]")),null===a&&(36===b.charCodeAt(e)?(a="$",e++):(a=null,0===f&&k('"$"')),null===a&&(95===b.charCodeAt(e)?(a="_",e++):(a=null,0===f&&k('"_"')))),a}function p(){var a;return f++,/^[\t\x0B\f \xA0\uFEFF]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\t\\x0B\\f \\xA0\\uFEFF]")),f--,0===f&&null===a&&k("whitespace"),a}function q(){var a;return/^[\n\r\u2028\u2029]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\n\\r\\u2028\\u2029]")),a}function r(){var a;return f++,10===b.charCodeAt(e)?(a="\n",e++):(a=null,0===f&&k('"\\n"')),null===a&&("\r\n"===b.substr(e,2)?(a="\r\n",e+=2):(a=null,0===f&&k('"\\r\\n"')),null===a&&(13===b.charCodeAt(e)?(a="\r",e++):(a=null,0===f&&k('"\\r"')),null===a&&(8232===b.charCodeAt(e)?(a="\u2028",e++):(a=null,0===f&&k('"\\u2028"')),null===a&&(8233===b.charCodeAt(e)?(a="\u2029",e++):(a=null,0===f&&k('"\\u2029"')))))),f--,0===f&&null===a&&k("end of line"),a}function s(){var a,c,d;return d=e,a=z(),null!==a?(59===b.charCodeAt(e)?(c=";",e++):(c=null,0===f&&k('";"')),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=y(),null!==a?(c=r(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d),null===a&&(d=e,a=z(),null!==a?(c=t(),null!==c?a=[a,c]:(a=null,e=d)):(a=null,e=d))),a}function t(){var a,c;return c=e,f++,b.length>e?(a=b.charAt(e),e++):(a=null,0===f&&k("any character")),f--,null===a?a="":(a=null,e=c),a}function u(){var a;return f++,a=v(),null===a&&(a=x()),f--,0===f&&null===a&&k("comment"),a}function v(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function w(){var a,c,d,g,h,i,j;if(h=e,"/*"===b.substr(e,2)?(a="/*",e+=2):(a=null,0===f&&k('"/*"')),null!==a){for(c=[],i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,"*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null===d&&(d=q()),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?("*/"===b.substr(e,2)?(d="*/",e+=2):(d=null,0===f&&k('"*/"')),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)}else a=null,e=h;return a}function x(){var a,c,d,g,h,i,j;if(h=e,"//"===b.substr(e,2)?(a="//",e+=2):(a=null,0===f&&k('"//"')),null!==a){for(c=[],i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==d;)c.push(d),i=e,j=e,f++,d=q(),f--,null===d?d="":(d=null,e=j),null!==d?(g=n(),null!==g?d=[d,g]:(d=null,e=i)):(d=null,e=i);null!==c?a=[a,c]:(a=null,e=h)}else a=null,e=h;return a}function y(){var a,b;for(a=[],b=p(),null===b&&(b=w(),null===b&&(b=x()));null!==b;)a.push(b),b=p(),null===b&&(b=w(),null===b&&(b=x()));return a}function z(){var a,b;for(a=[],b=p(),null===b&&(b=r(),null===b&&(b=u()));null!==b;)a.push(b),b=p(),null===b&&(b=r(),null===b&&(b=u()));return a}function A(){var a,b;return b=e,a=C(),null===a&&(a=B()),null!==a&&(a=function(a,b){return{type:"NumericLiteral",value:b}}(b,a)),null===a&&(e=b),a}function B(){var a,c,d;if(d=e,/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]")),null!==c)for(a=[];null!==c;)a.push(c),/^[0-9]/.test(b.charAt(e))?(c=b.charAt(e),e++):(c=null,0===f&&k("[0-9]"));else a=null;return null!==a&&(a=function(a,b){return parseInt(b.join(""))}(d,a)),null===a&&(e=d),a}function C(){var a,c,d,g,h;return g=e,h=e,a=B(),null!==a?(46===b.charCodeAt(e)?(c=".",e++):(c=null,0===f&&k('"."')),null!==c?(d=B(),null!==d?a=[a,c,d]:(a=null,e=h)):(a=null,e=h)):(a=null,e=h),null!==a&&(a=function(a,b){return parseFloat(b.join(""))}(g,a)),null===a&&(e=g),a}function D(){var a,c,d,g;if(g=e,/^[\-+]/.test(b.charAt(e))?(a=b.charAt(e),e++):(a=null,0===f&&k("[\\-+]")),a=null!==a?a:"",null!==a){if(/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]")),null!==d)for(c=[];null!==d;)c.push(d),/^[0-9]/.test(b.charAt(e))?(d=b.charAt(e),e++):(d=null,0===f&&k("[0-9]"));else c=null;null!==c?a=[a,c]:(a=null,e=g)}else a=null,e=g;return a}function E(){var a,b;return f++,b=e,a=F(),null!==a&&(a=function(a,b){return b}(b,a)),null===a&&(e=b),f--,0===f&&null===a&&k("identifier"),a}function F(){var a,b,c,d,g;if(f++,d=e,g=e,a=o(),null!==a){for(b=[],c=o();null!==c;)b.push(c),c=o();null!==b?a=[a,b]:(a=null,e=g)}else a=null,e=g;return null!==a&&(a=function(a,b,c){return b+c.join("")}(d,a[0],a[1])),null===a&&(e=d),f--,0===f&&null===a&&k("identifier"),a}function G(){var a,c,d,g,h,i,j;return i=e,a=E(),null!==a&&(a=function(a,b){return{type:"Variable",name:b}}(i,a)),null===a&&(e=i),null===a&&(a=A(),null===a&&(i=e,j=e,40===b.charCodeAt(e)?(a="(",e++):(a=null,0===f&&k('"("')),null!==a?(c=z(),null!==c?(d=P(),null!==d?(g=z(),null!==g?(41===b.charCodeAt(e)?(h=")",e++):(h=null,0===f&&k('")"')),null!==h?a=[a,c,d,g,h]:(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j)):(a=null,e=j),null!==a&&(a=function(a,b){return b}(i,a[2])),null===a&&(e=i))),a}function H(){var a,b,c,d,f;return a=G(),null===a&&(d=e,f=e,a=I(),null!==a?(b=z(),null!==b?(c=H(),null!==c?a=[a,b,c]:(a=null,e=f)):(a=null,e=f)):(a=null,e=f),null!==a&&(a=function(a,b,c){return{type:"UnaryExpression",operator:b,expression:c}}(d,a[0],a[2])),null===a&&(e=d)),a}function I(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"')),null===a&&(33===b.charCodeAt(e)?(a="!",e++):(a=null,0===f&&k('"!"')))),a}function J(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=H(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=K(),null!==d?(f=z(),null!==f?(g=H(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"MultiplicativeExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function K(){var a;return 42===b.charCodeAt(e)?(a="*",e++):(a=null,0===f&&k('"*"')),null===a&&(47===b.charCodeAt(e)?(a="/",e++):(a=null,0===f&&k('"/"'))),a}function L(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=J(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=M(),null!==d?(f=z(),null!==f?(g=J(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"AdditiveExpression",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function M(){var a;return 43===b.charCodeAt(e)?(a="+",e++):(a=null,0===f&&k('"+"')),null===a&&(45===b.charCodeAt(e)?(a="-",e++):(a=null,0===f&&k('"-"'))),a}function N(){var a,b,c,d,f,g,h,i,j;if(h=e,i=e,a=L(),null!==a){for(b=[],j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==c;)b.push(c),j=e,c=z(),null!==c?(d=O(),null!==d?(f=z(),null!==f?(g=L(),null!==g?c=[c,d,f,g]:(c=null,e=j)):(c=null,e=j)):(c=null,e=j)):(c=null,e=j);null!==b?a=[a,b]:(a=null,e=i)}else a=null,e=i;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"Inequality",operator:c[e][1],left:d,right:c[e][3]};return d}(h,a[0],a[1])),null===a&&(e=h),a}function O(){var a;return"<="===b.substr(e,2)?(a="<=",e+=2):(a=null,0===f&&k('"<="')),null===a&&(">="===b.substr(e,2)?(a=">=",e+=2):(a=null,0===f&&k('">="')),null===a&&(60===b.charCodeAt(e)?(a="<",e++):(a=null,0===f&&k('"<"')),null===a&&(62===b.charCodeAt(e)?(a=">",e++):(a=null,0===f&&k('">"'))))),a}function P(){var a,c,d,g,h,i,j,l,m;if(j=e,l=e,a=N(),null!==a){for(c=[],m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==d;)c.push(d),m=e,d=z(),null!==d?("=="===b.substr(e,2)?(g="==",e+=2):(g=null,0===f&&k('"=="')),null!==g?(h=z(),null!==h?(i=N(),null!==i?d=[d,g,h,i]:(d=null,e=m)):(d=null,e=m)):(d=null,e=m)):(d=null,e=m);null!==c?a=[a,c]:(a=null,e=l)}else a=null,e=l;return null!==a&&(a=function(a,b,c){for(var d=b,e=0;c.length>e;e++)d={type:"Equality",operator:c[e][1],left:d,right:c[e][3]};return d}(j,a[0],a[1])),null===a&&(e=j),a}function Q(a){a.sort();for(var b=null,c=[],d=0;a.length>d;d++)a[d]!==b&&(c.push(a[d]),b=a[d]);return c}function R(){for(var a=1,c=1,d=!1,f=0;Math.max(e,g)>f;f++){var h=b.charAt(f);"\n"===h?(d||a++,c=1,d=!1):"\r"===h||"\u2028"===h||"\u2029"===h?(a++,c=1,d=!0):(c++,d=!1)}return{line:a,column:c}}var d={start:l,Statement:m,SourceCharacter:n,IdentifierStart:o,WhiteSpace:p,LineTerminator:q,LineTerminatorSequence:r,EOS:s,EOF:t,Comment:u,MultiLineComment:v,MultiLineCommentNoLineTerminator:w,SingleLineComment:x,_:y,__:z,Literal:A,Integer:B,Real:C,SignedInteger:D,Identifier:E,IdentifierName:F,PrimaryExpression:G,UnaryExpression:H,UnaryOperator:I,MultiplicativeExpression:J,MultiplicativeOperator:K,AdditiveExpression:L,AdditiveOperator:M,InequalityExpression:N,InequalityOperator:O,LinearExpression:P};if(void 0!==c){if(void 0===d[c])throw Error("Invalid rule name: "+a(c)+".")}else c="start";var e=0,f=0,g=0,h=[],S=d[c]();if(null===S||e!==b.length){var T=Math.max(e,g),U=b.length>T?b.charAt(T):null,V=R();throw new this.SyntaxError(Q(h),U,T,V.line,V.column)}return S},toSource:function(){return this._source}};return b.SyntaxError=function(b,c,d,e,f){function g(b,c){var d,e;switch(b.length){case 0:d="end of input";break;case 1:d=b[0];break;default:d=b.slice(0,b.length-1).join(", ")+" or "+b[b.length-1]}return e=c?a(c):"end of input","Expected "+d+" but "+e+" found."}this.name="SyntaxError",this.expected=b,this.found=c,this.message=g(b,c),this.offset=d,this.line=e,this.column=f},b.SyntaxError.prototype=Error.prototype,b}();
}).call(
  (typeof module != "undefined") ?
      (module.compiled = true && module) : this
);

},{}]},{},[1])(1)
});

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_pixi_1 = __webpack_require__(10);
Factory_pixi_1.SwitchFactory();
exports.default = Factory_pixi_1.Factory;
if (window !== undefined) {
    window.XT = Factory_pixi_1.Factory;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_pixi_1 = __webpack_require__(10);
var UIView_1 = __webpack_require__(11);
var UIApplication_1 = __webpack_require__(9);
var UIWindow_1 = __webpack_require__(22);
var NSLayoutConstraint_1 = __webpack_require__(23);
function usePixi(force) {
    if (force === void 0) { force = false; }
    var use = function () {
        Factory_pixi_1.Factory.UIView = UIView_1.UIView;
        Factory_pixi_1.Factory.UIApplication = UIApplication_1.UIApplication;
        Factory_pixi_1.Factory.UIWindow = UIWindow_1.UIWindow;
        Factory_pixi_1.Factory.NSLayoutConstraint = NSLayoutConstraint_1.NSLayoutConstraint;
    };
    if (force) {
        use();
    }
    else if (window !== undefined) {
        var $window = window;
        if ($window.PIXI !== undefined) {
            use();
        }
    }
}
exports.usePixi = usePixi;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(20)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIApplication_1 = __webpack_require__(9);
var UIView_1 = __webpack_require__(11);
var PIXI = window.PIXI;
var UIWindow = (function (_super) {
    __extends(UIWindow, _super);
    function UIWindow(rect) {
        var _this = _super.call(this, rect) || this;
        _this.XTClassName = "UIWindow";
        var application = UIApplication_1.UIApplication.sharedApplication();
        if (application instanceof UIApplication_1.UIApplication) {
            application.nativeObject.stage.addChild(_this.nativeObject);
        }
        _this.hidden = true;
        return _this;
    }
    UIWindow.prototype.makeKeyAndVisible = function () {
        var application = UIApplication_1.UIApplication.sharedApplication();
        if (application instanceof UIApplication_1.UIApplication) {
            application.keyWindow = this;
        }
        this.hidden = false;
    };
    return UIWindow;
}(UIView_1.UIView));
exports.UIWindow = UIWindow;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var I = __webpack_require__(0);
var AutoLayout = __webpack_require__(14);
var NSLayoutConstraint = (function (_super) {
    __extends(NSLayoutConstraint, _super);
    function NSLayoutConstraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSLayoutConstraint.fromALObject = function (obj, views) {
        var toAttr = function (attr) {
            if (attr == "const") {
                return I.NSLayoutConstraint.Attribute.Const;
            }
            if (attr == "left") {
                return I.NSLayoutConstraint.Attribute.Left;
            }
            if (attr == "right") {
                return I.NSLayoutConstraint.Attribute.Right;
            }
            if (attr == "top") {
                return I.NSLayoutConstraint.Attribute.Top;
            }
            if (attr == "bottom") {
                return I.NSLayoutConstraint.Attribute.Bottom;
            }
            if (attr == "width") {
                return I.NSLayoutConstraint.Attribute.Width;
            }
            if (attr == "height") {
                return I.NSLayoutConstraint.Attribute.Height;
            }
            if (attr == "centerX") {
                return I.NSLayoutConstraint.Attribute.CenterX;
            }
            if (attr == "centerY") {
                return I.NSLayoutConstraint.Attribute.CenterY;
            }
        };
        var toRelation = function (rel) {
            if (rel == "leq") {
                return I.NSLayoutConstraint.Relation.Less;
            }
            if (rel == "geq") {
                return I.NSLayoutConstraint.Relation.Greater;
            }
            return I.NSLayoutConstraint.Relation.Equal;
        };
        var constant = obj.constant == "default" ? 8 : parseInt(obj.constant);
        var layoutConstraint = new NSLayoutConstraint(views[obj.view1], toAttr(obj.attr1), toRelation(obj.relation), views[obj.view2], toAttr(obj.attr2), constant, obj.multiplier);
        layoutConstraint.priority = obj.priority || 750;
        return layoutConstraint;
    };
    NSLayoutConstraint.constraintsWithVisualFormat = function (format, views) {
        try {
            var result = AutoLayout.VisualFormat.parse(format);
            return result.map(function (item) {
                return NSLayoutConstraint.fromALObject(item, views);
            });
        }
        catch (error) {
            console.error(error);
            return [];
        }
    };
    NSLayoutConstraint.prototype.toALObject = function () {
        var toAttr = function (attr) {
            if (attr == I.NSLayoutConstraint.Attribute.Const) {
                return "const";
            }
            if (attr == I.NSLayoutConstraint.Attribute.Left) {
                return "left";
            }
            if (attr == I.NSLayoutConstraint.Attribute.Right) {
                return "right";
            }
            if (attr == I.NSLayoutConstraint.Attribute.Top) {
                return "top";
            }
            if (attr == I.NSLayoutConstraint.Attribute.Bottom) {
                return "bottom";
            }
            if (attr == I.NSLayoutConstraint.Attribute.Width) {
                return "width";
            }
            if (attr == I.NSLayoutConstraint.Attribute.Height) {
                return "height";
            }
            if (attr == I.NSLayoutConstraint.Attribute.CenterX) {
                return "centerX";
            }
            if (attr == I.NSLayoutConstraint.Attribute.CenterY) {
                return "centerY";
            }
            return undefined;
        };
        var toRelation = function (rel) {
            if (rel == I.NSLayoutConstraint.Relation.Equal) {
                return "equ";
            }
            else if (rel == I.NSLayoutConstraint.Relation.Less) {
                return "leq";
            }
            else if (rel == I.NSLayoutConstraint.Relation.Greater) {
                return "geq";
            }
            return "equ";
        };
        return {
            view1: this.firstItem !== undefined ? this.firstItem._layoutID : undefined,
            attr1: toAttr(this.firstAttr),
            relation: toRelation(this.relation),
            view2: this.secondItem !== undefined ? this.secondItem._layoutID : undefined,
            attr2: toAttr(this.secondAttr),
            multiplier: this.multiplier,
            constant: this.constant,
            priority: this.priority,
        };
    };
    return NSLayoutConstraint;
}(I.NSLayoutConstraint));
exports.NSLayoutConstraint = NSLayoutConstraint;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// Rebound
// =======
// **Rebound** is a simple library that models Spring dynamics for the
// purpose of driving physical animations.
//
// Origin
// ------
// [Rebound](http://facebook.github.io/rebound) was originally written
// in Java to provide a lightweight physics system for
// [Home](https://play.google.com/store/apps/details?id=com.facebook.home) and
// [Chat Heads](https://play.google.com/store/apps/details?id=com.facebook.orca)
// on Android. It's now been adopted by several other Android
// applications. This JavaScript port was written to provide a quick
// way to demonstrate Rebound animations on the web for a
// [conference talk](https://www.youtube.com/watch?v=s5kNm-DgyjY). Since then
// the JavaScript version has been used to build some really nice interfaces.
// Check out [brandonwalkin.com](http://brandonwalkin.com) for an
// example.
//
// Overview
// --------
// The Library provides a SpringSystem for maintaining a set of Spring
// objects and iterating those Springs through a physics solver loop
// until equilibrium is achieved. The Spring class is the basic
// animation driver provided by Rebound. By attaching a listener to
// a Spring, you can observe its motion. The observer function is
// notified of position changes on the spring as it solves for
// equilibrium. These position updates can be mapped to an animation
// range to drive animated property updates on your user interface
// elements (translation, rotation, scale, etc).
//
// Example
// -------
// Here's a simple example. Pressing and releasing on the logo below
// will cause it to scale up and down with a springy animation.
//
// <div style="text-align:center; margin-bottom:50px; margin-top:50px">
//   <img
//     src="http://facebook.github.io/rebound/images/rebound.png"
//     id="logo"
//   />
// </div>
// <script src="../rebound.min.js"></script>
// <script>
//
// function scale(el, val) {
//   el.style.mozTransform =
//   el.style.msTransform =
//   el.style.webkitTransform =
//   el.style.transform = 'scale3d(' + val + ', ' + val + ', 1)';
// }
// var el = document.getElementById('logo');
//
// var springSystem = new rebound.SpringSystem();
// var spring = springSystem.createSpring(50, 3);
// spring.addListener({
//   onSpringUpdate: function(spring) {
//     var val = spring.getCurrentValue();
//     val = rebound.MathUtil.mapValueInRange(val, 0, 1, 1, 0.5);
//     scale(el, val);
//   }
// });
//
// el.addEventListener('mousedown', function() {
//   spring.setEndValue(1);
// });
//
// el.addEventListener('mouseout', function() {
//   spring.setEndValue(0);
// });
//
// el.addEventListener('mouseup', function() {
//   spring.setEndValue(0);
// });
//
// </script>
//
// Here's how it works.
//
// ```
// // Get a reference to the logo element.
// var el = document.getElementById('logo');
//
// // create a SpringSystem and a Spring with a bouncy config.
// var springSystem = new rebound.SpringSystem();
// var spring = springSystem.createSpring(50, 3);
//
// // Add a listener to the spring. Every time the physics
// // solver updates the Spring's value onSpringUpdate will
// // be called.
// spring.addListener({
//   onSpringUpdate: function(spring) {
//     var val = spring.getCurrentValue();
//     val = rebound.MathUtil
//                  .mapValueInRange(val, 0, 1, 1, 0.5);
//     scale(el, val);
//   }
// });
//
// // Listen for mouse down/up/out and toggle the
// //springs endValue from 0 to 1.
// el.addEventListener('mousedown', function() {
//   spring.setEndValue(1);
// });
//
// el.addEventListener('mouseout', function() {
//   spring.setEndValue(0);
// });
//
// el.addEventListener('mouseup', function() {
//   spring.setEndValue(0);
// });
//
// // Helper for scaling an element with css transforms.
// function scale(el, val) {
//   el.style.mozTransform =
//   el.style.msTransform =
//   el.style.webkitTransform =
//   el.style.transform = 'scale3d(' +
//     val + ', ' + val + ', 1)';
// }
// ```

(function() {
  var rebound = {};
  var util = rebound.util = {};
  var concat = Array.prototype.concat;
  var slice = Array.prototype.slice;

  // Bind a function to a context object.
  util.bind = function bind(func, context) {
    var args = slice.call(arguments, 2);
    return function() {
      func.apply(context, concat.call(args, slice.call(arguments)));
    };
  };

  // Add all the properties in the source to the target.
  util.extend = function extend(target, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  };

  // SpringSystem
  // ------------
  // **SpringSystem** is a set of Springs that all run on the same physics
  // timing loop. To get started with a Rebound animation you first
  // create a new SpringSystem and then add springs to it.
  var SpringSystem = rebound.SpringSystem = function SpringSystem(looper) {
    this._springRegistry = {};
    this._activeSprings = [];
    this.listeners = [];
    this._idleSpringIndices = [];
    this.looper = looper || new AnimationLooper();
    this.looper.springSystem = this;
  };

  util.extend(SpringSystem.prototype, {

    _springRegistry: null,

    _isIdle: true,

    _lastTimeMillis: -1,

    _activeSprings: null,

    listeners: null,

    _idleSpringIndices: null,

    // A SpringSystem is iterated by a looper. The looper is responsible
    // for executing each frame as the SpringSystem is resolved to idle.
    // There are three types of Loopers described below AnimationLooper,
    // SimulationLooper, and SteppingSimulationLooper. AnimationLooper is
    // the default as it is the most useful for common UI animations.
    setLooper: function(looper) {
      this.looper = looper;
      looper.springSystem = this;
    },

    // Add a new spring to this SpringSystem. This Spring will now be solved for
    // during the physics iteration loop. By default the spring will use the
    // default Origami spring config with 40 tension and 7 friction, but you can
    // also provide your own values here.
    createSpring: function(tension, friction) {
      var springConfig;
      if (tension === undefined || friction === undefined) {
        springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
      } else {
        springConfig =
          SpringConfig.fromOrigamiTensionAndFriction(tension, friction);
      }
      return this.createSpringWithConfig(springConfig);
    },

    // Add a spring with a specified bounciness and speed. To replicate Origami
    // compositions based on PopAnimation patches, use this factory method to
    // create matching springs.
    createSpringWithBouncinessAndSpeed: function(bounciness, speed) {
      var springConfig;
      if (bounciness === undefined || speed === undefined) {
        springConfig = SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG;
      } else {
        springConfig =
          SpringConfig.fromBouncinessAndSpeed(bounciness, speed);
      }
      return this.createSpringWithConfig(springConfig);
    },

    // Add a spring with the provided SpringConfig.
    createSpringWithConfig: function(springConfig) {
      var spring = new Spring(this);
      this.registerSpring(spring);
      spring.setSpringConfig(springConfig);
      return spring;
    },

    // You can check if a SpringSystem is idle or active by calling
    // getIsIdle. If all of the Springs in the SpringSystem are at rest,
    // i.e. the physics forces have reached equilibrium, then this
    // method will return true.
    getIsIdle: function() {
      return this._isIdle;
    },

    // Retrieve a specific Spring from the SpringSystem by id. This
    // can be useful for inspecting the state of a spring before
    // or after an integration loop in the SpringSystem executes.
    getSpringById: function (id) {
      return this._springRegistry[id];
    },

    // Get a listing of all the springs registered with this
    // SpringSystem.
    getAllSprings: function() {
      var vals = [];
      for (var id in this._springRegistry) {
        if (this._springRegistry.hasOwnProperty(id)) {
          vals.push(this._springRegistry[id]);
        }
      }
      return vals;
    },

    // registerSpring is called automatically as soon as you create
    // a Spring with SpringSystem#createSpring. This method sets the
    // spring up in the registry so that it can be solved in the
    // solver loop.
    registerSpring: function(spring) {
      this._springRegistry[spring.getId()] = spring;
    },

    // Deregister a spring with this SpringSystem. The SpringSystem will
    // no longer consider this Spring during its integration loop once
    // this is called. This is normally done automatically for you when
    // you call Spring#destroy.
    deregisterSpring: function(spring) {
      removeFirst(this._activeSprings, spring);
      delete this._springRegistry[spring.getId()];
    },

    advance: function(time, deltaTime) {
      while(this._idleSpringIndices.length > 0) this._idleSpringIndices.pop();
      for (var i = 0, len = this._activeSprings.length; i < len; i++) {
        var spring = this._activeSprings[i];
        if (spring.systemShouldAdvance()) {
          spring.advance(time / 1000.0, deltaTime / 1000.0);
        } else {
          this._idleSpringIndices.push(this._activeSprings.indexOf(spring));
        }
      }
      while(this._idleSpringIndices.length > 0) {
        var idx = this._idleSpringIndices.pop();
        idx >= 0 && this._activeSprings.splice(idx, 1);
      }
    },

    // This is our main solver loop called to move the simulation
    // forward through time. Before each pass in the solver loop
    // onBeforeIntegrate is called on an any listeners that have
    // registered themeselves with the SpringSystem. This gives you
    // an opportunity to apply any constraints or adjustments to
    // the springs that should be enforced before each iteration
    // loop. Next the advance method is called to move each Spring in
    // the systemShouldAdvance forward to the current time. After the
    // integration step runs in advance, onAfterIntegrate is called
    // on any listeners that have registered themselves with the
    // SpringSystem. This gives you an opportunity to run any post
    // integration constraints or adjustments on the Springs in the
    // SpringSystem.
    loop: function(currentTimeMillis) {
      var listener;
      if (this._lastTimeMillis === -1) {
        this._lastTimeMillis = currentTimeMillis -1;
      }
      var ellapsedMillis = currentTimeMillis - this._lastTimeMillis;
      this._lastTimeMillis = currentTimeMillis;

      var i = 0, len = this.listeners.length;
      for (i = 0; i < len; i++) {
        listener = this.listeners[i];
        listener.onBeforeIntegrate && listener.onBeforeIntegrate(this);
      }

      this.advance(currentTimeMillis, ellapsedMillis);
      if (this._activeSprings.length === 0) {
        this._isIdle = true;
        this._lastTimeMillis = -1;
      }

      for (i = 0; i < len; i++) {
        listener = this.listeners[i];
        listener.onAfterIntegrate && listener.onAfterIntegrate(this);
      }

      if (!this._isIdle) {
        this.looper.run();
      }
    },

    // activateSpring is used to notify the SpringSystem that a Spring
    // has become displaced. The system responds by starting its solver
    // loop up if it is currently idle.
    activateSpring: function(springId) {
      var spring = this._springRegistry[springId];
      if (this._activeSprings.indexOf(spring) == -1) {
        this._activeSprings.push(spring);
      }
      if (this.getIsIdle()) {
        this._isIdle = false;
        this.looper.run();
      }
    },

    // Add a listener to the SpringSystem so that you can receive
    // before/after integration notifications allowing Springs to be
    // constrained or adjusted.
    addListener: function(listener) {
      this.listeners.push(listener);
    },

    // Remove a previously added listener on the SpringSystem.
    removeListener: function(listener) {
      removeFirst(this.listeners, listener);
    },

    // Remove all previously added listeners on the SpringSystem.
    removeAllListeners: function() {
      this.listeners = [];
    }

  });

  // Spring
  // ------
  // **Spring** provides a model of a classical spring acting to
  // resolve a body to equilibrium. Springs have configurable
  // tension which is a force multipler on the displacement of the
  // spring from its rest point or `endValue` as defined by [Hooke's
  // law](http://en.wikipedia.org/wiki/Hooke's_law). Springs also have
  // configurable friction, which ensures that they do not oscillate
  // infinitely. When a Spring is displaced by updating it's resting
  // or `currentValue`, the SpringSystems that contain that Spring
  // will automatically start looping to solve for equilibrium. As each
  // timestep passes, `SpringListener` objects attached to the Spring
  // will be notified of the updates providing a way to drive an
  // animation off of the spring's resolution curve.
  var Spring = rebound.Spring = function Spring(springSystem) {
    this._id = 's' + Spring._ID++;
    this._springSystem = springSystem;
    this.listeners = [];
    this._currentState = new PhysicsState();
    this._previousState = new PhysicsState();
    this._tempState = new PhysicsState();
  };

  util.extend(Spring, {
    _ID: 0,

    MAX_DELTA_TIME_SEC: 0.064,

    SOLVER_TIMESTEP_SEC: 0.001

  });

  util.extend(Spring.prototype, {

    _id: 0,

    _springConfig: null,

    _overshootClampingEnabled: false,

    _currentState: null,

    _previousState: null,

    _tempState: null,

    _startValue: 0,

    _endValue: 0,

    _wasAtRest: true,

    _restSpeedThreshold: 0.001,

    _displacementFromRestThreshold: 0.001,

    listeners: null,

    _timeAccumulator: 0,

    _springSystem: null,

    // Remove a Spring from simulation and clear its listeners.
    destroy: function() {
      this.listeners = [];
      this._springSystem.deregisterSpring(this);
    },

    // Get the id of the spring, which can be used to retrieve it from
    // the SpringSystems it participates in later.
    getId: function() {
      return this._id;
    },

    // Set the configuration values for this Spring. A SpringConfig
    // contains the tension and friction values used to solve for the
    // equilibrium of the Spring in the physics loop.
    setSpringConfig: function(springConfig) {
      this._springConfig = springConfig;
      return this;
    },

    // Retrieve the SpringConfig used by this Spring.
    getSpringConfig: function() {
      return this._springConfig;
    },

    // Set the current position of this Spring. Listeners will be updated
    // with this value immediately. If the rest or `endValue` is not
    // updated to match this value, then the spring will be dispalced and
    // the SpringSystem will start to loop to restore the spring to the
    // `endValue`.
    //
    // A common pattern is to move a Spring around without animation by
    // calling.
    //
    // ```
    // spring.setCurrentValue(n).setAtRest();
    // ```
    //
    // This moves the Spring to a new position `n`, sets the endValue
    // to `n`, and removes any velocity from the `Spring`. By doing
    // this you can allow the `SpringListener` to manage the position
    // of UI elements attached to the spring even when moving without
    // animation. For example, when dragging an element you can
    // update the position of an attached view through a spring
    // by calling `spring.setCurrentValue(x)`. When
    // the gesture ends you can update the Springs
    // velocity and endValue
    // `spring.setVelocity(gestureEndVelocity).setEndValue(flingTarget)`
    // to cause it to naturally animate the UI element to the resting
    // position taking into account existing velocity. The codepaths for
    // synchronous movement and spring driven animation can
    // be unified using this technique.
    setCurrentValue: function(currentValue, skipSetAtRest) {
      this._startValue = currentValue;
      this._currentState.position = currentValue;
      if (!skipSetAtRest) {
        this.setAtRest();
      }
      this.notifyPositionUpdated(false, false);
      return this;
    },

    // Get the position that the most recent animation started at. This
    // can be useful for determining the number off oscillations that
    // have occurred.
    getStartValue: function() {
      return this._startValue;
    },

    // Retrieve the current value of the Spring.
    getCurrentValue: function() {
      return this._currentState.position;
    },

    // Get the absolute distance of the Spring from it's resting endValue
    // position.
    getCurrentDisplacementDistance: function() {
      return this.getDisplacementDistanceForState(this._currentState);
    },

    getDisplacementDistanceForState: function(state) {
      return Math.abs(this._endValue - state.position);
    },

    // Set the endValue or resting position of the spring. If this
    // value is different than the current value, the SpringSystem will
    // be notified and will begin running its solver loop to resolve
    // the Spring to equilibrium. Any listeners that are registered
    // for onSpringEndStateChange will also be notified of this update
    // immediately.
    setEndValue: function(endValue) {
      if (this._endValue == endValue && this.isAtRest())  {
        return this;
      }
      this._startValue = this.getCurrentValue();
      this._endValue = endValue;
      this._springSystem.activateSpring(this.getId());
      for (var i = 0, len = this.listeners.length; i < len; i++) {
        var listener = this.listeners[i];
        var onChange = listener.onSpringEndStateChange;
        onChange && onChange(this);
      }
      return this;
    },

    // Retrieve the endValue or resting position of this spring.
    getEndValue: function() {
      return this._endValue;
    },

    // Set the current velocity of the Spring, in pixels per second. As
    // previously mentioned, this can be useful when you are performing
    // a direct manipulation gesture. When a UI element is released you
    // may call setVelocity on its animation Spring so that the Spring
    // continues with the same velocity as the gesture ended with. The
    // friction, tension, and displacement of the Spring will then
    // govern its motion to return to rest on a natural feeling curve.
    setVelocity: function(velocity) {
      if (velocity === this._currentState.velocity) {
        return this;
      }
      this._currentState.velocity = velocity;
      this._springSystem.activateSpring(this.getId());
      return this;
    },

    // Get the current velocity of the Spring, in pixels per second.
    getVelocity: function() {
      return this._currentState.velocity;
    },

    // Set a threshold value for the movement speed of the Spring below
    // which it will be considered to be not moving or resting.
    setRestSpeedThreshold: function(restSpeedThreshold) {
      this._restSpeedThreshold = restSpeedThreshold;
      return this;
    },

    // Retrieve the rest speed threshold for this Spring.
    getRestSpeedThreshold: function() {
      return this._restSpeedThreshold;
    },

    // Set a threshold value for displacement below which the Spring
    // will be considered to be not displaced i.e. at its resting
    // `endValue`.
    setRestDisplacementThreshold: function(displacementFromRestThreshold) {
      this._displacementFromRestThreshold = displacementFromRestThreshold;
    },

    // Retrieve the rest displacement threshold for this spring.
    getRestDisplacementThreshold: function() {
      return this._displacementFromRestThreshold;
    },

    // Enable overshoot clamping. This means that the Spring will stop
    // immediately when it reaches its resting position regardless of
    // any existing momentum it may have. This can be useful for certain
    // types of animations that should not oscillate such as a scale
    // down to 0 or alpha fade.
    setOvershootClampingEnabled: function(enabled) {
      this._overshootClampingEnabled = enabled;
      return this;
    },

    // Check if overshoot clamping is enabled for this spring.
    isOvershootClampingEnabled: function() {
      return this._overshootClampingEnabled;
    },

    // Check if the Spring has gone past its end point by comparing
    // the direction it was moving in when it started to the current
    // position and end value.
    isOvershooting: function() {
      var start = this._startValue;
      var end = this._endValue;
      return this._springConfig.tension > 0 &&
       ((start < end && this.getCurrentValue() > end) ||
       (start > end && this.getCurrentValue() < end));
    },

    // Spring.advance is the main solver method for the Spring. It takes
    // the current time and delta since the last time step and performs
    // an RK4 integration to get the new position and velocity state
    // for the Spring based on the tension, friction, velocity, and
    // displacement of the Spring.
    advance: function(time, realDeltaTime) {
      var isAtRest = this.isAtRest();

      if (isAtRest && this._wasAtRest) {
        return;
      }

      var adjustedDeltaTime = realDeltaTime;
      if (realDeltaTime > Spring.MAX_DELTA_TIME_SEC) {
        adjustedDeltaTime = Spring.MAX_DELTA_TIME_SEC;
      }

      this._timeAccumulator += adjustedDeltaTime;

      var tension = this._springConfig.tension,
          friction = this._springConfig.friction,

          position = this._currentState.position,
          velocity = this._currentState.velocity,
          tempPosition = this._tempState.position,
          tempVelocity = this._tempState.velocity,

          aVelocity, aAcceleration,
          bVelocity, bAcceleration,
          cVelocity, cAcceleration,
          dVelocity, dAcceleration,

          dxdt, dvdt;

      while(this._timeAccumulator >= Spring.SOLVER_TIMESTEP_SEC) {

        this._timeAccumulator -= Spring.SOLVER_TIMESTEP_SEC;

        if (this._timeAccumulator < Spring.SOLVER_TIMESTEP_SEC) {
          this._previousState.position = position;
          this._previousState.velocity = velocity;
        }

        aVelocity = velocity;
        aAcceleration =
          (tension * (this._endValue - tempPosition)) - friction * velocity;

        tempPosition = position + aVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        tempVelocity =
          velocity + aAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        bVelocity = tempVelocity;
        bAcceleration =
          (tension * (this._endValue - tempPosition)) - friction * tempVelocity;

        tempPosition = position + bVelocity * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        tempVelocity =
          velocity + bAcceleration * Spring.SOLVER_TIMESTEP_SEC * 0.5;
        cVelocity = tempVelocity;
        cAcceleration =
          (tension * (this._endValue - tempPosition)) - friction * tempVelocity;

        tempPosition = position + cVelocity * Spring.SOLVER_TIMESTEP_SEC;
        tempVelocity =
          velocity + cAcceleration * Spring.SOLVER_TIMESTEP_SEC;
        dVelocity = tempVelocity;
        dAcceleration =
          (tension * (this._endValue - tempPosition)) - friction * tempVelocity;

        dxdt =
          1.0/6.0 * (aVelocity + 2.0 * (bVelocity + cVelocity) + dVelocity);
        dvdt = 1.0/6.0 * (
          aAcceleration + 2.0 * (bAcceleration + cAcceleration) + dAcceleration
        );

        position += dxdt * Spring.SOLVER_TIMESTEP_SEC;
        velocity += dvdt * Spring.SOLVER_TIMESTEP_SEC;
      }

      this._tempState.position = tempPosition;
      this._tempState.velocity = tempVelocity;

      this._currentState.position = position;
      this._currentState.velocity = velocity;

      if (this._timeAccumulator > 0) {
        this._interpolate(this._timeAccumulator / Spring.SOLVER_TIMESTEP_SEC);
      }

      if (this.isAtRest() ||
          this._overshootClampingEnabled && this.isOvershooting()) {

        if (this._springConfig.tension > 0) {
          this._startValue = this._endValue;
          this._currentState.position = this._endValue;
        } else {
          this._endValue = this._currentState.position;
          this._startValue = this._endValue;
        }
        this.setVelocity(0);
        isAtRest = true;
      }

      var notifyActivate = false;
      if (this._wasAtRest) {
        this._wasAtRest = false;
        notifyActivate = true;
      }

      var notifyAtRest = false;
      if (isAtRest) {
        this._wasAtRest = true;
        notifyAtRest = true;
      }

      this.notifyPositionUpdated(notifyActivate, notifyAtRest);
    },

    notifyPositionUpdated: function(notifyActivate, notifyAtRest) {
      for (var i = 0, len = this.listeners.length; i < len; i++) {
        var listener = this.listeners[i];
        if (notifyActivate && listener.onSpringActivate) {
          listener.onSpringActivate(this);
        }

        if (listener.onSpringUpdate) {
          listener.onSpringUpdate(this);
        }

        if (notifyAtRest && listener.onSpringAtRest) {
          listener.onSpringAtRest(this);
        }
      }
    },


    // Check if the SpringSystem should advance. Springs are advanced
    // a final frame after they reach equilibrium to ensure that the
    // currentValue is exactly the requested endValue regardless of the
    // displacement threshold.
    systemShouldAdvance: function() {
      return !this.isAtRest() || !this.wasAtRest();
    },

    wasAtRest: function() {
      return this._wasAtRest;
    },

    // Check if the Spring is atRest meaning that it's currentValue and
    // endValue are the same and that it has no velocity. The previously
    // described thresholds for speed and displacement define the bounds
    // of this equivalence check. If the Spring has 0 tension, then it will
    // be considered at rest whenever its absolute velocity drops below the
    // restSpeedThreshold.
    isAtRest: function() {
      return Math.abs(this._currentState.velocity) < this._restSpeedThreshold &&
        (this.getDisplacementDistanceForState(this._currentState) <=
          this._displacementFromRestThreshold ||
        this._springConfig.tension === 0);
    },

    // Force the spring to be at rest at its current position. As
    // described in the documentation for setCurrentValue, this method
    // makes it easy to do synchronous non-animated updates to ui
    // elements that are attached to springs via SpringListeners.
    setAtRest: function() {
      this._endValue = this._currentState.position;
      this._tempState.position = this._currentState.position;
      this._currentState.velocity = 0;
      return this;
    },

    _interpolate: function(alpha) {
      this._currentState.position = this._currentState.position *
        alpha + this._previousState.position * (1 - alpha);
      this._currentState.velocity = this._currentState.velocity *
        alpha + this._previousState.velocity * (1 - alpha);
    },

    getListeners: function() {
      return this.listeners;
    },

    addListener: function(newListener) {
      this.listeners.push(newListener);
      return this;
    },

    removeListener: function(listenerToRemove) {
      removeFirst(this.listeners, listenerToRemove);
      return this;
    },

    removeAllListeners: function() {
      this.listeners = [];
      return this;
    },

    currentValueIsApproximately: function(value) {
      return Math.abs(this.getCurrentValue() - value) <=
        this.getRestDisplacementThreshold();
    }

  });

  // PhysicsState
  // ------------
  // **PhysicsState** consists of a position and velocity. A Spring uses
  // this internally to keep track of its current and prior position and
  // velocity values.
  var PhysicsState = function PhysicsState() {};

  util.extend(PhysicsState.prototype, {
    position: 0,
    velocity: 0
  });

  // SpringConfig
  // ------------
  // **SpringConfig** maintains a set of tension and friction constants
  // for a Spring. You can use fromOrigamiTensionAndFriction to convert
  // values from the [Origami](http://facebook.github.io/origami/)
  // design tool directly to Rebound spring constants.
  var SpringConfig = rebound.SpringConfig =
    function SpringConfig(tension, friction) {
      this.tension = tension;
      this.friction = friction;
    };

  // Loopers
  // -------
  // **AnimationLooper** plays each frame of the SpringSystem on animation
  // timing loop. This is the default type of looper for a new spring system
  // as it is the most common when developing UI.
  var AnimationLooper = rebound.AnimationLooper = function AnimationLooper() {
    this.springSystem = null;
    var _this = this;
    var _run = function() {
      _this.springSystem.loop(Date.now());
    };

    this.run = function() {
      util.onFrame(_run);
    };
  };

  // **SimulationLooper** resolves the SpringSystem to a resting state in a
  // tight and blocking loop. This is useful for synchronously generating
  // pre-recorded animations that can then be played on a timing loop later.
  // Sometimes this lead to better performance to pre-record a single spring
  // curve and use it to drive many animations; however, it can make dynamic
  // response to user input a bit trickier to implement.
  rebound.SimulationLooper = function SimulationLooper(timestep) {
    this.springSystem = null;
    var time = 0;
    var running = false;
    timestep=timestep || 16.667;

    this.run = function() {
      if (running) {
        return;
      }
      running = true;
      while(!this.springSystem.getIsIdle()) {
        this.springSystem.loop(time+=timestep);
      }
      running = false;
    };
  };

  // **SteppingSimulationLooper** resolves the SpringSystem one step at a
  // time controlled by an outside loop. This is useful for testing and
  // verifying the behavior of a SpringSystem or if you want to control your own
  // timing loop for some reason e.g. slowing down or speeding up the
  // simulation.
  rebound.SteppingSimulationLooper = function(timestep) {
    this.springSystem = null;
    var time = 0;

    // this.run is NOOP'd here to allow control from the outside using
    // this.step.
    this.run = function(){};

    // Perform one step toward resolving the SpringSystem.
    this.step = function(timestep) {
      this.springSystem.loop(time+=timestep);
    };
  };

  // Math for converting from
  // [Origami](http://facebook.github.io/origami/) to
  // [Rebound](http://facebook.github.io/rebound).
  // You mostly don't need to worry about this, just use
  // SpringConfig.fromOrigamiTensionAndFriction(v, v);
  var OrigamiValueConverter = rebound.OrigamiValueConverter = {
    tensionFromOrigamiValue: function(oValue) {
      return (oValue - 30.0) * 3.62 + 194.0;
    },

    origamiValueFromTension: function(tension) {
      return (tension - 194.0) / 3.62 + 30.0;
    },

    frictionFromOrigamiValue: function(oValue) {
      return (oValue - 8.0) * 3.0 + 25.0;
    },

    origamiFromFriction: function(friction) {
      return (friction - 25.0) / 3.0 + 8.0;
    }
  };

  // BouncyConversion provides math for converting from Origami PopAnimation
  // config values to regular Origami tension and friction values. If you are
  // trying to replicate prototypes made with PopAnimation patches in Origami,
  // then you should create your springs with
  // SpringSystem.createSpringWithBouncinessAndSpeed, which uses this Math
  // internally to create a spring to match the provided PopAnimation
  // configuration from Origami.
  var BouncyConversion = rebound.BouncyConversion = function(bounciness, speed){
    this.bounciness = bounciness;
    this.speed = speed;
    var b = this.normalize(bounciness / 1.7, 0, 20.0);
    b = this.projectNormal(b, 0.0, 0.8);
    var s = this.normalize(speed / 1.7, 0, 20.0);
    this.bouncyTension = this.projectNormal(s, 0.5, 200)
    this.bouncyFriction = this.quadraticOutInterpolation(
      b,
      this.b3Nobounce(this.bouncyTension),
      0.01);
  }

  util.extend(BouncyConversion.prototype, {

    normalize: function(value, startValue, endValue) {
      return (value - startValue) / (endValue - startValue);
    },

    projectNormal: function(n, start, end) {
      return start + (n * (end - start));
    },

    linearInterpolation: function(t, start, end) {
      return t * end + (1.0 - t) * start;
    },

    quadraticOutInterpolation: function(t, start, end) {
      return this.linearInterpolation(2*t - t*t, start, end);
    },

    b3Friction1: function(x) {
      return (0.0007 * Math.pow(x, 3)) -
        (0.031 * Math.pow(x, 2)) + 0.64 * x + 1.28;
    },

    b3Friction2: function(x) {
      return (0.000044 * Math.pow(x, 3)) -
        (0.006 * Math.pow(x, 2)) + 0.36 * x + 2.;
    },

    b3Friction3: function(x) {
      return (0.00000045 * Math.pow(x, 3)) -
        (0.000332 * Math.pow(x, 2)) + 0.1078 * x + 5.84;
    },

    b3Nobounce: function(tension) {
      var friction = 0;
      if (tension <= 18) {
        friction = this.b3Friction1(tension);
      } else if (tension > 18 && tension <= 44) {
        friction = this.b3Friction2(tension);
      } else {
        friction = this.b3Friction3(tension);
      }
      return friction;
    }
  });

  util.extend(SpringConfig, {
    // Convert an origami Spring tension and friction to Rebound spring
    // constants. If you are prototyping a design with Origami, this
    // makes it easy to make your springs behave exactly the same in
    // Rebound.
    fromOrigamiTensionAndFriction: function(tension, friction) {
      return new SpringConfig(
        OrigamiValueConverter.tensionFromOrigamiValue(tension),
        OrigamiValueConverter.frictionFromOrigamiValue(friction));
    },

    // Convert an origami PopAnimation Spring bounciness and speed to Rebound
    // spring constants. If you are using PopAnimation patches in Origami, this
    // utility will provide springs that match your prototype.
    fromBouncinessAndSpeed: function(bounciness, speed) {
      var bouncyConversion = new rebound.BouncyConversion(bounciness, speed);
      return this.fromOrigamiTensionAndFriction(
        bouncyConversion.bouncyTension,
        bouncyConversion.bouncyFriction);
    },

    // Create a SpringConfig with no tension or a coasting spring with some
    // amount of Friction so that it does not coast infininitely.
    coastingConfigWithOrigamiFriction: function(friction) {
      return new SpringConfig(
        0,
        OrigamiValueConverter.frictionFromOrigamiValue(friction)
      );
    }
  });

  SpringConfig.DEFAULT_ORIGAMI_SPRING_CONFIG =
    SpringConfig.fromOrigamiTensionAndFriction(40, 7);

  util.extend(SpringConfig.prototype, {friction: 0, tension: 0});

  // Here are a couple of function to convert colors between hex codes and RGB
  // component values. These are handy when performing color
  // tweening animations.
  var colorCache = {};
  util.hexToRGB = function(color) {
    if (colorCache[color]) {
      return colorCache[color];
    }
    color = color.replace('#', '');
    if (color.length === 3) {
      color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    }
    var parts = color.match(/.{2}/g);

    var ret = {
      r: parseInt(parts[0], 16),
      g: parseInt(parts[1], 16),
      b: parseInt(parts[2], 16)
    };

    colorCache[color] = ret;
    return ret;
  };

  util.rgbToHex = function(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    r = r.length < 2 ? '0' + r : r;
    g = g.length < 2 ? '0' + g : g;
    b = b.length < 2 ? '0' + b : b;
    return '#' + r + g + b;
  };

  var MathUtil = rebound.MathUtil = {
    // This helper function does a linear interpolation of a value from
    // one range to another. This can be very useful for converting the
    // motion of a Spring to a range of UI property values. For example a
    // spring moving from position 0 to 1 could be interpolated to move a
    // view from pixel 300 to 350 and scale it from 0.5 to 1. The current
    // position of the `Spring` just needs to be run through this method
    // taking its input range in the _from_ parameters with the property
    // animation range in the _to_ parameters.
    mapValueInRange: function(value, fromLow, fromHigh, toLow, toHigh) {
      var fromRangeSize = fromHigh - fromLow;
      var toRangeSize = toHigh - toLow;
      var valueScale = (value - fromLow) / fromRangeSize;
      return toLow + (valueScale * toRangeSize);
    },

    // Interpolate two hex colors in a 0 - 1 range or optionally provide a
    // custom range with fromLow,fromHight. The output will be in hex by default
    // unless asRGB is true in which case it will be returned as an rgb string.
    interpolateColor:
      function(val, startColor, endColor, fromLow, fromHigh, asRGB) {
      fromLow = fromLow === undefined ? 0 : fromLow;
      fromHigh = fromHigh === undefined ? 1 : fromHigh;
      startColor = util.hexToRGB(startColor);
      endColor = util.hexToRGB(endColor);
      var r = Math.floor(
        util.mapValueInRange(val, fromLow, fromHigh, startColor.r, endColor.r)
      );
      var g = Math.floor(
        util.mapValueInRange(val, fromLow, fromHigh, startColor.g, endColor.g)
      );
      var b = Math.floor(
        util.mapValueInRange(val, fromLow, fromHigh, startColor.b, endColor.b)
      );
      if (asRGB) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      } else {
        return util.rgbToHex(r, g, b);
      }
    },

    degreesToRadians: function(deg) {
      return (deg * Math.PI) / 180;
    },

    radiansToDegrees: function(rad) {
      return (rad * 180) / Math.PI;
    }

  }

  util.extend(util, MathUtil);


  // Utilities
  // ---------
  // Here are a few useful JavaScript utilities.

  // Lop off the first occurence of the reference in the Array.
  function removeFirst(array, item) {
    var idx = array.indexOf(item);
    idx != -1 && array.splice(idx, 1);
  }

  var _onFrame;
  if (typeof window !== 'undefined') {
    _onFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  }
  if (!_onFrame && typeof process !== 'undefined' && process.title === 'node') {
    _onFrame = setImmediate;
  }

  // Cross browser/node timer functions.
  util.onFrame = function onFrame(func) {
    return _onFrame(func);
  };

  // Export the public api using exports for common js or the window for
  // normal browser inclusion.
  if (true) {
    util.extend(exports, rebound);
  } else if (typeof window != 'undefined') {
    window.rebound = rebound;
  }
})();


// Legal Stuff
// -----------
/**
 *  Copyright (c) 2013, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(12).setImmediate))

/***/ })
/******/ ]);
//# sourceMappingURL=xt.pixi.js.map