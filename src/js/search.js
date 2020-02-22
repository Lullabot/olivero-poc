(function() {
  const searchWideButton = document.querySelector('.header-nav__search-button');
  const searchWideWrapper = document.querySelector('.search-wide__wrapper');
  const siteHeader = document.querySelector('.site-header');

  function toggleSearchVisibility(visibility) {
    searchWideButton.setAttribute('aria-expanded', visibility == true);
    searchWideWrapper.classList.toggle('is-active', visibility == true);
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
    return searchWideWrapper.classList.contains('is-active');
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
