
(function () {
  const secondLevelNavMenus = document.querySelectorAll('.primary-nav--level-1 .has-children ul');
  const subMenu = document.querySelector('.primary-nav--level-2');
  //Add button to expand sub-menu
  const subNavButton = document.createElement('button');

  // Insert a button after the <a> element that will control the visibility
  // of the second-level navigation at mobile widths.
  // @todo Should we move this into PHP?

  function setButton() {

    //Set button attributes and append it before the <ul> 
    subNavButton.innerHTML = 'Toggle sub-navigation';
    subNavButton.classList.add('primary-nav__button-toggle');
    subNavButton.setAttribute('aria-controls', 'product-submenu');
    subNavButton.setAttribute('aria-expanded', 'false');

    secondLevelNavMenus.forEach(el => {
      el.parentNode.insertBefore(subNavButton, el);
    });

  }

  setButton();

  subNavButton.addEventListener('click', () => {
    expandSubNav();
  });

  function expandSubNav() {

    if (!isButtonPressed(subNavButton)) {
      subNavButton.setAttribute('aria-pressed', 'true');
      subNavButton.setAttribute('aria-expanded', 'true');
      subMenu.classList.add('primary-nav--level-2--visible');
    }
    else {
      subNavButton.setAttribute('aria-pressed', 'false');
      subNavButton.setAttribute('aria-expanded', 'false');
      subMenu.classList.remove('primary-nav--level-2--visible');
    }

  }

  function isButtonPressed(el) {
    return el.getAttribute('aria-expanded') === 'true';
  }

  function init() {
    // Add JS class for behaviour and remove visible class for each subnav item
    secondLevelNavMenus.forEach(el => {
      el.classList.add('js-primary-nav--level-2');
      el.classList.remove('primary-nav--level-2--visible');
    })

  }

  init();

})();
