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
var Rect_1 = __webpack_require__(5);
exports.RectMake = Rect_1.RectMake;
exports.RectZero = Rect_1.RectZero;
exports.RectEqual = Rect_1.RectEqual;
exports.PointMake = Rect_1.PointMake;
exports.PointZero = Rect_1.PointZero;
exports.SizeMake = Rect_1.SizeMake;
exports.SizeZero = Rect_1.SizeZero;
exports.RectInside = Rect_1.RectInside;
exports.PointEqual = Rect_1.PointEqual;
exports.SizeEqual = Rect_1.SizeEqual;
var View_1 = __webpack_require__(1);
exports.View = View_1.View;
var Window_1 = __webpack_require__(6);
exports.Window = Window_1.Window;
var Application_1 = __webpack_require__(7);
exports.Application = Application_1.Application;
exports.ApplicationDelegate = Application_1.ApplicationDelegate;
var Color_1 = __webpack_require__(2);
exports.Color = Color_1.Color;
var Screen_1 = __webpack_require__(8);
exports.Screen = Screen_1.Screen;
var TransformMatrix_1 = __webpack_require__(9);
exports.TransformMatrix = TransformMatrix_1.TransformMatrix;
var LayoutConstraint_1 = __webpack_require__(10);
exports.LayoutConstraint = LayoutConstraint_1.LayoutConstraint;
var Label_1 = __webpack_require__(11);
exports.Label = Label_1.Label;
exports.TextAlignment = Label_1.TextAlignment;
exports.TextVerticalAlignment = Label_1.TextVerticalAlignment;
exports.LineBreakMode = Label_1.LineBreakMode;
var Font_1 = __webpack_require__(12);
exports.Font = Font_1.Font;


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
var View = (function () {
    function View(rect) {
    }
    View.prototype.tintColorDidChange = function () { };
    View.prototype.removeFromSuperview = function () { };
    View.prototype.insertSubviewAtIndex = function (subview, atIndex) { };
    View.prototype.exchangeSubviewAtIndex = function (index1, index2) { };
    View.prototype.addSubview = function (subview) { };
    View.prototype.insertSubviewBelow = function (subview, siblingSubview) { };
    View.prototype.insertSubviewAbove = function (subview, siblingSubview) { };
    View.prototype.bringSubviewToFront = function (subview) { };
    View.prototype.sendSubviewToBack = function (subview) { };
    View.prototype.didAddSubview = function (subview) { };
    View.prototype.willRemoveSubview = function (subview) { };
    View.prototype.willMoveToSuperview = function (newSuperview) { };
    View.prototype.didMoveToSuperview = function () { };
    View.prototype.willMoveToWindow = function (newWindow) { };
    View.prototype.didMoveToWindow = function () { };
    View.prototype.isDescendantOfView = function (view) { return false; };
    View.prototype.viewWithTag = function (tag) { return undefined; };
    View.prototype.setNeedsLayout = function () { };
    View.prototype.layoutIfNeeded = function () { };
    View.prototype.layoutSubviews = function () { };
    View.prototype.addConstraint = function (constraint) { };
    View.prototype.addConstraints = function (constraints) { };
    View.prototype.removeConstraint = function (constraint) { };
    View.prototype.removeAllConstraints = function () { };
    // Mark: View Animation
    View.prototype.animationWithDuration = function (duration, animations, completion) { };
    View.prototype.animationWithSpring = function (duration, damping, velocity, animations, completion) { };
    // Mark: View Interactive
    View.InteractionState = InteractionState;
    View.SwipeDirection = SwipeDirection;
    return View;
}());
exports.View = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Color = (function () {
    function Color(r, g, b, a) {
        this.r = Math.min(1.0, Math.max(0.0, r));
        this.g = Math.min(1.0, Math.max(0.0, g));
        ;
        this.b = Math.min(1.0, Math.max(0.0, b));
        ;
        this.a = a == undefined ? 1.0 : Math.min(1.0, Math.max(0.0, a));
        ;
    }
    Color.prototype.rgbHexNumber = function () {
        var r = Math.ceil(this.r * 255).toString(16);
        var g = Math.ceil(this.g * 255).toString(16);
        var b = Math.ceil(this.b * 255).toString(16);
        return parseInt("0x" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b));
    };
    Color.prototype.equals = function (toColor) {
        if (toColor instanceof Color) {
            return this.r === toColor.r && this.g === toColor.g && this.b === toColor.b && this.a === toColor.a;
        }
        return false;
    };
    return Color;
}());
exports.Color = Color;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function PointMake(x, y) {
    return { x: x, y: y };
}
exports.PointMake = PointMake;
function PointEqual(point1, point2) {
    return point1.x === point2.x && point1.y === point2.y;
}
exports.PointEqual = PointEqual;
exports.PointZero = PointMake(0, 0);
function SizeMake(width, height) {
    return { width: width, height: height };
}
exports.SizeMake = SizeMake;
function SizeEqual(size1, size2) {
    return size1.width === size2.width && size1.height === size2.height;
}
exports.SizeEqual = SizeEqual;
exports.SizeZero = SizeMake(0, 0);
function RectMake(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}
exports.RectMake = RectMake;
exports.RectZero = RectMake(0, 0, 0, 0);
function RectEqual(rect1, rect2) {
    return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
}
exports.RectEqual = RectEqual;
function RectInside(rect1, rect2) {
    return rect2.x > rect1.x && rect2.x + rect2.width < rect1.x + rect1.width && rect2.y > rect1.y && rect2.y + rect2.height < rect1.y + rect1.height;
}
exports.RectInside = RectInside;


