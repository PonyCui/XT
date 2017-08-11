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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CGRect_1 = __webpack_require__(12);
exports.CGRectMake = CGRect_1.CGRectMake;
exports.CGRectZero = CGRect_1.CGRectZero;
exports.CGRectEqual = CGRect_1.CGRectEqual;
exports.CGPointMake = CGRect_1.CGPointMake;
exports.CGPointZero = CGRect_1.CGPointZero;
exports.CGSizeMake = CGRect_1.CGSizeMake;
exports.CGSizeZero = CGRect_1.CGSizeZero;
const UIView_1 = __webpack_require__(5);
exports.UIView = UIView_1.UIView;
const UIWindow_1 = __webpack_require__(13);
exports.UIWindow = UIWindow_1.UIWindow;
const UIApplication_1 = __webpack_require__(14);
exports.UIApplication = UIApplication_1.UIApplication;
exports.UIApplicationDelegate = UIApplication_1.UIApplicationDelegate;
const UIColor_1 = __webpack_require__(15);
exports.UIColor = UIColor_1.UIColor;
const UIScreen_1 = __webpack_require__(16);
exports.UIScreen = UIScreen_1.UIScreen;
const CGTransformMatrix_1 = __webpack_require__(19);
exports.CGTransformMatrix = CGTransformMatrix_1.CGTransformMatrix;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__(8);
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
Factory.CGTransformMatrix = I.CGTransformMatrix;
exports.Factory = Factory;
function SwitchFactory() {
    index_1.usePixi();
}
exports.SwitchFactory = SwitchFactory;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(clearImmediate, setImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
const I = __webpack_require__(0);
const PIXI = window.PIXI;
class UIView extends I.UIView {
    constructor(rect) {
        super(rect || I.CGRectZero);
        this._backgroundColor = undefined;
        this._cornerRadius = 0;
        // Mark: View Geometry
        this._frame = I.CGRectZero;
        this._bounds = I.CGRectZero;
        // Mark: View Rendering
        this._clipsToBounds = false;
        this.opaque = false;
        this._tintColor = new I.UIColor(0.0, 122.0 / 255.0, 1.0);
        this.layoutTimer = undefined;
        this.nativeObject = new PIXI.Container();
        this.nativeObject.XTView = this;
        this.nativeGraphics = new PIXI.Graphics();
        this.nativeObject.addChild(this.nativeGraphics);
        this.nativeContainer = new PIXI.Container();
        this.nativeObject.addChild(this.nativeContainer);
        if (typeof rect === "object") {
            this.frame = rect;
        }
    }
    get frame() {
        return this._frame;
    }
    set frame(value) {
        this._frame = value;
        this.bounds = { x: 0, y: 0, width: value.width, height: value.height };
        this.nativeObject.hitArea = new PIXI.Rectangle(0, 0, value.width, value.height);
        this.nativeContainer.hitArea = this.nativeObject.hitArea;
        this.nativeObject.x = value.x;
        this.nativeObject.y = value.y;
    }
    get bounds() {
        return this._bounds;
    }
    set bounds(value) {
        if (!I.CGRectEqual(this._bounds, value)) {
            this._bounds = value;
            this.draw();
        }
    }
    get center() {
        return { x: this.frame.x + this.frame.width / 2.0, y: this.frame.y + this.frame.height / 2.0 };
    }
    set center(value) {
        const newFrame = this.frame;
        newFrame.x = value.x - newFrame.width / 2.0;
        newFrame.y = value.y - newFrame.height / 2.0;
        this.frame = newFrame;
    }
    get transform() {
        return this._transform;
    }
    set transform(value) {
        this._transform = value;
        if (value) {
            const transform = new PIXI.Transform();
            const matrix = new PIXI.Matrix();
            matrix.fromArray([value.a, value.b, value.tx, value.c, value.d, value.ty]);
            transform.setFromMatrix(matrix);
            this.nativeObject.setTransform(this.frame.x, this.frame.y, transform.scale.x, transform.scale.y, transform.rotation, transform.skew.x, transform.skew.y, transform.pivot.x, transform.pivot.y);
        }
        else {
            // this.nativeObject.setTransform(0,0,0.5,0.5,0.0,0.0,0.0,0.0,0.0);
        }
    }
    get clipsToBounds() {
        return this._clipsToBounds;
    }
    set clipsToBounds(value) {
        this._clipsToBounds = value;
        this.applyMask();
    }
    applyMask() {
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
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.draw();
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
    get maskView() {
        return this._maskView;
    }
    set maskView(value) {
        if (this._maskView !== undefined) {
            this._maskView.removeFromSuperview();
        }
        this._maskView = value;
        this.applyMask();
    }
    get tintColor() {
        return this._tintColor;
    }
    set tintColor(value) {
        this._tintColor = value;
        this.tintColorDidChange();
    }
    tintColorDidChange() {
        this.subviews.forEach((subview) => { subview.tintColorDidChange(); });
    }
    // Mark: View Layer-Back Rendering
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
                if (this.cornerRadius == Math.min(this.bounds.width, this.bounds.height) / 2.0) {
                    if (this.bounds.width > this.bounds.height) {
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.height / 2.0, this.bounds.y + this.bounds.height / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width - this.bounds.height / 2.0, this.bounds.y + this.bounds.height / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawRect(this.bounds.x + this.bounds.height / 2.0, this.bounds.y, this.bounds.width - this.bounds.height, this.bounds.height);
                    }
                    else if (this.bounds.width < this.bounds.height) {
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width / 2.0, this.bounds.y + this.bounds.width / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width / 2.0, this.bounds.y + this.bounds.height - this.bounds.width / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                        this.nativeGraphics.drawRect(this.bounds.x, this.bounds.y + this.bounds.width / 2.0, this.bounds.width, this.bounds.height - this.bounds.width);
                    }
                    else {
                        this.nativeGraphics.drawCircle(this.bounds.x + this.bounds.width / 2.0, this.bounds.y + this.bounds.height / 2.0, Math.min(this.bounds.width, this.bounds.height) / 2.0);
                    }
                }
                else {
                    this.nativeGraphics.drawRoundedRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, this.cornerRadius);
                }
            }
            else {
                this.nativeGraphics.drawRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            }
        }
    }
    get superview() {
        let parent = undefined;
        if (this.nativeContainer.parent && this.nativeContainer.parent.parent && this.nativeContainer.parent.parent.parent) {
            parent = this.nativeContainer.parent.parent.parent;
        }
        if (parent !== undefined && parent.XTView instanceof UIView) {
            return parent.XTView;
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
        if (this.superview !== undefined) {
            this.nativeContainer.parent.XTView.willRemoveSubview(this);
            this.willMoveToSuperview(undefined);
            this.willMoveToWindow(undefined);
            this.nativeObject.parent.removeChild(this.nativeObject);
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
    isDescendantOfView(view) {
        let current = this;
        while (current !== undefined) {
            if (current === view) {
                return true;
            }
            current = current.superview;
        }
        return false;
    }
    setNeedsLayout() {
        if (this.layoutTimer !== undefined) {
            clearImmediate(this.layoutTimer);
        }
        this.layoutTimer = setImmediate(() => {
            this.layoutSubviews();
        });
    }
    layoutIfNeeded() {
        this.layoutSubviews();
    }
    layoutSubviews() { }
}
exports.UIView = UIView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3).clearImmediate, __webpack_require__(3).setImmediate))

