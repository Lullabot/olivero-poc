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
      const input = searchWrapper.querySelector('input[type="search"]');
      console.log(input);
      input.focus();
    }
    else {
      searchButton.focus();
    }
  }

  function searchIsVisible() {
    return searchWrapper.getAttribute('aria-expanded') === 'true';
  }

  searchButton.addEventListener('click', () => toggleSearchWrapper(!searchIsVisible()));

  document.addEventListener('keyup', e => {
    if (e.keyCode === 27) {
      toggleSearchWrapper(false);
    }
  })
})();
