/*!
 * Swipe-to-delete v0.1.5
 * Implement the 'swipe to delete' UI-pattern in the Marionette framework.
 * https://github.com/gaer87/swipe-to-delete

 * Copyright 2016, Fedotov Alexander
 * Released under the MIT license.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("underscore"), require("backbone"), require("backbone.marionette"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "underscore", "backbone", "backbone.marionette"], factory);
	else if(typeof exports === 'object')
		exports["SwipeToDeleteView"] = factory(require("jquery"), require("underscore"), require("backbone"), require("backbone.marionette"));
	else
		root["SwipeToDeleteView"] = factory(root["$"], root["_"], root["Backbone"], root["Marionette"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _jquery = __webpack_require__(2);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(5);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _delete = __webpack_require__(6);

	var _delete2 = _interopRequireDefault(_delete);

	var _model = __webpack_require__(7);

	var _model2 = _interopRequireDefault(_model);

	var _isMobile = __webpack_require__(8);

	var _isMobile2 = _interopRequireDefault(_isMobile);

	__webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SwipeToDeleteView = function (_Marionette$LayoutVie) {
		_inherits(SwipeToDeleteView, _Marionette$LayoutVie);

		function SwipeToDeleteView() {
			_classCallCheck(this, SwipeToDeleteView);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeToDeleteView).apply(this, arguments));
		}

		_createClass(SwipeToDeleteView, [{
			key: 'className',
			value: function className() {
				return 'swipe-to-delete';
			}
		}, {
			key: 'template',
			value: function template() {
				return '\n\t\t\t<div class="js-delete"></div>\n\t\t\t<div class="js-content"></div>\n\t\t';
			}
		}, {
			key: 'regions',
			value: function regions() {
				return {
					delete: '.js-delete',
					content: '.js-content'
				};
			}
		}, {
			key: 'initialize',
			value: function initialize(_ref) {
				var View = _ref.View;
				var _ref$DeleteView = _ref.DeleteView;
				var DeleteView = _ref$DeleteView === undefined ? _delete2.default : _ref$DeleteView;
				var deleteSwipe = _ref.deleteSwipe;

				this.isTouch = _isMobile2.default.any();
				this.state = new _model2.default({ deleteSwipe: deleteSwipe });

				if (!this.state.isValid()) {
					throw new Error(_underscore2.default.reduce(this.state.validationError, function (memo, error) {
						return '' + memo + error.message + ' ';
					}, ''));
				}

				if (typeof View !== 'function') {
					throw new Error('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
				}

				if (typeof DeleteView !== 'function') {
					throw new Error('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
				}

				this.View = View;
				this.DeleteView = DeleteView;

				_underscore2.default.bindAll(this, 'addHandlers', 'interact', 'moveAt', 'stopInteract', 'offInteract', 'endInteract', 'onDelete', 'onCancel');
			}
		}, {
			key: 'onRender',
			value: function onRender() {
				this.showDelete();
				this.showContent();
				this.addHandlers();
			}
		}, {
			key: 'showDelete',
			value: function showDelete() {
				var view = new this.DeleteView();
				this.showChildView('delete', view);
			}
		}, {
			key: 'showContent',
			value: function showContent() {
				var view = new this.View(_underscore2.default.omit(this.options, 'el', 'tagName', 'className', 'View', 'DeleteView'));
				this.showChildView('content', view);
			}
		}, {
			key: 'addHandlers',
			value: function addHandlers() {
				this.startInteract().done(this.interact).then(this.stopInteract).always(this.offInteract).then(this.endInteract).fail(this.addHandlers);
			}
		}, {
			key: 'startInteract',
			value: function startInteract() {
				var _this2 = this;

				var dfd = new _jquery2.default.Deferred();
				var el = this.$('.js-content > *');

				this.onInteract = function (e) {
					var x = _this2.isTouch ? e.originalEvent.targetTouches[0].pageX : e.pageX;
					_this2.state.set({ startX: x });
					dfd.resolve();
				};

				el.one(this.isTouch ? 'touchstart' : 'mousedown', this.onInteract);

				return dfd;
			}
		}, {
			key: 'interact',
			value: function interact() {
				(0, _jquery2.default)(document).on(this.isTouch ? 'touchmove' : 'mousemove', this.moveAt);
			}
		}, {
			key: 'moveAt',
			value: function moveAt(e) {
				var target = this.getRegion('content').currentView.$el;
				var x = this.isTouch ? e.originalEvent.targetTouches[0].pageX : e.pageX;
				var res = x - this.state.get('startX');

				target.css({ left: res });
			}
		}, {
			key: 'offInteract',
			value: function offInteract() {
				(0, _jquery2.default)(document).off(this.isTouch ? 'touchmove' : 'mousemove', this.moveAt);
			}
		}, {
			key: 'stopInteract',
			value: function stopInteract() {
				var _this3 = this;

				var dfd = new _jquery2.default.Deferred();
				var el = this.$('.js-content > *');

				this.onStopInteract = function (e) {
					el.off('mouseup', _this3.onStopInteract);
					el.off('mouseleave', _this3.onStopInteract);

					var shift = (0, _jquery2.default)(e.currentTarget).position().left;
					!shift ? dfd.reject(e) : dfd.resolve(e);
				};

				if (this.isTouch) {
					el.one('touchend', this.onStopInteract);
				} else {
					el.one('mouseup', this.onStopInteract);
					el.one('mouseleave', this.onStopInteract);
				}

				return dfd;
			}
		}, {
			key: 'endInteract',
			value: function endInteract(event) {
				var dfd = new _jquery2.default.Deferred();
				var target = (0, _jquery2.default)(event.currentTarget);
				var swipePercent = this.getSwipePercent();

				dfd.done(this.onDelete).fail(this.onCancel);

				if (this.state.isDelete(swipePercent)) {
					target.one('transitionend', function (e) {
						return dfd.resolve(e);
					});
					swipePercent < 0 ? target.addClass('js-transition-delete-left') : target.addClass('js-transition-delete-right');
				} else {
					target.one('transitionend', function (e) {
						return dfd.reject(e);
					});
					target.addClass('js-transition-cancel');
				}

				return dfd;
			}
		}, {
			key: 'getSwipePercent',
			value: function getSwipePercent() {
				var shift = this.getRegion('content').currentView.$el.position().left;
				var width = this.getRegion('content').$el.innerWidth();

				return this.state.calcSwipePercent({ shift: shift, width: width });
			}
		}, {
			key: 'onDelete',
			value: function onDelete() {
				this.getRegion('content').currentView.triggerMethod('swipe:delete');
			}
		}, {
			key: 'onCancel',
			value: function onCancel(e) {
				var target = (0, _jquery2.default)(e.currentTarget);
				target.removeClass('js-transition-cancel');
				target.css({ left: 0 });

				this.state.set({ startX: 0 });

				this.getRegion('content').currentView.triggerMethod('swipe:cancel');
			}
		}]);

		return SwipeToDeleteView;
	}(_backbone4.default.LayoutView);

	exports.default = SwipeToDeleteView;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _backbone = __webpack_require__(5);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DelView = function (_Marionette$ItemView) {
		_inherits(DelView, _Marionette$ItemView);

		function DelView() {
			_classCallCheck(this, DelView);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(DelView).apply(this, arguments));
		}

		_createClass(DelView, [{
			key: 'template',
			value: function template() {
				var icon = '\n\t\t\t<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 900.5 900.5" style="enable-background:new 0 0 900.5 900.5;" xml:space="preserve">\n\t\t\t\t<g>\n\t\t\t\t\t<path d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z    M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z" fill="#FFFFFF"/>\n\t\t\t\t\t<path d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874   c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576   c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z" fill="#FFFFFF"/>\n\t\t\t\t</g>\n\t\t\t\t<g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>\n\t\t\t</svg>\n\t\t\t';

				return icon + icon;
			}
		}]);

		return DelView;
	}(_backbone2.default.ItemView);

	exports.default = DelView;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _backbone = __webpack_require__(4);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var State = function (_Backbone$Model) {
		_inherits(State, _Backbone$Model);

		function State() {
			_classCallCheck(this, State);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(State).apply(this, arguments));
		}

		_createClass(State, [{
			key: 'defaults',
			value: function defaults() {
				return {
					deleteSwipe: .5,
					startX: 0
				};
			}
		}, {
			key: 'initialize',
			value: function initialize(_ref) {
				var deleteSwipe = _ref.deleteSwipe;

				typeof deleteSwipe !== 'undefined' && this.set({ deleteSwipe: deleteSwipe });
			}
		}, {
			key: 'validate',
			value: function validate(attrs) {
				var errors = [];

				if (!attrs.deleteSwipe) {
					return;
				}

				if (typeof attrs.deleteSwipe !== 'number') {
					errors.push({ message: '"deleteWidth" can be number only.' });
					return errors;
				}

				if (attrs.deleteSwipe < 0 || attrs.deleteSwipe > 1) {
					errors.push({ message: '"deleteWidth" can be in range [0, 1].' });
					return errors;
				}
			}
		}, {
			key: 'calcSwipePercent',
			value: function calcSwipePercent(_ref2) {
				var shift = _ref2.shift;
				var width = _ref2.width;

				return shift / width;
			}
		}, {
			key: 'isDelete',
			value: function isDelete(percent) {
				return percent > 0 && percent >= this.get('deleteSwipe') || percent < 0 && percent <= -this.get('deleteSwipe');
			}
		}]);

		return State;
	}(_backbone2.default.Model);

	exports.default = State;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var isMobile = {
		Android: function Android() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function any() {
			return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
		}
	};

	exports.default = isMobile;

/***/ },
/* 9 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ])
});
;