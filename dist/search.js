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
      searchWrapper.querySelector('input[type="search"]').focus();
    } else {
      searchButton.focus();
    }
  }

  function searchIsVisible() {
    return searchWrapper.getAttribute('aria-expanded') === 'true';
  }

  document.addEventListener('click', function (e) {
    if (e.target.matches('.header-nav__search-button, .header-nav__search-button *')) {
      toggleSearchWrapper(!searchIsVisible());
    } else if (!e.target.matches('.search-wrapper, .search-wrapper *')) {
      toggleSearchWrapper(false);
    }
  });
  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      toggleSearchWrapper(false);
    }
  });
})();
//# sourceMappingURL=search.js.map
