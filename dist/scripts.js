"use strict";

(function () {
  window.drupalSettings = {};
  window.drupalSettings.olivero = {}; // Only enable scroll effects if the browser supports Intersection Observer.
  // @see https://github.com/w3c/IntersectionObserver/blob/master/polyfill/intersection-observer.js#L19-L21

  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    var monitorNavPosition = function monitorNavPosition() {
      var primaryNav = document.querySelector('.site-header');
      var options = {
        rootMargin: '72px',
        threshold: [0.999, 1]
      };
      var observer = new IntersectionObserver(toggleDesktopNavVisibility, options);
      observer.observe(primaryNav);
    };

    var toggleDesktopNavVisibility = function toggleDesktopNavVisibility(entries) {
      if (!isDesktopNav()) return;
      entries.forEach(function (entry) {
        // FF doesn't seem to support entry.isIntersecting properly,
        // so we check the intersectionRatio.
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
    };

    var isDesktopNav = function isDesktopNav() {
      var navButtons = document.querySelector('.mobile-buttons');
      return window.getComputedStyle(navButtons).getPropertyValue('display') === 'none';
    };

    var wideNavIsOpen = function wideNavIsOpen() {
      return wideNavButton.getAttribute('aria-pressed') === 'true';
    };

    var showWideNav = function showWideNav() {
      if (isDesktopNav()) {
        wideNavButton.setAttribute('aria-pressed', 'true');
        siteHeaderToggleElement.setAttribute('aria-expanded', 'true');
      }
    }; // Resets the wide nav button to be closed (it's default state).


    var hideWideNav = function hideWideNav() {
      if (isDesktopNav()) {
        wideNavButton.setAttribute('aria-pressed', 'false');
        siteHeaderToggleElement.setAttribute('aria-expanded', 'false');
      }
    };

    var fixables = document.querySelectorAll('.fixable');
    drupalSettings.olivero.isDesktopNav = isDesktopNav;
    monitorNavPosition(); // Toggle desktop nav visibility when scrolled down.

    var wideNavButton = document.querySelector('.nav-primary__button');
    var siteHeaderToggleElement = document.querySelector('.site-header__inner');
    wideNavButton.addEventListener('click', function () {
      if (!wideNavIsOpen()) {
        showWideNav();
      } else {
        hideWideNav();
      }
    });
    siteHeaderToggleElement.addEventListener('focusin', showWideNav);
    document.addEventListener('keyup', function (e) {
      if (e.keyCode === 27) {
        hideWideNav();
      }
    });
  }
})();
//# sourceMappingURL=scripts.js.map
