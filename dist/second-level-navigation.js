"use strict";

(function () {
  var secondLevelNavMenus = document.querySelectorAll('.has-children');
  secondLevelNavMenus.forEach(function (el) {
    var button = document.createElement('button');
    var subMenu = el.querySelector('.primary-nav--level-2');
    button.classList.add('primary-nav__button-expand');
    button.textContent = 'Expand sub-navigation';
    button.addEventListener('click', expandSubNav);
    el.insertBefore(button, subMenu);
  });

  function expandSubNav(e) {
    var button = e.target;
    var subMenu = button.parentNode.querySelector('.primary-nav--level-2');

    if (!isButtonPressed(button)) {
      button.setAttribute('aria-pressed', 'true');
      subMenu.setAttribute('aria-expanded', 'true');
    } else {
      button.setAttribute('aria-pressed', 'false');
      subMenu.setAttribute('aria-expanded', 'false');
    }
  }

  function isButtonPressed(el) {
    return el.getAttribute('aria-pressed') === 'true';
  }
})();
//# sourceMappingURL=second-level-navigation.js.map
