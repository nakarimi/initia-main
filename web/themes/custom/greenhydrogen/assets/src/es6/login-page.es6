/* global jQuery Drupal */
// Import your modules
import LoginPage from './modules/login-page';

(function ($, Drupal) {
  Drupal.behaviors.loginpage = {
    attach(context, settings) {
      new LoginPage(context, settings, $, Drupal);
    }
  };
})(jQuery, Drupal);
