(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _loginPage = _interopRequireDefault(require("./modules/login-page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global jQuery Drupal */
// Import your modules
(function ($, Drupal) {
  Drupal.behaviors.loginpage = {
    attach: function attach(context, settings) {
      new _loginPage["default"](context, settings, $, Drupal);
    }
  };
})(jQuery, Drupal);

},{"./modules/login-page":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LoginPage = /*#__PURE__*/function () {
  function LoginPage(context, settings, $, Drupal) {
    _classCallCheck(this, LoginPage);

    // The context is the piece of the DOM that has been rendered before
    // Drupal.behaviors are invoked. Typicall this is the `document`
    this.context = context; // The settings passed to Javascript by Drupal

    this.settings = settings; // The Drupal core object that manages everything!
    // this.Drupal = Drupal;
    // jQuery

    this.$ = $; // Elements

    this.$goBackButtons = this.$('.js-close, .js-go-back', this.context).once(); // Events

    this.$goBackButtons.on('click', this.$.proxy(this.goBack, this));
  }

  _createClass(LoginPage, [{
    key: "goBack",
    value: function goBack(e) {
      e.preventDefault();
      window.history.back();
    }
  }]);

  return LoginPage;
}();

var _default = LoginPage;
exports["default"] = _default;

},{}]},{},[1])

