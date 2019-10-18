"use strict";

(function () {
  var searchButton = document.querySelector('.header-nav__search-button');
  var searchWrapper = document.querySelector('.search-wrapper');
  var siteHeader = document.querySelector('.site-header');

  function toggleSearchWrapper(visibility) {
    searchButton.setAttribute('aria-expanded', visibility == true);
    searchWrapper.setAttribute('aria-expanded', visibility == true);
    siteHeader.classList.toggle('js-search-active');
  }

  function searchIsVisible() {
    return searchWrapper.getAttribute('aria-expanded') === 'true';
  }

  searchButton.addEventListener('click', function () {
    return toggleSearchWrapper(!searchIsVisible());
  });
})();
//# sourceMappingURL=search.js.map
