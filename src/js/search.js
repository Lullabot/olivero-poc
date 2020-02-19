(function() {
  const searchButton = document.querySelector('.header-nav__search-button');
  const searchWrapper = document.querySelector('.search-wrapper');
  const siteHeader = document.querySelector('.site-header');

  function toggleSearchVisibility(visibility) {
    searchButton.setAttribute('aria-expanded', visibility == true);
    searchWrapper.setAttribute('aria-expanded', visibility == true);
    siteHeader.classList.toggle('js-search-active');

    searchWrapper.addEventListener('transitionend', handleFocus, { once: true });
  }

  drupalSettings.olivero.toggleSearchVisibility = toggleSearchVisibility;

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
  drupalSettings.olivero.searchIsVisible = searchIsVisible;

  document.addEventListener('click', e => {
    if (e.target.matches('.header-nav__search-button, .header-nav__search-button *')) {
      toggleSearchVisibility(!searchIsVisible());
    }
    else if (searchIsVisible() && !e.target.matches('.search-wrapper, .search-wrapper *')) {
      toggleSearchVisibility(false);
    }
  });
})();
