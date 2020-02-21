(function() {
  const searchWideButton = document.querySelector('.header-nav__search-button');
  const searchWideWrapper = document.querySelector('.search-wide__wrapper');
  const siteHeader = document.querySelector('.site-header');

  function toggleSearchVisibility(visibility) {
    searchWideButton.setAttribute('aria-expanded', visibility == true);
    searchWideWrapper.setAttribute('aria-expanded', visibility == true);
    siteHeader.classList.toggle('js-search-active');

    searchWideWrapper.addEventListener('transitionend', handleFocus, { once: true });
  }

  drupalSettings.olivero.toggleSearchVisibility = toggleSearchVisibility;

  function handleFocus() {
    if (searchIsVisible()) {
      searchWideWrapper.querySelector('input[type="search"]').focus();
    }
    else {
      searchWideButton.focus();
    }
  }

  function searchIsVisible() {
    return searchWideWrapper.getAttribute('aria-expanded') === 'true';
  }
  drupalSettings.olivero.searchIsVisible = searchIsVisible;

  document.addEventListener('click', e => {
    if (e.target.matches('.header-nav__search-button, .header-nav__search-button *')) {
      toggleSearchVisibility(!searchIsVisible());
    }
    else if (searchIsVisible() && !e.target.matches('.search-wide__wrapper, .search-wide__wrapper *')) {
      toggleSearchVisibility(false);
    }
  });
})();
