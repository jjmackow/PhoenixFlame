(function(window, document, Math, $, undef) {
  Drupal.behaviors.in_field_labels = {
    attach: function (context, settings) {
      $('.in-field-labels').once('in-field-labels-form', function() {
        // jquery.inFieldLabels.js handles for us granularity
        // of activating this functionality only on text/pass fields
        // (fields that receive text input from users).
        // Does not make sense having this functionality on other fields.
        $('label', this).inFieldLabels();
      });
    }
  };
})(window, window.document, Math, jQuery);
