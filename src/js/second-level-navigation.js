(function() {

  const isDesktopNav = drupalSettings.olivero.isDesktopNav;
  const secondLevelNavMenus = document.querySelectorAll('.primary-nav--level-1 .has-children');

  // Add event listeners onto each subnav expand button
  secondLevelNavMenus.forEach(el => {
    const button = el.querySelector('.primary-nav__button-toggle');
    button.addEventListener('click', e => {
      const topLevelMenuITem = e.currentTarget.parentNode;
      toggleSubNav(topLevelMenuITem);
    });

    el.addEventListener('mouseover', e => {
      if (isDesktopNav()) {
        toggleSubNav(e.currentTarget, true);
      }
    });

    el.addEventListener('mouseout', e => {
      if (isDesktopNav()) {
        toggleSubNav(e.currentTarget, false);
      }
    });
  });

  /**
   * Shows and hides the second level submenu.
   *
   * @param {element} topLevelMenuITem - the <li> element that is the container for the menu and submenus.
   * @param {boolean} [toState] - Optional state where we want the submenu to end up.
   */
  function toggleSubNav(topLevelMenuITem, toState) {
    const button = topLevelMenuITem.querySelector('.primary-nav__button-toggle');
    const state = toState || button.getAttribute('aria-expanded') != 'true';

    if (state) {
      button.setAttribute('aria-expanded', 'true');
      topLevelMenuITem.querySelector('.primary-nav--level-2').classList.add('is-active');
    }
    else {
      button.setAttribute('aria-expanded', 'false');
      topLevelMenuITem.querySelector('.primary-nav--level-2').classList.remove('is-active');
    }
  }

  // Ensure that submenus close when ESC key is pressed.
  document.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      secondLevelNavMenus.forEach(el => {
        toggleSubNav(el, false);
      });
    }
  });
})();
