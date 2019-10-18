"use strict";

(function () {
  var searchButton = document.querySelector('.header-nav__search-button');
  var searchWrapper = document.querySelector('.search-wrapper');
  var siteHeader = document.querySelector('.site-header');

  function toggleSearchWrapper(visibility) {
    searchButton.setAttribute('aria-expanded', visibility == true);
    searchWrapper.setAttribute('aria-expanded', visibility == true);
    siteHeader.classList.toggle('js-search-active');
    searchWrapper.addEventListener('transitionend', handleFocus, {
      once: true
    });
  }

  function handleFocus() {
    if (searchIsVisible()) {
      var input = searchWrapper.querySelector('input[type="search"]');
      console.log(input);
      input.focus();
    } else {
      searchButton.focus();
    }
  }

  function searchIsVisible() {
    return searchWrapper.getAttribute('aria-expanded') === 'true';
  }

  searchButton.addEventListener('click', function () {
    return toggleSearchWrapper(!searchIsVisible());
  });
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      toggleSearchWrapper(false);
    }
  });
})();
//# sourceMappingURL=search.js.map
