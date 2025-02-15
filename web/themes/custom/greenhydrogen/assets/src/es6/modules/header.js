import debounce from '../utils/debounce';
import Ps from 'perfect-scrollbar';

class Header {
  constructor(context, settings, $, Drupal) {
    // Values from Drupal
    this.context = context;

    this.settings         = settings;
    this.$                = $;
    this.Drupal           = Drupal;
    this.$window          = this.$(window);
    this.mobileBreakpoint = 1200;
    this.speed            = 300;
    this.$document        = this.$(document);

    this.$header      = this.$('.js-header', this.context).once();
    this.headerHeight = this.$header.outerHeight(true);

    this.$pluses = this.$('.js-menu-plus', this.context).once();

    // Search
    this.$searchForm        = $('.js-search-form', this.context).once();
    this.$searchField       = $('.js-search-field', this.context).once();
    this.$searchOpenButton  = $('.js-search-open', this.context).once();
    this.$searchCloseButton = $('.js-search-close', this.context).once();

    // Mobile menu
    this.$burgerBtn = this.$('.js-header-burger', this.context).once();
    this.$mainMenu  = this.$('.js-main-menu', this.context).once();

    // Scrollbars
    //----------------------------------------
    this.scrollbars = [];

    // Events
    //----------------------------------------

    // Scroll Events
    this.prevScrollPos = this.$header.outerHeight(true);
    this.$window.on('scroll', debounce(() => {
      this.hideOnScrollDown();
    }, 20));

    // Click Events
    this.$burgerBtn.on('click', this.$.proxy(this.toggleMobileMenu, this));
    this.$pluses.on('click', $.proxy(this.toggleMenu, this));

    // Search Events
    this.$searchOpenButton.on('click', $.proxy(this.openSearch, this));
    this.$searchCloseButton.on('click', $.proxy(this.closeSearch, this));

    // Close search on doc click
    this.$document.on('click', $.proxy(this.documentClick, this));

    this.$document.keyup((e) => {
      // Escape Key
      if (e.keyCode === 27) {
        this.closeSearch();
      }
    });


    this.$window.on('resize', debounce(() => {
      if (this.$window.width() > this.mobileBreakpoint) {
        this.resetHeader();
        this.destroyScrollbars();
      } else {
        this.addScrollbars();
      }
    }, 300)).on('load', () => {
      if (this.$window.width() <= this.mobileBreakpoint) {
        this.addScrollbars();
      }
    });
  }


  closeSearch(e) {
    if (this.$window.width() > this.mobileBreakpoint && this.$searchOpenButton.hasClass('is-open')) {
      if (typeof e !== 'undefined') {
        e.preventDefault();
      }

      this.$searchForm.fadeOut(this.speed);
      this.$searchOpenButton.focus();
    }
  }

  openSearch() {
    this.$searchOpenButton.addClass('is-open');
    this.$searchForm.fadeIn(this.speed, () => {
      this.$searchField.focus();
    });
  }


  toggleMobileMenu(e) {
    e.preventDefault();
    const $elem = this.$(e.currentTarget);

    // Toggle open classes
    $elem.toggleClass('is-open');
    this.$mainMenu.toggleClass('is-open');
    this.$('body').toggleClass('is-scroll-locked');

    // Check header class
    this.toggleHeaderClass($elem);
  }

  closeMobileMenu() {
    if (this.$burgerBtn.hasClass('is-open')) {
      this.$burgerBtn.removeClass('is-open');
      this.$mainMenu.removeClass('is-open');
    }
  }


  toggleHeaderClass($elem) {
    if ($elem.hasClass('is-open')) {
      this.$header.addClass('is-open');
    } else {
      this.$header.removeClass('is-open');
    }
  }

  resetHeader() {
    this.$searchForm.removeAttr('style');
    this.closeMobileMenu();
    this.$header.removeClass('is-open');
  }

  addScrollbars() {
    for (let i = 0; i < this.$mainMenu.length; i++) {
      this.scrollbars.push(new Ps(this.$mainMenu[0]));
    }
  }

  destroyScrollbars() {
    this.scrollbars.forEach((ps) => ps.destroy());
  }

  updateScrollbars() {
    this.scrollbars.forEach((ps) => ps.update());
  }

  toggleMenu(e) {
    const $elem = this.$(e.currentTarget);
    $elem.toggleClass('is-open');
    $elem.next().slideToggle(300, () => {
      this.updateScrollbars();
    });
  }

  hideOnScrollDown() {
    const currentScrollPos = this.$window.scrollTop();
    const prevScrollPos    = this.prevScrollPos;

    if (currentScrollPos > 300) {
      if (!this.$header.hasClass('is-sticky')) {
        this.$header.addClass('no-transition');
        this.$header.addClass('is-sticky');
      }

      if (prevScrollPos < currentScrollPos) {
        this.$header.addClass('is-hidden');
      } else {
        this.$header.removeClass('no-transition');
        this.$header.removeClass('is-hidden');
      }
    } else {
      this.$header.removeClass('is-sticky');
    }


    if (currentScrollPos < this.headerHeight) {
      this.$header.removeClass('is-hidden');
    }

    this.prevScrollPos = currentScrollPos;
  }

  documentClick(e) {
    const $elem = this.$(e.target);

    if (!$elem.closest(this.$searchForm).length && !$elem.closest(this.$searchOpenButton).length) {
      this.closeSearch();
    }
  }

}

export default Header;
