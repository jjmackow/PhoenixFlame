// Generated by CoffeeScript 1.10.0
var $, PgbarItem, formatNumber;

$ = jQuery;

formatNumber = function(now) {
  var num, rest, zeros;
  num = '';
  zeros = 0;
  now = Math.round(now);
  if (now === 0) {
    return '0';
  }
  while (now > 0) {
    while (zeros > 0) {
      num = '0' + num;
      zeros -= 1;
    }
    rest = now % 1000;
    zeros = 3 - rest.toString().length;
    num = rest + ',' + num;
    now = (now - rest) / 1000;
  }
  return num.slice(0, num.length - 1);
};

PgbarItem = (function() {
  function PgbarItem(settings1, wrapper) {
    this.settings = settings1;
    this.wrapper = wrapper;
    this.current = 0;
    this.counter = $('.pgbar-counter', wrapper);
    this.bars = $('.pgbar-current', wrapper);
  }

  PgbarItem.prototype.poll = function() {
    var callback, registry;
    registry = Drupal.behaviors.polling.registry;
    callback = (function(_this) {
      return function(data) {
        var to_abs;
        to_abs = parseInt(data.pgbar[_this.settings.field_name][_this.settings.delta]);
        if (to_abs !== _this.current) {
          _this.animate(to_abs);
        }
      };
    })(this);
    return registry.registerUrl(this.settings.pollingURL, this.settings.id, callback);
  };

  PgbarItem.prototype.animate = function(to_abs, from_abs) {
    var diff, duration, from, resetCounters, target, to;
    if (from_abs == null) {
      from_abs = this.current;
    }
    target = this.settings.target;
    if (this.settings.inverted) {
      from = 1 - from_abs / target;
      to = 1 - to_abs / target;
      diff = from - to;
    } else {
      from = from_abs / target;
      to = to_abs / target;
      diff = to - from;
    }
    this.counter.html(formatNumber(from_abs));
    duration = 500 + 1000 * diff;
    resetCounters = (function(_this) {
      return function(num, fx) {
        return _this.counter.html(formatNumber(num));
      };
    })(this);
    if (this.settings.vertical) {
      this.bars.height(from * 100 + '%');
      this.bars.animate({
        height: to * 100 + '%'
      }, {
        duration: duration
      });
    } else {
      this.bars.width(from * 100 + '%');
      this.bars.animate({
        width: to * 100 + '%'
      }, {
        duration: duration
      });
    }
    this.wrapper.animate({
      val: to_abs
    }, {
      duration: duration,
      step: resetCounters
    });
    return this.current = to_abs;
  };

  PgbarItem.prototype.animateInitially = function() {
    var animation;
    animation = (function(_this) {
      return function() {
        return _this.animate(_this.settings.current);
      };
    })(this);
    return window.setTimeout(animation, 2000);
  };

  return PgbarItem;

})();

PgbarItem.fromElement = function($element) {
  var id, settings;
  id = $element.attr('id');
  settings = Drupal.settings.pgbar[id];
  settings['id'] = id;
  settings['inverted'] = $element.data('pgbarInverted');
  settings['vertical'] = $element.data('pgbarDirection') === 'vertical';
  return new PgbarItem(settings, $element);
};

Drupal.behaviors.pgbar = {};

Drupal.behaviors.pgbar.attach = function(context, settings) {
  return $('.pgbar-wrapper[id]', context).each(function() {
    var item;
    item = PgbarItem.fromElement($(this));
    item.animateInitially();
    return item.poll();
  });
};
