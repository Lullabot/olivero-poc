(function () {
  const secondLevelNavMenus = document.querySelectorAll('.primary-nav--level-1 [aria-expanded="false"]');
  const subMenu = document.querySelector('.primary-nav--level-2');

  // Insert a button after the <a> element that will control the visibility
  // of the second-level navigation.
  secondLevelNavMenus.forEach(el => {
    const button = document.createElement('button');
    const subMenu = el.querySelector('.primary-nav--level-2');

    button.classList.add('primary-nav__button-expand');
    button.textContent = 'Expand sub-navigation';
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', expandSubNav);
    el.insertBefore(button, subMenu);
  });

  function expandSubNav(e) {
    const button = e.target;

    if (!isButtonPressed(button)) {
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-expanded', 'true');
      subMenu.classList.add('primary-nav--level-2--visible');
    }
    else {
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-expanded', 'false');
      subMenu.classList.remove('primary-nav--level-2--visible');
    }

  }

  function isButtonPressed(el) {
    return el.getAttribute('aria-pressed') === 'true';
  }

  function init() {
    //Removes via JS hardcoded class to be shown by default
    subMenu.classList.remove('primary-nav--level-2--visible');
  }

  init();

})();
