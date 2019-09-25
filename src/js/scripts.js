(function() {

  // Set up drupalSettings and olivero global namespaces.
  window.drupalSettings = {};
  window.drupalSettings.olivero = {};

  const fixables = document.querySelectorAll('.fixable')

  function monitorNavPosition() {
    const primaryNav = document.querySelector('.site-header');
    const options = {
      rootMargin: '72px',
      threshold: 1
    }

    const observer = new IntersectionObserver(toggleDesktopNavVisibility, options);
    observer.observe(primaryNav);
  }

  function toggleDesktopNavVisibility(entries) {
    if (!isDesktopNav()) return;

    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        fixables.forEach(el => el.classList.add('js-fixed'));
      }
      else {
        fixables.forEach(el => el.classList.remove('js-fixed'));
        // resetWideNavButton();
      }
    });
  }


  function isDesktopNav() {
    const navButtons = document.querySelector('.mobile-buttons');
    return window.getComputedStyle(navButtons).getPropertyValue('display') === 'none';
  }

  drupalSettings.olivero.isDesktopNav = isDesktopNav;

  monitorNavPosition();


  // Toggle desktop nav visibility when scrolled down.

  const wideNavButton = document.querySelector('.nav-primary__button');
  const siteHeaderToggleElement = document.querySelector('.site-header__inner');

  function wideNavIsOpen() {
    return wideNavButton.getAttribute('aria-pressed') === 'true';
  }

  wideNavButton.addEventListener('click', () => {
    if (!wideNavIsOpen()) {
      showWideNav();
    }
    else {
      hideWideNav();
    }
  });



  function showWideNav() {
    wideNavButton.setAttribute('aria-pressed', 'true');
    siteHeaderToggleElement.setAttribute('aria-expanded', 'true');
  }

  // Resets the wide nav button to be closed (it's default state).
  function hideWideNav() {
    wideNavButton.setAttribute('aria-pressed', 'false');
    siteHeaderToggleElement.setAttribute('aria-expanded', 'false');
  }

  siteHeaderToggleElement.addEventListener('focusin', showWideNav);

  document.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      hideWideNav();
    }
  });

})();
