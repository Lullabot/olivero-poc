"use strict";

(function () {
  var isDesktopNav = drupalSettings.olivero.isDesktopNav;
  var mobileNavButton = document.querySelector('.mobile-nav-button');
  var mobileNavWrapper = document.querySelector('.header-nav');
  var body = document.querySelector('body');
  var overlay = document.querySelector('.overlay');

  if (!isDesktopNav()) {}

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
  }

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
