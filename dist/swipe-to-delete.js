(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"), require("backbone"), require("backbone.marionette"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore", "backbone", "backbone.marionette"], factory);
	else if(typeof exports === 'object')
		exports["SwipeToDeleteView"] = factory(require("underscore"), require("backbone"), require("backbone.marionette"));
	else
		root["SwipeToDeleteView"] = factory(root["_"], root["Backbone"], root["Marionette"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _underscore = __webpack_require__(1);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(3);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _delete = __webpack_require__(4);

	var _delete2 = _interopRequireDefault(_delete);

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
			key: 'events',
			value: function events() {
				//console.info('events', this.options);

				return {
					'mousedown .js-content > *': 'onStart',
					'mouseup .js-content > *': 'onEnd'
				};
			}
		}, {
			key: 'initialize',
			value: function initialize(_ref) {
				var View = _ref.View;
				var _ref$DeleteView = _ref.DeleteView;
				var DeleteView = _ref$DeleteView === undefined ? _delete2.default : _ref$DeleteView;

				//console.info('init', this.options);

				if (typeof View !== 'function') {
					throw new Error('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
				}

				if (typeof DeleteView !== 'function') {
					throw new Error('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
				}

				this.View = View;
				this.DeleteView = DeleteView;

				_underscore2.default.bindAll(this, 'onMove', 'onEnd');
			}
		}, {
			key: 'onRender',
			value: function onRender() {
				this.$el.addClass('swipe-to-delete');
				this.showDelete();
				this.showContent();
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
			key: 'onStart',
			value: function onStart(e) {
				var target = e.currentTarget;
				//console.info('onStart', target);
				document.addEventListener('mousemove', this.onMove, false);
				target.addEventListener('mouseleave', this.onEnd, false);

				this.startX = e.pageX;
			}
		}, {
			key: 'onMove',
			value: function onMove(e) {
				//console.info('onMove', e, e.currentTarget);
				this.moveAt(e);
			}
		}, {
			key: 'onEnd',
			value: function onEnd(e) {
				var target = e.currentTarget;
				//console.info('onEnd', this);
				document.removeEventListener('mousemove', this.onMove, false);
				target.removeEventListener('mouseleave', this.onEnd, false);
			}
		}, {
			key: 'moveAt',
			value: function moveAt(e) {
				var target = this.getRegion('content').currentView.$el;
				var res = e.pageX - this.startX;
				target.css({ left: res });
			}
		}]);

		return SwipeToDeleteView;
	}(_backbone4.default.LayoutView);

	exports.default = SwipeToDeleteView;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _backbone = __webpack_require__(3);

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
				return '';
			}
		}, {
			key: 'initialize',
			value: function initialize(options) {
				console.info('init DelView', options);
			}
		}]);

		return DelView;
	}(_backbone2.default.ItemView);

	exports.default = DelView;

/***/ }
/******/ ])
});
;