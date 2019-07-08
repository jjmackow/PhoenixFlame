(function ($) {
  Drupal.wysiwyg.plugins['amazon_wysiwyg'] = {

    // Local storage for tags data.
    storage: {},

    /**
     * Return whether the passed node belongs to this plugin.
     */
    isNode: function (node) {
      if ($(node).is('.amazon-wysiwyg-img')) {
        return true;
      }
      return false;
    },

    /**
     * Execute the button.
     */
    invoke: function (data, settings, instanceId) {
      // Display the Add form.
      if (data.content === '') {
        settings.data_id = this._getId();
        settings.placeholder = this._getImgPlaceholder(settings);
        settings.mode = 'Add';
      }
      // Display the Edit form.
      else {
        var regexp = new RegExp('<img.*?alt="(\\w+)".*?>', 'gi');
        settings.data_id = data.content.replace(regexp, '$1');
        settings.mode = 'Edit';
      }
      // Show the input form.
      this.show_popup(settings, instanceId);
    },

    /**
     * Replace Markup with image.
     */
    attach: function (content, settings, instanceId) {
      var pattern = settings.placeholder_markup['prefix'] + '(.*?)' + settings.placeholder_markup['suffix'];
      var regexp = new RegExp(pattern, 'gi');
      var matches = content.match(regexp);
      if (matches != null && matches.length > 0) {
        for (var i = 0; i < matches.length; i++) {
          var regexp = new RegExp('{(.*?)}', 'gi');
          var item = matches[i];
          var json = item.match(regexp);
          if (json.length) json = json[0];
          var data = jQuery.parseJSON(json);
          settings.data_id = data.data_id;
          settings.locale = data.locale;
          this.storage[settings.data_id] = data;
          content = content.replace(item, this._getImgPlaceholder(settings));
        }
      }
      return content;
    },

    /**
     * Replace images with Markup.
     */
    detach: function (content, settings, instanceId) {
      // Find all Images and extract the ids.
      var pattern = '<img[^>]*?class="amazon-wysiwyg-img"[^>]*?alt="(\\d+)"[^>]*>';
      var regexp = new RegExp(pattern, 'gi');
      var matches = content.match(regexp);
      if (matches != null && matches.length > 0) {
        for (var i = 0; i < matches.length; i++) {
          var item = matches[i];
          settings.data_id = item.replace(regexp, '$1', 'gi');
          var data = this.storage[settings.data_id];
          var markup = settings.placeholder_markup['prefix'] + JSON.stringify(data) + settings.placeholder_markup['suffix'];
          content = content.replace(item, markup);
        }
      }
      return content;
    },

    /**
     * Shows the Form.
     */
    show_popup: function (settings, instanceId) {
      // Remove any previous popup.
      $('.amazon-wysiwyg-popup').remove();

      // Append form.
      jQuery('body').append(settings.form_markup);

      if (settings.mode == 'Edit') {
        // Fill in the form values with json data.
        var values = Drupal.wysiwyg.plugins['amazon_wysiwyg'].storage[settings.data_id];
        if (typeof values == 'object') {
          jQuery.each(values, function (name, value) {
            // Escape special characters to ensure jQuery Update compatibility.
            name = name.replace(/(:|\.|\[|\]|,)/g, "\\$1");
            jQuery('.amazon-wysiwyg-popup [name=' + name + ']').val(value);
          });
        }
      }

      // Display popup centered on screen.
      jQuery('.amazon-wysiwyg-popup').center().show(function () {
        // Listeners for buttons.
        jQuery('.amazon-wysiwyg-popup .preview').click(function () {
          // Get key/values from the form.
          var options = Drupal.wysiwyg.plugins['amazon_wysiwyg']._getFormValues(settings);
          $('.amazon-widget-preview').html(Drupal.t('Loading') + '...');
          $.get('/system/ajax/amazon_wysiwyg/?asin=' + options.asin + '&style=' + options.style + '&locale=' + options.locale, function (data) {
            $('.amazon-widget-preview').html(data);
          });
        });

        jQuery('.amazon-wysiwyg-popup .insert').click(function () {
          // Get key/values from the form.
          var values = Drupal.wysiwyg.plugins['amazon_wysiwyg']._getFormValues(settings);

          // Store the values.
          Drupal.wysiwyg.plugins['amazon_wysiwyg'].storage[settings.data_id] = values;

          // Insert the placeholder image.
          if (settings.mode == 'Add') {
            var placeholder = settings.placeholder;
            settings.locale = values.locale;
            placeholder = placeholder.replace(/amazon_wysiwyg(\w{0,})\./i, 'amazon_wysiwyg_' + settings.locale.toLowerCase() + '.');
            Drupal.wysiwyg.instances[instanceId].insert(placeholder);
          }

          // Close popup.
          jQuery('.amazon-wysiwyg-popup').remove();
        });

        jQuery('.amazon-wysiwyg-popup .cancel').click(function () {
          jQuery('.amazon-wysiwyg-popup').remove();
        });

        // Catch keyboard events.
        jQuery(document).keydown(function (e) {
          // Esc key pressed.
          if (e.keyCode == 27) {
            jQuery('.amazon-wysiwyg-popup').remove();
          }
        });

        jQuery('.amazon-wysiwyg-popup *:input[type!=hidden]:first').focus();
      });
    },

    /**
     * Helper function to return a HTML placeholder.
     */
    _getImgPlaceholder: function (settings) {
      var placeholder = settings.icon_markup;
      placeholder = placeholder.replace('alt=""', 'alt="' + settings.data_id + '"');
      if (settings.locale == undefined || settings.locale === "") {
        settings.locale = settings.default_locale;
      }
      placeholder = placeholder.replace(/amazon_wysiwyg(\w{0,})\./i, 'amazon_wysiwyg_' + settings.locale.toLowerCase() + '.');
      return placeholder;
    },

    /**
     * Helper function to return all values from the form.
     */
    _getFormValues: function (settings) {
      var values = {};
      values['data_id'] = settings.data_id;

      // Get values from the form. Only get values from input type: text, textarea.
      jQuery('.amazon-wysiwyg-popup *').filter('input[type=text],textarea,select').each(function (key, value) {

        // Ignore fields that were not normalized when building the form, they wil have [] symbols.
        if (this.name.indexOf('[') == -1 && this.name.indexOf(']') == -1) {
          // Only override tags that contain values.
          if (this.value != '' && typeof this.value != 'undefined' && this.value != 'undefined') {
            values[this.name] = this.value;
          }
        }
      });
      return values;
    },

    /**
     * Helper to get new Id.
     */
    _getId: function () {
      var id = new Date().getTime() + Math.floor((Math.random() * 1000) + 1);
      return id;
    },
  };

})(jQuery);

/**
 * Center the element on the screen.
 */
if (!jQuery.fn.center) {
  jQuery.fn.center = function () {
    this.css('position', 'absolute');
    this.css('top', Math.max(0, ((jQuery(window).height() -
        jQuery(this).outerHeight()) / 2) +
        jQuery(window).scrollTop()) + 'px');
    this.css('left', Math.max(0, ((jQuery(window).width() -
        jQuery(this).outerWidth()) / 2) +
        jQuery(window).scrollLeft()) + 'px');
    return this;
  }
}
