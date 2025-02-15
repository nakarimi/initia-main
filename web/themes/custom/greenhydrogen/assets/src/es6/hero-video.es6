/* global jQuery Drupal */
// Import your modules
import HeroVideo from './modules/hero-video';

(function ($, Drupal) {
  Drupal.behaviors.loginpage = {
    attach(context, settings) {
      new HeroVideo(context, settings, $, Drupal);
    }
  };
})(jQuery, Drupal);
