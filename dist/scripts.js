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
        });
      }
    });
  }

  function isDesktopNav() {
    var navButton = document.querySelector('.header-nav__button');
    return window.getComputedStyle(navButton).getPropertyValue('display') === 'none';
  }

  monitorNavPosition(); // Toggle desktop nav visibility when scrolled down.

  var wideNavButton = document.querySelector('.nav-primary__button');
  var siteHeaderInner = document.querySelector('.site-header__inner');

  function wideNavIsOpen() {
    return wideNavButton.getAttribute('aria-pressed') === 'true';
  }

  wideNavButton.addEventListener('click', function (e) {
    if (!wideNavIsOpen()) {
      wideNavButton.setAttribute('aria-pressed', 'true');
      siteHeaderInner.setAttribute('aria-expanded', 'true');
    } else {
      wideNavButton.setAttribute('aria-pressed', 'false');
      siteHeaderInner.setAttribute('aria-expanded', 'false');
    }
  });
})();
//# sourceMappingURL=scripts.js.map
