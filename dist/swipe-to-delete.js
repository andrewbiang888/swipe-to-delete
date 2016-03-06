(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone.marionette"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone.marionette", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["SwipeToDelete"] = factory(require("backbone.marionette"), require("underscore"));
	else
		root["SwipeToDelete"] = factory(root["Marionette"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(2);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _delete = __webpack_require__(3);

	var _delete2 = _interopRequireDefault(_delete);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SwipeDeleteView = function (_Marionette$LayoutVie) {
		_inherits(SwipeDeleteView, _Marionette$LayoutVie);

		function SwipeDeleteView() {
			_classCallCheck(this, SwipeDeleteView);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeDeleteView).apply(this, arguments));
		}

		_createClass(SwipeDeleteView, [{
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
				return {
					'mousedown': 'onStart',
					'mouseup': 'onEnd'
				};
			}
		}, {
			key: 'initialize',
			value: function initialize(_ref) {
				var View = _ref.View;
				var _ref$DeleteView = _ref.DeleteView;
				var DeleteView = _ref$DeleteView === undefined ? _delete2.default : _ref$DeleteView;

				console.info('init', this.options);

				if (typeof View !== 'function') {
					throw new Error('"View" can be any Backbone.View or be derived from Marionette.ItemView.');
				}

				if (typeof DeleteView !== 'function') {
					throw new Error('"DeleteView" can be any Backbone.View or be derived from Marionette.ItemView.');
				}
			}
		}, {
			key: 'onRender',
			value: function onRender() {
				this.showContent();
			}
		}, {
			key: 'showContent',
			value: function showContent() {
				var view = new this.options.View(_underscore2.default.omit(this.options, 'el', 'tagName', 'className', 'View', 'DeleteView'));
				this.showChildView('content', view);
			}
		}, {
			key: 'onStart',
			value: function onStart(e) {
				console.info('onStart', e);
				document.addEventListener('mousemove', this.onMove, false);
			}
		}, {
			key: 'onMove',
			value: function onMove(e) {
				console.info('onMove', e);
			}
		}, {
			key: 'onEnd',
			value: function onEnd(e) {
				console.info('onEnd', e);
				document.removeEventListener('mousemove', this.onMove, false);
			}
		}]);

		return SwipeDeleteView;
	}(_backbone2.default.LayoutView);

	exports.default = SwipeDeleteView;

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _backbone = __webpack_require__(1);

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