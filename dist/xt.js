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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CGRect_1 = __webpack_require__(4);
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
var UIWindow_1 = __webpack_require__(5);
exports.UIWindow = UIWindow_1.UIWindow;
var UIApplication_1 = __webpack_require__(6);
exports.UIApplication = UIApplication_1.UIApplication;
exports.UIApplicationDelegate = UIApplication_1.UIApplicationDelegate;
var UIColor_1 = __webpack_require__(2);
exports.UIColor = UIColor_1.UIColor;
var UIScreen_1 = __webpack_require__(7);
exports.UIScreen = UIScreen_1.UIScreen;
var CGTransformMatrix_1 = __webpack_require__(8);
exports.CGTransformMatrix = CGTransformMatrix_1.CGTransformMatrix;
var NSLayoutConstraint_1 = __webpack_require__(9);
exports.NSLayoutConstraint = NSLayoutConstraint_1.NSLayoutConstraint;
var UILabel_1 = __webpack_require__(10);
exports.UILabel = UILabel_1.UILabel;
exports.UITextAlignment = UILabel_1.UITextAlignment;
exports.UITextVerticalAlignment = UILabel_1.UITextVerticalAlignment;
var UIFont_1 = __webpack_require__(11);
exports.UIFont = UIFont_1.UIFont;


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
/* 3 */,
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
/* 9 */
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
/* 10 */
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
var UIColor_1 = __webpack_require__(2);
var UITextAlignment;
(function (UITextAlignment) {
    UITextAlignment[UITextAlignment["Left"] = 0] = "Left";
    UITextAlignment[UITextAlignment["Center"] = 1] = "Center";
    UITextAlignment[UITextAlignment["Right"] = 2] = "Right";
})(UITextAlignment = exports.UITextAlignment || (exports.UITextAlignment = {}));
var UITextVerticalAlignment;
(function (UITextVerticalAlignment) {
    UITextVerticalAlignment[UITextVerticalAlignment["Top"] = 0] = "Top";
    UITextVerticalAlignment[UITextVerticalAlignment["Center"] = 1] = "Center";
    UITextVerticalAlignment[UITextVerticalAlignment["Bottom"] = 2] = "Bottom";
})(UITextVerticalAlignment = exports.UITextVerticalAlignment || (exports.UITextVerticalAlignment = {}));
var UILabel = (function (_super) {
    __extends(UILabel, _super);
    function UILabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textColor = new UIColor_1.UIColor(0, 0, 0);
        return _this;
    }
    return UILabel;
}(UIView_1.UIView));
exports.UILabel = UILabel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIFont = (function () {
    function UIFont(pointSize, fontWeight, fontStyle, familyName) {
        if (fontWeight === void 0) { fontWeight = '400'; }
        if (fontStyle === void 0) { fontStyle = 'normal'; }
        this.fontWeight = '400';
        this.fontStyle = 'normal';
        this.pointSize = pointSize;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.familyName = familyName;
    }
    UIFont.systemFontOfSize = function (pointSize, weight) {
        if (weight === void 0) { weight = '400'; }
        return new UIFont(pointSize, weight);
    };
    UIFont.boldSystemFontOfSize = function (pointSize) {
        return new UIFont(pointSize, '700');
    };
    UIFont.italicSystemFontOfSize = function (pointSize) {
        return new UIFont(pointSize, '400', 'italic');
    };
    return UIFont;
}());
exports.UIFont = UIFont;


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_1 = __webpack_require__(19);
Factory_1.SwitchFactory();
exports.default = Factory_1.Factory;
if (window !== undefined) {
    window.XT = Factory_1.Factory;
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    Factory.UILabel = I.UILabel;
    Factory.UITextAlignment = I.UITextAlignment;
    Factory.UIFont = I.UIFont;
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
}
exports.SwitchFactory = SwitchFactory;


/***/ })
/******/ ]);
//# sourceMappingURL=xt.js.map