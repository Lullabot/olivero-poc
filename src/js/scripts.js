
(function() {
  window.drupalSettings = {};
  window.drupalSettings.olivero = {};

  // Replicates Drupal's addition of adding a `js` class onto HTML element.
  document.documentElement.classList.add('js');

  function isDesktopNav() {
    // @todo, I'm not sure we even need the .mobile-buttons container anymore.
    const navButtons = document.querySelector('.mobile-buttons');
    return window.getComputedStyle(navButtons).getPropertyValue('display') === 'none';
  }

  drupalSettings.olivero.isDesktopNav = isDesktopNav;

  const wideNavButton = document.querySelector('.nav-primary__button');
  const siteHeaderToggleElement = document.querySelector('.site-header__inner');

  function wideNavIsOpen() {
    return wideNavButton.getAttribute('aria-expanded') === 'true';
  }

  function showWideNav() {
    if (isDesktopNav()) {
      wideNavButton.setAttribute('aria-expanded', 'true');
      siteHeaderToggleElement.classList.add('is-active');
    }
  }

  // Resets the wide nav button to be closed (it's default state).
  function hideWideNav() {
    if (isDesktopNav()) {
      wideNavButton.setAttribute('aria-expanded', 'false');
      siteHeaderToggleElement.classList.remove('is-active');
    }
  }


  // Only enable scroll effects if the browser supports Intersection Observer.
  // @see https://github.com/w3c/IntersectionObserver/blob/master/polyfill/intersection-observer.js#L19-L21
  if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

    const fixables = document.querySelectorAll('.fixable')

    function monitorNavPosition() {
      const primaryNav = document.querySelector('.site-header');
      const options = {
        rootMargin: '72px',
        threshold: [0.999, 1]
      }

      const observer = new IntersectionObserver(toggleDesktopNavVisibility, options);
      observer.observe(primaryNav);
    }

    function toggleDesktopNavVisibility(entries) {
      if (!isDesktopNav()) return;

      entries.forEach(entry => {
        // FF doesn't seem to support entry.isIntersecting properly,
        // so we check the intersectionRatio.
        if (entry.intersectionRatio < 1) {
          fixables.forEach(el => el.classList.add('js-fixed'));
        }
        else {
          fixables.forEach(el => el.classList.remove('js-fixed'));
        }
      });
    }

    wideNavButton.addEventListener('click', () => {
      if (!wideNavIsOpen()) {
        showWideNav();
      }
      else {
        hideWideNav();
      }
    });

    siteHeaderToggleElement.addEventListener('focusin', showWideNav);

    // If skip link is clicked, ensure that the wide navigation closes so the header will not be covered up.
    document.querySelector('.skip-link').addEventListener('click', function () {
      hideWideNav();
    });

    monitorNavPosition();
  }

  document.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      // Close the search form.
      if ('toggleSearchVisibility' in drupalSettings.olivero && 'searchIsVisible' in drupalSettings.olivero && drupalSettings.olivero.searchIsVisible()) {
        drupalSettings.olivero.toggleSearchVisibility(false);
      }
      // Close the wide nav.
      else {
        hideWideNav();
      }
    }
  });
})();
