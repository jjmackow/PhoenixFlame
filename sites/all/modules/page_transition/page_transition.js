/**
 * @file
 * page_transition.js.
 */

(function ($) {

  'use strict';

  Drupal.behaviors.PageTransition = {
    attach: function (context, settings) {
      var transitions = $.parseJSON(Drupal.settings.page_transition);
      $(transitions).each(function () {
          var transition_element = this.transition_element;
          delete this.transition_element;
          if($(transition_element).length) {
            $(transition_element).addClass('animsition').animsition(this);
            if(this.loadingInner != '') {console.log(this.loadingClass);
              $('.' + this.loadingClass).css({'animation-duration':'0s', '-webkit-animation-duration':'0', 'border': 'none', 'width':'auto'});
            }
          }
      });
    }
  };
})(jQuery);
