// Run LazyLoad Ad when document loaded.
(function($) { 
  $(document).ready(function() {
    $(Drupal.settings.lazyloadad.selectors).lazyLoadAd({
      forceLoad : Drupal.settings.lazyloadad.forceLoad,
      debug : Drupal.settings.lazyloadad.debug
    });  
  });
})(jQuery); 