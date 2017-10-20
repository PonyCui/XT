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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
var TransformMatrix_1 = __webpack_require__(1);
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TouchTests_1 = __webpack_require__(3);
console.log("Test start.");
TouchTests_1.hitTests();
TouchTests_1.touchEventTests();
setTimeout(function () {
    console.log("All Test Passed");
}, 5000);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TouchManager_1 = __webpack_require__(4);
var TransformMatrix_1 = __webpack_require__(1);
var CoordinateManager_1 = __webpack_require__(0);
var View = /** @class */ (function () {
    function View() {
        this.frame = { x: 0, y: 0, width: 0, height: 0 };
        this.subviews = [];
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
        if (this.superview) {
            this.superview.touchesBegan(touches, event);
        }
    };
    View.prototype.touchesMoved = function (touches, event) {
        this._touchesMovedTest = true;
        if (this.superview) {
            this.superview.touchesMoved(touches, event);
        }
    };
    View.prototype.touchesEnded = function (touches, event) {
        this._touchesEndedTest = true;
        if (this.superview) {
            this.superview.touchesEnded(touches, event);
        }
    };
    View.prototype.touchesCancelled = function (touches, event) {
        this._touchesCancelledTest = true;
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CoordinateManager_1 = __webpack_require__(0);
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


/***/ })
/******/ ]);
//# sourceMappingURL=tests.js.map