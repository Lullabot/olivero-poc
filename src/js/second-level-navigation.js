(function() {
  const secondLevelNavMenus = document.querySelectorAll('.primary-nav--level-1 .has-children');

  // Insert a button after the <a> element that will control the visibility
  // of the second-level navigation at mobile widths.
  // @todo Should we move this into PHP?
  secondLevelNavMenus.forEach(el => {
    const button = el.querySelector('.primary-nav__button-toggle');

    // Add focusin event to open nav when there's a focus event for IE11
    el.addEventListener('focusin', toggleNavVisibility);
    button.addEventListener('click', expandSubNav);
  });

  function expandSubNav(e) {
    const button = e.target;
    const subMenu = button.parentNode.querySelector('.primary-nav--level-2');

    if (!isButtonPressed(button)) {
      button.setAttribute('aria-expanded', 'true');
      subMenu.classList.add('is-active');
    }
    else {
      button.setAttribute('aria-expanded', 'false');
      subMenu.classList.remove('is-active');
    }
  }

  function isButtonPressed(el) {
    return el.getAttribute('aria-expanded') === 'true';
  }

  function toggleNavVisibility() {

  }
})();
