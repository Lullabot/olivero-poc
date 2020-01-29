(function() {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;

  const mobileNavButton = document.createElement('button');
  mobileNavButton.classList.add('mobile-nav-button');
  const mobileNavButtonText = document.createElement('div');
  mobileNavButtonText.classList.add('mobile-nav-button__label');
  mobileNavButtonText.innerHTML = 'Menu';
  const mobileNavButtonIcon = document.createElement('div');
  mobileNavButtonIcon.classList.add('mobile-nav-button__icon');
  mobileNavButton.appendChild(mobileNavButtonText);
  mobileNavButton.appendChild(mobileNavButtonIcon);
  const mobileNavButtonWrapper = document.querySelector('.mobile-buttons');
  mobileNavButtonWrapper.appendChild(mobileNavButton);

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
    mobileNavWrapper.classList.add('js-header-nav');
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
        if (document.activeElement === firstFocusableEl && !isDesktopNav()) {
          mobileNavButton.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl && !isDesktopNav()) {
          mobileNavButton.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Remove overlays when browser is resized and desktop nav appears.
  // @todo Use core/drupal.debounce library to throttle when we move into theming.
  window.addEventListener('resize', () => {
    if (drupalSettings.olivero.isDesktopNav) {
      toggleMobileNav(false);
      body.classList.remove('js-overlay-active', 'js-fixed');
    }
  })
})()
