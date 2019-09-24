(function() {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;

  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const mobileNavWrapper = document.querySelector('.header-nav');
  const body = document.querySelector('body');

  if (!isDesktopNav()) {

  }

  function isMobileNavOpen() {
    return mobileNavWrapper.getAttribute('aria-expanded') === 'true';
  }

  function toggleMobileNav(state) {
    const value = state ? 'true' : 'false';
    mobileNavWrapper.setAttribute('aria-expanded', value);

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
})()
