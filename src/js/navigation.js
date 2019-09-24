(function() {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;

  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const mobileNavWrapper = document.querySelector('.header-nav');
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');

  if (!isDesktopNav()) {

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