/***/ }),
/* 6 */
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
var View_1 = __webpack_require__(1);
var Window = (function (_super) {
    __extends(Window, _super);
    function Window() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Window.prototype.makeKeyAndVisible = function () { };
    return Window;
}(View_1.View));
exports.Window = Window;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationDelegate = (function () {
    function ApplicationDelegate() {
    }
    ApplicationDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) { };
    return ApplicationDelegate;
}());
exports.ApplicationDelegate = ApplicationDelegate;
var Application = (function () {
    function Application() {
    }
    Application.prototype.sharedApplication = function () { throw "NOT IMPLEMENT!"; };
    return Application;
}());
exports.Application = Application;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Screen = (function () {
    function Screen(width, height, scale) {
        this.width = width;
        this.height = height;
        this.scale = scale;
    }
    Screen.prototype.bounds = function () {
        return { x: 0, y: 0, width: this.width, height: this.height };
    };
    Screen.withScale = function (value) {
        return value * Screen.mainScreen().scale;
    };
    Screen.outScale = function (value) {
        return value / Screen.mainScreen().scale;
    };
    Screen.mainScreen = function () { return new Screen(0, 0, 1); };
    return Screen;
}());
exports.Screen = Screen;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransformMatrix = (function () {
    function TransformMatrix(a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    return TransformMatrix;
}());
exports.TransformMatrix = TransformMatrix;


/***/ }),
/* 10 */
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
var LayoutConstraint = (function () {
    function LayoutConstraint(firstItem, firstAttr, relation, secondItem, secondAttr, constant, multiplier) {
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
    LayoutConstraint.constraintsWithVisualFormat = function (format, views) { return []; };
    LayoutConstraint.Attribute = Attribute;
    LayoutConstraint.Relation = Relation;
    return LayoutConstraint;
}());
exports.LayoutConstraint = LayoutConstraint;


/***/ }),
/* 11 */
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
var View_1 = __webpack_require__(1);
var Color_1 = __webpack_require__(2);
var TextAlignment;
(function (TextAlignment) {
    TextAlignment[TextAlignment["Left"] = 0] = "Left";
    TextAlignment[TextAlignment["Center"] = 1] = "Center";
    TextAlignment[TextAlignment["Right"] = 2] = "Right";
})(TextAlignment = exports.TextAlignment || (exports.TextAlignment = {}));
var TextVerticalAlignment;
(function (TextVerticalAlignment) {
    TextVerticalAlignment[TextVerticalAlignment["Top"] = 0] = "Top";
    TextVerticalAlignment[TextVerticalAlignment["Center"] = 1] = "Center";
    TextVerticalAlignment[TextVerticalAlignment["Bottom"] = 2] = "Bottom";
})(TextVerticalAlignment = exports.TextVerticalAlignment || (exports.TextVerticalAlignment = {}));
var LineBreakMode;
(function (LineBreakMode) {
    LineBreakMode[LineBreakMode["WordWrapping"] = 0] = "WordWrapping";
    LineBreakMode[LineBreakMode["TruncatingTail"] = 4] = "TruncatingTail";
})(LineBreakMode = exports.LineBreakMode || (exports.LineBreakMode = {}));
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textColor = new Color_1.Color(0, 0, 0);
        _this.textAlignment = TextAlignment.Left;
        _this.numberOfLines = 1;
        _this.lineBreakMode = LineBreakMode.WordWrapping;
        return _this;
    }
    return Label;
}(View_1.View));
exports.Label = Label;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Font = (function () {
    function Font(pointSize, fontWeight, fontStyle, familyName) {
        if (fontWeight === void 0) { fontWeight = '400'; }
        if (fontStyle === void 0) { fontStyle = 'normal'; }
        this.fontWeight = '400';
        this.fontStyle = 'normal';
        this.pointSize = pointSize;
        this.fontWeight = fontWeight;
        this.fontStyle = fontStyle;
        this.familyName = familyName;
    }
    Font.systemFontOfSize = function (pointSize, weight) {
        if (weight === void 0) { weight = '400'; }
        return new Font(pointSize, weight);
    };
    Font.boldSystemFontOfSize = function (pointSize) {
        return new Font(pointSize, '700');
    };
    Font.italicSystemFontOfSize = function (pointSize) {
        return new Font(pointSize, '400', 'italic');
    };
    return Font;
}());
exports.Font = Font;


/***/ }),
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
    Factory.PointMake = I.PointMake;
    Factory.PointEqual = I.PointEqual;
    Factory.PointZero = I.PointZero;
    Factory.RectMake = I.RectMake;
    Factory.RectZero = I.RectZero;
    Factory.RectEqual = I.RectEqual;
    Factory.RectInside = I.RectInside;
    Factory.SizeMake = I.SizeMake;
    Factory.SizeZero = I.SizeZero;
    Factory.SizeEqual = I.SizeEqual;
    Factory.Label = I.Label;
    Factory.TextAlignment = I.TextAlignment;
    Factory.TextVerticalAlignment = I.TextVerticalAlignment;
    Factory.LineBreakMode = I.LineBreakMode;
    Factory.Font = I.Font;
    Factory.View = I.View;
    Factory.Application = I.Application;
    Factory.ApplicationDelegate = I.ApplicationDelegate;
    Factory.Window = I.Window;
    Factory.Color = I.Color;
    Factory.Screen = I.Screen;
    Factory.TransformMatrix = I.TransformMatrix;
    Factory.LayoutConstraint = I.LayoutConstraint;
    return Factory;
}());
exports.Factory = Factory;
function SwitchFactory() {
}
exports.SwitchFactory = SwitchFactory;


/***/ })
/******/ ]);
//# sourceMappingURL=xt.js.map