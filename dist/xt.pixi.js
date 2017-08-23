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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
    View.prototype.animationWithBouncinessAndSpeed = function (damping, velocity, animations, completion) { };
    // Mark: View Interactive
    View.InteractionState = InteractionState;
    View.SwipeDirection = SwipeDirection;
    return View;
}());
exports.View = View;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rect_1 = __webpack_require__(4);
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
exports.InsetsMake = Rect_1.InsetsMake;
var View_1 = __webpack_require__(0);
exports.View = View_1.View;
var Window_1 = __webpack_require__(9);
exports.Window = Window_1.Window;
var Application_1 = __webpack_require__(10);
exports.Application = Application_1.Application;
exports.ApplicationDelegate = Application_1.ApplicationDelegate;
var Color_1 = __webpack_require__(5);
exports.Color = Color_1.Color;
var Screen_1 = __webpack_require__(7);
exports.Screen = Screen_1.Screen;
var TransformMatrix_1 = __webpack_require__(11);
exports.TransformMatrix = TransformMatrix_1.TransformMatrix;
var LayoutConstraint_1 = __webpack_require__(12);
exports.LayoutConstraint = LayoutConstraint_1.LayoutConstraint;
var Label_1 = __webpack_require__(13);
exports.Label = Label_1.Label;
exports.TextAlignment = Label_1.TextAlignment;
exports.TextVerticalAlignment = Label_1.TextVerticalAlignment;
exports.LineBreakMode = Label_1.LineBreakMode;
var Font_1 = __webpack_require__(14);
exports.Font = Font_1.Font;
var Button_1 = __webpack_require__(15);
exports.Button = Button_1.Button;
var ImageView_1 = __webpack_require__(16);
exports.ImageView = ImageView_1.ImageView;
exports.Image = ImageView_1.Image;
exports.ContentMode = ImageView_1.ContentMode;
exports.RenderingMode = ImageView_1.RenderingMode;
var ScrollView_1 = __webpack_require__(17);
exports.ScrollView = ScrollView_1.ScrollView;
var ListView_1 = __webpack_require__(41);
exports.ListView = ListView_1.ListView;
exports.ListCell = ListView_1.ListCell;
exports.ListSelectionStyle = ListView_1.ListSelectionStyle;


/***/ }),
/* 2 */
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
__webpack_require__(27);
var global = __webpack_require__(28);
exports.setImmediate = global.setImmediate;
exports.clearImmediate = global.clearImmediate;


