(function() {
  // document.querySelector('.nav-primary__button').addEventListener('click', e => {
  //   e.target.classList.toggle('js-active');
  // });

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

})();
