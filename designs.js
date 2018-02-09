let pxHeight = 20;
let isClicked = false;
let rightClick = false;
let brush = 1;
let color = $("#colorPicker").val();
let color2 = $("#colorPicker2").val();
let canvasColor = $("#bgPicker").val();
let height = $("#inputHeight").val();
let width = $("#inputWidth").val();
let gridStatus = true;

//on load, create grid of default size
$(document).ready(function() {
	$("#pixelCanvas").append("<tbody></tbody>");

	for (let row = 0; row < height; row++) {
		$("tbody").append("<tr></tr>");
		for (let column = 0; column < width; column++) {
			$("tr:last").append("<td></td>");
			}
		}
	$("#pixelCanvas").css("background-color", canvasColor);
	$("td").css({"height": pxHeight + "px", "width": pxHeight + "px"});
});

//////////////////////////////TOGGLE GRID////////////////////////////////////

var turnOnGrid = function() {
	$("#gridOff").css("display", "none");
	$("#gridOn").css("display", "inline");
	if (canvasColor === "#000000") {
		$("td").css("border", "1px solid white");
		};		
	if (canvasColor !== "#000000") {
		$("td").css("border", "1px solid black");		
	};	
};

var turnOffGrid = function() {
	$("#gridOn").css("display", "none");
	$("#gridOff").css("display", "inline");
	$("td").css("border", "0px solid white");
};

var gridStatusChecker = function() {
    if (gridStatus === true) {
  	turnOnGrid();
    }
    if (gridStatus === false) {
  	turnOffGrid();
    }	
};

var toggle = function() {
	$("#iconGrid").on("mouseup", function(){
		if (gridStatus === true) {  //if grid is currently on
			turnOffGrid();
			gridStatus = false;		
		}
		else {  //if grid is currently off
			turnOnGrid();
			gridStatus = true;		
		};
	});
};

toggle();

///////////////////////////SET BACKGROUND COLOR///////////////////////////////////////

var colorBG = function() {
	$("#bgPicker").change(function(){
		canvasColor = $("#bgPicker").val();
		$("#pixelCanvas").css("background-color", canvasColor);
		$("#canvas").css("background-color", canvasColor);		
  		gridStatusChecker();
	});
};

colorBG();

$("#resetBG").on("click", function() {
	$("#pixelCanvas").css("background-color", "white");
		$("#canvas").css("background-color", "white");			
	gridStatusChecker();
});

/////////////////////////////CREATE NEW GRID/////////////////////////////////////

var makeGrid = function(event) {
	$("#submitButton").click(function(event){
		event.preventDefault(event);
		$("#newCanvasDrop").addClass("hidden");		
		$("body").css("cursor","wait");
		window.setTimeout(function(){
			height = $("#inputHeight").val();
			width = $("#inputWidth").val();

			//if table already exists, delete old table
			$("#pixelCanvas").empty();

			//add new table
			$("#pixelCanvas").append("<tbody></tbody>");

			for (let row = 0; row < height; row++) {
				$("tbody").append("<tr></tr>");
				for (let column = 0; column < width; column++) {
					$("tr:last").append("<td></td>");
					}
				}

			$("td").css({"height": pxHeight, "width": pxHeight});

			colorBG();
			gridStatusChecker();
			$("body").css("cursor","default");
		},200);
	});
};

makeGrid();

//////////////////////////////////SET BRUSH COLOR & CHANGE ICON////////////////////////////////////

$("#colorPicker").change(function() {
	color = $("#colorPicker").val();
	$("#brushIcon").css("background-color", color);
});

$("#colorPicker2").change(function() {
	color2 = $("#colorPicker2").val();
	$("#brushIcon2").css("background-color", color2);
});

var colorPickerIcon = function(clickOn, actOn) {  //function to make brush icon change when clicking invisible color picker
	clickOn.mousedown(function(){
    actOn.css({"transform": "translateY(1px)", "transform": "translateX(1px)"});
    actOn.css({"boxShadow": "0 2px 4px 0 rgba(0,0,0,0.2)", "background-color": "rgba(0, 0, 0, 0.2)"});
	});

	clickOn.mouseup(function(){
	    actOn.css({"transform": "translateY(-1px)", "transform": "translateX(-1px)"});
	    actOn.css({"boxShadow": "4px 4px 5px 0 rgba(0,0,0,0.4)", "background-color": "rgba(0, 0, 0, 0.2)"});
	});

	clickOn.hover(function(){
	    actOn.css({"background-color": "rgba(0, 0, 0, 0.2)"});
	}, function(){
		actOn.css({"background-color": "rgba(0, 0, 0, 0.1)"});
	});
};

colorPickerIcon($("#colorPicker"), $("#brushContainer")); 
colorPickerIcon($("#colorPicker2"), $("#brushContainer2"));

//////////////////////////////////SET BRUSH SIZE////////////////////////////////////

$("input[type=radio][name=brushSize]").on("change", function() {
	if (this.value === "small") {
		brush = 1;
	};
	if (this.value === "mid") {
		brush = 2;
	};
	if (this.value === "big") {
		brush = 3;
	};
});


///////////////////////////////////COLOR CELLS ON CANVAS/////////////////////////////////

