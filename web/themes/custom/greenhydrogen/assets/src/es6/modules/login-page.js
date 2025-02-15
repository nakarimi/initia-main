class LoginPage {
  constructor(context, settings, $, Drupal) {
    // The context is the piece of the DOM that has been rendered before
    // Drupal.behaviors are invoked. Typicall this is the `document`
    this.context = context;

    // The settings passed to Javascript by Drupal
    this.settings = settings;

    // The Drupal core object that manages everything!
    // this.Drupal = Drupal;

    // jQuery
    this.$ = $;

    // Elements
    this.$goBackButtons = this.$('.js-close, .js-go-back', this.context).once();

    // Events
    this.$goBackButtons.on('click', this.$.proxy(this.goBack, this));
  }

  goBack(e) {
    e.preventDefault();

    window.history.back();
  }
}

export default LoginPage;
