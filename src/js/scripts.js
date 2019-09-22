(function() {


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
      // Every pixel is visible at 1.
      console.log(entry.intersectionRatio);

      if (entry.intersectionRatio < 1) {
        fixables.forEach(el => el.classList.add('js-fixed'))
      }
      else {
        fixables.forEach(el => el.classList.remove('js-fixed'))
      }
    })


  }


  function isDesktopNav() {
    const navButton = document.querySelector('.header-nav__button');
    return window.getComputedStyle(navButton).getPropertyValue('display') === 'none';
  }

  monitorNavPosition();


  // Toggle desktop nav visibility when scrolled down.

  const wideNavButton = document.querySelector('.nav-primary__button');
  const siteHeaderInner = document.querySelector('.site-header__inner');

  function wideNavIsOpen() {
    return wideNavButton.getAttribute('aria-pressed') === 'true';
  }

  wideNavButton.addEventListener('click', e => {

    if (!wideNavIsOpen()) {
      wideNavButton.setAttribute('aria-pressed', 'true');
      siteHeaderInner.setAttribute('aria-expanded', 'true');
    }
    else {
      wideNavButton.setAttribute('aria-pressed', 'false');
      siteHeaderInner.setAttribute('aria-expanded', 'false');
    }

  });

})();