var paint = function(target, color) {
	let trVal = $(target).parent().index();
	let tdVal = $(target).index();
  
	switch(brush) {
		case 1: 
				$("#pixelCanvas tr:eq("+trVal+") td:eq("+tdVal+")").css("background-color", color);
		break;
		case 2:
				$("#pixelCanvas tr:eq("+trVal+") td:eq("+tdVal+")").css("background-color", color);
				$("#pixelCanvas tr:eq("+trVal+") td:eq("+(tdVal+1)+")").css("background-color", color);
				$("#pixelCanvas tr:eq("+(trVal+1)+") td:eq("+tdVal+")").css("background-color", color);
				$("#pixelCanvas tr:eq("+(trVal+1)+") td:eq("+(tdVal+1)+")").css("background-color", color);
		break;
		case 3:
				$("#pixelCanvas tr:eq("+trVal+") td:eq("+tdVal+")").css("background-color", color);
				$("#pixelCanvas tr:eq("+trVal+") td:eq("+(tdVal+1)+")").css("background-color", color);
				$("#pixelCanvas tr:eq("+(trVal+1)+") td:eq("+tdVal+")").css("background-color", color);
				$("#pixelCanvas tr:eq("+(trVal+1)+") td:eq("+(tdVal+1)+")").css("background-color", color);

				if (trVal>0){
						$("#pixelCanvas tr:eq("+(trVal-1)+") td:eq("+tdVal+")").css("background-color", color);
						$("#pixelCanvas tr:eq("+(trVal-1)+") td:eq("+(tdVal+1)+")").css("background-color", color);
				}
				if (tdVal>0){
						$("#pixelCanvas tr:eq("+trVal+") td:eq("+(tdVal-1)+")").css("background-color", color);						
						$("#pixelCanvas tr:eq("+(trVal+1)+") td:eq("+(tdVal-1)+")").css("background-color", color);					
				}			
				if(trVal > 0 && tdVal > 0) {
						$("#pixelCanvas tr:eq("+(trVal-1)+") td:eq("+(tdVal-1)+")").css("background-color", color);
				};										
		break;
	}
}

var colorCell = function(event) {
	$("#pixelCanvas").on("mousedown", "td", function(event) {
		event.preventDefault(event);
		if (event.which === 1) {
			isClicked = true;
			rightClick = false;
		};
		if (event.which === 2) {
			isClicked = true;
			rightClick = false;
		};	
		if (event.which === 3) {
			isClicked = true;
			rightClick = true;
		};	
		if(isClicked === true && rightClick === false) {
			paint(this, color);
		};

		//if right clicking, erase color
		if(isClicked === true && rightClick === true) {
			document.oncontextmenu = function() {return false;}
			paint(this, color2);

		};
	});
  	$("#pixelCanvas").on("mouseover", "td", function(event) {
		if(isClicked === true && rightClick === false) {
			paint(this, color);
		};
		if(isClicked === true && rightClick === true) {
			document.oncontextmenu = function() {return false;}
			paint(this, color2);

		};
  	});

	$("body").on("mouseup mouseleave", function(e) {
	isClicked = false;
	rightClick = false;
	});
}; 

colorCell();

/////////////////////////////"ZOOM" IN AND OUT BY CHANGING PIXEL SIZE////////////////////////////////////

var pixHeight = function(event) {
	$("#pixelPlus").on("click", function(event) {
		$("#lockZoomMinus").css("display", "none");

		if (pxHeight <= 30) {
		pxHeight += 5;
		$("td").css({"height": pxHeight + "px", "width": pxHeight + "px"});	
			if (pxHeight > 30) {
				$("#lockZoomPlus").css("display", "inline");
			};
		};
	});  

	$("#pixelMinus").on("click", function(event) {
		$("#lockZoomPlus").css("display", "none");

		if (pxHeight >= 10) {
	    	pxHeight -= 5;
			$("td").css({"height": pxHeight + "px", "width": pxHeight + "px"});
			if (pxHeight < 10) {
				$("#lockZoomMinus").css("display", "inline");
			};
		};
	});  	
};

pixHeight();

/////////////////////////////////////ICON BEHAVIOR////////////////////////

var iconClick = function() {
	$(".icon").mousedown(function(event){
    $(this).css({"transform": "translateY(1px)", "transform": "translateX(1px)"});
    $(this).css({"boxShadow": "0 2px 4px 0 rgba(0,0,0,0.2)", "background-color": "rgba(0, 0, 0, 0.2)"});
	});

	$(".icon").mouseup(function(event){
	    $(this).css({"transform": "translateY(-1px)", "transform": "translateX(-1px)"});
	    $(this).css({"boxShadow": "4px 4px 5px 0 rgba(0,0,0,0.4)", "background-color": "rgba(0, 0, 0, 0.2)"});
	});

	$(".icon").hover(function(){
	    $(this).css({"background-color": "rgba(0, 0, 0, 0.2)"});
	}, function(){
		$(this).css({"background-color": "rgba(0, 0, 0, 0.1)"});
	});
};

iconClick();

var dropMenu = function(button, content) {
	button.click(function(event){
		event.stopPropagation();
		content.toggleClass("hidden");
	});
};

var hideDropMenu = function(content) {
	content.click(function(event){
		event.stopPropagation();
	});

	$("body").click(function(){
		if (content.hasClass("hidden") === false){
			content.addClass("hidden");
		};
	});
};

dropMenu($("#newCanvas"), $("#newCanvasDrop"));
dropMenu($("#brushButton"), $("#brushSizeDrop"));
hideDropMenu($("#newCanvasDrop"));
hideDropMenu($("#brushSizeDrop"));



			
