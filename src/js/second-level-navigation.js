(function() {
  const secondLevelNavMenus = document.querySelectorAll('.has-children');

  // Insert a button after the <a> element that will control the visibility
  // of the second-level navigation.
  secondLevelNavMenus.forEach(el => {
    const button = document.createElement('button');
    const subMenu = el.querySelector('.primary-nav--level-2');

    button.classList.add('primary-nav__button-expand');
    button.textContent = 'Expand sub-navigation';
    button.addEventListener('click', expandSubNav);
    el.insertBefore(button, subMenu);
  });

  function expandSubNav(e) {
    const button = e.target;
    const subMenu = button.parentNode.querySelector('.primary-nav--level-2');

    if (!isButtonPressed(button)) {
      button.setAttribute('aria-pressed', 'true');
      subMenu.setAttribute('aria-expanded', 'true');
    }
    else {
      button.setAttribute('aria-pressed', 'false');
      subMenu.setAttribute('aria-expanded', 'false');
    }
  }

  function isButtonPressed(el) {
    return el.getAttribute('aria-pressed') === 'true';
  }
})();
