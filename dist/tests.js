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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
var GestureRecognizerState;
(function (GestureRecognizerState) {
    GestureRecognizerState[GestureRecognizerState["Possible"] = 0] = "Possible";
    GestureRecognizerState[GestureRecognizerState["Began"] = 1] = "Began";
    GestureRecognizerState[GestureRecognizerState["Changed"] = 2] = "Changed";
    GestureRecognizerState[GestureRecognizerState["Ended"] = 3] = "Ended";
    GestureRecognizerState[GestureRecognizerState["Cancelled"] = 4] = "Cancelled";
    GestureRecognizerState[GestureRecognizerState["Failed"] = 5] = "Failed";
    GestureRecognizerState[GestureRecognizerState["Recognized"] = 3] = "Recognized";
})(GestureRecognizerState = exports.GestureRecognizerState || (exports.GestureRecognizerState = {}));
var GestureManager = /** @class */ (function () {
    function GestureManager() {
    }
    GestureManager.onTrigger = function (gestureRecongnizer) {
        if (this.activeGesture) {
            return false;
        }
        this.activeGesture = gestureRecongnizer;
        return true;
    };
    GestureManager.onRelease = function () {
        var _this = this;
        setImmediate(function () {
            _this.activeGesture = undefined;
        });
    };
    GestureManager.onTouchesBegan = function (owner, touches, event) {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesBegan(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (var index = 0; index < owner.gestureRecongnizer.length; index++) {
            var gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesBegan(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    };
    GestureManager.onTouchesMoved = function (owner, touches, event) {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesMoved(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (var index = 0; index < owner.gestureRecongnizer.length; index++) {
            var gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesMoved(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    };
    GestureManager.onTouchesEnded = function (owner, touches, event) {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesEnded(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (var index = 0; index < owner.gestureRecongnizer.length; index++) {
            var gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesEnded(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    };
    GestureManager.onTouchesCancelled = function (owner, touches, event) {
        if (this.activeGesture !== undefined) {
            this.activeGesture.touchesCancelled(owner, touches, event, this.onTrigger.bind(this), this.onRelease.bind(this));
            return;
        }
        for (var index = 0; index < owner.gestureRecongnizer.length; index++) {
            var gesture = owner.gestureRecongnizer[index];
            if (gesture.enabled) {
                if (gesture.touchesCancelled(owner, touches, event, this.onTrigger.bind(this))) {
                    this.activeGesture = gesture;
                    break;
                }
            }
        }
    };
    GestureManager.touchCalled = false;
    return GestureManager;
}());
exports.GestureManager = GestureManager;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6).setImmediate))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TransformMatrix_1 = __webpack_require__(2);
function isPointInside(point, owner) {
    return point.x >= 0.0 && point.x <= owner.frame.width && point.y >= 0.0 && point.y <= owner.frame.height;
}
exports.isPointInside = isPointInside;
function convertPointToChildView(point, parent, child) {
    var stack = [child];
    var current = child;
    while (current.superview) {
        stack.unshift(current.superview);
        current = current.superview;
    }
    if (stack.indexOf(parent) < 0) {
        return point;
    }
    else {
        var curPoint_1 = __assign({}, point);
        stack.forEach(function (nextView) {
            if (nextView.transformMatrix) {
                var unmatrix = TransformMatrix_1.TransformMatrix.unmatrix(nextView.transformMatrix);
                var newMatrix = TransformMatrix_1.TransformMatrix.postTranslate(new TransformMatrix_1.TransformMatrix(), -nextView.frame.width / 2.0, -nextView.frame.height / 2.0);
                newMatrix = TransformMatrix_1.TransformMatrix.postRotate(newMatrix, unmatrix.degree * Math.PI / 180.0);
                newMatrix = TransformMatrix_1.TransformMatrix.postScale(newMatrix, unmatrix.scale.x, unmatrix.scale.y);
                newMatrix = TransformMatrix_1.TransformMatrix.postTranslate(newMatrix, unmatrix.translate.x, unmatrix.translate.y);
                newMatrix = TransformMatrix_1.TransformMatrix.postTranslate(newMatrix, nextView.frame.width / 2.0, nextView.frame.height / 2.0);
                var m = point.x - nextView.frame.x - newMatrix.tx;
                var n = point.y - nextView.frame.y - newMatrix.ty;
                var x = (n - m * newMatrix.c / newMatrix.d) / (newMatrix.a - newMatrix.b * newMatrix.c / newMatrix.a);
                var y = -(n - m * newMatrix.a / newMatrix.b) / (newMatrix.c - newMatrix.a * newMatrix.d / newMatrix.b);
                curPoint_1 = { x: x, y: y };
            }
            else {
                curPoint_1 = { x: curPoint_1.x - nextView.frame.x, y: curPoint_1.y - nextView.frame.y };
            }
        });
        return curPoint_1;
    }
}
exports.convertPointToChildView = convertPointToChildView;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransformMatrixAlgorithm = /** @class */ (function () {
    function TransformMatrixAlgorithm() {
        this.props = [];
        this.props[0] = 1;
        this.props[1] = 0;
        this.props[2] = 0;
        this.props[3] = 0;
        this.props[4] = 0;
        this.props[5] = 1;
        this.props[6] = 0;
        this.props[7] = 0;
        this.props[8] = 0;
        this.props[9] = 0;
        this.props[10] = 1;
        this.props[11] = 0;
        this.props[12] = 0;
        this.props[13] = 0;
        this.props[14] = 0;
        this.props[15] = 1;
    }
    TransformMatrixAlgorithm.prototype.rotate = function (angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    TransformMatrixAlgorithm.prototype.rotateX = function (angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
    };
    TransformMatrixAlgorithm.prototype.rotateY = function (angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
    };
    TransformMatrixAlgorithm.prototype.rotateZ = function (angle) {
        if (angle === 0) {
            return this;
        }
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    TransformMatrixAlgorithm.prototype.shear = function (sx, sy) {
        return this._t(1, sy, sx, 1, 0, 0);
    };
    TransformMatrixAlgorithm.prototype.skew = function (ax, ay) {
        return this.shear(Math.tan(ax), Math.tan(ay));
    };
    TransformMatrixAlgorithm.prototype.skewFromAxis = function (ax, angle) {
        var mCos = Math.cos(angle);
        var mSin = Math.sin(angle);
        return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(1, 0, 0, 0, Math.tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        //return this._t(mCos, mSin, -mSin, mCos, 0, 0)._t(1, 0, Math.tan(ax), 1, 0, 0)._t(mCos, -mSin, mSin, mCos, 0, 0);
    };
    TransformMatrixAlgorithm.prototype.scale = function (sx, sy, sz) {
        sz = isNaN(sz) ? 1 : sz;
        if (sx == 1 && sy == 1 && sz == 1) {
            return this;
        }
        return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
    };
    TransformMatrixAlgorithm.prototype.setTransform = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        this.props[0] = a;
        this.props[1] = b;
        this.props[2] = c;
        this.props[3] = d;
        this.props[4] = e;
        this.props[5] = f;
        this.props[6] = g;
        this.props[7] = h;
        this.props[8] = i;
        this.props[9] = j;
        this.props[10] = k;
        this.props[11] = l;
        this.props[12] = m;
        this.props[13] = n;
        this.props[14] = o;
        this.props[15] = p;
        return this;
    };
    TransformMatrixAlgorithm.prototype.translate = function (tx, ty, tz) {
        tz = isNaN(tz) ? 0 : tz;
        if (tx !== 0 || ty !== 0 || tz !== 0) {
            return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
        }
        return this;
    };
    TransformMatrixAlgorithm.prototype._t = function (a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        this.transform(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2);
    };
    TransformMatrixAlgorithm.prototype.transform = function (a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
        if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
            if (m2 !== 0 || n2 !== 0 || o2 !== 0) {
                this.props[12] = this.props[12] * a2 + this.props[13] * e2 + this.props[14] * i2 + this.props[15] * m2;
                this.props[13] = this.props[12] * b2 + this.props[13] * f2 + this.props[14] * j2 + this.props[15] * n2;
                this.props[14] = this.props[12] * c2 + this.props[13] * g2 + this.props[14] * k2 + this.props[15] * o2;
                this.props[15] = this.props[12] * d2 + this.props[13] * h2 + this.props[14] * l2 + this.props[15] * p2;
            }
            return this;
        }
        var a1 = this.props[0];
        var b1 = this.props[1];
        var c1 = this.props[2];
        var d1 = this.props[3];
        var e1 = this.props[4];
        var f1 = this.props[5];
        var g1 = this.props[6];
        var h1 = this.props[7];
        var i1 = this.props[8];
        var j1 = this.props[9];
        var k1 = this.props[10];
        var l1 = this.props[11];
        var m1 = this.props[12];
        var n1 = this.props[13];
        var o1 = this.props[14];
        var p1 = this.props[15];
        /* matrix order (canvas compatible):
         * ace
         * bdf
         * 001
         */
        this.props[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
        this.props[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
        this.props[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
        this.props[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;
        this.props[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
        this.props[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
        this.props[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
        this.props[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;
        this.props[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
        this.props[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
        this.props[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
        this.props[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;
        this.props[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
        this.props[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
        this.props[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
        this.props[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;
        return this;
    };
    TransformMatrixAlgorithm.prototype.clone = function (matr) {
        var i;
        for (i = 0; i < 16; i += 1) {
            matr.props[i] = this.props[i];
        }
    };
    TransformMatrixAlgorithm.prototype.cloneFromProps = function (props) {
        var i;
        for (i = 0; i < 16; i += 1) {
            this.props[i] = props[i];
        }
    };
    TransformMatrixAlgorithm.prototype.applyToPoint = function (x, y, z) {
        return {
            x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
            y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
            z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
        };
        /*return {
         x: x * me.a + y * me.c + me.e,
         y: x * me.b + y * me.d + me.f
         };*/
    };
    TransformMatrixAlgorithm.prototype.applyToX = function (x, y, z) {
        return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
    };
    TransformMatrixAlgorithm.prototype.applyToY = function (x, y, z) {
        return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
    };
    TransformMatrixAlgorithm.prototype.applyToZ = function (x, y, z) {
        return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
    };
    TransformMatrixAlgorithm.prototype.applyToPointArray = function (x, y, z) {
        return [x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12], x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13], x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]];
    };
    TransformMatrixAlgorithm.prototype.applyToPointStringified = function (x, y) {
        return (Math.round(x * this.props[0] + y * this.props[4] + this.props[12])) + ',' + (Math.round(x * this.props[1] + y * this.props[5] + this.props[13]));
    };
    return TransformMatrixAlgorithm;
}());
var TransformMatrix = /** @class */ (function () {
    function TransformMatrix(a, b, c, d, tx, ty) {
        if (a === void 0) { a = 1.0; }
        if (b === void 0) { b = 0.0; }
        if (c === void 0) { c = 0.0; }
        if (d === void 0) { d = 1.0; }
        if (tx === void 0) { tx = 0.0; }
        if (ty === void 0) { ty = 0.0; }
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
    TransformMatrix.unmatrix = function (matrix) {
        var A = matrix.a;
        var B = matrix.b;
        var C = matrix.c;
        var D = matrix.d;
        if (A * D == B * C) {
            return { scale: { x: 1.0, y: 1.0 }, degree: 0.0, translate: { x: 0.0, y: 0.0 } };
        }
        // step (3)
        var scaleX = Math.sqrt(A * A + B * B);
        A /= scaleX;
        B /= scaleX;
        // step (4)
        var skew = A * C + B * D;
        C -= A * skew;
        D -= B * skew;
        // step (5)
        var scaleY = Math.sqrt(C * C + D * D);
        C /= scaleY;
        D /= scaleY;
        skew /= scaleY;
        // step (6)
        if (A * D < B * C) {
            A = -A;
            B = -B;
            skew = -skew;
            scaleX = -scaleX;
        }
        return { scale: { x: scaleX, y: scaleY }, degree: Math.atan2(B, A) / (Math.PI / 180), translate: { x: matrix.tx, y: matrix.ty } };
    };
    TransformMatrix.postScale = function (matrix, x, y) {
        var obj = new TransformMatrixAlgorithm();
        var unMatrix = this.unmatrix(matrix);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.scale((x || 1.0), (y || 1.0), 1.0);
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13]);
    };
    TransformMatrix.postTranslate = function (matrix, x, y) {
        var obj = new TransformMatrixAlgorithm();
        var unMatrix = this.unmatrix(matrix);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.translate((x || 0.0), (y || 0.0), 0.0);
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13]);
    };
    TransformMatrix.postRotate = function (matrix, angle) {
        var obj = new TransformMatrixAlgorithm();
        var unMatrix = this.unmatrix(matrix);
        obj.rotate(-(unMatrix.degree * Math.PI / 180));
        obj.scale(unMatrix.scale.x, unMatrix.scale.y, 1.0);
        obj.translate(unMatrix.translate.x, unMatrix.translate.y, 0.0);
        obj.rotate(-angle);
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13]);
    };
    TransformMatrix.concat = function (preMatrix, postMatrix) {
        var obj = new TransformMatrixAlgorithm();
        obj.props[0] = preMatrix.a;
        obj.props[1] = preMatrix.b;
        obj.props[4] = preMatrix.c;
        obj.props[5] = preMatrix.d;
        obj.props[12] = preMatrix.tx;
        obj.props[13] = preMatrix.ty;
        obj.transform(postMatrix.a, postMatrix.b, 0, 0, postMatrix.c, postMatrix.d, 0, 0, 0, 0, 1, 0, postMatrix.tx, postMatrix.ty, 0, 1);
        return new TransformMatrix(obj.props[0], obj.props[1], obj.props[4], obj.props[5], obj.props[12], obj.props[13]);
    };
    return TransformMatrix;
}());
exports.TransformMatrix = TransformMatrix;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TouchTests_1 = __webpack_require__(4);
console.log("Test start.");
TouchTests_1.hitTests();
TouchTests_1.touchEventTests();
TouchTests_1.touchRecozinerTests();
setTimeout(function () {
    console.log("All Test-cases Passed");
}, 5000);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TouchManager_1 = __webpack_require__(5);
var TransformMatrix_1 = __webpack_require__(2);
var CoordinateManager_1 = __webpack_require__(1);
var GestureManager_1 = __webpack_require__(0);
var TapGestureRecognizer_1 = __webpack_require__(10);
var LongPressGestureRecognizer_1 = __webpack_require__(11);
var View = /** @class */ (function () {
    function View() {
        this.frame = { x: 0, y: 0, width: 0, height: 0 };
        this.subviews = [];
        this.gestureRecongnizer = [];
        this.touchManager = new TouchManager_1.TouchManager(this);
    }
    View.prototype.hitTest = function (point) {
        var _this = this;
        var target = undefined;
        if (CoordinateManager_1.isPointInside(point, this)) {
            target = this;
            var subviews = this.subviews.slice();
            subviews.reverse();
            subviews.forEach(function (subview) {
                var subTarget = subview.hitTest(CoordinateManager_1.convertPointToChildView(point, _this, subview));
                if (subTarget) {
                    target = subTarget;
                }
            });
        }
        return target;
    };
    View.prototype.touchesBegan = function (touches, event) {
        this._touchesBeganTest = true;
        GestureManager_1.GestureManager.onTouchesBegan(this, touches, event);
        if (this.superview) {
            this.superview.touchesBegan(touches, event);
        }
    };
    View.prototype.touchesMoved = function (touches, event) {
        this._touchesMovedTest = true;
        GestureManager_1.GestureManager.onTouchesMoved(this, touches, event);
        if (this.superview) {
            this.superview.touchesMoved(touches, event);
        }
    };
    View.prototype.touchesEnded = function (touches, event) {
        this._touchesEndedTest = true;
        GestureManager_1.GestureManager.onTouchesEnded(this, touches, event);
        if (this.superview) {
            this.superview.touchesEnded(touches, event);
        }
    };
    View.prototype.touchesCancelled = function (touches, event) {
        this._touchesCancelledTest = true;
        GestureManager_1.GestureManager.onTouchesCancelled(this, touches, event);
        if (this.superview) {
            this.superview.touchesCancelled(touches, event);
        }
    };
    View.prototype.handlePointerDown = function (pid, timestamp, point) {
        this.touchManager.handlePointerDown(pid, timestamp, point.x, point.y);
    };
    View.prototype.handlePointerMove = function (pid, timestamp, point) {
        this.touchManager.handlePointerMove(pid, timestamp, point.x, point.y);
    };
    View.prototype.handlePointerUp = function (pid, timestamp, point) {
        this.touchManager.handlePointerUp(pid, timestamp, point.x, point.y);
    };
    return View;
}());
function hitTests() {
    var window = new View();
    window.frame = { x: 0, y: 0, width: 500, height: 500 };
    var redView = new View();
    redView.frame = { x: 44, y: 44, width: 44, height: 44 };
    window.subviews = [redView];
    redView.superview = window;
    if (window.hitTest({ x: 22, y: 22 }) !== window) {
        throw "window hitTest Failure";
    }
    if (window.hitTest({ x: 48, y: 48 }) !== redView) {
        throw "redView hitTest Failure";
    }
    redView.transformMatrix = TransformMatrix_1.TransformMatrix.postTranslate(TransformMatrix_1.TransformMatrix.postRotate(new TransformMatrix_1.TransformMatrix(), 45 * Math.PI / 180), 0, 0);
    if (window.hitTest({ x: 48, y: 48 }) === redView) {
        throw "redView transformMatrix hitTest out Failure";
    }
    if (window.hitTest({ x: 66, y: 66 }) !== redView) {
        throw "redView transformMatrix hitTest in Failure";
    }
    redView.transformMatrix = TransformMatrix_1.TransformMatrix.postTranslate(TransformMatrix_1.TransformMatrix.postRotate(new TransformMatrix_1.TransformMatrix(), 45 * Math.PI / 180), 100, 100);
    if (window.hitTest({ x: 148, y: 148 }) === redView) {
        throw "redView transformMatrix hitTest out Failure";
    }
    if (window.hitTest({ x: 166, y: 166 }) !== redView) {
        throw "redView transformMatrix hitTest in Failure";
    }
}
exports.hitTests = hitTests;
function touchEventTests() {
    return;
    var window = new View();
    window.frame = { x: 0, y: 0, width: 500, height: 500 };
    var redView = new View();
    redView.frame = { x: 44, y: 44, width: 44, height: 44 };
    window.subviews = [redView];
    redView.superview = window;
    window.handlePointerDown("PointerI", new Date().getTime(), { x: 50, y: 50 });
    if (!redView._touchesBeganTest) {
        throw "redView should receive touchesBegan event.";
    }
    if (!window._touchesBeganTest) {
        throw "window should receive touchesBegan event.";
    }
    setTimeout(function () {
        window.handlePointerUp("PointerI", new Date().getTime(), { x: 50, y: 50 });
        if (!redView._touchesEndedTest) {
            throw "redView should receive touchesEnded event.";
        }
        if (!window._touchesEndedTest) {
            throw "window should receive touchesEnded event.";
        }
    }, 1000);
}
exports.touchEventTests = touchEventTests;
function touchRecozinerTests() {
    var window = new View();
    window.frame = { x: 0, y: 0, width: 500, height: 500 };
    var redView = new View();
    redView.frame = { x: 44, y: 44, width: 44, height: 44 };
    window.subviews = [redView];
    redView.superview = window;
    var tapGesture = new TapGestureRecognizer_1.TapGestureRecognizer();
    tapGesture.fire = function () {
        console.log("tapGesture fired.");
    };
    var longPressGesture = new LongPressGestureRecognizer_1.LongPressGestureRecognizer();
    longPressGesture.fire = function () {
        console.log("longPressGesture fired.", longPressGesture.state);
    };
    redView.gestureRecongnizer = [
        tapGesture,
    ];
    window.handlePointerDown("PointerI", new Date().getTime(), { x: 50, y: 50 });
    setTimeout(function () {
        window.handlePointerUp("PointerI", new Date().getTime(), { x: 50, y: 50 });
        setTimeout(function () {
            window.handlePointerDown("PointerI", new Date().getTime(), { x: 50, y: 50 });
            setTimeout(function () {
                window.handlePointerUp("PointerI", new Date().getTime(), { x: 50, y: 50 });
            }, 1000);
        }, 50);
    }, 100);
}
exports.touchRecozinerTests = touchRecozinerTests;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CoordinateManager_1 = __webpack_require__(1);
var TouchPhase;
(function (TouchPhase) {
    TouchPhase[TouchPhase["Began"] = 0] = "Began";
    TouchPhase[TouchPhase["Moved"] = 1] = "Moved";
    TouchPhase[TouchPhase["Stationary"] = 2] = "Stationary";
    TouchPhase[TouchPhase["Ended"] = 3] = "Ended";
    TouchPhase[TouchPhase["Cancelled"] = 4] = "Cancelled";
})(TouchPhase = exports.TouchPhase || (exports.TouchPhase = {}));
var TouchManager = /** @class */ (function () {
    function TouchManager(root) {
        this.touches = {};
        this.root = root;
    }
    TouchManager.prototype.handlePointerDown = function (pid, timestamp, x, y) {
        var _this = this;
        var target = this.target || this.root.hitTest({ x: x, y: y });
        if (target) {
            this.target = target;
            this.touches[pid] = {
                timestamp: timestamp, phase: TouchPhase.Began, tapCount: 1, locationInView: function (view) {
                    return CoordinateManager_1.convertPointToChildView({ x: x, y: y }, _this.root, view);
                }
            };
            target.touchesBegan([this.touches[pid]], {});
        }
    };
    TouchManager.prototype.handlePointerMove = function (pid, timestamp, x, y) {
        var _this = this;
        if (this.target) {
            this.touches[pid] = {
                timestamp: timestamp, phase: TouchPhase.Began, tapCount: 1, locationInView: function (view) {
                    return CoordinateManager_1.convertPointToChildView({ x: x, y: y }, _this.root, view);
                }
            };
            this.target.touchesMoved([this.touches[pid]], {});
        }
    };
    TouchManager.prototype.handlePointerUp = function (pid, timestamp, x, y) {
        var _this = this;
        if (this.target) {
            this.touches[pid] = {
                timestamp: timestamp, phase: TouchPhase.Began, tapCount: 1, locationInView: function (view) {
                    return CoordinateManager_1.convertPointToChildView({ x: x, y: y }, _this.root, view);
                }
            };
            this.target.touchesEnded([this.touches[pid]], {});
        }
        delete this.touches[pid];
        if (Object.keys(this.touches).length == 0) {
            this.target = undefined;
        }
    };
    TouchManager.prototype.handlePointerCancelEvent = function (timestamp) {
        var touches = [];
        for (var pointerID in this.touches) {
            this.touches[pointerID].phase = TouchPhase.Ended;
            this.touches[pointerID].timestamp = timestamp;
            touches.push(this.touches[pointerID]);
        }
        if (this.target) {
            this.target.touchesCancelled(touches, {});
            this.target = undefined;
            this.touches = {};
        }
    };
    return TouchManager;
}());
exports.TouchManager = TouchManager;


/***/ }),
/* 6 */
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
__webpack_require__(7);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 7 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), __webpack_require__(9)))

/***/ }),
/* 8 */
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GestureManager_1 = __webpack_require__(0);
var TapGestureRecognizer = /** @class */ (function () {
    function TapGestureRecognizer() {
        this.enabled = true;
        this.state = GestureManager_1.GestureRecognizerState.Possible;
    }
    TapGestureRecognizer.prototype.touchesBegan = function (owner, touches, event, triggerBlock, releaseBlock) {
        this.touchStartPoint = touches.map(function (t) { return t.locationInView(owner); });
        this.state = GestureManager_1.GestureRecognizerState.Possible;
        return false;
    };
    TapGestureRecognizer.prototype.touchesMoved = function (owner, touches, event, triggerBlock, releaseBlock) {
        if (this.touchStartPoint) {
            var invalidPoints = this.touchStartPoint.filter(function (pt) {
                return touches.filter(function (t) { return Math.abs(pt.x - t.locationInView(owner).x) > 8.0 || Math.abs(pt.y - t.locationInView(owner).y) > 8.0; }).length > 0;
            });
            if (invalidPoints.length > 0) {
                this.touchStartPoint = undefined;
            }
            this.state = GestureManager_1.GestureRecognizerState.Failed;
        }
        return false;
    };
    TapGestureRecognizer.prototype.touchesEnded = function (owner, touches, event, triggerBlock, releaseBlock) {
        if (this.touchStartPoint) {
            var invalidPoints = this.touchStartPoint.filter(function (pt) {
                return touches.filter(function (t) { return Math.abs(pt.x - t.locationInView(owner).x) > 8.0 || Math.abs(pt.y - t.locationInView(owner).y) > 8.0; }).length > 0;
            });
            if (invalidPoints.length == 0) {
                this.state = GestureManager_1.GestureRecognizerState.Recognized;
                this.fire && this.fire();
            }
            else {
                this.state = GestureManager_1.GestureRecognizerState.Failed;
            }
            this.touchStartPoint = undefined;
        }
        return false;
    };
    TapGestureRecognizer.prototype.touchesCancelled = function (owner, touches, event, triggerBlock, releaseBlock) {
        this.state = GestureManager_1.GestureRecognizerState.Cancelled;
        this.touchStartPoint = undefined;
        return false;
    };
    return TapGestureRecognizer;
}());
exports.TapGestureRecognizer = TapGestureRecognizer;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GestureManager_1 = __webpack_require__(0);
var LongPressGestureRecognizer = /** @class */ (function () {
    function LongPressGestureRecognizer() {
        this.enabled = true;
        this.state = GestureManager_1.GestureRecognizerState.Possible;
        this.minimumPressDuration = 0.5;
        this.allowableMovement = 10;
        this.recognized = false;
    }
    LongPressGestureRecognizer.prototype.touchesBegan = function (owner, touches, event, triggerBlock, releaseBlock) {
        var _this = this;
        this.touchStartPoint = touches.map(function (t) { return t.locationInView(owner); });
        this.state = GestureManager_1.GestureRecognizerState.Possible;
        setTimeout(function () {
            if (_this.touchStartPoint) {
                var invalidPoints = _this.touchStartPoint.filter(function (pt) {
                    return touches.filter(function (t) { return Math.abs(pt.x - t.locationInView(owner).x) > _this.allowableMovement || Math.abs(pt.y - t.locationInView(owner).y) > _this.allowableMovement; }).length > 0;
                });
                if (invalidPoints.length > 0) {
                    _this.state = GestureManager_1.GestureRecognizerState.Failed;
                    _this.touchStartPoint = undefined;
                }
                else {
                    if (triggerBlock && triggerBlock(_this)) {
                        _this.recognized = true;
                        _this.state = GestureManager_1.GestureRecognizerState.Began;
                        _this.fire && _this.fire();
                    }
                }
            }
        }, this.minimumPressDuration * 1000);
        return false;
    };
    LongPressGestureRecognizer.prototype.touchesMoved = function (owner, touches, event, triggerBlock, releaseBlock) {
        var _this = this;
        if (this.recognized) {
            this.state = GestureManager_1.GestureRecognizerState.Changed;
            this.fire && this.fire();
        }
        else if (this.touchStartPoint) {
            var invalidPoints = this.touchStartPoint.filter(function (pt) {
                return touches.filter(function (t) { return Math.abs(pt.x - t.locationInView(owner).x) > _this.allowableMovement || Math.abs(pt.y - t.locationInView(owner).y) > _this.allowableMovement; }).length > 0;
            });
            if (invalidPoints.length > 0) {
                this.state = GestureManager_1.GestureRecognizerState.Failed;
                this.touchStartPoint = undefined;
            }
        }
        return false;
    };
    LongPressGestureRecognizer.prototype.touchesEnded = function (owner, touches, event, triggerBlock, releaseBlock) {
        if (this.recognized) {
            if (this.state !== GestureManager_1.GestureRecognizerState.Ended) {
                this.state = GestureManager_1.GestureRecognizerState.Ended;
                this.fire && this.fire();
                releaseBlock && releaseBlock();
            }
        }
        else {
            this.state = GestureManager_1.GestureRecognizerState.Failed;
            this.touchStartPoint = undefined;
        }
        return false;
    };
    LongPressGestureRecognizer.prototype.touchesCancelled = function (owner, touches, event, triggerBlock, releaseBlock) {
        this.state = GestureManager_1.GestureRecognizerState.Cancelled;
        this.touchStartPoint = undefined;
        return false;
    };
    return LongPressGestureRecognizer;
}());
exports.LongPressGestureRecognizer = LongPressGestureRecognizer;


/***/ })
/******/ ]);
//# sourceMappingURL=tests.js.map