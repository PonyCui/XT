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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CGRect_1 = __webpack_require__(3);
exports.CGRectMake = CGRect_1.CGRectMake;
exports.CGRectZero = CGRect_1.CGRectZero;
exports.CGRectEqual = CGRect_1.CGRectEqual;
exports.CGPointMake = CGRect_1.CGPointMake;
exports.CGPointZero = CGRect_1.CGPointZero;
exports.CGSizeMake = CGRect_1.CGSizeMake;
exports.CGSizeZero = CGRect_1.CGSizeZero;
var UIView_1 = __webpack_require__(1);
exports.UIView = UIView_1.UIView;
var UIWindow_1 = __webpack_require__(4);
exports.UIWindow = UIWindow_1.UIWindow;
var UIApplication_1 = __webpack_require__(5);
exports.UIApplication = UIApplication_1.UIApplication;
exports.UIApplicationDelegate = UIApplication_1.UIApplicationDelegate;
var UIColor_1 = __webpack_require__(6);
exports.UIColor = UIColor_1.UIColor;
var UIScreen_1 = __webpack_require__(7);
exports.UIScreen = UIScreen_1.UIScreen;
var CGTransformMatrix_1 = __webpack_require__(8);
exports.CGTransformMatrix = CGTransformMatrix_1.CGTransformMatrix;


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
    UIView.prototype.setNeedsLayout = function () { };
    UIView.prototype.layoutIfNeeded = function () { };
    UIView.prototype.layoutSubviews = function () { };
    // Mark: View Interactive
    UIView.InteractionState = InteractionState;
    UIView.SwipeDirection = SwipeDirection;
    return UIView;
}());
exports.UIView = UIView;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CGPointMake(x, y) {
    return { x: x, y: y };
}
exports.CGPointMake = CGPointMake;
exports.CGPointZero = CGPointMake(0, 0);
function CGSizeMake(width, height) {
    return { width: width, height: height };
}
exports.CGSizeMake = CGSizeMake;
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


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UIColor = (function () {
    function UIColor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a || 1.0;
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
var UIApplication = (function (_super) {
    __extends(UIApplication, _super);
    function UIApplication(canvas, delegate) {
        var _this = _super.call(this) || this;
        _this.keyWindow = undefined;
        _this.isDirty = false;
        if (sharedApplication === undefined) {
            sharedApplication = _this;
            I.UIScreen.mainScreen = function () {
                return new I.UIScreen(canvas.offsetWidth, canvas.offsetHeight, window.devicePixelRatio);
            };
        }
        UIApplication.resetCanvas(canvas, function () {
            _this.nativeObject = new PIXI.Application({ width: I.UIScreen.withScale(canvas.offsetWidth), height: I.UIScreen.withScale(canvas.offsetHeight), view: canvas, antialias: true, transparent: true });
            _this.nativeObject.stop();
            if (window.DEBUG === true) {
                window.nativeObject = _this.nativeObject;
                _this.nativeObject.renderer.on("postrender", function () {
                    console.log("[PIXI]: onPostrender.");
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
    UIApplication.prototype.setNeedsDisplay = function () {
        var _this = this;
        if (this.isDirty === true) {
            return;
        }
        this.isDirty = true;
        requestAnimationFrame(function () {
            _this.nativeObject.render();
            _this.isDirty = false;
        });
    };
    return UIApplication;
}(I.UIApplication));
exports.UIApplication = UIApplication;
function setNeedsDisplay() {
    if (sharedApplication !== undefined) {
        sharedApplication.setNeedsDisplay();
    }
}
exports.setNeedsDisplay = setNeedsDisplay;


/***/ }),
/* 10 */
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
var PIXI = window.PIXI;
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
        _this.opaque = false;
        _this._tintColor = new I.UIColor(0.0, 122.0 / 255.0, 1.0);
        // Mark: View Layer-Back Rendering
        _this._cornerRadius = 0;
        _this._borderWidth = 0;
        _this._borderColor = undefined;
        _this.layoutTimer = undefined;
        // Mark: View Interactive
        _this._userInteractionEnabled = false;
        _this._isTapActived = false;
        _this._isTouchActived = false;
        _this._maybeTap = false;
        _this._maybeLongPress = false;
        _this._isLongPress = false;
        _this._firstTapped = false;
        _this._firstTapPoint = { x: 0, y: 0 };
        _this._secondTapped = false;
        _this._onLongPress = undefined;
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
            this._frame = value;
            this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
            this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, I.UIScreen.withScale(value.width), I.UIScreen.withScale(value.height));
            this.nativeContainer.hitArea = this.nativeObject.hitArea;
            this.nativeObject.x = I.UIScreen.withScale(value.x);
            this.nativeObject.y = I.UIScreen.withScale(value.y);
            UIApplication_1.setNeedsDisplay();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bounds", {
        get: function () {
            return this._bounds;
        },
        set: function (value) {
            if (!I.CGRectEqual(this._bounds, value)) {
                this._bounds = value;
                this.draw();
                UIApplication_1.setNeedsDisplay();
            }
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
            UIApplication_1.setNeedsDisplay();
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
        UIApplication_1.setNeedsDisplay();
    };
    Object.defineProperty(UIView.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (value) {
            if (this._backgroundColor instanceof I.UIColor && this._backgroundColor.equals(value)) {
                return;
            }
            this._backgroundColor = value;
            this.draw();
            UIApplication_1.setNeedsDisplay();
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
            this.nativeObject.alpha = value;
            UIApplication_1.setNeedsDisplay();
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
            UIApplication_1.setNeedsDisplay();
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
            UIApplication_1.setNeedsDisplay();
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
            UIApplication_1.setNeedsDisplay();
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
            this._cornerRadius = value;
            this.draw();
            UIApplication_1.setNeedsDisplay();
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
            this._borderWidth = value;
            this.draw();
            UIApplication_1.setNeedsDisplay();
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
            this._borderColor = value;
            this.draw();
            UIApplication_1.setNeedsDisplay();
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.draw = function () {
        if (this.nativeGraphics === undefined) {
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
            UIApplication_1.setNeedsDisplay();
        }
    };
    UIView.prototype.insertSubviewAtIndex = function (subview, atIndex) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChildAt(subview.nativeObject, atIndex);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        UIApplication_1.setNeedsDisplay();
    };
    UIView.prototype.exchangeSubviewAtIndex = function (index1, index2) {
        var child1 = this.nativeContainer.getChildAt(index1);
        var child2 = this.nativeContainer.getChildAt(index2);
        this.nativeContainer.swapChildren(child1, child2);
        UIApplication_1.setNeedsDisplay();
    };
    UIView.prototype.addSubview = function (subview) {
        subview.willMoveToSuperview(this);
        subview.willMoveToWindow(this.window);
        this.nativeContainer.addChild(subview.nativeObject);
        this.didAddSubview(subview);
        subview.didMoveToSuperview();
        subview.didMoveToWindow();
        UIApplication_1.setNeedsDisplay();
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
    UIView.prototype.layoutSubviews = function () { };
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
                        }, 150);
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
            this._onLongPress && this._onLongPress(I.UIView.InteractionState.Changed, this.requestTouchPointInView(event), this.requestTouchPointInWindow(event));
        }
        else if (this._maybeTap === true || this._maybeLongPress === true) {
            if (event.data.global.x - this._firstTapPoint.x > 12 || event.data.global.y - this._firstTapPoint.y > 12) {
                this._maybeTap = false;
                this._maybeLongPress = false;
            }
        }
    };
    UIView.prototype.handleTouchEnd = function () {
        if (this._isLongPress !== true) {
            this._maybeLongPress = false;
        }
        else if (this._isLongPress === true) {
            this._onLongPress && this._onLongPress(I.UIView.InteractionState.Ended);
            this._maybeTap = false;
            this._isLongPress = false;
        }
    };
    Object.defineProperty(UIView.prototype, "onTap", {
        get: function () {
            return this._onTap;
        },
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
    return UIView;
}(I.UIView));
exports.UIView = UIView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11).clearImmediate, __webpack_require__(11).setImmediate))

