$(function() {
	// Toggle the additional DTM contents option
	function updateCSVcontentOption() {
		if ( $("#greyword").is(':checked') || $("#culling").is(":checked") || $("#MFW").is(":checked") ) {
			$("#csvcontdiv").show();
		}
		else {
			$("#csvcontdiv").hide();
		}
	}

	updateCSVcontentOption();

	$("#culling-options").click(function() {
		updateCSVcontentOption();
	});

	$('#csvgen').click(function() {
		$("#status-analyze").css({"visibility":"visible", "z-index": "400000"});	
	});

	// Embed DataTable 
	var oTable = $('table.display').dataTable({
		deferRender: true,
		scrollY: 340,
		scrollX: "100%",
        fixedColumns:   {
            leftColumns: 1,
            rightColumns: 1
        },
		scrollCollapse: true,
		search: {
			regex: true
		},
		"iDisplayLength": 25,
		aLengthMenu: [[25, 50, 100, -1], [25, 50, 100, "All"]],
		// Automatically scroll top top when switching pages
		fnDrawCallback: function(o) {
			$('.dataTables_scrollBody').scrollTop(0);
		}
	});

	// Fix the first cell of the table
	$matrixTable = $("table").first()
	$tokenTag = $matrixTable.find("thead tr th").first();
	$tokenTag.css({"background-color": "#ddd", "position": "relative"});

	// Fix the first column of the DataTable
/*	new $.fn.DataTable.FixedColumns(oTable, {
		leftColumns: 1,
		rightColumns: 1
	});
*/
	// Fix the last cell of the first row in the table
	$totalTag = $(".DTFC_RightHeadWrapper").find("table thead tr th").first();
	$totalTag.css({"background-color": "#ddd", "position": "relative"});

	// Change DataTable styles when pages are changed
	function dataTableStyling(){
		$('table.display, .dataTables_scroll, .dataTables_scrollBody').css({"border-bottom": "0px #ddd", "text-align": "center"})
		$(".DTFC_RightWrapper").css({"border-left": "1px solid #ddd", "height": "auto", "width": "auto"});
		$(".DTFC_LeftWrapper").css({"border-right": "1px solid #ddd", "height": "auto"});
	}

	$("#example_wrapper").click(function(){
		dataTableStyling();
	});

	dataTableStyling();

	$("#greyword").click(updateCSVcontentOption);
	$("#culling").click(updateCSVcontentOption);
	$("#MFW").click(updateCSVcontentOption);

});