/***/ }),
/* 3 */
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
var I = __webpack_require__(1);
var Application_1 = __webpack_require__(6);
var Rebound = __webpack_require__(29);
var PIXI = window.PIXI;
var AutoLayout = __webpack_require__(21);
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (requestAnimationFrame === undefined) {
    requestAnimationFrame = function (trigger) {
        setTimeout(trigger, 16);
    };
}
var View = (function (_super) {
    __extends(View, _super);
    function View(rect) {
        var _this = _super.call(this, rect || I.RectZero) || this;
        // Mark: View Geometry
        _this._frame = I.RectZero;
        _this._frameChanged = false;
        _this._forceRender = false;
        _this._bounds = I.RectZero;
        // Mark: View Rendering
        _this._clipsToBounds = false;
        _this._backgroundColor = undefined;
        _this._opaque = false;
        _this._tintColor = new I.Color(0.0, 122.0 / 255.0, 1.0);
        // Mark: View Layer-Back Rendering
        _this._cornerRadius = 0;
        _this._borderWidth = 0;
        _this._borderColor = undefined;
        _this.layoutTimer = undefined;
        // Mark: View LayoutConstraint
        _this._layoutID = View.generateLayoutUD();
        _this._constraints = [];
        // Mark: View Interactive
        _this.longPressDuration = 250;
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
    Object.defineProperty(View.prototype, "frame", {
        get: function () {
            return this._frame;
        },
        set: function (value) {
            if (I.RectEqual(this._frame, value)) {
                return;
            }
            if (View._animationEnabled) {
                if (this._frame.x != value.x) {
                    View.addAnimation(this, "frameX", this._frame.x, value.x);
                }
                if (this._frame.y != value.y) {
                    View.addAnimation(this, "frameY", this._frame.y, value.y);
                }
                if (this._frame.width != value.width) {
                    View.addAnimation(this, "frameWidth", this._frame.width, value.width);
                }
                if (this._frame.height != value.height) {
                    View.addAnimation(this, "frameHeight", this._frame.height, value.height);
                }
                return;
            }
            this._frame = value;
            this._frameChanged = true;
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
            this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, I.Screen.withScale(value.width), I.Screen.withScale(value.height));
            this.nativeContainer.hitArea = this.nativeObject.hitArea;
            this.nativeObject.x = I.Screen.withScale(value.x);
            this.nativeObject.y = I.Screen.withScale(value.y);
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "frameX", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { x: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "frameY", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { y: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "frameWidth", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { width: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "frameHeight", {
        set: function (value) {
            this.frame = __assign({}, this.frame, { height: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "bounds", {
        get: function () {
            return this._bounds;
        },
        set: function (value) {
            if (I.RectEqual(this._bounds, value)) {
                return;
            }
            if (View._animationEnabled) {
                if (this._bounds.x != value.x) {
                    View.addAnimation(this, "boundsX", this._bounds.x, value.x);
                }
                if (this._bounds.y != value.y) {
                    View.addAnimation(this, "boundsY", this._bounds.y, value.y);
                }
                if (this._bounds.width != value.width) {
                    View.addAnimation(this, "boundsWidth", this._bounds.width, value.width);
                }
                if (this._bounds.height != value.height) {
                    View.addAnimation(this, "boundsHeight", this._bounds.height, value.height);
                }
                return;
            }
            this._bounds = value;
            this.applyMask();
            this.draw();
            Application_1.setNeedsDisplay(this);
            this.setNeedsLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "boundsX", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { x: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "boundsY", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { y: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "boundsWidth", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { width: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "boundsHeight", {
        set: function (value) {
            this.bounds = __assign({}, this.bounds, { height: value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "center", {
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
    Object.defineProperty(View.prototype, "transform", {
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
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "clipsToBounds", {
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
    View.prototype.applyMask = function () {
        if (this.clipsToBounds) {
            if (this.maskView === undefined) {
                this.maskView = new View(this.bounds);
                this.maskView.backgroundColor = new I.Color(1, 1, 1);
            }
            else {
                this.maskView.frame = this.bounds;
                this.maskView.removeFromSuperview();
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
        Application_1.setNeedsDisplay(this);
    };
    Object.defineProperty(View.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            if (this._backgroundColor instanceof I.Color && this._backgroundColor.equals(value)) {
                return;
            }
            if (View._animationEnabled && this._backgroundColor && value) {
                if (this._backgroundColor.a != value.a) {
                    View.addAnimation(this, "backgroundColorA", this._backgroundColor.a, value.a);
                }
                if (this._backgroundColor.r != value.r) {
                    View.addAnimation(this, "backgroundColorR", this._backgroundColor.r, value.r);
                }
                if (this._backgroundColor.g != value.g) {
                    View.addAnimation(this, "backgroundColorG", this._backgroundColor.g, value.g);
                }
                if (this._backgroundColor.b != value.b) {
                    View.addAnimation(this, "backgroundColorB", this._backgroundColor.b, value.b);
                }
                return;
            }
            this._backgroundColor = value;
            this.draw();
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundColorA", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.Color(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundColorR", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.Color(value, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundColorG", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.Color(this.backgroundColor.r, value, this.backgroundColor.b, this.backgroundColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "backgroundColorB", {
        set: function (value) {
            if (this.backgroundColor) {
                this.backgroundColor = new I.Color(this.backgroundColor.r, this.backgroundColor.g, value, this.backgroundColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "opaque", {
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
    Object.defineProperty(View.prototype, "alpha", {
        get: function () {
            return this.nativeObject.alpha;
        },
        set: function (value) {
            if (this.nativeObject.alpha === value) {
                return;
            }
            if (View._animationEnabled) {
                View.addAnimation(this, "alpha", this.nativeObject.alpha, value);
                return;
            }
            this.nativeObject.alpha = value;
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "hidden", {
        get: function () {
            return !this.nativeObject.visible;
        },
        set: function (value) {
            if (this.nativeObject.visible === !value) {
                return;
            }
            this.nativeObject.visible = !value;
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "maskView", {
        get: function () {
            return this._maskView;
        },
        set: function (value) {
            if (this._maskView !== undefined) {
                this._maskView.removeFromSuperview();
            }
            this._maskView = value;
            this.applyMask();
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "tintColor", {
        get: function () {
            return this._tintColor;
        },
        set: function (value) {
            if (this._tintColor instanceof I.Color && this._tintColor.equals(value)) {
                return;
            }
            this._tintColor = value;
            this.tintColorDidChange();
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.tintColorDidChange = function () {
        this.subviews.forEach(function (subview) { subview.tintColorDidChange(); });
    };
    Object.defineProperty(View.prototype, "cornerRadius", {
        get: function () {
            return this._cornerRadius;
        },
        set: function (value) {
            if (this._cornerRadius === value) {
                return;
            }
            if (View._animationEnabled) {
                View.addAnimation(this, "cornerRadius", this._cornerRadius, value);
                return;
            }
            this._cornerRadius = value;
            this.draw();
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "borderWidth", {
        get: function () {
            return this._borderWidth;
        },
        set: function (value) {
            if (this._borderWidth === value) {
                return;
            }
            if (View._animationEnabled) {
                View.addAnimation(this, "borderWidth", this._borderWidth, value);
                return;
            }
            this._borderWidth = value;
            this.draw();
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (value) {
            if (this._borderColor === value) {
                return;
            }
            if (View._animationEnabled && this._borderColor && value) {
                if (this._borderColor.a != value.a) {
                    View.addAnimation(this, "borderColorA", this._borderColor.a, value.a);
                }
                if (this._borderColor.r != value.r) {
                    View.addAnimation(this, "borderColorR", this._borderColor.r, value.r);
                }
                if (this._borderColor.g != value.g) {
                    View.addAnimation(this, "borderColorG", this._borderColor.g, value.g);
                }
                if (this._borderColor.b != value.b) {
                    View.addAnimation(this, "borderColorB", this._borderColor.b, value.b);
                }
                return;
            }
            this._borderColor = value;
            this.draw();
            Application_1.setNeedsDisplay(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "borderColorA", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.Color(this.borderColor.r, this.borderColor.g, this.borderColor.b, value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "borderColorR", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.Color(value, this.borderColor.g, this.borderColor.b, this.borderColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "borderColorG", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.Color(this.borderColor.r, value, this.borderColor.b, this.borderColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "borderColorB", {
        set: function (value) {
            if (this.borderColor) {
                this.borderColor = new I.Color(this.borderColor.r, this.borderColor.g, value, this.borderColor.a);
            }
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.draw = function () {
        if (this.nativeGraphics === undefined || this.bounds.width == 0 || this.bounds.height == 0) {
            return;
        }
        this.nativeGraphics.clear();
        this.drawGraphics();
    };
    View.prototype.drawGraphics = function () {
        if (this.backgroundColor instanceof I.Color) {
            this.nativeGraphics.beginFill(this.backgroundColor.rgbHexNumber(), this.backgroundColor.a);
            if (this.borderWidth > 0 && this.borderColor instanceof I.Color) {
                this.nativeGraphics.lineStyle(I.Screen.withScale(this.borderWidth), this.borderColor.rgbHexNumber(), this.borderColor.a);
            }
            var scaledBounds = {
                x: I.Screen.withScale(this.bounds.x),
                y: I.Screen.withScale(this.bounds.y),
                width: I.Screen.withScale(this.bounds.width),
                height: I.Screen.withScale(this.bounds.height),
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
                    this.nativeGraphics.drawRoundedRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height, I.Screen.withScale(this.cornerRadius));
                }
            }
            else {
                this.nativeGraphics.drawRect(scaledBounds.x, scaledBounds.y, scaledBounds.width, scaledBounds.height);
            }
        }
    };
    Object.defineProperty(View.prototype, "superview", {
        get: function () {
            var parent = undefined;
            if (this.nativeContainer.parent && this.nativeContainer.parent.parent && this.nativeContainer.parent.parent.parent) {
                parent = this.nativeContainer.parent.parent.parent;
            }
            if (parent !== undefined && parent.XTView instanceof View) {
                return parent.XTView;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "subviews", {
        get: function () {
            return this.nativeContainer.children.map(function (item) { return item.XTView; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "window", {
        get: function () {
            var current = this.superview;
            while (current !== undefined && current.XTClassName !== "Window") {
                current = current.superview;
            }
            return current;
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.removeFromSuperview = function () {
        if (this.superview !== undefined) {
            this.nativeContainer.parent.XTView.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            this.willMoveToWindow(undefined);
            this.nativeObject.parent.removeChild(this.nativeObject);
            this.didMoveToSuperview();
            this.didMoveToWindow();
            Application_1.setNeedsDisplay(this);
        }
    };
    View.prototype.insertSubviewAtIndex = function (subview, atIndex) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        Application_1.setNeedsDisplay(this);
    };
    View.prototype.exchangeSubviewAtIndex = function (index1, index2) {
        var child1 = this.nativeContainer.getChildAt(index1);
        var child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
        Application_1.setNeedsDisplay(this);
    };
    View.prototype.addSubview = function (subview) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        Application_1.setNeedsDisplay(this);
    };
    View.prototype.insertSubviewBelow = function (subview, siblingSubview) {
        var siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex);
        }
    };
    View.prototype.insertSubviewAbove = function (subview, siblingSubview) {
        var siblingIndex = this.subviews.indexOf(siblingSubview);
        if (siblingIndex >= 0 && siblingIndex == this.subviews.length - 1) {
            this.addSubview(subview);
        }
        else if (siblingIndex >= 0) {
            this.insertSubviewAtIndex(subview, siblingIndex + 1);
        }
    };
    View.prototype.bringSubviewToFront = function (subview) {
        var currentIndex = this.subviews.indexOf(subview);
        if (currentIndex < this.subviews.length - 1 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(this.subviews.length - 1, currentIndex);
        }
    };
    View.prototype.sendSubviewToBack = function (subview) {
        var currentIndex = this.subviews.indexOf(subview);
        if (currentIndex > 0 && this.subviews.length > 1) {
            this.exchangeSubviewAtIndex(0, currentIndex);
        }
    };
    View.prototype.didAddSubview = function (subview) { };
    View.prototype.willRemoveSubview = function (subview) { };
    View.prototype.willMoveToSuperview = function (newSuperview) { };
    View.prototype.didMoveToSuperview = function () { };
    View.prototype.willMoveToWindow = function (newWindow) { };
    View.prototype.didMoveToWindow = function () { };
    View.prototype.isDescendantOfView = function (view) {
        var current = this;
        while (current !== undefined) {
            if (current === view) {
                return true;
            }
            current = current.superview;
        }
        return false;
    };
    View.prototype.viewWithTag = function (tag) {
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
    View.prototype.setNeedsLayout = function () {
        var _this = this;
        if (this.layoutTimer !== undefined) {
            clearImmediate(this.layoutTimer);
        }
        this.layoutTimer = setImmediate(function () {
            _this.layoutSubviews();
        });
    };
    View.prototype.layoutIfNeeded = function () {
        this.layoutSubviews();
    };
    View.prototype.layoutSubviews = function () {
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
                if ((value.width == 0 || value.height == 0) && viewMapping_1[layoutID] !== undefined) {
                    var intrinsticSize = viewMapping_1[layoutID].intrinsicContentSize(value.width != 0 ? value.width : undefined);
                    if (intrinsticSize !== undefined) {
                        value.intrinsicWidth = intrinsticSize.width;
                        value.intrinsicHeight = intrinsticSize.height;
                    }
                }
            }
            for (var layoutID in view.subViews) {
                var value = view.subViews[layoutID];
                if (viewMapping_1[layoutID] !== undefined) {
                    if (viewMapping_1[layoutID] == this) {
                        continue;
                    }
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
    View.generateLayoutUD = function () {
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
    Object.defineProperty(View.prototype, "constraints", {
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    View.prototype.intrinsicContentSize = function (width) {
        return undefined;
    };
    View.prototype.addConstraint = function (constraint) {
        this._constraints.push(constraint);
        this.setNeedsLayout();
    };
    View.prototype.addConstraints = function (constraints) {
        var _this = this;
        constraints.forEach(function (constraint) { return _this._constraints.push(constraint); });
        this.setNeedsLayout();
    };
    View.prototype.removeConstraint = function (constraint) {
        var idx = this._constraints.indexOf(constraint);
        if (idx >= 0) {
            this._constraints.splice(idx, 1);
        }
        this.setNeedsLayout();
    };
    View.prototype.removeAllConstraints = function () {
        this._constraints = [];
        this.setNeedsLayout();
    };
    Object.defineProperty(View.prototype, "userInteractionEnabled", {
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
    View.prototype.activeTap = function () {
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
    View.prototype.activeTouch = function () {
        if (this._isTouchActived === true) {
            return;
        }
        this.nativeObject.on('pointerdown', this.handleTouchStart.bind(this));
        this.nativeObject.on('pointermove', this.handleTouchMove.bind(this));
        this.nativeObject.on('pointerup', this.handleTouchEnd.bind(this));
        this.nativeObject.on('pointerupoutside', this.handleTouchEnd.bind(this));
        this._isTouchActived = true;
    };
    View.prototype.requestTouchPointInView = function (event) {
        var absPoint = {
            x: I.Screen.outScale(event.data.global.x),
            y: I.Screen.outScale(event.data.global.y),
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
    View.prototype.requestTouchPointInWindow = function (event) {
        var absPoint = {
            x: I.Screen.outScale(event.data.global.x),
            y: I.Screen.outScale(event.data.global.y),
        };
        return absPoint;
    };
    View.prototype.handleTouchStart = function (event) {
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
                    _this._onLongPress && _this._onLongPress(I.View.InteractionState.Began);
                }
            }, this.longPressDuration);
        }
        if (this._onTap !== undefined || this._onDoubleTap !== undefined) {
            this._maybeTap = true;
            this._firstTapPoint = __assign({}, event.data.global);
            this._secondTapped = false;
        }
    };
    View.prototype.handleTouchMove = function (event) {
        if (this._isLongPress === true) {
            this._maybePan = false;
            this._onLongPress && this._onLongPress(I.View.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._isPan === true) {
            this._onPan && this._onPan(I.View.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._maybePan === true) {
            if (event.data.global.x - this._firstTapPoint.x > I.Screen.withScale(8) || event.data.global.y - this._firstTapPoint.y > I.Screen.withScale(8)) {
                this._isPan = true;
                this._maybeTap = false;
                this._maybeLongPress = false;
                this._onPan && this._onPan(I.View.InteractionState.Began, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            }
        }
        else if (this._maybeTap === true || this._maybeLongPress === true) {
            if (event.data.global.x - this._firstTapPoint.x > I.Screen.withScale(12) || event.data.global.y - this._firstTapPoint.y > I.Screen.withScale(12)) {
                this._maybeTap = false;
                this._maybeLongPress = false;
            }
        }
    };
    View.prototype.handleTouchEnd = function (event) {
        if (this._isLongPress !== true) {
            this._maybeLongPress = false;
        }
        if (this._isPan === true) {
            this._onPan && this._onPan(I.View.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybePan = false;
            this._isPan = false;
        }
        else if (this._isLongPress === true) {
            this._onLongPress && this._onLongPress(I.View.InteractionState.Ended, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
            this._maybeTap = false;
            this._isLongPress = false;
        }
    };
    Object.defineProperty(View.prototype, "onTap", {
        set: function (value) {
            this._onTap = value;
            this.activeTap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "onDoubleTap", {
        set: function (value) {
            this._onDoubleTap = value;
            this.activeTap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "onLongPress", {
        set: function (value) {
            this._onLongPress = value;
            this.activeTouch();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(View.prototype, "onPan", {
        set: function (value) {
            this._onPan = value;
            this.activeTouch();
        },
        enumerable: true,
        configurable: true
    });
    View.commonAnimation = function (animations, runAnimation) {
        View._animationEnabled = true;
        animations();
        var animationViewProps = [];
        View._animationViews.forEach(function (view) {
            for (var propName in view._animationProps) {
                var element = view._animationProps[propName];
                animationViewProps.push({ view: view, propName: propName, from: element.from, to: element.to });
            }
            view._animationProps = {};
        });
        var startTime = performance.now();
        var runnable = function () {
            Application_1.displayPause();
            if (!runAnimation(startTime, animationViewProps)) {
                requestAnimationFrame(runnable);
            }
            Application_1.displayNow();
        };
        runnable();
        View._animationViews = [];
        View._animationEnabled = false;
    };
    View.animationWithDuration = function (duration, animations, completion) {
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
    View.animationWithBouncinessAndSpeed = function (bounciness, speed, animations, completion) {
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
    View.addAnimation = function (view, propName, from, to) {
        if (View._animationViews.indexOf(view) < 0) {
            View._animationViews.push(view);
        }
        view._animationProps[propName] = { from: from, to: to };
    };
    // Mark: View Animation
    View._animationEnabled = false;
    View._animationViews = [];
    return View;
}(I.View));
exports.View = View;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).clearImmediate, __webpack_require__(2).setImmediate))

/***/ }),
/* 4 */
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
function InsetsMake(top, left, bottom, right) {
    return { top: top, left: left, bottom: bottom, right: right };
}
exports.InsetsMake = InsetsMake;


/***/ }),
/* 5 */
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
    Color.prototype.rgbHexString = function () {
        var r = Math.ceil(this.r * 255).toString(16);
        var g = Math.ceil(this.g * 255).toString(16);
        var b = Math.ceil(this.b * 255).toString(16);
        return "#" + (r.length < 2 ? "0" + r : r) + (g.length < 2 ? "0" + g : g) + (b.length < 2 ? "0" + b : b);
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
var I = __webpack_require__(1);
var PIXI = window.PIXI;
var sharedApplication = undefined;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (requestAnimationFrame === undefined) {
    requestAnimationFrame = function (trigger) {
        setTimeout(trigger, 16);
    };
}
var displayStartTime = 0;
var Application = (function (_super) {
    __extends(Application, _super);
    function Application(canvas, delegate) {
        var _this = _super.call(this) || this;
        _this.keyWindow = undefined;
        _this.isDirty = false;
        _this.dirtyTargets = [];
        if (sharedApplication === undefined) {
            sharedApplication = _this;
            var scale_1 = Math.ceil(window.devicePixelRatio);
            I.Screen.mainScreen = function () {
                return new I.Screen(canvas.offsetWidth, canvas.offsetHeight, scale_1);
            };
        }
        Application.resetCanvas(canvas, function () {
            _this.nativeObject = new PIXI.Application({ width: I.Screen.withScale(canvas.offsetWidth), height: I.Screen.withScale(canvas.offsetHeight), view: canvas, antialias: true, transparent: false });
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
    Application.resetCanvas = function (canvas, callback) {
        canvas.style.width = "375";
        canvas.style.height = document.body.offsetHeight.toString();
        setTimeout(callback);
    };
    Application.sharedApplication = function () {
        return sharedApplication;
    };
    Application.prototype.remarkRenderable = function () {
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
                else if (opaqueRects.filter(function (item) { return I.RectInside(item, view._absRect); }).length == 0) {
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
    Application.prototype.combineViews = function (view, absPoint) {
        var _this = this;
        var views = view.subviews;
        view.subviews.forEach(function (subview) {
            subview._absRect = { x: absPoint.x + subview.frame.x, y: absPoint.y + subview.frame.y, width: absPoint.x + subview.frame.width, height: absPoint.y + subview.frame.height };
            view._childRenderable = false;
            view._frameChanged = false;
        });
        view.subviews.forEach(function (subview) {
            var subviewss = _this.combineViews(subview, { x: absPoint.x + subview.frame.x, y: absPoint.y + subview.frame.y });
            subviewss.forEach(function (subview) {
                views.push(subview);
            });
        });
        return views;
    };
    Application.prototype.setNeedsDisplay = function (target) {
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
            if (_this.dirtyTargets.filter(function (item) { return item._forceRender || item._frameChanged || item.nativeObject.renderable; }).length == 0) {
                _this.dirtyTargets.forEach(function (item) { item._frameChanged = false; item._forceRender = false; });
                _this.dirtyTargets = [];
                _this.isDirty = false;
                return;
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
    Application.prototype.displayNow = function () {
        if (window.DEBUG) {
            displayStartTime = performance.now();
        }
        this.remarkRenderable();
        this.nativeObject.render();
        this.dirtyTargets = [];
    };
    return Application;
}(I.Application));
exports.Application = Application;
var displayPaused = false;
function setNeedsDisplay(target, force) {
    if (force === void 0) { force = false; }
    if (sharedApplication !== undefined && displayPaused === false) {
        target._forceRender = force;
        sharedApplication.setNeedsDisplay(target);
    }
}
exports.setNeedsDisplay = setNeedsDisplay;
var displayIntervalTimer = undefined;
var displayIntervalEndtime = 0;
function displayInterval(millseconds) {
    if (displayIntervalEndtime > millseconds + performance.now()) {
        return;
    }
    displayIntervalEndtime = millseconds + performance.now();
    clearTimeout(this.displayIntervalTimer);
    if (sharedApplication !== undefined) {
        sharedApplication.nativeObject.start();
        this.displayIntervalTimer = setTimeout(function () {
            if (sharedApplication !== undefined) {
                sharedApplication.nativeObject.stop();
            }
        }, millseconds);
    }
}
exports.displayInterval = displayInterval;
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var I = __webpack_require__(1);
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
    Factory.Button = I.Button;
    Factory.ImageView = I.ImageView;
    Factory.Image = I.Image;
    Factory.ContentMode = I.ContentMode;
    Factory.RenderingMode = I.RenderingMode;
    Factory.InsetsMake = I.InsetsMake;
    Factory.ScrollView = I.ScrollView;
    Factory.ListView = I.ListView;
    Factory.ListCell = I.ListCell;
    return Factory;
}());
exports.Factory = Factory;
function SwitchFactory() {
}
exports.SwitchFactory = SwitchFactory;


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
var View_1 = __webpack_require__(0);
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
/* 10 */
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
/* 11 */
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
/* 12 */
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
/* 13 */
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
var View_1 = __webpack_require__(0);
var Color_1 = __webpack_require__(5);
var Rect_1 = __webpack_require__(4);
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
        _this.lineSpace = 12;
        return _this;
    }
    Label.prototype.textRectForBounds = function (bounds) { return Rect_1.RectZero; };
    return Label;
}(View_1.View));
exports.Label = Label;


/***/ }),
/* 14 */
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
/* 15 */
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
var View_1 = __webpack_require__(0);
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Button;
}(View_1.View));
exports.Button = Button;


/***/ }),
/* 16 */
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
var View_1 = __webpack_require__(0);
var RenderingMode;
(function (RenderingMode) {
    RenderingMode[RenderingMode["Original"] = 0] = "Original";
    RenderingMode[RenderingMode["Template"] = 1] = "Template";
})(RenderingMode = exports.RenderingMode || (exports.RenderingMode = {}));
var Image = (function () {
    function Image() {
        this.renderingMode = RenderingMode.Original;
    }
    Image.fromURL = function (url, success, failure) { };
    Image.fromAssets = function (named, success, failure) { };
    Image.fromAssetsWithScales = function (named, scales, success, failure) { };
    Image.prototype.imageWithRenderingMode = function (renderingMode) {
        throw "TODO";
    };
    Image.assetsPath = "./assets/";
    return Image;
}());
exports.Image = Image;
var ContentMode;
(function (ContentMode) {
    ContentMode[ContentMode["ScaleToFill"] = 0] = "ScaleToFill";
    ContentMode[ContentMode["ScaleAspectFit"] = 1] = "ScaleAspectFit";
    ContentMode[ContentMode["ScaleAspectFill"] = 2] = "ScaleAspectFill";
})(ContentMode = exports.ContentMode || (exports.ContentMode = {}));
var ImageView = (function (_super) {
    __extends(ImageView, _super);
    function ImageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentMode = ContentMode.ScaleToFill;
        return _this;
    }
    return ImageView;
}(View_1.View));
exports.ImageView = ImageView;


/***/ }),
/* 17 */
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
var View_1 = __webpack_require__(0);
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDirectionalLockEnabled = true;
        _this.bounces = true;
        _this.isScrollEnabled = true;
        _this.showsHorizontalScrollIndicator = true;
        _this.showsVerticalScrollIndicator = true;
        _this.alwaysBounceVertical = false;
        _this.alwaysBounceHorizontal = false;
        return _this;
    }
    return ScrollView;
}(View_1.View));
exports.ScrollView = ScrollView;


/***/ }),
/* 18 */
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
var index_1 = __webpack_require__(26);
var Factory_1 = __webpack_require__(8);
var Factory = (function (_super) {
    __extends(Factory, _super);
    function Factory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Factory;
}(Factory_1.Factory));
exports.Factory = Factory;
function SwitchFactory() {
    index_1.usePixi();
}
exports.SwitchFactory = SwitchFactory;


/***/ }),
/* 19 */
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
/* 22 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var I = __webpack_require__(1);
var View_1 = __webpack_require__(3);
var Application_1 = __webpack_require__(6);
var TextLayout_1 = __webpack_require__(32);
var PIXI = window.PIXI;
var Label = (function (_super) {
    __extends(Label, _super);
    function Label(rect) {
        var _this = _super.call(this, rect) || this;
        _this.textContainer = new PIXI.Container();
        _this._font = new I.Font(14);
        _this._textColor = new I.Color(0, 0, 0);
        _this._textAlignment = I.TextAlignment.Left;
        _this._numberOfLines = 1;
        _this._lineBreakMode = I.LineBreakMode.WordWrapping;
        _this._lineSpace = 12;
        _this._preferredMaxLayoutWidth = Infinity;
        _this.nativeObject.addChildAt(_this.textContainer, 1);
        return _this;
    }
    Label.prototype.layoutSubviews = function () {
        _super.prototype.layoutSubviews.call(this);
        this.drawText();
    };
    Object.defineProperty(Label.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (value) {
            if (this._text === value) {
                return;
            }
            this._text = value;
            this.drawText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "font", {
        get: function () {
            return this._font;
        },
        set: function (value) {
            this._font = value;
            this.drawText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "textColor", {
        get: function () {
            return this._textColor;
        },
        set: function (value) {
            if (this._textColor.equals(value)) {
                return;
            }
            this._textColor = value;
            this.drawText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "textAlignment", {
        get: function () {
            return this._textAlignment;
        },
        set: function (value) {
            if (this._textAlignment === value) {
                return;
            }
            this._textAlignment = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "numberOfLines", {
        get: function () {
            return this._numberOfLines;
        },
        set: function (value) {
            if (this._numberOfLines === value) {
                return;
            }
            this._numberOfLines = value;
            this.drawText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "lineBreakMode", {
        get: function () {
            return this._lineBreakMode;
        },
        set: function (value) {
            if (this._lineBreakMode === value) {
                return;
            }
            this._lineBreakMode = value;
            this.drawText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "lineSpace", {
        get: function () {
            return this._lineSpace;
        },
        set: function (value) {
            if (this._lineSpace === value) {
                return;
            }
            this._lineSpace = value;
            this.drawText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "preferredMaxLayoutWidth", {
        get: function () {
            return this._preferredMaxLayoutWidth;
        },
        set: function (value) {
            if (this._preferredMaxLayoutWidth === value) {
                return;
            }
            this._preferredMaxLayoutWidth = value;
            this.setNeedsLayout();
        },
        enumerable: true,
        configurable: true
    });
    Label.prototype.intrinsicContentSize = function (width) {
        if (this.text) {
            var textLayout = new TextLayout_1.StaticTextLayout(this.numberOfLines, this.lineSpace, this.text, this.font, { x: 0, y: 0, width: width || this.preferredMaxLayoutWidth, height: Infinity }, { left: 0, top: 0, bottom: 0, right: 0 });
            return { width: textLayout.textRect.width, height: textLayout.textRect.height + 2 };
        }
        return undefined;
    };
    Label.prototype.drawText = function () {
        var _this = this;
        clearImmediate(this._drawTextImmediate);
        this._drawTextImmediate = setImmediate(function () {
            _this.textContainer.removeChildren();
            if (_this.text) {
                var textStyle_1 = new PIXI.TextStyle({
                    fontSize: I.Screen.withScale(_this.font.pointSize),
                    fontWeight: _this.font.fontWeight,
                    fill: _this.textColor.rgbHexString(),
                });
                var textLayout = new TextLayout_1.StaticTextLayout(_this.numberOfLines, _this.lineSpace, _this.text, _this.font, _this.bounds, { left: 0, top: 0, bottom: 0, right: 0 });
                textLayout.textLines(_this.bounds, _this.textAlignment, I.TextVerticalAlignment.Center, _this.lineBreakMode).forEach(function (line) {
                    var text = new PIXI.Text(line.text, textStyle_1);
                    text.x = 0;
                    text.y = I.Screen.withScale(line.y);
                    var textBounds = text.getBounds();
                    // textBounds.x *= 375 / window.screen.width;
                    // textBounds.y *= 375 / window.screen.width;
                    // textBounds.width *= 375 / window.screen.width;
                    // textBounds.height *= 375 / window.screen.width;
                    if (textBounds.width > I.Screen.withScale(_this.bounds.width)) {
                        line.elements.forEach(function (element) {
                            var text = new PIXI.Text(element.character, textStyle_1);
                            text.x = I.Screen.withScale(line.x + element.x);
                            text.y = I.Screen.withScale(line.y);
                            _this.textContainer.addChild(text);
                        });
                        return;
                    }
                    else if (_this.textAlignment == I.TextAlignment.Center) {
                        text.x = Math.ceil((I.Screen.withScale(_this.bounds.width) - textBounds.width) / 2.0);
                    }
                    _this.textContainer.addChild(text);
                });
            }
            Application_1.setNeedsDisplay(_this);
        });
    };
    Label.prototype.textRectForBounds = function (bounds) {
        if (this.text) {
            var textStyle = new PIXI.TextStyle({
                fontSize: I.Screen.withScale(this.font.pointSize),
                fill: this.textColor.rgbHexString(),
            });
            var textLayout = new TextLayout_1.StaticTextLayout(this.numberOfLines, this.lineSpace, this.text, this.font, this.bounds, { left: 0, top: 0, bottom: 0, right: 0 });
            return textLayout.bounds;
        }
        return I.RectZero;
    };
    return Label;
}(View_1.View));
exports.Label = Label;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).clearImmediate, __webpack_require__(2).setImmediate))

/***/ }),
/* 23 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var Screen_1 = __webpack_require__(7);
var View_1 = __webpack_require__(3);
var Application_1 = __webpack_require__(6);
var Abstract_1 = __webpack_require__(1);
var PIXI = window.PIXI;
var imageLoader = new PIXI.loaders.Loader();
var runningQueue = [];
var imageQueue = [];
var imageLoaderTimerHandler = 0;
var Image = (function () {
    function Image(baseTexture, size, scale, renderingMode) {
        this.renderingMode = Abstract_1.RenderingMode.Original;
        this.baseTexture = baseTexture;
        this.size = size;
        this.scale = scale;
        this.renderingMode = renderingMode;
    }
    Image.fromURL = function (url, success, failure) {
        imageQueue.push({ url: url, success: success, failure: failure });
        this.loadImage();
    };
    Image.fromAssets = function (named, success, failure) {
        if (named.indexOf(".") < 0) {
            named = named + ".png";
        }
        this.fromURL(this.assetsPath + named, success, failure);
    };
    Image.fromAssetsWithScales = function (named, scales, success, failure) {
        var target = 1;
        if (scales instanceof Array) {
            for (var index = 0; index < scales.length; index++) {
                var scale = scales[index];
                if (scale === Screen_1.Screen.mainScreen().scale) {
                    target = scale;
                    break;
                }
                else {
                    target = scale;
                }
            }
        }
        else {
            target = scales;
        }
        if (target == 1) {
            return this.fromAssets(named + ".png", success, failure);
        }
        return this.fromAssets(named + "@" + target + "x.png", success, failure);
    };
    Image.loadImage = function () {
        clearImmediate(imageLoaderTimerHandler);
        imageLoaderTimerHandler = setImmediate(function () {
            if (imageQueue.length == 0) {
                return;
            }
            runningQueue = imageQueue;
            imageQueue = [];
            runningQueue.forEach(function (item) {
                try {
                    imageLoader.add(item.url, item.url);
                }
                catch (error) {
                }
            });
            imageLoader.load(function (_, res) {
                var _loop_1 = function (url) {
                    var value = res[url];
                    var image = new Image(value.texture.baseTexture, { width: value.texture.baseTexture.width, height: value.texture.baseTexture.height }, value.texture.baseTexture.resolution, Abstract_1.RenderingMode.Original);
                    runningQueue.forEach(function (item) {
                        if (item.url == url) {
                            item.success(image);
                        }
                    });
                };
                for (var url in res) {
                    _loop_1(url);
                }
            });
        });
    };
    Image.prototype.imageWithRenderingMode = function (renderingMode) {
        return new Image(this.baseTexture, this.size, this.scale, renderingMode);
    };
    Image.assetsPath = "./assets/";
    return Image;
}());
exports.Image = Image;
var ImageView = (function (_super) {
    __extends(ImageView, _super);
    function ImageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._image = undefined;
        _this.imageObject = undefined;
        _this._contentMode = Abstract_1.ContentMode.ScaleToFill;
        return _this;
    }
    Object.defineProperty(ImageView.prototype, "image", {
        get: function () {
            return this._image;
        },
        set: function (value) {
            this._image = value;
            this.drawImage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageView.prototype, "contentMode", {
        get: function () {
            return this._contentMode;
        },
        set: function (value) {
            if (this._contentMode === value) {
                return;
            }
            this._contentMode = value;
            this.resetImageBounds();
        },
        enumerable: true,
        configurable: true
    });
    ImageView.prototype.layoutSubviews = function () {
        _super.prototype.layoutSubviews.call(this);
        if (this.imageObject) {
            this.resetImageBounds();
        }
    };
    ImageView.prototype.drawImage = function () {
        if (this.imageObject !== undefined && this.imageObject.parent !== undefined) {
            this.imageObject.parent.removeChild(this.imageObject);
        }
        if (this.image) {
            var image = this.image;
            this.imageObject = PIXI.Sprite.from(image.baseTexture);
            if (this.image.renderingMode === Abstract_1.RenderingMode.Template) {
                this.imageObject.tint = this.tintColor.rgbHexNumber(); // todo
            }
            this.resetImageBounds();
            this.nativeObject.addChildAt(this.imageObject, 1);
            Application_1.setNeedsDisplay(this);
            Application_1.displayInterval(300);
        }
    };
    ImageView.prototype.resetImageBounds = function () {
        if (this.imageObject && this.image && this.image.size.width > 0 && this.image.size.height > 0 && this.bounds.width > 0 && this.bounds.height > 0) {
            switch (this.contentMode) {
                case Abstract_1.ContentMode.ScaleToFill:
                    this.imageObject.width = Screen_1.Screen.withScale(this.bounds.width);
                    this.imageObject.height = Screen_1.Screen.withScale(this.bounds.height);
                    break;
                case Abstract_1.ContentMode.ScaleAspectFit:
                case Abstract_1.ContentMode.ScaleAspectFill:
                    var imageRatio = this.image.size.width / this.image.size.height;
                    var viewRatio = this.bounds.width / this.bounds.height;
                    if ((imageRatio > viewRatio && this.contentMode === Abstract_1.ContentMode.ScaleAspectFit) || (imageRatio < viewRatio && this.contentMode === Abstract_1.ContentMode.ScaleAspectFill)) {
                        this.imageObject.width = Screen_1.Screen.withScale(this.bounds.width);
                        this.imageObject.height = Screen_1.Screen.withScale(this.bounds.width) / this.image.size.width * this.image.size.height;
                        this.imageObject.x = 0.0;
                        this.imageObject.y = (Screen_1.Screen.withScale(this.bounds.height) - this.imageObject.height) / 2.0;
                    }
                    else if ((imageRatio < viewRatio && this.contentMode === Abstract_1.ContentMode.ScaleAspectFit) || (imageRatio > viewRatio && this.contentMode === Abstract_1.ContentMode.ScaleAspectFill)) {
                        this.imageObject.width = Screen_1.Screen.withScale(this.bounds.height) / this.image.size.height * this.image.size.width;
                        this.imageObject.height = Screen_1.Screen.withScale(this.bounds.height);
                        this.imageObject.x = (Screen_1.Screen.withScale(this.bounds.width) - this.imageObject.width) / 2.0;
                        this.imageObject.y = 0.0;
                    }
                    break;
            }
        }
        Application_1.setNeedsDisplay(this);
    };
    return ImageView;
}(View_1.View));
exports.ImageView = ImageView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).clearImmediate, __webpack_require__(2).setImmediate))

/***/ }),
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_pixi_1 = __webpack_require__(18);
Factory_pixi_1.SwitchFactory();
exports.default = Factory_pixi_1.Factory;
if (window !== undefined) {
    window.XT = Factory_pixi_1.Factory;
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_pixi_1 = __webpack_require__(18);
var View_1 = __webpack_require__(3);
var Application_1 = __webpack_require__(6);
var Window_1 = __webpack_require__(30);
var LayoutConstraint_1 = __webpack_require__(31);
var Label_1 = __webpack_require__(22);
var Button_1 = __webpack_require__(36);
var ImageView_1 = __webpack_require__(23);
var ScrollView_1 = __webpack_require__(37);
var ListView_1 = __webpack_require__(42);
function usePixi(force) {
    if (force === void 0) { force = false; }
    var use = function () {
        Factory_pixi_1.Factory.View = View_1.View;
        Factory_pixi_1.Factory.Application = Application_1.Application;
        Factory_pixi_1.Factory.Window = Window_1.Window;
        Factory_pixi_1.Factory.LayoutConstraint = LayoutConstraint_1.LayoutConstraint;
        Factory_pixi_1.Factory.Label = Label_1.Label;
        Factory_pixi_1.Factory.Button = Button_1.Button;
        Factory_pixi_1.Factory.ImageView = ImageView_1.ImageView;
        Factory_pixi_1.Factory.Image = ImageView_1.Image;
        Factory_pixi_1.Factory.ScrollView = ScrollView_1.ScrollView;
        Factory_pixi_1.Factory.ListView = ListView_1.ListView;
        Factory_pixi_1.Factory.ListCell = ListView_1.ListCell;
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
/* 27 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19), __webpack_require__(20)))

/***/ }),
/* 28 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)))

/***/ }),
/* 29 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(2).setImmediate))

/***/ }),
/* 30 */
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
var Application_1 = __webpack_require__(6);
var View_1 = __webpack_require__(3);
var PIXI = window.PIXI;
var Window = (function (_super) {
    __extends(Window, _super);
    function Window(rect) {
        var _this = _super.call(this, rect) || this;
        _this.XTClassName = "Window";
        var application = Application_1.Application.sharedApplication();
        if (application instanceof Application_1.Application) {
            application.nativeObject.stage.addChild(_this.nativeObject);
        }
        _this.hidden = true;
        return _this;
    }
    Window.prototype.makeKeyAndVisible = function () {
        var application = Application_1.Application.sharedApplication();
        if (application instanceof Application_1.Application) {
            application.keyWindow = this;
        }
        this.hidden = false;
    };
    return Window;
}(View_1.View));
exports.Window = Window;


/***/ }),
/* 31 */
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
var I = __webpack_require__(1);
var AutoLayout = __webpack_require__(21);
var LayoutConstraint = (function (_super) {
    __extends(LayoutConstraint, _super);
    function LayoutConstraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutConstraint.fromALObject = function (obj, views) {
        var toAttr = function (attr) {
            if (attr == "const") {
                return I.LayoutConstraint.Attribute.Const;
            }
            if (attr == "left") {
                return I.LayoutConstraint.Attribute.Left;
            }
            if (attr == "right") {
                return I.LayoutConstraint.Attribute.Right;
            }
            if (attr == "top") {
                return I.LayoutConstraint.Attribute.Top;
            }
            if (attr == "bottom") {
                return I.LayoutConstraint.Attribute.Bottom;
            }
            if (attr == "width") {
                return I.LayoutConstraint.Attribute.Width;
            }
            if (attr == "height") {
                return I.LayoutConstraint.Attribute.Height;
            }
            if (attr == "centerX") {
                return I.LayoutConstraint.Attribute.CenterX;
            }
            if (attr == "centerY") {
                return I.LayoutConstraint.Attribute.CenterY;
            }
        };
        var toRelation = function (rel) {
            if (rel == "leq") {
                return I.LayoutConstraint.Relation.Less;
            }
            if (rel == "geq") {
                return I.LayoutConstraint.Relation.Greater;
            }
            return I.LayoutConstraint.Relation.Equal;
        };
        var constant = obj.constant == "default" ? 8 : parseInt(obj.constant);
        var layoutConstraint = new LayoutConstraint(views[obj.view1], toAttr(obj.attr1), toRelation(obj.relation), views[obj.view2], toAttr(obj.attr2), constant, obj.multiplier);
        layoutConstraint.priority = obj.priority || 750;
        return layoutConstraint;
    };
    LayoutConstraint.constraintsWithVisualFormat = function (format, views) {
        try {
            var result = AutoLayout.VisualFormat.parse(format);
            return result.map(function (item) {
                return LayoutConstraint.fromALObject(item, views);
            });
        }
        catch (error) {
            console.error(error);
            return [];
        }
    };
    LayoutConstraint.prototype.toALObject = function () {
        var toAttr = function (attr) {
            if (attr == I.LayoutConstraint.Attribute.Const) {
                return "const";
            }
            if (attr == I.LayoutConstraint.Attribute.Left) {
                return "left";
            }
            if (attr == I.LayoutConstraint.Attribute.Right) {
                return "right";
            }
            if (attr == I.LayoutConstraint.Attribute.Top) {
                return "top";
            }
            if (attr == I.LayoutConstraint.Attribute.Bottom) {
                return "bottom";
            }
            if (attr == I.LayoutConstraint.Attribute.Width) {
                return "width";
            }
            if (attr == I.LayoutConstraint.Attribute.Height) {
                return "height";
            }
            if (attr == I.LayoutConstraint.Attribute.CenterX) {
                return "centerX";
            }
            if (attr == I.LayoutConstraint.Attribute.CenterY) {
                return "centerY";
            }
            return undefined;
        };
        var toRelation = function (rel) {
            if (rel == I.LayoutConstraint.Relation.Equal) {
                return "equ";
            }
            else if (rel == I.LayoutConstraint.Relation.Less) {
                return "leq";
            }
            else if (rel == I.LayoutConstraint.Relation.Greater) {
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
    return LayoutConstraint;
}(I.LayoutConstraint));
exports.LayoutConstraint = LayoutConstraint;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var I = __webpack_require__(1);
var huozi_1 = __webpack_require__(33);
var StaticTextLayout = (function () {
    function StaticTextLayout(numberOfLines, lineSpace, text, font, bounds, padding) {
        if (padding === void 0) { padding = { top: 0, left: 0, bottom: 0, right: 0 }; }
        var _this = this;
        this.bounds = I.RectZero;
        this.padding = { top: 0, left: 0, bottom: 0, right: 0 };
        this.text = text;
        this.font = font;
        this.bounds = bounds;
        this.padding = padding;
        // measure function
        var textSequence = this.text.split('').map(function (character) {
            return {
                fontSize: _this.font.pointSize,
                character: character,
            };
        });
        var layoutSequence = huozi_1.default(textSequence, {
            gridSize: this.font.pointSize,
            column: numberOfLines == 1 ? Infinity : Math.floor((this.bounds.width - this.padding.left - this.padding.right) / this.font.pointSize),
            row: numberOfLines <= 0 ? Infinity : numberOfLines,
            yInterval: lineSpace,
        });
        var minX = Math.min.apply(null, layoutSequence.map(function (element) { return element.x; }));
        var minY = Math.min.apply(null, layoutSequence.map(function (element) { return element.y; }));
        var maxX = Math.max.apply(null, layoutSequence.map(function (element) { return element.x + element.width; }));
        var maxY = Math.max.apply(null, layoutSequence.map(function (element) {
            if (element.y + element.height + padding.top + padding.bottom > bounds.height) {
                return 0;
            }
            return element.y + element.height;
        }));
        this.layoutSequence = layoutSequence;
        this.textRect = I.RectMake(minX + this.padding.left, minY + this.padding.top, maxX - minX, maxY - minY);
    }
    StaticTextLayout.prototype.textLines = function (onRect, horizonAlignment, verticalAlignment, lineBreakMode) {
        var _this = this;
        var offset = { x: this.textRect.x, y: this.textRect.y };
        if (verticalAlignment === I.TextVerticalAlignment.Center) {
            offset.y = Math.max(this.padding.top, ((onRect.y + onRect.height) - this.textRect.height) / 2.0);
        }
        var lines = [];
        var line = { elements: [], text: "", x: 0, y: 0, width: 0, height: 0 };
        var addLine = function (line) {
            if (horizonAlignment === I.TextAlignment.Center) {
                offset.x = Math.max(_this.padding.left, ((onRect.x + onRect.width) - line.width) / 2.0);
            }
            lines.push({
                elements: line.elements,
                text: line.text,
                x: line.x + offset.x,
                y: line.y + offset.y,
                width: line.width,
                height: line.height
            });
        };
        this.layoutSequence.forEach(function (element) {
            if (element.x + element.width > onRect.width && lineBreakMode == I.LineBreakMode.TruncatingTail) {
                return;
            }
            if (line.y != element.y) {
                if (line.text.length > 0) {
                    addLine(line);
                }
                line = { elements: [], text: "", x: element.x, y: element.y, width: element.x + element.width, height: element.height };
            }
            line.elements.push(element);
            line.text += element.character;
            line.width = element.x + element.width;
            line.height = Math.max(line.height, element.height);
        });
        if (line.text.length > 0) {
            addLine(line);
        }
        var breakedLines = lines.filter(function (line) { return line.y + line.height <= onRect.height; });
        if (breakedLines.length > 0 && (breakedLines.length != lines.length || breakedLines.map(function (item) { return item.text; }).join("").length < this.text.length)) {
            switch (lineBreakMode) {
                case I.LineBreakMode.TruncatingTail:
                    if (breakedLines[breakedLines.length - 1].text.length > 0) {
                        breakedLines[breakedLines.length - 1].text = breakedLines[breakedLines.length - 1].text.slice(0, -2) + "...";
                    }
                    break;
            }
        }
        return breakedLines;
    };
    return StaticTextLayout;
}());
exports.StaticTextLayout = StaticTextLayout;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = huozi;

var _code = __webpack_require__(34);

var _isCJK = __webpack_require__(35);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /*!
                                                                                                                                                                                                     * @author      Icemic Jia <bingfeng.web@gmail.com>
                                                                                                                                                                                                     * @copyright   2017 Icemic Jia
                                                                                                                                                                                                     * @link        https://github.com/Icemic/huozi.js
                                                                                                                                                                                                     * @license     https://github.com/Icemic/huozi.js/blob/master/LICENSE
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * 本程序根据使用目的采用双授权的方式，你可以根据如下条款选择适合你的许可协议：
                                                                                                                                                                                                     * 
                                                                                                                                                                                                     * - 对于全部的使用目的，均可选择 GNU Affero General Public License 3.0。
                                                                                                                                                                                                     * - 对于非商业目的的使用，可选择 Apache License 2.0。此处非商业目的的定义和区分方法与 Creative Commons BY-NC 4.0 International 中的相关条目一致。
                                                                                                                                                                                                     * - 特别地，当用户将本程序与 AVG.js，或更具体的，avg-core 库同时使用时，无论用于商业或非商业，均可选择 Apache License 2.0。关于 AVG.js 的详情，请访问：https://github.com/avgjs/avg-core
                                                                                                                                                                                                     * - 特别地，当用户将本程序与 pixi-richtext (https://github.com/avgjs/pixi-richtext) 库同时使用时，无论用于商业或非商业，均可选择 Apache License 2.0。
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * English Translation:
                                                                                                                                                                                                     * 
                                                                                                                                                                                                     * This software uses a dual license, you can choose the appropriate license under the following terms:
                                                                                                                                                                                                     * 
                                                                                                                                                                                                     * - GNU Affero General Public License 3.0 is available for all purposes.
                                                                                                                                                                                                     * - Apache License 2.0 is available for non-commercial use. The definition of non-commercial use is consistent with the relevant entries in Creative Commons BY-NC 4.0 International.
                                                                                                                                                                                                     * - In particular, Apache License 2.0 is available for users who use this software with AVG.js, or more specifically, the avg-core library, whether for commercial or non-commercial use. For more details about AVG.js, see: https://github.com/avgjs/avg-core
                                                                                                                                                                                                     * - In particular, Apache License 2.0 is available for users who use the pixi-richtext (https://github.com/avgjs/pixi-richtext) library, whether for commercial or non-commercial use.
                                                                                                                                                                                                     */

var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
if (String.prototype.includes === undefined) {
  String.prototype.includes = function (val) {
    return this.indexOf(val) >= 0;
  };
}

// 检测中文字符宽度是否等于字号
context.font = '18px sans-serif';
var FLAG_STDWIDTH = context.measureText('中').width === 18;

var defaultOptions = {
  fontFamily: 'sans-serif',
  gridSize: 26,
  column: 25,
  row: Infinity,
  xInterval: 0,
  yInterval: 12,
  letterSpacing: 0,
  inlineCompression: true,
  forceGridAlignment: true,
  westernCharacterFirst: false,
  forceSpaceBetweenCJKAndWestern: false,
  fixLeftQuote: true
};

function huozi(textSequence, layoutOptions, onSequence) {

  layoutOptions = Object.assign({}, defaultOptions, layoutOptions);

  var _layoutOptions = layoutOptions,
      fontFamily = _layoutOptions.fontFamily,
      gridSize = _layoutOptions.gridSize,
      column = _layoutOptions.column,
      row = _layoutOptions.row,
      xInterval = _layoutOptions.xInterval,
      yInterval = _layoutOptions.yInterval,
      FLAG_INLINE_COMPRESSION = _layoutOptions.inlineCompression,
      forceGridAlignment = _layoutOptions.forceGridAlignment,
      westernCharacterFirst = _layoutOptions.westernCharacterFirst,
      forceSpaceBetweenCJKAndWestern = _layoutOptions.forceSpaceBetweenCJKAndWestern,
      fixLeftQuote = _layoutOptions.fixLeftQuote;


  var currentX = 0;
  var currentY = 0;

  var currentColumn = 0;
  var currentRow = 0;

  // 判断上一个是否为标点，以此判断标点挤压
  var lastIsPunctuation = false;
  var lastCharFontSize = 0;
  var needForceWrap = false;

  // 存储一行字中的最大字号，用以确定真实行高
  var maxFontSize = gridSize;

  // 缓存英文字符直到遇到下一个中文字符为止
  var westernTextCache = [];
  var lastIsWesternChar = westernCharacterFirst;

  var layoutSequence = [];

  var lineWrap = function lineWrap() {
    currentX = 0;
    currentColumn = 0;
    currentRow += 1;
    currentY += maxFontSize + yInterval;
    maxFontSize = gridSize;
    lastIsPunctuation = false;
    lastCharFontSize = 0;
    needForceWrap = false;
  };

  // 在末尾插入一个表意文字（CJK）空格，hack在文本以西文字符结尾时结尾的西文不会显示的问题。

  var _arr = [].concat(_toConsumableArray(textSequence), [{ fontSize: 12, character: '　' }]);

  for (var _i = 0; _i < _arr.length; _i++) {
    var char = _arr[_i];

    // 读取字符数据
    var charFontSize = char.fontSize,
        character = char.character;

    var isSpace = character == " ";

    // 处理行内上一个字符是标点（已预先压缩），但本字符是非标点（因而需要取消之前的压缩）的情况
    if (FLAG_INLINE_COMPRESSION && lastIsPunctuation && !_code.BIAODIAN.includes(character)) {
      currentX += lastCharFontSize / 2 + xInterval;
      currentColumn += 0.5;
      lastIsPunctuation = false;
    }

    if (/[ “”‘’]/.test(character)) {
      if (lastIsWesternChar) {
        westernTextCache.push(char);
        continue;
      }
    }

    if (!(0, _isCJK.isCJK)(character) && !/[\n “”‘’]/.test(character)) {
      lastIsWesternChar = true;
      westernTextCache.push(char);
      continue;
    } else if (westernTextCache.length) {
      var forceSpace = forceSpaceBetweenCJKAndWestern ? 0.25 * gridSize : 0;

      if (currentX) {
        currentX += forceSpace;
      }

      var westernLayoutSequence = void 0,
          isMultiLine = void 0,
          currentX_tmp = void 0;

      var _processWesternText = processWesternText(westernTextCache, layoutOptions, currentX, currentY, currentRow, column * gridSize, row);

      var _processWesternText2 = _slicedToArray(_processWesternText, 5);

      westernLayoutSequence = _processWesternText2[0];
      currentX_tmp = _processWesternText2[1];
      currentY = _processWesternText2[2];
      currentRow = _processWesternText2[3];
      isMultiLine = _processWesternText2[4];


      currentColumn = Math.ceil(currentX_tmp / (gridSize + xInterval));
      currentX = currentColumn * (gridSize + xInterval);

      // 单行的情况下自动对齐两端空格
      if (!isMultiLine) {
        (function () {
          // 两端总余量不足 0.5em 时，增加 1em 宽度
          if (currentX - currentX_tmp < forceSpace) {
            currentColumn += 1;
            currentX = currentColumn * gridSize;
          }

          var offsetX = (forceSpace + currentX - currentX_tmp) / 2 - forceSpace;

          westernLayoutSequence = westernLayoutSequence.map(function (value) {
            value.x += offsetX;
            return onSequence ? onSequence(value) || value : value;
          });
        })();
      }

      layoutSequence.push.apply(layoutSequence, _toConsumableArray(westernLayoutSequence));
      lastIsWesternChar = false;
      westernTextCache = [];
    }

    // NOTE: 必须在循环开头折行，因需要考虑下一个字符是否需要标点挤压
    // 折行
    var isLineEnd = false;
    if (currentColumn >= column) {
      isLineEnd = true;

      // 正常折行
      if (!_code.BIAODIANVALIDATEND.includes(character) || _code.BIAODIANVALIDATSTART.includes(character) || needForceWrap) {
        lineWrap();
      }
    }

    if (character === '\n') {
      lineWrap();
      continue;
    }

    // 测量文字宽度
    context.font = charFontSize + 'px ' + fontFamily;
    var width = context.measureText(character).width;

    // 在前后字号不一致的时候施行强制纵横对齐
    var offsetX = 0;
    var offsetY = (charFontSize - gridSize) / 2;
    var doubleX = false;

    if (forceGridAlignment && charFontSize !== gridSize) {
      offsetX = +forceGridAlignment * (charFontSize - gridSize) / 2;
      currentColumn += offsetX > 0 ? Math.ceil(offsetX * 2 / (gridSize + xInterval)) : 0;

      offsetX = ((1 + Math.ceil(offsetX * 2 / (gridSize + xInterval))) * (gridSize + xInterval) - charFontSize) / 2;
      currentX += offsetX;

      if (currentColumn >= column) {
        lineWrap();
        doubleX = true;
      }
    }

    // 这里假设引号永远是在 em 格左侧的。fix 指修复一些并非在左侧时的情况。
    var quoteFix = 0;
    quoteFix += !lastIsPunctuation && character === '“' ? charFontSize / 2 : 0;
    if (fixLeftQuote) {
      // 一些平台上引号量取结果是<0.5em宽，但绘制时却是1em宽，导致错位。下面的代码修正这一问题
      // OS X 无需此修复（FLAG_STDWIDTH === true）
      if (character === '“' && !FLAG_STDWIDTH) {
        quoteFix += -charFontSize / 2;
      } else if (character === '“' && width === charFontSize) {
        quoteFix += -charFontSize / 2;
      }
    }

    var item = Object.assign({}, char, {
      x: currentX + quoteFix,
      y: currentY - offsetY,
      width: width,
      height: charFontSize
    });

    // 确定文字位置并添加到返回数组中
    layoutSequence.push(onSequence ? onSequence(item) || item : item);

    // 当正好在行首时，因两边空格全部加到一边，可能使得总宽度大于1em，此时应该删去多出的1em宽度
    var offsetX2 = offsetX * (doubleX ? 2 : 1);
    if (offsetX2 > gridSize) {
      offsetX2 -= gridSize;
      currentColumn -= 1;
    }

    currentX += offsetX2;

    // 判断是否进行压缩，并更新位置
    if (isLineEnd && _code.BIAODIANVALIDATEND.includes(character) && !_code.INCOMPRESSIBLE.includes(character)) {
      currentX += charFontSize / 2;
      currentColumn += 0.5;
      if (currentColumn % 1 !== 0.5) {
        needForceWrap = true;
      }
    } else if (FLAG_INLINE_COMPRESSION && _code.BIAODIAN.includes(character) && !_code.INCOMPRESSIBLE.includes(character)) {
      currentX += charFontSize / 2 + xInterval * +lastIsPunctuation;
      currentColumn += 0.5;
      lastIsPunctuation = !lastIsPunctuation;
    } else {
      currentX += charFontSize + xInterval;
      currentColumn += 1;
    }

    // 更新行高
    maxFontSize = Math.max(maxFontSize, charFontSize);

    // 杂七杂八的状态更新
    lastCharFontSize = charFontSize;

    // 超出高度，直接略去后面的字符，返回的数据中也不包含后面的字符。
    if (currentRow >= row) {
      break;
    }
  }

  // 移除表意文字空格
  layoutSequence.pop();

  return layoutSequence;
}

// 独立处理西文文本的排版，返回的数据中文本两侧无空格
function processWesternText(textSequence, _ref, currentX, currentY, currentRow, maxWidth, row) {
  var fontFamily = _ref.fontFamily,
      gridSize = _ref.gridSize,
      yInterval = _ref.yInterval,
      letterSpacing = _ref.letterSpacing;


  var layoutSequence = [];
  var maxFontSize = gridSize;
  var word = '';
  var wordChar = [];
  var isMultiLine = false;

  // 若末尾不是空格，则为末尾添加一个空格
  if (textSequence[textSequence.length - 1].character !== ' ') {
    textSequence.push({
      fontSize: 0,
      character: ' '
    });
  }

  for (var index = 0; index < textSequence.length; index++) {
    var char = textSequence[index];
    var charFontSize = char.fontSize,
        character = char.character;

    // 更新行高

    maxFontSize = Math.max(maxFontSize, charFontSize);

    if (character === ' ') {
      var restSpace = maxWidth - currentX;
      var totalWidth = context.measureText(word).width;

      if (restSpace < totalWidth) {
        currentX = 0;
        currentY += maxFontSize + yInterval;
        currentRow += 1;
        isMultiLine = true;

        // 超出高度，直接略去后面的字符，返回的数据中也不包含后面的字符。
        if (currentRow >= row) {
          break;
        }
      }

      for (var index2 = 0; index2 < wordChar.length; index2++) {
        var _char = wordChar[index2];
        var _charFontSize = _char.fontSize,
            _character = _char.character;

        // 确定文字位置并添加到返回数组中

        var offsetY = (_charFontSize - gridSize) / 2;
        layoutSequence.push(Object.assign({}, _char, {
          x: currentX,
          y: currentY - offsetY
        }));

        currentX += _char.width + letterSpacing;
      }
      layoutSequence.push(Object.assign({}, layoutSequence[layoutSequence.length - 1], {
        character: " ",
        x: layoutSequence[layoutSequence.length - 1].x + layoutSequence[layoutSequence.length - 1].width,
        width: currentX - layoutSequence[layoutSequence.length - 1].x + layoutSequence[layoutSequence.length - 1].width
      }));

      currentX += 0.35 * gridSize;

      word = '';
      wordChar = [];
    } else {
      context.font = charFontSize + 'px ' + fontFamily;
      var width = context.measureText(character).width;

      word += character;

      // 在这里先装入 width 和 height 信息
      wordChar.push(Object.assign({}, char, { width: width, height: charFontSize }));
    }
  }
  return [layoutSequence, currentX - 0.35 * gridSize, currentY, currentRow, isMultiLine];
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author      Icemic Jia <bingfeng.web@gmail.com>
 * @copyright   2017 Icemic Jia
 * @link        https://github.com/Icemic/huozi.js
 * @license     https://github.com/Icemic/huozi.js/blob/master/LICENSE
 *
 * 本程序根据使用目的采用双授权的方式，你可以根据如下条款选择适合你的许可协议：
 * 
 * - 对于全部的使用目的，均可选择 GNU Affero General Public License 3.0。
 * - 对于非商业目的的使用，可选择 Apache License 2.0。此处非商业目的的定义和区分方法与 Creative Commons BY-NC 4.0 International 中的相关条目一致。
 * - 特别地，当用户将本程序与 AVG.js，或更具体的，avg-core 库同时使用时，无论用于商业或非商业，均可选择 Apache License 2.0。关于 AVG.js 的详情，请访问：https://github.com/avgjs/avg-core
 * - 特别地，当用户将本程序与 pixi-richtext (https://github.com/avgjs/pixi-richtext) 库同时使用时，无论用于商业或非商业，均可选择 Apache License 2.0。
 *
 * English Translation:
 * 
 * This software uses a dual license, you can choose the appropriate license under the following terms:
 * 
 * - GNU Affero General Public License 3.0 is available for all purposes.
 * - Apache License 2.0 is available for non-commercial use. The definition of non-commercial use is consistent with the relevant entries in Creative Commons BY-NC 4.0 International.
 * - In particular, Apache License 2.0 is available for users who use this software with AVG.js, or more specifically, the avg-core library, whether for commercial or non-commercial use. For more details about AVG.js, see: https://github.com/avgjs/avg-core
 * - In particular, Apache License 2.0 is available for users who use the pixi-richtext (https://github.com/avgjs/pixi-richtext) library, whether for commercial or non-commercial use.
 */

var DIANHAO = exports.DIANHAO = '\u3002\uFF0C\u3001\uFF0E\uFF1A\uFF1B\uFF01\u203C\uFF1F\u2047';
var BIAOHAO = exports.BIAOHAO = '\u300C\u300D\u300E\u300F\u201C\u201D\u2018\u2019\uFF08\uFF09\u3010\u3011\u3016\u3017\u3014\u3015\uFF3B\uFF3D\uFF5B\uFF5D\u2E3A\u2014\u2026\u25CF\u2022\u2013\uFF5E~\uFF5E\uFF5E\xB7\uFE4F\u300A\u300B\u3008\u3009\uFF3F/\uFF0F';
var BIAODIAN = exports.BIAODIAN = '' + BIAOHAO + DIANHAO + ' ';
var BIAODIANVALIDATEND = exports.BIAODIANVALIDATEND = '\u3002\uFF0C\u3001\uFF0E\uFF1A\uFF1B\uFF01\u203C\uFF1F\u2047\u300D\u300F\u201D\u2019\uFF09\u3011\u3017\u3015\uFF3D\uFF5D\u300B\u3009 ';
var BIAODIANVALIDATSTART = exports.BIAODIANVALIDATSTART = '\u300C\u300E\u201C\u2018\uFF08\u3010\u3016\u3014\uFF3B\uFF5B\u300A\u3008 ';
var INCOMPRESSIBLE = exports.INCOMPRESSIBLE = '‼⁇⸺—';
var COMPRESSLEFT = exports.COMPRESSLEFT = '「『“‘（【〖〔［｛《〈';

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCJK = isCJK;
/**
 * @author      Icemic Jia <bingfeng.web@gmail.com>
 * @copyright   2017 Icemic Jia
 * @link        https://github.com/Icemic/huozi.js
 * @license     https://github.com/Icemic/huozi.js/blob/master/LICENSE
 *
 * 本程序根据使用目的采用双授权的方式，你可以根据如下条款选择适合你的许可协议：
 * 
 * - 对于全部的使用目的，均可选择 GNU Affero General Public License 3.0。
 * - 对于非商业目的的使用，可选择 Apache License 2.0。此处非商业目的的定义和区分方法与 Creative Commons BY-NC 4.0 International 中的相关条目一致。
 * - 特别地，当用户将本程序与 AVG.js，或更具体的，avg-core 库同时使用时，无论用于商业或非商业，均可选择 Apache License 2.0。关于 AVG.js 的详情，请访问：https://github.com/avgjs/avg-core
 * - 特别地，当用户将本程序与 pixi-richtext (https://github.com/avgjs/pixi-richtext) 库同时使用时，无论用于商业或非商业，均可选择 Apache License 2.0。
 *
 * English Translation:
 * 
 * This software uses a dual license, you can choose the appropriate license under the following terms:
 * 
 * - GNU Affero General Public License 3.0 is available for all purposes.
 * - Apache License 2.0 is available for non-commercial use. The definition of non-commercial use is consistent with the relevant entries in Creative Commons BY-NC 4.0 International.
 * - In particular, Apache License 2.0 is available for users who use this software with AVG.js, or more specifically, the avg-core library, whether for commercial or non-commercial use. For more details about AVG.js, see: https://github.com/avgjs/avg-core
 * - In particular, Apache License 2.0 is available for users who use the pixi-richtext (https://github.com/avgjs/pixi-richtext) library, whether for commercial or non-commercial use.
 */

/**
 * reference:
 *  https://en.wikipedia.org/wiki/CJK_Unified_Ideographs
 *  https://en.wikipedia.org/wiki/CJK_Symbols_and_Punctuation
 *  http://jrgraphix.net/r/Unicode/
 */

var list = ['\\u1100-\\u11FF', // Hangul Jamo
'\\u2E80-\\u2EFF', // CJK Radicals Supplement
'\\u2F00-\\u2FDF', // Kangxi Radicals
'\\u2FF0-\\u2FFF', // Ideographic Description Characters
'\\u3000-\\u303F', // CJK Symbols and Punctuation
'\\u3040-\\u309F', // Hiragana
'\\u30A0-\\u30FF', // Katakana
'\\u3100-\\u312F', // Bopomofo
'\\u3130-\\u318F', // Hangul Compatibility Jamo
'\\u3190-\\u319F', // Kanbun 不是很懂你们日本人的“汉”文……
'\\u31A0-\\u31BF', // Bopomofo Extended
'\\u31F0-\\u31FF', // Katakana Phonetic Extensions
'\\u3200-\\u32FF', // Enclosed CJK Letters and Months
'\\u3300-\\u33FF', // CJK Compatibility
//  '\\u3300-\\u33FF\\uFE30-\\uFE4F\\uF900-\\uFAFF\\u{2F800}-\\u{2FA1F}', // Other CJK Ideographs in Unicode, not Unified
'\\u3400-\\u4DBF', // Ext-A
'\\u4DC0-\\u4DFF', // Yijing Hexagram Symbols, 为了收集这些字符我已经累到怀疑人生了，谁来给我算一卦……
'\\u4E00-\\u9FFF', // CJK
'\\uAC00-\\uD7AF', // Hangul Syllables
'\\uF900-\\uFAFF', // CJK Compatibility Ideograph
'\\uFE30-\\uFE4F', // CJK Compatibility Forms, 竖排样式的横排字符……
'\\uFF00-\\uFFEF', // Halfwidth and Fullwidth Forms
'\\u{1D300}-\\u{1D35F}', // Tai Xuan Jing Symbols,
'\\u{20000}-\\u{2A6DF}', // Ext-B
'\\u{2A700}-\\u{2B73F}', // Ext-C
'\\u{2B740}-\\u{2B81F}', // Ext-D
'\\u{2B820}-\\u{2CEAF}', // Ext-E
'\\u{2CEB0}-\\u{2EBEF}', // Ext-F
'\\u{2F800}-\\u{2FA1F}'];

var regex = void 0;

try {
  regex = new RegExp('[' + list.join('') + ']', 'u');
} catch (e) {
  regex = new RegExp('[' + list.slice(0, 21).join('') + ']');
}

function isCJK(text) {
  return regex.test(text);
}

// old version:
// /[\u3000-\u3003\u3005-\u303F；？，．：！]|[\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(text)

/***/ }),
/* 36 */
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
var View_1 = __webpack_require__(0);
var View_2 = __webpack_require__(3);
var Label_1 = __webpack_require__(22);
var Abstract_1 = __webpack_require__(1);
var ImageView_1 = __webpack_require__(23);
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(rect) {
        var _this = _super.call(this, rect) || this;
        _this.onTouchUpInside = undefined;
        _this._color = undefined;
        _this._vertical = false;
        _this._inset = 4.0;
        _this.imageView = new ImageView_1.ImageView();
        _this.titleLabel = new Label_1.Label();
        _this.titleLabel.numberOfLines = 1;
        _this.titleLabel.textAlignment = Abstract_1.TextAlignment.Center;
        _this.titleLabel.lineBreakMode = Abstract_1.LineBreakMode.TruncatingTail;
        _this.titleLabel.textColor = _this.tintColor;
        _this.titleLabel.font = new Abstract_1.Font(17);
        _this.longPressDuration = 150;
        _this.addSubview(_this.imageView);
        _this.addSubview(_this.titleLabel);
        _this.addTouches();
        return _this;
    }
    Button.prototype.tintColorDidChange = function () {
        this.titleLabel.textColor = this.color || this.tintColor;
    };
    Button.prototype.addTouches = function () {
        var _this = this;
        this.userInteractionEnabled = true;
        this.onTap = function () { _this.onTouchUpInside && _this.onTouchUpInside(); };
        this.onLongPress = function (state, viewLocation) {
            if (state == View_1.InteractionState.Began) {
                _this.titleLabel.alpha = 0.25;
                _this.imageView.alpha = 0.25;
                _this.onHighlighted && _this.onHighlighted(true);
            }
            else if (state == View_1.InteractionState.Changed) {
                if (viewLocation) {
                    if (viewLocation.x < -44.0 || viewLocation.y < -44.0 || viewLocation.x > _this.bounds.width + 44.0 || viewLocation.y > _this.bounds.height + 44.0) {
                        View_2.View.animationWithDuration(0.15, function () {
                            _this.titleLabel.alpha = 1.0;
                            _this.imageView.alpha = 1.0;
                        });
                        _this.onHighlighted && _this.onHighlighted(false);
                    }
                    else {
                        _this.titleLabel.alpha = 0.25;
                        _this.imageView.alpha = 0.25;
                        _this.onHighlighted && _this.onHighlighted(true);
                    }
                }
            }
            else if (state == View_1.InteractionState.Ended) {
                View_2.View.animationWithDuration(0.15, function () {
                    _this.titleLabel.alpha = 1.0;
                    _this.imageView.alpha = 1.0;
                });
                _this.onHighlighted && _this.onHighlighted(false);
                if (viewLocation && viewLocation.x > -44.0 && viewLocation.y > -44.0 && viewLocation.x < _this.bounds.width + 44.0 && viewLocation.y < _this.bounds.height + 44.0) {
                    _this.onTouchUpInside && _this.onTouchUpInside();
                }
            }
        };
    };
    Button.prototype.layoutSubviews = function () {
        _super.prototype.layoutSubviews.call(this);
        this.resetContentLayout();
    };
    Object.defineProperty(Button.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this.titleLabel.textColor = value || this.tintColor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "title", {
        get: function () {
            return this.titleLabel.text;
        },
        set: function (value) {
            this.titleLabel.text = value;
            this.resetContentLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "image", {
        set: function (value) {
            this.imageView.image = value;
            this.resetContentLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            if (this._vertical === value) {
                return;
            }
            this._vertical = value;
            this.resetContentLayout();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Button.prototype, "inset", {
        get: function () {
            return this._inset;
        },
        set: function (value) {
            if (this._inset === value) {
                return;
            }
            this._inset = value;
            this.resetContentLayout();
        },
        enumerable: true,
        configurable: true
    });
    Button.prototype.resetContentLayout = function () {
        if (this.imageView.image === undefined) {
            var textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
            if (textSize) {
                this.titleLabel.frame = {
                    x: (this.bounds.width - textSize.width) / 2,
                    y: (this.bounds.height - textSize.height) / 2,
                    width: textSize.width,
                    height: textSize.height
                };
            }
            else {
                this.titleLabel.frame = Abstract_1.RectZero;
            }
            this.imageView.frame = Abstract_1.RectZero;
        }
        else {
            if (this.vertical) {
                var textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
                if (textSize && textSize.height > 0) {
                    var contentHeight = this.imageView.image.size.height + textSize.height + this.inset;
                    this.imageView.frame = {
                        x: (this.bounds.width - this.imageView.image.size.width) / 2,
                        y: (this.bounds.height - contentHeight) / 2,
                        width: this.imageView.image.size.width,
                        height: this.imageView.image.size.height
                    };
                    this.titleLabel.frame = {
                        x: (this.bounds.width - textSize.width) / 2,
                        y: (this.bounds.height - contentHeight) / 2 + this.imageView.image.size.height + this.inset,
                        width: textSize.width,
                        height: textSize.height
                    };
                }
                else {
                    this.imageView.frame = { x: (this.bounds.width - this.imageView.image.size.width) / 2, y: (this.bounds.height - this.imageView.image.size.height) / 2, width: this.imageView.image.size.width, height: this.imageView.image.size.height };
                }
            }
            else {
                var textSize = this.titleLabel.intrinsicContentSize(this.bounds.width);
                if (textSize && textSize.width > 0) {
                    var contentWidth = this.imageView.image.size.width + textSize.width + this.inset;
                    this.imageView.frame = {
                        x: (this.bounds.width - contentWidth) / 2,
                        y: (this.bounds.height - this.imageView.image.size.height) / 2,
                        width: this.imageView.image.size.width,
                        height: this.imageView.image.size.height
                    };
                    this.titleLabel.frame = {
                        x: (this.bounds.width - contentWidth) / 2 + this.imageView.image.size.width + this.inset,
                        y: (this.bounds.height - textSize.height) / 2,
                        width: textSize.width,
                        height: textSize.height
                    };
                }
                else {
                    this.imageView.frame = { x: (this.bounds.width - this.imageView.image.size.width) / 2, y: (this.bounds.height - this.imageView.image.size.height) / 2, width: this.imageView.image.size.width, height: this.imageView.image.size.height };
                }
            }
        }
    };
    return Button;
}(View_2.View));
exports.Button = Button;


/***/ }),
/* 37 */
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
var View_1 = __webpack_require__(3);
var Abstract_1 = __webpack_require__(1);
var Scroller = __webpack_require__(38);
var ScrollView = (function (_super) {
    __extends(ScrollView, _super);
    function ScrollView(rect) {
        var _this = _super.call(this, rect) || this;
        _this._contentSize = Abstract_1.SizeZero;
        _this._contentOffset = Abstract_1.PointZero;
        _this._isScrollEnabled = true;
        _this._bounces = true;
        _this._isDirectionalLockEnabled = true;
        _this._showsHorizontalScrollIndicator = true;
        _this._showsVerticalScrollIndicator = true;
        _this._alwaysBounceVertical = false;
        _this._alwaysBounceHorizontal = false;
        // Touches
        _this._tracking = false;
        _this._indicatorHidingTimer = 0;
        _this._restoreInteractiveChildrenTimer = 0;
        _this.innerView = new View_1.View();
        _super.prototype.addSubview.call(_this, _this.innerView);
        _this.horizonalScrollIndicator = new View_1.View();
        _this.horizonalScrollIndicator.backgroundColor = new Abstract_1.Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff);
        _this.horizonalScrollIndicator.cornerRadius = 1.0;
        _this.horizonalScrollIndicator.alpha = 0.0;
        _super.prototype.addSubview.call(_this, _this.horizonalScrollIndicator);
        _this.verticalScrollIndicator = new View_1.View();
        _this.verticalScrollIndicator.backgroundColor = new Abstract_1.Color(0x8f / 0xff, 0x8f / 0xff, 0x90 / 0xff);
        _this.verticalScrollIndicator.cornerRadius = 1.0;
        _this.verticalScrollIndicator.alpha = 0.0;
        _super.prototype.addSubview.call(_this, _this.verticalScrollIndicator);
        _this.resetScroller();
        _this.resetIndicator();
        _this.activePanTouch();
        return _this;
    }
    Object.defineProperty(ScrollView.prototype, "contentSize", {
        get: function () {
            return this._contentSize;
        },
        set: function (value) {
            this._contentSize = value;
            this.innerView.frame = Abstract_1.RectMake(this.contentOffset.x, this.contentOffset.y, value.width, value.height);
            this.resetScroller();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "contentOffset", {
        get: function () {
            return this._contentOffset;
        },
        set: function (value) {
            this._contentOffset = value;
            this.innerView.frame = { x: -value.x, y: -value.y, width: this.innerView.frame.width, height: this.innerView.frame.height };
            this.resetIndicator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "isScrollEnabled", {
        get: function () {
            return this._isScrollEnabled;
        },
        set: function (value) {
            this._isScrollEnabled = value;
            this.resetScroller();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "bounces", {
        get: function () {
            return this._bounces;
        },
        set: function (value) {
            this._bounces = value;
            this.resetScroller();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "isDirectionalLockEnabled", {
        get: function () {
            return this._isDirectionalLockEnabled;
        },
        set: function (value) {
            this._isDirectionalLockEnabled = value;
            this.resetScroller();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "showsHorizontalScrollIndicator", {
        get: function () {
            return this._showsHorizontalScrollIndicator;
        },
        set: function (value) {
            this._showsHorizontalScrollIndicator = value;
            this.horizonalScrollIndicator.hidden = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "showsVerticalScrollIndicator", {
        get: function () {
            return this._showsVerticalScrollIndicator;
        },
        set: function (value) {
            this._showsVerticalScrollIndicator = value;
            this.verticalScrollIndicator.hidden = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "alwaysBounceVertical", {
        get: function () {
            return this._alwaysBounceVertical;
        },
        set: function (value) {
            this._alwaysBounceVertical = value;
            this.resetScroller();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollView.prototype, "alwaysBounceHorizontal", {
        get: function () {
            return this._alwaysBounceHorizontal;
        },
        set: function (value) {
            this._alwaysBounceHorizontal = value;
            this.resetScroller();
        },
        enumerable: true,
        configurable: true
    });
    ScrollView.prototype.layoutSubviews = function () {
        _super.prototype.layoutSubviews.call(this);
        this.resetScroller();
    };
    ScrollView.prototype.activePanTouch = function () {
        var _this = this;
        this.userInteractionEnabled = true;
        this.nativeObject.on("touchstart", function (event) {
            _this._tracking = true;
            _this.scroller.doTouchStart(event.data.originalEvent.touches, event.data.originalEvent.timeStamp);
            clearTimeout(_this._indicatorHidingTimer);
            View_1.View.animationWithDuration(0.15, function () {
                _this.verticalScrollIndicator.alpha = 1.0;
                _this.horizonalScrollIndicator.alpha = 1.0;
            });
        });
        this.nativeObject.on("touchmove", function (event) {
            event.data.originalEvent.preventDefault();
            _this.scroller.doTouchMove(event.data.originalEvent.touches, event.data.originalEvent.timeStamp, event.data.originalEvent.scale);
            clearTimeout(_this._restoreInteractiveChildrenTimer);
            _this.nativeObject.interactiveChildren = false;
        });
        this.nativeObject.on("touchend", function (event) {
            _this._tracking = false;
            _this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
            clearTimeout(_this._indicatorHidingTimer);
            _this._indicatorHidingTimer = setTimeout(_this.hideIndicator.bind(_this), 250);
        });
        this.nativeObject.on("touchendoutside", function (event) {
            _this._tracking = false;
            _this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
            clearTimeout(_this._indicatorHidingTimer);
            _this._indicatorHidingTimer = setTimeout(_this.hideIndicator.bind(_this), 250);
        });
        this.nativeObject.on("touchcancel", function (event) {
            _this._tracking = false;
            _this.scroller.doTouchEnd(event.data.originalEvent.timeStamp);
            clearTimeout(_this._indicatorHidingTimer);
            _this._indicatorHidingTimer = setTimeout(_this.hideIndicator.bind(_this), 250);
        });
    };
    ScrollView.prototype.resetScroller = function () {
        if (this.scroller === undefined) {
            this.scroller = new Scroller(this.handleScroll.bind(this));
        }
        this.scroller.options.scrollingX = this.isScrollEnabled && (this.contentSize.width > this.bounds.width || this.alwaysBounceHorizontal);
        this.scroller.options.scrollingY = this.isScrollEnabled && (this.contentSize.height > this.bounds.height || this.alwaysBounceVertical);
        this.scroller.options.bouncing = this.bounces;
        this.scroller.options.locking = this.isDirectionalLockEnabled;
        this.scroller.setDimensions(this.bounds.width, this.bounds.height, this.contentSize.width, this.contentSize.height);
    };
    ScrollView.prototype.handleScroll = function (x, y) {
        var _this = this;
        this.contentOffset = { x: x, y: y };
        this.onScroll && this.onScroll(this);
        clearTimeout(this._indicatorHidingTimer);
        this._indicatorHidingTimer = setTimeout(this.hideIndicator.bind(this), 250);
        clearTimeout(this._restoreInteractiveChildrenTimer);
        this._restoreInteractiveChildrenTimer = setTimeout(function () { _this.nativeObject.interactiveChildren = true; }, 150);
    };
    // Indicators
    ScrollView.prototype.resetIndicator = function () {
        if (this.contentSize.height > this.bounds.height) {
            var yProgress = this.contentOffset.y / (this.contentSize.height - this.bounds.height);
            var yHeight = this.bounds.height / (this.contentSize.height / this.bounds.height);
            this.verticalScrollIndicator.frame = { x: this.bounds.width - 4, y: yProgress * (this.bounds.height - yHeight), width: 2, height: yHeight };
        }
        else {
            this.verticalScrollIndicator.frame = { x: this.bounds.width - 4, y: 0, width: 2, height: 0 };
        }
        if (this.contentSize.width > this.bounds.width) {
            var xProgress = this.contentOffset.x / (this.contentSize.width - this.bounds.width);
            var xWidth = this.bounds.width / (this.contentSize.width / this.bounds.width);
            this.horizonalScrollIndicator.frame = { x: xProgress * (this.bounds.width - xWidth), y: this.bounds.height - 4, width: xWidth, height: 2 };
        }
        else {
            this.horizonalScrollIndicator.frame = { x: 0, y: this.bounds.height - 4, width: 0, height: 2 };
        }
    };
    ScrollView.prototype.hideIndicator = function () {
        var _this = this;
        if (this._tracking) {
            return;
        }
        View_1.View.animationWithDuration(0.15, function () {
            _this.verticalScrollIndicator.alpha = 0.0;
            _this.horizonalScrollIndicator.alpha = 0.0;
        });
    };
    // Proxy method call to innerView
    ScrollView.prototype.insertSubviewAtIndex = function (subview, atIndex) {
        this.innerView.insertSubviewAtIndex(subview, atIndex);
    };
    ScrollView.prototype.exchangeSubviewAtIndex = function (index1, index2) {
        this.innerView.exchangeSubviewAtIndex(index1, index2);
    };
    ScrollView.prototype.addSubview = function (subview) {
        this.innerView.addSubview(subview);
    };
    ScrollView.prototype.insertSubviewBelow = function (subview, siblingSubview) {
        this.innerView.insertSubviewBelow(subview, siblingSubview);
    };
    ScrollView.prototype.insertSubviewAbove = function (subview, siblingSubview) {
        this.innerView.insertSubviewAbove(subview, siblingSubview);
    };
    ScrollView.prototype.bringSubviewToFront = function (subview) {
        this.innerView.bringSubviewToFront(subview);
    };
    ScrollView.prototype.sendSubviewToBack = function (subview) {
        this.innerView.sendSubviewToBack(subview);
    };
    Object.defineProperty(ScrollView.prototype, "constraints", {
        get: function () {
            return this.innerView.constraints;
        },
        enumerable: true,
        configurable: true
    });
    ScrollView.prototype.addConstraint = function (constraint) {
        this.innerView.addConstraint(constraint);
    };
    ScrollView.prototype.addConstraints = function (constraints) {
        this.innerView.addConstraints(constraints);
    };
    ScrollView.prototype.removeConstraint = function (constraint) {
        this.innerView.removeConstraint(constraint);
    };
    ScrollView.prototype.removeAllConstraints = function () {
        this.innerView.removeAllConstraints();
    };
    return ScrollView;
}(View_1.View));
exports.ScrollView = ScrollView;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

var core = __webpack_require__(40);
var Scroller;

(function() {
	var NOOP = function(){};

	/**
	 * A pure logic 'component' for 'virtual' scrolling/zooming.
	 */
	Scroller = function(callback, options) {

		this.__callback = callback;

		this.options = {

			/** Enable scrolling on x-axis */
			scrollingX: true,

			/** Enable scrolling on y-axis */
			scrollingY: true,

			/** Enable animations for deceleration, snap back, zooming and scrolling */
			animating: true,

			/** duration for animations triggered by scrollTo/zoomTo */
			animationDuration: 250,

			/** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
			bouncing: true,

			/** Enable locking to the main axis if user moves only slightly on one of them at start */
			locking: true,

			/** Enable pagination mode (switching between full page content panes) */
			paging: false,

			/** Enable snapping of content to a configured pixel grid */
			snapping: false,

			/** Enable zooming of content via API, fingers and mouse wheel */
			zooming: false,

			/** Minimum zoom level */
			minZoom: 0.5,

			/** Maximum zoom level */
			maxZoom: 3,

			/** Multiply or decrease scrolling speed **/
			speedMultiplier: 1,

			/** Callback that is fired on the later of touch end or deceleration end,
				provided that another scrolling action has not begun. Used to know
				when to fade out a scrollbar. */
			scrollingComplete: NOOP,

			/** Increase or decrease the amount of friction applied to deceleration **/
			decelerationRate: 0.95,
			
			/** This configures the amount of change applied to deceleration when reaching boundaries  **/
            penetrationDeceleration : 0.03,

            /** This configures the amount of change applied to acceleration when reaching boundaries  **/
            penetrationAcceleration : 0.08

		};

		for (var key in options) {
			this.options[key] = options[key];
		}

	};


	// Easing Equations (c) 2003 Robert Penner, all rights reserved.
	// Open source under the BSD License.

	/**
	 * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
	**/
	var easeOutCubic = function(pos) {
		return (Math.pow((pos - 1), 3) + 1);
	};

	/**
	 * @param pos {Number} position between 0 (start of effect) and 1 (end of effect)
	**/
	var easeInOutCubic = function(pos) {
		if ((pos /= 0.5) < 1) {
			return 0.5 * Math.pow(pos, 3);
		}

		return 0.5 * (Math.pow((pos - 2), 3) + 2);
	};


	var members = {

		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: STATUS
		---------------------------------------------------------------------------
		*/

		/** {Boolean} Whether only a single finger is used in touch handling */
		__isSingleTouch: false,

		/** {Boolean} Whether a touch event sequence is in progress */
		__isTracking: false,

		/** {Boolean} Whether a deceleration animation went to completion. */
		__didDecelerationComplete: false,

		/**
		 * {Boolean} Whether a gesture zoom/rotate event is in progress. Activates when
		 * a gesturestart event happens. This has higher priority than dragging.
		 */
		__isGesturing: false,

		/**
		 * {Boolean} Whether the user has moved by such a distance that we have enabled
		 * dragging mode. Hint: It's only enabled after some pixels of movement to
		 * not interrupt with clicks etc.
		 */
		__isDragging: false,

		/**
		 * {Boolean} Not touching and dragging anymore, and smoothly animating the
		 * touch sequence using deceleration.
		 */
		__isDecelerating: false,

		/**
		 * {Boolean} Smoothly animating the currently configured change
		 */
		__isAnimating: false,



		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: DIMENSIONS
		---------------------------------------------------------------------------
		*/

		/** {Integer} Available outer left position (from document perspective) */
		__clientLeft: 0,

		/** {Integer} Available outer top position (from document perspective) */
		__clientTop: 0,

		/** {Integer} Available outer width */
		__clientWidth: 0,

		/** {Integer} Available outer height */
		__clientHeight: 0,

		/** {Integer} Outer width of content */
		__contentWidth: 0,

		/** {Integer} Outer height of content */
		__contentHeight: 0,

		/** {Integer} Snapping width for content */
		__snapWidth: 100,

		/** {Integer} Snapping height for content */
		__snapHeight: 100,

		/** {Integer} Height to assign to refresh area */
		__refreshHeight: null,

		/** {Boolean} Whether the refresh process is enabled when the event is released now */
		__refreshActive: false,

		/** {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release */
		__refreshActivate: null,

		/** {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled */
		__refreshDeactivate: null,

		/** {Function} Callback to execute to start the actual refresh. Call {@link #refreshFinish} when done */
		__refreshStart: null,

		/** {Number} Zoom level */
		__zoomLevel: 1,

		/** {Number} Scroll position on x-axis */
		__scrollLeft: 0,

		/** {Number} Scroll position on y-axis */
		__scrollTop: 0,

		/** {Integer} Maximum allowed scroll position on x-axis */
		__maxScrollLeft: 0,

		/** {Integer} Maximum allowed scroll position on y-axis */
		__maxScrollTop: 0,

		/* {Number} Scheduled left position (final position when animating) */
		__scheduledLeft: 0,

		/* {Number} Scheduled top position (final position when animating) */
		__scheduledTop: 0,

		/* {Number} Scheduled zoom level (final scale when animating) */
		__scheduledZoom: 0,



		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: LAST POSITIONS
		---------------------------------------------------------------------------
		*/

		/** {Number} Left position of finger at start */
		__lastTouchLeft: null,

		/** {Number} Top position of finger at start */
		__lastTouchTop: null,

		/** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
		__lastTouchMove: null,

		/** {Array} List of positions, uses three indexes for each state: left, top, timestamp */
		__positions: null,



		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: DECELERATION SUPPORT
		---------------------------------------------------------------------------
		*/

		/** {Integer} Minimum left scroll position during deceleration */
		__minDecelerationScrollLeft: null,

		/** {Integer} Minimum top scroll position during deceleration */
		__minDecelerationScrollTop: null,

		/** {Integer} Maximum left scroll position during deceleration */
		__maxDecelerationScrollLeft: null,

		/** {Integer} Maximum top scroll position during deceleration */
		__maxDecelerationScrollTop: null,

		/** {Number} Current factor to modify horizontal scroll position with on every step */
		__decelerationVelocityX: null,

		/** {Number} Current factor to modify vertical scroll position with on every step */
		__decelerationVelocityY: null,



		/*
		---------------------------------------------------------------------------
			PUBLIC API
		---------------------------------------------------------------------------
		*/

		/**
		 * Configures the dimensions of the client (outer) and content (inner) elements.
		 * Requires the available space for the outer element and the outer size of the inner element.
		 * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
		 *
		 * @param clientWidth {Integer ? null} Inner width of outer element
		 * @param clientHeight {Integer ? null} Inner height of outer element
		 * @param contentWidth {Integer ? null} Outer width of inner element
		 * @param contentHeight {Integer ? null} Outer height of inner element
		 */
		setDimensions: function(clientWidth, clientHeight, contentWidth, contentHeight) {

			var self = this;

			// Only update values which are defined
			if (clientWidth === +clientWidth) {
				self.__clientWidth = clientWidth;
			}

			if (clientHeight === +clientHeight) {
				self.__clientHeight = clientHeight;
			}

			if (contentWidth === +contentWidth) {
				self.__contentWidth = contentWidth;
			}

			if (contentHeight === +contentHeight) {
				self.__contentHeight = contentHeight;
			}

			// Refresh maximums
			self.__computeScrollMax();

			// Refresh scroll position
			self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

		},


		/**
		 * Sets the client coordinates in relation to the document.
		 *
		 * @param left {Integer ? 0} Left position of outer element
		 * @param top {Integer ? 0} Top position of outer element
		 */
		setPosition: function(left, top) {

			var self = this;

			self.__clientLeft = left || 0;
			self.__clientTop = top || 0;

		},


		/**
		 * Configures the snapping (when snapping is active)
		 *
		 * @param width {Integer} Snapping width
		 * @param height {Integer} Snapping height
		 */
		setSnapSize: function(width, height) {

			var self = this;

			self.__snapWidth = width;
			self.__snapHeight = height;

		},


		/**
		 * Activates pull-to-refresh. A special zone on the top of the list to start a list refresh whenever
		 * the user event is released during visibility of this zone. This was introduced by some apps on iOS like
		 * the official Twitter client.
		 *
		 * @param height {Integer} Height of pull-to-refresh zone on top of rendered list
		 * @param activateCallback {Function} Callback to execute on activation. This is for signalling the user about a refresh is about to happen when he release.
		 * @param deactivateCallback {Function} Callback to execute on deactivation. This is for signalling the user about the refresh being cancelled.
		 * @param startCallback {Function} Callback to execute to start the real async refresh action. Call {@link #finishPullToRefresh} after finish of refresh.
		 */
		activatePullToRefresh: function(height, activateCallback, deactivateCallback, startCallback) {

			var self = this;

			self.__refreshHeight = height;
			self.__refreshActivate = activateCallback;
			self.__refreshDeactivate = deactivateCallback;
			self.__refreshStart = startCallback;

		},


		/**
		 * Starts pull-to-refresh manually.
		 */
		triggerPullToRefresh: function() {
			// Use publish instead of scrollTo to allow scrolling to out of boundary position
			// We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
			this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);

			if (this.__refreshStart) {
				this.__refreshStart();
			}
		},


		/**
		 * Signalizes that pull-to-refresh is finished.
		 */
		finishPullToRefresh: function() {

			var self = this;

			self.__refreshActive = false;
			if (self.__refreshDeactivate) {
				self.__refreshDeactivate();
			}

			self.scrollTo(self.__scrollLeft, self.__scrollTop, true);

		},


		/**
		 * Returns the scroll position and zooming values
		 *
		 * @return {Map} `left` and `top` scroll position and `zoom` level
		 */
		getValues: function() {

			var self = this;

			return {
				left: self.__scrollLeft,
				top: self.__scrollTop,
				zoom: self.__zoomLevel
			};

		},


		/**
		 * Returns the maximum scroll values
		 *
		 * @return {Map} `left` and `top` maximum scroll values
		 */
		getScrollMax: function() {

			var self = this;

			return {
				left: self.__maxScrollLeft,
				top: self.__maxScrollTop
			};

		},


		/**
		 * Zooms to the given level. Supports optional animation. Zooms
		 * the center when no coordinates are given.
		 *
		 * @param level {Number} Level to zoom to
		 * @param animate {Boolean ? false} Whether to use animation
		 * @param originLeft {Number ? null} Zoom in at given left coordinate
		 * @param originTop {Number ? null} Zoom in at given top coordinate
		 * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
		 */
		zoomTo: function(level, animate, originLeft, originTop, callback) {

			var self = this;

			if (!self.options.zooming) {
				throw new Error("Zooming is not enabled!");
			}

			// Add callback if exists
			if(callback) {
				self.__zoomComplete = callback;
			}

			// Stop deceleration
			if (self.__isDecelerating) {
				core.effect.Animate.stop(self.__isDecelerating);
				self.__isDecelerating = false;
			}

			var oldLevel = self.__zoomLevel;

			// Normalize input origin to center of viewport if not defined
			if (originLeft == null) {
				originLeft = self.__clientWidth / 2;
			}

			if (originTop == null) {
				originTop = self.__clientHeight / 2;
			}

			// Limit level according to configuration
			level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

			// Recompute maximum values while temporary tweaking maximum scroll ranges
			self.__computeScrollMax(level);

			// Recompute left and top coordinates based on new zoom level
			var left = ((originLeft + self.__scrollLeft) * level / oldLevel) - originLeft;
			var top = ((originTop + self.__scrollTop) * level / oldLevel) - originTop;

			// Limit x-axis
			if (left > self.__maxScrollLeft) {
				left = self.__maxScrollLeft;
			} else if (left < 0) {
				left = 0;
			}

			// Limit y-axis
			if (top > self.__maxScrollTop) {
				top = self.__maxScrollTop;
			} else if (top < 0) {
				top = 0;
			}

			// Push values out
			self.__publish(left, top, level, animate);

		},


		/**
		 * Zooms the content by the given factor.
		 *
		 * @param factor {Number} Zoom by given factor
		 * @param animate {Boolean ? false} Whether to use animation
		 * @param originLeft {Number ? 0} Zoom in at given left coordinate
		 * @param originTop {Number ? 0} Zoom in at given top coordinate
		 * @param callback {Function ? null} A callback that gets fired when the zoom is complete.
		 */
		zoomBy: function(factor, animate, originLeft, originTop, callback) {

			var self = this;

			self.zoomTo(self.__zoomLevel * factor, animate, originLeft, originTop, callback);

		},


		/**
		 * Scrolls to the given position. Respect limitations and snapping automatically.
		 *
		 * @param left {Number?null} Horizontal scroll position, keeps current if value is <code>null</code>
		 * @param top {Number?null} Vertical scroll position, keeps current if value is <code>null</code>
		 * @param animate {Boolean?false} Whether the scrolling should happen using an animation
		 * @param zoom {Number?null} Zoom level to go to
		 */
		scrollTo: function(left, top, animate, zoom) {

			var self = this;

			// Stop deceleration
			if (self.__isDecelerating) {
				core.effect.Animate.stop(self.__isDecelerating);
				self.__isDecelerating = false;
			}

			// Correct coordinates based on new zoom level
			if (zoom != null && zoom !== self.__zoomLevel) {

				if (!self.options.zooming) {
					throw new Error("Zooming is not enabled!");
				}

				left *= zoom;
				top *= zoom;

				// Recompute maximum values while temporary tweaking maximum scroll ranges
				self.__computeScrollMax(zoom);

			} else {

				// Keep zoom when not defined
				zoom = self.__zoomLevel;

			}

			if (!self.options.scrollingX) {

				left = self.__scrollLeft;

			} else {

				if (self.options.paging) {
					left = Math.round(left / self.__clientWidth) * self.__clientWidth;
				} else if (self.options.snapping) {
					left = Math.round(left / self.__snapWidth) * self.__snapWidth;
				}

			}

			if (!self.options.scrollingY) {

				top = self.__scrollTop;

			} else {

				if (self.options.paging) {
					top = Math.round(top / self.__clientHeight) * self.__clientHeight;
				} else if (self.options.snapping) {
					top = Math.round(top / self.__snapHeight) * self.__snapHeight;
				}

			}

			// Limit for allowed ranges
			left = Math.max(Math.min(self.__maxScrollLeft, left), 0);
			top = Math.max(Math.min(self.__maxScrollTop, top), 0);

			// Don't animate when no change detected, still call publish to make sure
			// that rendered position is really in-sync with internal data
			if (left === self.__scrollLeft && top === self.__scrollTop) {
				animate = false;
			}

			// Publish new values
			self.__publish(left, top, zoom, animate);

		},


		/**
		 * Scroll by the given offset
		 *
		 * @param left {Number ? 0} Scroll x-axis by given offset
		 * @param top {Number ? 0} Scroll x-axis by given offset
		 * @param animate {Boolean ? false} Whether to animate the given change
		 */
		scrollBy: function(left, top, animate) {

			var self = this;

			var startLeft = self.__isAnimating ? self.__scheduledLeft : self.__scrollLeft;
			var startTop = self.__isAnimating ? self.__scheduledTop : self.__scrollTop;

			self.scrollTo(startLeft + (left || 0), startTop + (top || 0), animate);

		},



		/*
		---------------------------------------------------------------------------
			EVENT CALLBACKS
		---------------------------------------------------------------------------
		*/

		/**
		 * Mouse wheel handler for zooming support
		 */
		doMouseZoom: function(wheelDelta, timeStamp, pageX, pageY) {

			var self = this;
			var change = wheelDelta > 0 ? 0.97 : 1.03;

			return self.zoomTo(self.__zoomLevel * change, false, pageX - self.__clientLeft, pageY - self.__clientTop);

		},


		/**
		 * Touch start handler for scrolling support
		 */
		doTouchStart: function(touches, timeStamp) {

			// Array-like check is enough here
			if (touches.length == null) {
				throw new Error("Invalid touch list: " + touches);
			}

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			var self = this;

			// Reset interruptedAnimation flag
			self.__interruptedAnimation = true;

			// Stop deceleration
			if (self.__isDecelerating) {
				core.effect.Animate.stop(self.__isDecelerating);
				self.__isDecelerating = false;
				self.__interruptedAnimation = true;
			}

			// Stop animation
			if (self.__isAnimating) {
				core.effect.Animate.stop(self.__isAnimating);
				self.__isAnimating = false;
				self.__interruptedAnimation = true;
			}

			// Use center point when dealing with two fingers
			var currentTouchLeft, currentTouchTop;
			var isSingleTouch = touches.length === 1;
			if (isSingleTouch) {
				currentTouchLeft = touches[0].pageX;
				currentTouchTop = touches[0].pageY;
			} else {
				currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
				currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
			}

			// Store initial positions
			self.__initialTouchLeft = currentTouchLeft;
			self.__initialTouchTop = currentTouchTop;

			// Store current zoom level
			self.__zoomLevelStart = self.__zoomLevel;

			// Store initial touch positions
			self.__lastTouchLeft = currentTouchLeft;
			self.__lastTouchTop = currentTouchTop;

			// Store initial move time stamp
			self.__lastTouchMove = timeStamp;

			// Reset initial scale
			self.__lastScale = 1;

			// Reset locking flags
			self.__enableScrollX = !isSingleTouch && self.options.scrollingX;
			self.__enableScrollY = !isSingleTouch && self.options.scrollingY;

			// Reset tracking flag
			self.__isTracking = true;

			// Reset deceleration complete flag
			self.__didDecelerationComplete = false;

			// Dragging starts directly with two fingers, otherwise lazy with an offset
			self.__isDragging = !isSingleTouch;

			// Some features are disabled in multi touch scenarios
			self.__isSingleTouch = isSingleTouch;

			// Clearing data structure
			self.__positions = [];

		},


		/**
		 * Touch move handler for scrolling support
		 */
		doTouchMove: function(touches, timeStamp, scale) {

			// Array-like check is enough here
			if (touches.length == null) {
				throw new Error("Invalid touch list: " + touches);
			}

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			var self = this;

			// Ignore event when tracking is not enabled (event might be outside of element)
			if (!self.__isTracking) {
				return;
			}


			var currentTouchLeft, currentTouchTop;

			// Compute move based around of center of fingers
			if (touches.length === 2) {
				currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
				currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
			} else {
				currentTouchLeft = touches[0].pageX;
				currentTouchTop = touches[0].pageY;
			}

			var positions = self.__positions;

			// Are we already is dragging mode?
			if (self.__isDragging) {

				// Compute move distance
				var moveX = currentTouchLeft - self.__lastTouchLeft;
				var moveY = currentTouchTop - self.__lastTouchTop;

				// Read previous scroll position and zooming
				var scrollLeft = self.__scrollLeft;
				var scrollTop = self.__scrollTop;
				var level = self.__zoomLevel;

				// Work with scaling
				if (scale != null && self.options.zooming) {

					var oldLevel = level;

					// Recompute level based on previous scale and new scale
					level = level / self.__lastScale * scale;

					// Limit level according to configuration
					level = Math.max(Math.min(level, self.options.maxZoom), self.options.minZoom);

					// Only do further compution when change happened
					if (oldLevel !== level) {

						// Compute relative event position to container
						var currentTouchLeftRel = currentTouchLeft - self.__clientLeft;
						var currentTouchTopRel = currentTouchTop - self.__clientTop;

						// Recompute left and top coordinates based on new zoom level
						scrollLeft = ((currentTouchLeftRel + scrollLeft) * level / oldLevel) - currentTouchLeftRel;
						scrollTop = ((currentTouchTopRel + scrollTop) * level / oldLevel) - currentTouchTopRel;

						// Recompute max scroll values
						self.__computeScrollMax(level);

					}
				}

				if (self.__enableScrollX) {

					scrollLeft -= moveX * this.options.speedMultiplier;
					var maxScrollLeft = self.__maxScrollLeft;

					if (scrollLeft > maxScrollLeft || scrollLeft < 0) {

						// Slow down on the edges
						if (self.options.bouncing) {

							scrollLeft += (moveX / 2  * this.options.speedMultiplier);

						} else if (scrollLeft > maxScrollLeft) {

							scrollLeft = maxScrollLeft;

						} else {

							scrollLeft = 0;

						}
					}
				}

				// Compute new vertical scroll position
				if (self.__enableScrollY) {

					scrollTop -= moveY * this.options.speedMultiplier;
					var maxScrollTop = self.__maxScrollTop;

					if (scrollTop > maxScrollTop || scrollTop < 0) {

						// Slow down on the edges
						if (self.options.bouncing) {

							scrollTop += (moveY / 2 * this.options.speedMultiplier);

							// Support pull-to-refresh (only when only y is scrollable)
							if (!self.__enableScrollX && self.__refreshHeight != null) {

								if (!self.__refreshActive && scrollTop <= -self.__refreshHeight) {

									self.__refreshActive = true;
									if (self.__refreshActivate) {
										self.__refreshActivate();
									}

								} else if (self.__refreshActive && scrollTop > -self.__refreshHeight) {

									self.__refreshActive = false;
									if (self.__refreshDeactivate) {
										self.__refreshDeactivate();
									}

								}
							}

						} else if (scrollTop > maxScrollTop) {

							scrollTop = maxScrollTop;

						} else {

							scrollTop = 0;

						}
					}
				}

				// Keep list from growing infinitely (holding min 10, max 20 measure points)
				if (positions.length > 60) {
					positions.splice(0, 30);
				}

				// Track scroll movement for decleration
				positions.push(scrollLeft, scrollTop, timeStamp);

				// Sync scroll position
				self.__publish(scrollLeft, scrollTop, level);

			// Otherwise figure out whether we are switching into dragging mode now.
			} else {

				var minimumTrackingForScroll = self.options.locking ? 3 : 0;
				var minimumTrackingForDrag = 5;

				var distanceX = Math.abs(currentTouchLeft - self.__initialTouchLeft);
				var distanceY = Math.abs(currentTouchTop - self.__initialTouchTop);

				self.__enableScrollX = self.options.scrollingX && distanceX >= minimumTrackingForScroll;
				self.__enableScrollY = self.options.scrollingY && distanceY >= minimumTrackingForScroll;

				positions.push(self.__scrollLeft, self.__scrollTop, timeStamp);

				self.__isDragging = (self.__enableScrollX || self.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
				if (self.__isDragging) {
					self.__interruptedAnimation = false;
				}

			}

			// Update last touch positions and time stamp for next event
			self.__lastTouchLeft = currentTouchLeft;
			self.__lastTouchTop = currentTouchTop;
			self.__lastTouchMove = timeStamp;
			self.__lastScale = scale;

		},


		/**
		 * Touch end handler for scrolling support
		 */
		doTouchEnd: function(timeStamp) {

			if (timeStamp instanceof Date) {
				timeStamp = timeStamp.valueOf();
			}
			if (typeof timeStamp !== "number") {
				throw new Error("Invalid timestamp value: " + timeStamp);
			}

			var self = this;

			// Ignore event when tracking is not enabled (no touchstart event on element)
			// This is required as this listener ('touchmove') sits on the document and not on the element itself.
			if (!self.__isTracking) {
				return;
			}

			// Not touching anymore (when two finger hit the screen there are two touch end events)
			self.__isTracking = false;

			// Be sure to reset the dragging flag now. Here we also detect whether
			// the finger has moved fast enough to switch into a deceleration animation.
			if (self.__isDragging) {

				// Reset dragging flag
				self.__isDragging = false;

				// Start deceleration
				// Verify that the last move detected was in some relevant time frame
				if (self.__isSingleTouch && self.options.animating && (timeStamp - self.__lastTouchMove) <= 100) {

					// Then figure out what the scroll position was about 100ms ago
					var positions = self.__positions;
					var endPos = positions.length - 1;
					var startPos = endPos;

					// Move pointer to position measured 100ms ago
					for (var i = endPos; i > 0 && positions[i] > (self.__lastTouchMove - 100); i -= 3) {
						startPos = i;
					}

					// If we haven't received consecutive touchmove events within a 100ms
					// timeframe, attempt a best-effort based on the first position. This
					// typically happens when an expensive operation occurs on the main
					// thread during scrolling, such as image decoding.
					if (startPos === endPos && positions.length > 5) {
						startPos = 2;
					}

					// If start and stop position is identical in a 100ms timeframe,
					// we cannot compute any useful deceleration.
					if (startPos !== endPos) {

						// Compute relative movement between these two points
						var timeOffset = positions[endPos] - positions[startPos];
						var movedLeft = self.__scrollLeft - positions[startPos - 2];
						var movedTop = self.__scrollTop - positions[startPos - 1];

						// Based on 50ms compute the movement to apply for each render step
						self.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
						self.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

						// How much velocity is required to start the deceleration
						var minVelocityToStartDeceleration = self.options.paging || self.options.snapping ? 4 : 1;

						// Verify that we have enough velocity to start deceleration
						if (Math.abs(self.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(self.__decelerationVelocityY) > minVelocityToStartDeceleration) {

							// Deactivate pull-to-refresh when decelerating
							if (!self.__refreshActive) {
								self.__startDeceleration(timeStamp);
							}
						}
					} else {
						self.options.scrollingComplete();
					}
				} else if ((timeStamp - self.__lastTouchMove) > 100) {
					self.options.scrollingComplete();
	 			}
			}

			// If this was a slower move it is per default non decelerated, but this
			// still means that we want snap back to the bounds which is done here.
			// This is placed outside the condition above to improve edge case stability
			// e.g. touchend fired without enabled dragging. This should normally do not
			// have modified the scroll positions or even showed the scrollbars though.
			if (!self.__isDecelerating) {

				if (self.__refreshActive && self.__refreshStart) {

					// Use publish instead of scrollTo to allow scrolling to out of boundary position
					// We don't need to normalize scrollLeft, zoomLevel, etc. here because we only y-scrolling when pull-to-refresh is enabled
					self.__publish(self.__scrollLeft, -self.__refreshHeight, self.__zoomLevel, true);

					if (self.__refreshStart) {
						self.__refreshStart();
					}

				} else {

					if (self.__interruptedAnimation || self.__isDragging) {
						self.options.scrollingComplete();
					}
					self.scrollTo(self.__scrollLeft, self.__scrollTop, true, self.__zoomLevel);

					// Directly signalize deactivation (nothing todo on refresh?)
					if (self.__refreshActive) {

						self.__refreshActive = false;
						if (self.__refreshDeactivate) {
							self.__refreshDeactivate();
						}

					}
				}
			}

			// Fully cleanup list
			self.__positions.length = 0;

		},



		/*
		---------------------------------------------------------------------------
			PRIVATE API
		---------------------------------------------------------------------------
		*/

		/**
		 * Applies the scroll position to the content element
		 *
		 * @param left {Number} Left scroll position
		 * @param top {Number} Top scroll position
		 * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
		 */
		__publish: function(left, top, zoom, animate) {

			var self = this;

			// Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
			var wasAnimating = self.__isAnimating;
			if (wasAnimating) {
				core.effect.Animate.stop(wasAnimating);
				self.__isAnimating = false;
			}

			if (animate && self.options.animating) {

				// Keep scheduled positions for scrollBy/zoomBy functionality
				self.__scheduledLeft = left;
				self.__scheduledTop = top;
				self.__scheduledZoom = zoom;

				var oldLeft = self.__scrollLeft;
				var oldTop = self.__scrollTop;
				var oldZoom = self.__zoomLevel;

				var diffLeft = left - oldLeft;
				var diffTop = top - oldTop;
				var diffZoom = zoom - oldZoom;

				var step = function(percent, now, render) {

					if (render) {

						self.__scrollLeft = oldLeft + (diffLeft * percent);
						self.__scrollTop = oldTop + (diffTop * percent);
						self.__zoomLevel = oldZoom + (diffZoom * percent);

						// Push values out
						if (self.__callback) {
							self.__callback(self.__scrollLeft, self.__scrollTop, self.__zoomLevel);
						}

					}
				};

				var verify = function(id) {
					return self.__isAnimating === id;
				};

				var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
					if (animationId === self.__isAnimating) {
						self.__isAnimating = false;
					}
					if (self.__didDecelerationComplete || wasFinished) {
						self.options.scrollingComplete();
					}

					if (self.options.zooming) {
						self.__computeScrollMax();
						if(self.__zoomComplete) {
							self.__zoomComplete();
							self.__zoomComplete = null;
						}
					}
				};

				// When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
				self.__isAnimating = core.effect.Animate.start(step, verify, completed, self.options.animationDuration, wasAnimating ? easeOutCubic : easeInOutCubic);

			} else {

				self.__scheduledLeft = self.__scrollLeft = left;
				self.__scheduledTop = self.__scrollTop = top;
				self.__scheduledZoom = self.__zoomLevel = zoom;

				// Push values out
				if (self.__callback) {
					self.__callback(left, top, zoom);
				}

				// Fix max scroll ranges
				if (self.options.zooming) {
					self.__computeScrollMax();
					if(self.__zoomComplete) {
						self.__zoomComplete();
						self.__zoomComplete = null;
					}
				}
			}
		},


		/**
		 * Recomputes scroll minimum values based on client dimensions and content dimensions.
		 */
		__computeScrollMax: function(zoomLevel) {

			var self = this;

			if (zoomLevel == null) {
				zoomLevel = self.__zoomLevel;
			}

			self.__maxScrollLeft = Math.max((self.__contentWidth * zoomLevel) - self.__clientWidth, 0);
			self.__maxScrollTop = Math.max((self.__contentHeight * zoomLevel) - self.__clientHeight, 0);

		},



		/*
		---------------------------------------------------------------------------
			ANIMATION (DECELERATION) SUPPORT
		---------------------------------------------------------------------------
		*/

		/**
		 * Called when a touch sequence end and the speed of the finger was high enough
		 * to switch into deceleration mode.
		 */
		__startDeceleration: function(timeStamp) {

			var self = this;

			if (self.options.paging) {

				var scrollLeft = Math.max(Math.min(self.__scrollLeft, self.__maxScrollLeft), 0);
				var scrollTop = Math.max(Math.min(self.__scrollTop, self.__maxScrollTop), 0);
				var clientWidth = self.__clientWidth;
				var clientHeight = self.__clientHeight;

				// We limit deceleration not to the min/max values of the allowed range, but to the size of the visible client area.
				// Each page should have exactly the size of the client area.
				self.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
				self.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
				self.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
				self.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;

			} else {

				self.__minDecelerationScrollLeft = 0;
				self.__minDecelerationScrollTop = 0;
				self.__maxDecelerationScrollLeft = self.__maxScrollLeft;
				self.__maxDecelerationScrollTop = self.__maxScrollTop;

			}

			// Wrap class method
			var step = function(percent, now, render) {
				self.__stepThroughDeceleration(render);
			};

			// How much velocity is required to keep the deceleration running
			var minVelocityToKeepDecelerating = self.options.snapping ? 4 : 0.1;

			// Detect whether it's still worth to continue animating steps
			// If we are already slow enough to not being user perceivable anymore, we stop the whole process here.
			var verify = function() {
				var shouldContinue = Math.abs(self.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(self.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
				if (!shouldContinue) {
					self.__didDecelerationComplete = true;
				}
				return shouldContinue;
			};

			var completed = function(renderedFramesPerSecond, animationId, wasFinished) {
				self.__isDecelerating = false;
				if (self.__didDecelerationComplete) {
					self.options.scrollingComplete();
				}

				// Animate to grid when snapping is active, otherwise just fix out-of-boundary positions
				self.scrollTo(self.__scrollLeft, self.__scrollTop, self.options.snapping);
			};

			// Start animation and switch on flag
			self.__isDecelerating = core.effect.Animate.start(step, verify, completed);

		},


		/**
		 * Called on every step of the animation
		 *
		 * @param inMemory {Boolean?false} Whether to not render the current step, but keep it in memory only. Used internally only!
		 */
		__stepThroughDeceleration: function(render) {

			var self = this;


			//
			// COMPUTE NEXT SCROLL POSITION
			//

			// Add deceleration to scroll position
			var scrollLeft = self.__scrollLeft + self.__decelerationVelocityX;
			var scrollTop = self.__scrollTop + self.__decelerationVelocityY;


			//
			// HARD LIMIT SCROLL POSITION FOR NON BOUNCING MODE
			//

			if (!self.options.bouncing) {

				var scrollLeftFixed = Math.max(Math.min(self.__maxDecelerationScrollLeft, scrollLeft), self.__minDecelerationScrollLeft);
				if (scrollLeftFixed !== scrollLeft) {
					scrollLeft = scrollLeftFixed;
					self.__decelerationVelocityX = 0;
				}

				var scrollTopFixed = Math.max(Math.min(self.__maxDecelerationScrollTop, scrollTop), self.__minDecelerationScrollTop);
				if (scrollTopFixed !== scrollTop) {
					scrollTop = scrollTopFixed;
					self.__decelerationVelocityY = 0;
				}

			}


			//
			// UPDATE SCROLL POSITION
			//

			if (render) {

				self.__publish(scrollLeft, scrollTop, self.__zoomLevel);

			} else {

				self.__scrollLeft = scrollLeft;
				self.__scrollTop = scrollTop;

			}


			//
			// SLOW DOWN
			//

			// Slow down velocity on every iteration
			if (!self.options.paging) {

				// This is the factor applied to every iteration of the animation
				// to slow down the process. This should emulate natural behavior where
				// objects slow down when the initiator of the movement is removed
				var frictionFactor = self.options.decelerationRate;

				self.__decelerationVelocityX *= frictionFactor;
				self.__decelerationVelocityY *= frictionFactor;

			}


			//
			// BOUNCING SUPPORT
			//

			if (self.options.bouncing) {

				var scrollOutsideX = 0;
				var scrollOutsideY = 0;

				// This configures the amount of change applied to deceleration/acceleration when reaching boundaries
				var penetrationDeceleration = self.options.penetrationDeceleration; 
				var penetrationAcceleration = self.options.penetrationAcceleration; 

				// Check limits
				if (scrollLeft < self.__minDecelerationScrollLeft) {
					scrollOutsideX = self.__minDecelerationScrollLeft - scrollLeft;
				} else if (scrollLeft > self.__maxDecelerationScrollLeft) {
					scrollOutsideX = self.__maxDecelerationScrollLeft - scrollLeft;
				}

				if (scrollTop < self.__minDecelerationScrollTop) {
					scrollOutsideY = self.__minDecelerationScrollTop - scrollTop;
				} else if (scrollTop > self.__maxDecelerationScrollTop) {
					scrollOutsideY = self.__maxDecelerationScrollTop - scrollTop;
				}

				// Slow down until slow enough, then flip back to snap position
				if (scrollOutsideX !== 0) {
					if (scrollOutsideX * self.__decelerationVelocityX <= 0) {
						self.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
					} else {
						self.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
					}
				}

				if (scrollOutsideY !== 0) {
					if (scrollOutsideY * self.__decelerationVelocityY <= 0) {
						self.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
					} else {
						self.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
					}
				}
			}
		}
	};

	// Copy over members to prototype
	for (var key in members) {
		Scroller.prototype[key] = members[key];
	}

	module.exports = Scroller;
})();


/***/ }),
/* 40 */
/***/ (function(module, exports) {

/*
 * Scroller
 * http://github.com/zynga/scroller
 *
 * Copyright 2011, Zynga Inc.
 * Licensed under the MIT License.
 * https://raw.github.com/zynga/scroller/master/MIT-LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

/**
 * Generic animation class with support for dropped frames both optional easing and duration.
 *
 * Optional duration is useful when the lifetime is defined by another condition than time
 * e.g. speed of an animating object, etc.
 *
 * Dropped frame logic allows to keep using the same updater logic independent from the actual
 * rendering. This eases a lot of cases where it might be pretty complex to break down a state
 * based on the pure time difference.
 */
(function(global) {
	var time = Date.now || function() {
		return +new Date();
	};
	var desiredFrames = 60;
	var millisecondsPerSecond = 1000;
	var running = {};
	var counter = 1;

	// Create namespaces
	var core = {
		effect: {}
	};

	core.effect.Animate = {

		/**
		 * A requestAnimationFrame wrapper / polyfill.
		 *
		 * @param callback {Function} The callback to be invoked before the next repaint.
		 * @param root {HTMLElement} The root element for the repaint
		 */
		requestAnimationFrame: (function() {

			// Check for request animation Frame support
			var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
			var isNative = !!requestFrame;

			if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
				isNative = false;
			}

			if (isNative) {
				return function(callback, root) {
					requestFrame(callback, root)
				};
			}

			var TARGET_FPS = 60;
			var requests = {};
			var requestCount = 0;
			var rafHandle = 1;
			var intervalHandle = null;
			var lastActive = +new Date();

			return function(callback, root) {
				var callbackHandle = rafHandle++;

				// Store callback
				requests[callbackHandle] = callback;
				requestCount++;

				// Create timeout at first request
				if (intervalHandle === null) {

					intervalHandle = setInterval(function() {

						var time = +new Date();
						var currentRequests = requests;

						// Reset data structure before executing callbacks
						requests = {};
						requestCount = 0;

						for(var key in currentRequests) {
							if (currentRequests.hasOwnProperty(key)) {
								currentRequests[key](time);
								lastActive = time;
							}
						}

						// Disable the timeout when nothing happens for a certain
						// period of time
						if (time - lastActive > 2500) {
							clearInterval(intervalHandle);
							intervalHandle = null;
						}

					}, 1000 / TARGET_FPS);
				}

				return callbackHandle;
			};

		})(),


		/**
		 * Stops the given animation.
		 *
		 * @param id {Integer} Unique animation ID
		 * @return {Boolean} Whether the animation was stopped (aka, was running before)
		 */
		stop: function(id) {
			var cleared = running[id] != null;
			if (cleared) {
				running[id] = null;
			}

			return cleared;
		},


		/**
		 * Whether the given animation is still running.
		 *
		 * @param id {Integer} Unique animation ID
		 * @return {Boolean} Whether the animation is still running
		 */
		isRunning: function(id) {
			return running[id] != null;
		},


		/**
		 * Start the animation.
		 *
		 * @param stepCallback {Function} Pointer to function which is executed on every step.
		 *   Signature of the method should be `function(percent, now, virtual) { return continueWithAnimation; }`
		 * @param verifyCallback {Function} Executed before every animation step.
		 *   Signature of the method should be `function() { return continueWithAnimation; }`
		 * @param completedCallback {Function}
		 *   Signature of the method should be `function(droppedFrames, finishedAnimation) {}`
		 * @param duration {Integer} Milliseconds to run the animation
		 * @param easingMethod {Function} Pointer to easing function
		 *   Signature of the method should be `function(percent) { return modifiedValue; }`
		 * @param root {Element ? document.body} Render root, when available. Used for internal
		 *   usage of requestAnimationFrame.
		 * @return {Integer} Identifier of animation. Can be used to stop it any time.
		 */
		start: function(stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {

			var start = time();
			var lastFrame = start;
			var percent = 0;
			var dropCounter = 0;
			var id = counter++;

			if (!root) {
				root = document.body;
			}

			// Compacting running db automatically every few new animations
			if (id % 20 === 0) {
				var newRunning = {};
				for (var usedId in running) {
					newRunning[usedId] = true;
				}
				running = newRunning;
			}

			// This is the internal step method which is called every few milliseconds
			var step = function(virtual) {

				// Normalize virtual value
				var render = virtual !== true;

				// Get current time
				var now = time();

				// Verification is executed before next animation step
				if (!running[id] || (verifyCallback && !verifyCallback(id))) {

					running[id] = null;
					completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false);
					return;

				}

				// For the current rendering to apply let's update omitted steps in memory.
				// This is important to bring internal state variables up-to-date with progress in time.
				if (render) {

					var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
					for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
						step(true);
						dropCounter++;
					}

				}

				// Compute percent value
				if (duration) {
					percent = (now - start) / duration;
					if (percent > 1) {
						percent = 1;
					}
				}

				// Execute step callback, then...
				var value = easingMethod ? easingMethod(percent) : percent;
				if ((stepCallback(value, now, render) === false || percent === 1) && render) {
					running[id] = null;
					completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null);
				} else if (render) {
					lastFrame = now;
					core.effect.Animate.requestAnimationFrame(step, root);
				}
			};

			// Mark as running
			running[id] = true;

			// Init first step
			core.effect.Animate.requestAnimationFrame(step, root);

			// Return unique animation ID
			return id;
		}
	};

	module.exports = core;

})(typeof window !== 'undefined' ? window : this);



/***/ }),
/* 41 */
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
var ScrollView_1 = __webpack_require__(17);
var View_1 = __webpack_require__(0);
var ListSelectionStyle;
(function (ListSelectionStyle) {
    ListSelectionStyle[ListSelectionStyle["None"] = 0] = "None";
    ListSelectionStyle[ListSelectionStyle["Gray"] = 1] = "Gray";
})(ListSelectionStyle = exports.ListSelectionStyle || (exports.ListSelectionStyle = {}));
var ListCell = (function (_super) {
    __extends(ListCell, _super);
    function ListCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionStyle = ListSelectionStyle.Gray;
        return _this;
    }
    return ListCell;
}(View_1.View));
exports.ListCell = ListCell;
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListView.prototype.register = function (clazz, reuseIdentifier) { };
    ListView.prototype.reloadData = function () { };
    return ListView;
}(ScrollView_1.ScrollView));
exports.ListView = ListView;


/***/ }),
/* 42 */
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
var ScrollView_1 = __webpack_require__(37);
var View_1 = __webpack_require__(3);
var Abstract_1 = __webpack_require__(1);
var ListCell = (function (_super) {
    __extends(ListCell, _super);
    function ListCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reuseIdentifier = "";
        _this.selectionStyle = Abstract_1.ListSelectionStyle.Gray;
        _this._displayItem = undefined;
        _this._isBusy = false;
        return _this;
    }
    return ListCell;
}(View_1.View));
exports.ListCell = ListCell;
var ListView = (function (_super) {
    __extends(ListView, _super);
    function ListView(rect) {
        var _this = _super.call(this, rect) || this;
        _this.reuseMapping = {};
        _this._items = [];
        _this._cacheRows = [];
        _this._reusingCells = [];
        _this._nextSetted = false;
        _this._nextReloadMinY = undefined;
        _this._nextReloadMaxY = undefined;
        _this.alwaysBounceVertical = true;
        return _this;
    }
    ListView.prototype.register = function (clazz, reuseIdentifier) {
        this.reuseMapping[reuseIdentifier] = clazz;
    };
    Object.defineProperty(ListView.prototype, "items", {
        get: function () {
            return this._items.slice();
        },
        set: function (value) {
            this._items = value.slice();
            this.reloadData();
        },
        enumerable: true,
        configurable: true
    });
    ListView.prototype.reloadData = function () {
        var _this = this;
        var currentY = 0;
        this._cacheRows = this.items.map(function (item) {
            var minY = currentY;
            var maxY = minY + item.rowHeight(_this.bounds.width);
            currentY = maxY;
            return { minY: minY, maxY: maxY, item: item };
        });
        this.contentSize = { width: 0, height: currentY };
        this._nextSetted = false;
        this._nextReloadMinY = undefined;
        this._nextReloadMaxY = undefined;
        this.reloadVisibleRows();
    };
    ListView.prototype.handleScroll = function (x, y) {
        _super.prototype.handleScroll.call(this, x, y);
        if (this._reusingCells !== undefined) {
            this.reloadVisibleRows();
        }
    };
    ListView.prototype.reloadVisibleRows = function () {
        var _this = this;
        if (this._nextSetted === true && this.contentOffset.y > (this._nextReloadMinY || -Infinity) && this.contentOffset.y < (this._nextReloadMaxY || Infinity)) {
            return;
        }
        this.markInvisibleCellNoBusy();
        this._nextSetted = true;
        this._nextReloadMinY = undefined;
        this._nextReloadMaxY = undefined;
        var visibleRows = this._cacheRows.filter(function (item) {
            if (item.maxY <= _this.contentOffset.y) {
                _this._nextReloadMinY = item.maxY;
            }
            if (_this._nextReloadMaxY === undefined && item.minY >= _this.contentOffset.y + _this.bounds.height) {
                _this._nextReloadMaxY = item.minY - _this.bounds.height;
            }
            return item.maxY > _this.contentOffset.y && item.minY < _this.contentOffset.y + _this.bounds.height;
        });
        var visibleCells = visibleRows.filter(function (row) { return _this._reusingCells.filter(function (cell) { return cell._displayItem === row.item; }).length == 0; }).map(function (row) {
            var cell = _this._reusingCells.filter(function (cell) {
                return !cell._isBusy && cell.reuseIdentifier === row.item.reuseIdentifier;
            })[0] ||
                (_this.reuseMapping[row.item.reuseIdentifier] !== undefined ? new _this.reuseMapping[row.item.reuseIdentifier]() : undefined) ||
                new ListCell();
            cell.reuseIdentifier = row.item.reuseIdentifier;
            cell.frame = { x: 0, y: row.minY, width: _this.bounds.width, height: row.maxY - row.minY };
            cell._isBusy = true;
            cell._displayItem = row.item;
            _this.renderItem && _this.renderItem(cell, row.item);
            if (_this._reusingCells.indexOf(cell) < 0) {
                _this._reusingCells.push(cell);
            }
            return cell;
        });
        visibleCells.forEach(function (cell) {
            if (cell.superview === undefined) {
                _this.addSubview(cell);
            }
        });
    };
    ListView.prototype.markInvisibleCellNoBusy = function () {
        var _this = this;
        this._reusingCells.filter(function (cell) {
            return cell._isBusy && (cell.frame.y + cell.frame.height < _this.contentOffset.y || cell.frame.y > _this.contentOffset.y + _this.bounds.height);
        }).forEach(function (cell) {
            cell._isBusy = false;
        });
    };
    return ListView;
}(ScrollView_1.ScrollView));
exports.ListView = ListView;


/***/ })
/******/ ]);
//# sourceMappingURL=xt.pixi.js.map