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
    console.log(e);

    if (!isButtonPressed(e.target)) {
      e.target.setAttribute('aria-pressed', 'true');
    } else {
      e.target.setAttribute('aria-pressed', 'false');
    }
  }

  function isButtonPressed(el) {
    return el.getAttribute('aria-pressed') === 'true';
  }
})();
//# sourceMappingURL=second-level-navigation.js.map
