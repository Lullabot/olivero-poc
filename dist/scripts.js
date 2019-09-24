"use strict";

(function () {
  var fixables = document.querySelectorAll('.fixable');

  function monitorNavPosition() {
    var primaryNav = document.querySelector('.site-header');
    var options = {
      rootMargin: '72px',
      threshold: [0.999, 1]
    };
    var observer = new IntersectionObserver(toggleDesktopNavVisibility, options);
    observer.observe(primaryNav);
  }

  function toggleDesktopNavVisibility(entries) {
    if (!isDesktopNav()) return;
    entries.forEach(function (entry) {
      // Every pixel is visible at 1.
      console.log(entry.intersectionRatio);

      if (entry.intersectionRatio < 1) {
        fixables.forEach(function (el) {
          return el.classList.add('js-fixed');
        });
      } else {
        fixables.forEach(function (el) {
          return el.classList.remove('js-fixed');
        }); // resetWideNavButton();
      }
    });
  }

  function isDesktopNav() {
    var navButtons = document.querySelector('.mobile-buttons');
    return window.getComputedStyle(navButtons).getPropertyValue('display') === 'none';
  }

  monitorNavPosition(); // Toggle desktop nav visibility when scrolled down.

  var wideNavButton = document.querySelector('.nav-primary__button');
  var siteHeaderToggleElement = document.querySelector('.site-header__inner');

  function wideNavIsOpen() {
    return wideNavButton.getAttribute('aria-pressed') === 'true';
  }

  wideNavButton.addEventListener('click', function () {
    if (!wideNavIsOpen()) {
      showWideNav();
    } else {
      hideWideNav();
    }
  });

  function showWideNav() {
    wideNavButton.setAttribute('aria-pressed', 'true');
    siteHeaderToggleElement.setAttribute('aria-expanded', 'true');
  } // Resets the wide nav button to be closed (it's default state).


  function hideWideNav() {
    wideNavButton.setAttribute('aria-pressed', 'false');
    siteHeaderToggleElement.setAttribute('aria-expanded', 'false');
  }

  siteHeaderToggleElement.addEventListener('focusin', showWideNav);
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      hideWideNav();
    }
  });
})();
//# sourceMappingURL=scripts.js.map
