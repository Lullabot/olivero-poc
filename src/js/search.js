(function() {
  const searchButton = document.querySelector('.header-nav__search-button');
  const searchWrapper = document.querySelector('.search-wrapper');
  const siteHeader = document.querySelector('.site-header');

  function toggleSearchWrapper(visibility) {
    searchButton.setAttribute('aria-expanded', visibility == true);
    searchWrapper.setAttribute('aria-expanded', visibility == true);
    siteHeader.classList.toggle('js-search-active');

    searchWrapper.addEventListener('transitionend', handleFocus, { once: true });
  }

  function handleFocus() {
    if (searchIsVisible()) {
      searchWrapper.querySelector('input[type="search"]').focus();
    }
    else {
      searchButton.focus();
    }
  }

  function searchIsVisible() {
    return searchWrapper.getAttribute('aria-expanded') === 'true';
  }

  document.addEventListener('click', e => {
    if (e.target.matches('.header-nav__search-button, .header-nav__search-button *')) {
      toggleSearchWrapper(!searchIsVisible());
    }
    else if (searchIsVisible() && !e.target.matches('.search-wrapper, .search-wrapper *')) {
      toggleSearchWrapper(false);
    }
  });

  document.addEventListener('keyup', e => {
    if (searchIsVisible() && e.keyCode === 27) {
      toggleSearchWrapper(false);
    }
  });
})();
