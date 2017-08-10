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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Interfaces = __webpack_require__(2);
const index_1 = __webpack_require__(4);
exports.Factory = Interfaces;
function SwitchFactory() {
    index_1.usePixi();
}
exports.SwitchFactory = SwitchFactory;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __webpack_require__(0);
Factory_1.SwitchFactory();
exports.XT = Factory_1.Factory;
if (window !== undefined) {
    window.XT = Factory_1.Factory;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CGRect_1 = __webpack_require__(3);
exports.CGRectMake = CGRect_1.CGRectMake;
exports.CGRectZero = CGRect_1.CGRectZero;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CGRectMake(x, y, width, height) {
    return { x, y, width, height };
}
exports.CGRectMake = CGRectMake;
exports.CGRectZero = CGRectMake(0, 0, 0, 0);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __webpack_require__(0);
const UIView_1 = __webpack_require__(5);
const UIApplication_1 = __webpack_require__(6);
function usePixi(force = false) {
    const use = () => {
        Factory_1.Factory.UIView = UIView_1.UIView;
        Factory_1.Factory.UIApplication = UIApplication_1.UIApplication;
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const I = __webpack_require__(2);
const PIXI = window.PIXI;
class UIView {
    constructor(rect) {
        this._frame = I.CGRectZero;
        this.bounds = I.CGRectZero;
        this.nativeObject = new PIXI.Container();
        if (rect) {
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
    get frame() {
        return this._frame;
    }
    set frame(value) {
        this._frame = value;
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, value.width, value.height);
    }
}
exports.UIView = UIView;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = window.PIXI;
class UIApplication {
    constructor(canvas, delegate) {
        this.nativeObject = new PIXI.Application({ view: canvas });
        this.delegate = delegate;
        if (this.delegate) {
            this.delegate.applicationDidFinishLaunchingWithOptions(this, {});
        }
    }
}
exports.UIApplication = UIApplication;


/***/ })
/******/ ]);
//# sourceMappingURL=xt.js.map