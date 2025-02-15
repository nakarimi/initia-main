(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _heroVideo = _interopRequireDefault(require("./modules/hero-video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* global jQuery Drupal */
// Import your modules
(function ($, Drupal) {
  Drupal.behaviors.loginpage = {
    attach: function attach(context, settings) {
      new _heroVideo["default"](context, settings, $, Drupal);
    }
  };
})(jQuery, Drupal);

},{"./modules/hero-video":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debounce = _interopRequireDefault(require("../utils/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HeroVideo = /*#__PURE__*/function () {
  function HeroVideo(context, settings, $, Drupal) {
    var _this = this;

    _classCallCheck(this, HeroVideo);

    // Values from Drupal
    this.context = context;
    this.settings = settings;
    this.$ = $;
    this.Drupal = Drupal;
    this.$window = this.$(window);
    this.mobileBreakpoint = 1024;
    this.speed = 300;
    this.$document = this.$(document);
    this.$jsYoutubePlayer = $('#js-player');
    this.$videoWrapper = $('.js-video-container');
    this.$window = $(window);
    this.videoID = this.$videoWrapper.data('youtube-id');

    if (this.$jsYoutubePlayer.length) {
      // Create script tag.
      var tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      console.log(window.location.origin, 'origin'); // Callback function for YouTube iframe API at window level.

      window.onYouTubeIframeAPIReady = function () {
        window.player = new YT.Player('js-player', {
          videoId: _this.videoID,
          playerVars: {
            modestbranding: 1,
            autoplay: 1,
            mute: 1,
            controls: 0,
            showinfo: 0,
            wmode: 'transparent',
            branding: 0,
            loop: 1,
            rel: 0,
            autohide: 0,
            origin: window.location.origin
          },
          events: {
            'onReady': HeroVideo.onPlayerReady,
            'onStateChange': HeroVideo.onPlayerStateChange
          }
        });
      };

      this.$(window).on('keydown', function (e) {
        if (e.which === 27) {
          _this.pauseOnEsc();
        }
      });
    }
  } // Handle player ready, start video.


  _createClass(HeroVideo, null, [{
    key: "onPlayerReady",
    value: function onPlayerReady(event) {
      event.target.playVideo();
    } // Handle player state change.

  }, {
    key: "onPlayerStateChange",
    value: function onPlayerStateChange(event) {
      var player = event.target;

      if (event.data === 1) {
        var remains = player.getDuration() - player.getCurrentTime(); // Video is playing.

        var videoBackground = document.getElementsByClassName('js-banner-image');
        videoBackground[0].classList.add('is-hidden');

        if (window.rewindTO) {
          clearTimeout(window.rewindTO);
        }

        window.rewindTO = setTimeout(function () {
          player.seekTo(0);
        }, (remains - 0.1) * 1000);
      }
    }
  }]);

  return HeroVideo;
}();

var _default = HeroVideo;
exports["default"] = _default;

},{"../utils/debounce":3}],3:[function(require,module,exports){
'use strict';
/**
 * Simple debouncer
 *
 * @param {Function} func
 * @param {int} wait
 * @returns {Function}
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var timeout;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(context, args);
    }, wait);
  };
}

},{}]},{},[1])