/***/ }),
/* 3 */
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
__webpack_require__(9);
var global = __webpack_require__(11);
exports.setImmediate = global.setImmediate;
exports.clearImmediate = global.clearImmediate;


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UIView {
    constructor(rect) { }
    tintColorDidChange() { }
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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __webpack_require__(1);
const UIView_1 = __webpack_require__(2);
const UIApplication_1 = __webpack_require__(6);
const UIWindow_1 = __webpack_require__(17);
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
/* 9 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(10)))

/***/ }),
/* 10 */
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
/* 11 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function CGPointMake(x, y) {
    return { x, y };
}
exports.CGPointMake = CGPointMake;
exports.CGPointZero = CGPointMake(0, 0);
function CGSizeMake(width, height) {
    return { width, height };
}
exports.CGSizeMake = CGSizeMake;
exports.CGSizeZero = CGSizeMake(0, 0);
function CGRectMake(x, y, width, height) {
    return { x, y, width, height };
}
exports.CGRectMake = CGRectMake;
exports.CGRectZero = CGRectMake(0, 0, 0, 0);
function CGRectEqual(rect1, rect2) {
    return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
}
exports.CGRectEqual = CGRectEqual;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIView_1 = __webpack_require__(5);
class UIWindow extends UIView_1.UIView {
    makeKeyAndVisible() { }
}
exports.UIWindow = UIWindow;


/***/ }),
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const UIApplication_1 = __webpack_require__(6);
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


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CGTransformMatrix {
    constructor(a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }
}
exports.CGTransformMatrix = CGTransformMatrix;


/***/ })
/******/ ]);
//# sourceMappingURL=xt.js.map