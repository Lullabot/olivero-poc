(function() {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;

  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const mobileNavWrapperId = 'header-nav';
  const mobileNavWrapper = document.getElementById(mobileNavWrapperId);
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');

  function init() {
    mobileNavButton.setAttribute('aria-controls', mobileNavWrapperId);
  }

  function isMobileNavOpen() {
    return mobileNavWrapper.getAttribute('aria-expanded') === 'true';
  }

  function toggleMobileNav(state) {
    const value = state ? 'true' : 'false';
    mobileNavWrapper.setAttribute('aria-expanded', value);
    mobileNavButton.setAttribute('aria-pressed', value);

    // Overlay
    if (state) {
      body.classList.add('js-overlay-active', 'js-fixed');
    }
    else {
      body.classList.remove('js-overlay-active', 'js-fixed');
    }
  }

  // Initialize everything.

  init();

  mobileNavButton.addEventListener('click', () => {
    toggleMobileNav(!isMobileNavOpen());
  });

  document.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      toggleMobileNav(false);
    }
  });

  overlay.addEventListener('click', () => {
    toggleMobileNav(false);
  });

  overlay.addEventListener('touchstart', () => {
    toggleMobileNav(false);
  });
})()
