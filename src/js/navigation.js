(function () {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;

  const mobileNavButton = document.createElement('button');
  const mobileNavButtonWrapper = document.querySelector('.mobile-buttons');
  const mobileNavWrapperId = 'header-nav';
  const mobileNavWrapper = document.getElementById(mobileNavWrapperId);
  const navGridHolder = document.querySelector('.grid-full-no-js');
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');
  let mobileNavButtonIcon;

  const focusableNavElements = mobileNavWrapper.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  const firstFocusableEl = focusableNavElements[0];
  const lastFocusableEl = focusableNavElements[focusableNavElements.length - 1];

  function init() {
    // Adds the markup inside the button, sets the aria elements, and removes if JS present the class 'grid-full-no-js'

    mobileNavButton.innerHTML = '<div class="mobile-nav-button__label">Menu</div><div class="mobile-nav-button__icon"></div>';
    mobileNavButtonWrapper.appendChild(mobileNavButton);
    mobileNavButton.classList.add('mobile-nav-button');
    mobileNavButton.setAttribute('aria-controls', 'header-nav');
    mobileNavButton.setAttribute('aria-expanded', 'false');
    mobileNavWrapper.classList.add('js-header-nav');
    navGridHolder.classList.remove('grid-full-no-js');
    mobileNavButtonIcon = document.querySelector('.mobile-nav-button__icon');
  }

  function isMobileNavOpen() {
    return mobileNavWrapper.getAttribute('data-menu-open') === 'true';
  }

  function toggleMobileNav(state) {
    const value = state ? 'true' : 'false';

    mobileNavWrapper.classList.toggle('header-nav--visible');
    mobileNavButtonIcon.classList.toggle('mobile-nav-button__icon--active');
    body.classList.toggle('js-overlay-active');
    body.classList.toggle('js-fixed');

    if (state) {
      mobileNavButton.setAttribute('aria-pressed', 'true');
      mobileNavButton.setAttribute('aria-expanded', 'true');
    } else {
      mobileNavButton.setAttribute('aria-pressed', 'false');
      mobileNavButton.setAttribute('aria-expanded', 'false');
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
  mobileNavWrapper.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.keyCode === 9) {
      if (e.shiftKey) /* shift + tab */ {
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
