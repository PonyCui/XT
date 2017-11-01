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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../xt.d.ts" />
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
var AppDelegate = /** @class */ (function (_super) {
    __extends(AppDelegate, _super);
    function AppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function () {
        console.log(FOOPlugin.sayHello());
        this.window = new XT.Window();
        this.window.rootViewController = new XT.NavigationController(new FirstViewController());
        this.window.makeKeyAndVisible();
    };
    return AppDelegate;
}(XT.ApplicationDelegate));
var FirstListCell = /** @class */ (function (_super) {
    __extends(FirstListCell, _super);
    function FirstListCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.myLabel = new XT.Label(XT.RectMake(0.0, 0.0, XT.Screen.mainScreen().bounds().width, 44));
        _this.myFoo = new XT.CustomView("FOOView", XT.RectMake(300, 0, 75, 44));
        return _this;
    }
    FirstListCell.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.contentView.addSubview(this.myLabel);
        this.myFoo.userInteractionEnabled = true;
        this.myFoo.onTap = function () {
            _this.myFoo.props = {
                on: !_this.myFoo.props.on
            };
        };
        this.contentView.addSubview(this.myFoo);
        this.contentView.userInteractionEnabled = true;
    };
    FirstListCell.prototype.didSelected = function () {
        if (this.owner && this.owner.navigationController) {
            this.owner.navigationController.pushViewController(new SecondViewController());
        }
    };
    return FirstListCell;
}(XT.ListCell));
var FirstItem = /** @class */ (function () {
    function FirstItem(name) {
        this.reuseIdentifier = "Cell";
        this.rowHeight = function () {
            return 44;
        };
        this.name = "Pony";
        this.name = name;
    }
    return FirstItem;
}());
var FirstViewController = /** @class */ (function (_super) {
    __extends(FirstViewController, _super);
    function FirstViewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstViewController.prototype.viewDidLoad = function () {
        var _this = this;
        var fooView = new XT.ListView(XT.RectMake(0.0, 0.0, 0.0, 0.0));
        this.fooView = fooView;
        fooView.register(FirstListCell, "Cell");
        fooView.renderItem = function (cell, item) {
            cell.owner = _this;
            cell.myLabel.text = item.name;
        };
        var items = [];
        for (var index = 0; index < 100; index++) {
            items.push(new FirstItem("Index >>> " + index));
        }
        fooView.items = items;
        fooView.reloadData();
        this.view.addSubview(fooView);
    };
    FirstViewController.prototype.viewWillLayoutSubviews = function () {
        _super.prototype.viewWillLayoutSubviews.call(this);
        this.fooView.frame = this.view.bounds;
    };
    return FirstViewController;
}(XT.ViewController));
var SecondViewController = /** @class */ (function (_super) {
    __extends(SecondViewController, _super);
    function SecondViewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondViewController.prototype.viewDidLoad = function () {
        var fooView = new XT.CustomView("FOOView", XT.RectMake(44, 44, 200, 88));
        fooView.userInteractionEnabled = true;
        fooView.onTap = function () {
            fooView.props = {
                on: !fooView.props.on
            };
        };
        this.view.addSubview(fooView);
        var redView = new XT.View(XT.RectMake(88, 44, 88, 88));
        redView.alpha = 0.5;
        redView.userInteractionEnabled = true;
        redView.backgroundColor = XT.Color.redColor;
        redView.onTap = function () {
            redView.alpha = 0.0;
        };
        this.view.addSubview(redView);
    };
    return SecondViewController;
}(XT.ViewController));
var application = new XT.Application('app', new AppDelegate());


/***/ })
/******/ ]);
//# sourceMappingURL=sample.js.map