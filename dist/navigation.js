"use strict";

(function () {
  var isDesktopNav = drupalSettings.olivero.isDesktopNav;
  var mobileNavButton = document.querySelector('.mobile-nav-button');
  var mobileNavWrapper = document.querySelector('.header-nav');
  var body = document.querySelector('body');

  if (!isDesktopNav()) {}

  function isMobileNavOpen() {
    return mobileNavWrapper.getAttribute('aria-expanded') === 'true';
  }

  function toggleMobileNav(state) {
    var value = state ? 'true' : 'false';
    mobileNavWrapper.setAttribute('aria-expanded', value); // Overlay

    if (state) {
      body.classList.add('js-overlay-active', 'js-fixed');
    } else {
      body.classList.remove('js-overlay-active', 'js-fixed');
    }
  }

  mobileNavButton.addEventListener('click', function () {
    toggleMobileNav(!isMobileNavOpen());
  });
})();
//# sourceMappingURL=navigation.js.map
