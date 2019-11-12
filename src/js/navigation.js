(function() {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;

  const mobileNavButton = document.querySelector('.mobile-nav-button');
  const mobileNavWrapperId = 'header-nav';
  const mobileNavWrapper = document.getElementById(mobileNavWrapperId);
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');

  const focusableNavElements = mobileNavWrapper.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableEl = focusableNavElements[0];
  const lastFocusableEl = focusableNavElements[focusableNavElements.length - 1];

  function init() {
    mobileNavButton.setAttribute('aria-controls', mobileNavWrapperId);
    mobileNavWrapper.setAttribute('data-menu-open', "false");
    mobileNavButton.setAttribute('aria-expanded', "false");
  }

  function isMobileNavOpen() {
    return mobileNavWrapper.getAttribute('data-menu-open') === 'true';
  }

  function toggleMobileNav(state) {
    const value = state ? 'true' : 'false';
    mobileNavWrapper.setAttribute('data-menu-open', value);
    mobileNavButton.setAttribute('aria-expanded', value);

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

  // Focus trap.
  mobileNavWrapper.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      if ( e.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl && isDesktopNav() === false) {
          mobileNavButton.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl && isDesktopNav() === false) {
          mobileNavButton.focus();
          e.preventDefault();
        }
      }
    }
  });
})()