/***/ }),
/* 11 */
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
__webpack_require__(17);
var global = __webpack_require__(19);
exports.setImmediate = global.setImmediate;
exports.clearImmediate = global.clearImmediate;


/***/ }),
/* 12 */
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
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_pixi_1 = __webpack_require__(15);
Factory_pixi_1.SwitchFactory();
exports.default = Factory_pixi_1.Factory;
if (window !== undefined) {
    window.XT = Factory_pixi_1.Factory;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(16);
var I = __webpack_require__(0);
var Factory = (function () {
    function Factory() {
    }
    Factory.CGRectMake = I.CGRectMake;
    Factory.CGRectZero = I.CGRectZero;
    Factory.UIView = I.UIView;
    Factory.UIApplication = I.UIApplication;
    Factory.UIApplicationDelegate = I.UIApplicationDelegate;
    Factory.UIWindow = I.UIWindow;
    Factory.UIColor = I.UIColor;
    Factory.UIScreen = I.UIScreen;
    Factory.CGTransformMatrix = I.CGTransformMatrix;
    return Factory;
}());
exports.Factory = Factory;
function SwitchFactory() {
    index_1.usePixi();
}
exports.SwitchFactory = SwitchFactory;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Factory_pixi_1 = __webpack_require__(15);
var UIView_1 = __webpack_require__(10);
var UIApplication_1 = __webpack_require__(9);
var UIWindow_1 = __webpack_require__(20);
function usePixi(force) {
    if (force === void 0) { force = false; }
    var use = function () {
        Factory_pixi_1.Factory.UIView = UIView_1.UIView;
        Factory_pixi_1.Factory.UIApplication = UIApplication_1.UIApplication;
        Factory_pixi_1.Factory.UIWindow = UIWindow_1.UIWindow;
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
/* 17 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12), __webpack_require__(18)))

/***/ }),
/* 18 */
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
/* 19 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)))

/***/ }),
/* 20 */
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
var UIView_1 = __webpack_require__(10);
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


/***/ })
/******/ ]);
//# sourceMappingURL=xt.pixi.js.map