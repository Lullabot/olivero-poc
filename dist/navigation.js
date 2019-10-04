"use strict";

(function () {
  var isDesktopNav = drupalSettings.olivero.isDesktopNav;
  var mobileNavButton = document.querySelector('.mobile-nav-button');
  var mobileNavWrapperId = 'header-nav';
  var mobileNavWrapper = document.getElementById(mobileNavWrapperId);
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');

  function init() {
    mobileNavButton.setAttribute('aria-controls', mobileNavWrapperId);
  }

  function isMobileNavOpen() {
    return mobileNavWrapper.getAttribute('aria-expanded') === 'true';
  }

  function toggleMobileNav(state) {
    var value = state ? 'true' : 'false';
    mobileNavWrapper.setAttribute('aria-expanded', value);
    mobileNavButton.setAttribute('aria-pressed', value); // Overlay

    if (state) {
      body.classList.add('js-overlay-active', 'js-fixed');
    } else {
      body.classList.remove('js-overlay-active', 'js-fixed');
    }
  } // Initialize everything.


  init();
  mobileNavButton.addEventListener('click', function () {
    toggleMobileNav(!isMobileNavOpen());
  });
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      toggleMobileNav(false);
    }
  });
  overlay.addEventListener('click', function () {
    toggleMobileNav(false);
  });
  overlay.addEventListener('touchstart', function () {
    toggleMobileNav(false);
  });
})();
//# sourceMappingURL=navigation.js.map
