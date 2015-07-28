

// visualization
var svg; 
var w = 600;
var h = 400; 
var labelWidth = 95;
var labelHeight = 35; 
var r; 
var rScale = .2; 

var paddingLeft = 60; 
var paddingBottom = 20; 

// data
var totalRecVisitors = 0;
var maxVisitors = 0; 
var dataset;
var links = { 
		pointReyes: "../data/pointreyes.csv", 
		yosemite: "../data/yosemite2014.csv" 
	}; 

// initialize chain of functions: loadData(), editData(), generateVis()
init = function( s ){
			svg = s; 
			loadData();
}

// load csv data into var dataset
loadData = function(){ 
	console.log( "loading data..." );
	console.log("FOR POINT REYES")
	d3.csv( links.pointReyes, function( error, d ){
		if( error ){
			console.log( error );
		}
		else{
			dataset = d; 
			editData();
		}
	})
}

// change data points from strings to numbers
editData = function(){
	console.log( "formatting data" );
	dataset.forEach( function( d ){ 
		d.Visitors = formatNumber( d.Field3 );
		//d.Field2 = monthToNum( d.Field2 );
		d.MonthAsNum = monthToNum( d.Field2 );
		totalRecVisitors += d.Visitors;
		// find maximum visitors (for scale)
		if( maxVisitors < d.Visitors ){
			maxVisitors = d.Visitors; 
		}
	} )
	console.log( "total recreational visitors: " + totalRecVisitors );
	console.log( "max recreational visitors/month : " + maxVisitors );
	generateVis();
}


generateVis = function(){
	console.log( "generating visualization..." )

	r = w / dataset.length / 2 * rScale;

	var yScale = d3.scale.linear()
			.domain( [ 0, maxVisitors ] )
			.range( [ h - paddingBottom, labelHeight + r ] );

	var xScale = d3.scale.linear()
			.domain( [ 0, 12 ] )
			.range( [ 0 + paddingLeft, w - labelWidth - r ] );

	svg.attr( "width", w )
		.attr( "height", h );

	var circles = svg.selectAll( "circle" )
		.data( dataset )
		.enter()
		.append( "circle" )
		.attr( "class", "point" )
		.attr( "cx", function( d, i ) {
			return ( xScale( d.MonthAsNum ) );
		})
		.attr( "cy", function ( d ){
			return yScale( d.Visitors );
		})
		.attr( "r", r )
		.on('mouseover', function( d ){
			var coordinates = [ 0, 0 ];
			coordinates = d3.mouse( this );
			var x = coordinates[ 0 ];
			var y = coordinates[ 1 ];	
			mouseover( d, x, y ); 
		})
		.on('mouseout', function( d ){
			mouseoff( d );
		})

	//Define Y axis
	var yAxis = d3.svg.axis()
	                  .scale( yScale )
	                  .orient( "left" )
	                  .ticks( 6 );


	//Create Y axis
	svg.append("g")
	    .attr( "class", "axis" )
	    .attr( "transform", "translate(" + paddingLeft + ",0)" )
	    .call( yAxis );

	//Define X axis
	var xAxis = d3.svg.axis()
	                  .scale( xScale )
	                  .orient( "bottom" )
	//Create X axis
	svg.append("g")
	    .attr( "class", "axis" )
	    .attr("transform", "translate(0," + ( h - paddingBottom ) + ")" )
	    .call( xAxis );
	
}

// clear the visualization
clear = function(){
	svg.selectAll( "circle" ).remove();
	svg.selectAll( "g" ).remove();
	svg.selectAll( "rect" ).remove();
	svg.selectAll( "text" ).remove();
}

// redraw the visualization 
redraw = function(){
	console.log( "redrawing vis" );
	clear();
	generateVis();
}

mouseover = function( d, x, y ){
	//Draw the Rectangle
	var rectangle = svg.append( "rect" )
		.attr("class", "label_rect")
		.attr("x", x )
		.attr("y", y - 35 )
		.attr("opacity", .75 )
		.attr("width", labelWidth )
		.attr("height", labelHeight );

	var text = svg.append( "text" )
		.attr("class", "label_text" )
		.attr("x", x + 10 )
		.attr("y", y - 5 )
		.text( d.Field3 )
	var text = svg.append( "text" )
		.attr("class", "label_text" )
		.attr("x", x + 10 )
		.attr("y", y - 20 )
		.attr( "font-weight", "bold")
		.text( d.Field2 + ":" )


		console.log( d.Field3 + " [ "+ x + ", " + y + "]" );
		//svg.selectAll( "rect" )
		//	.data( { x: x, y: y, d: d.Field3 } )
		//	.enter()
		//	.append( "rect" );
	
	}

mouseoff = function( d ){
	redraw();
}

removeCommas = function( num ){
	var i = num.indexOf( "," );
	while( i > -1 ){ //error
		num = num.substr( 0, i ).concat( num.substr( i+1, num.length ) )
		var i = num.indexOf( "," );
	}
	return num;
}

formatNumber = function( str ){
	return parseInt( removeCommas ( str ) );
}

monthToNum = function( str ){
	switch( str ) {
    case "January":
        return 1;
        break;
    case "February":
        return 2;
        break;
    case "March":
        return 3;
        break;
    case "April":
        return 4;
        break;
    case "May":
        return 5;
        break;
    case "June":
        return 6;
        break;
    case "July":
        return 7;
        break;
    case "August":
        return 8;
        break;
    case "September":
        return 9;
        break;
    case "October":
        return 10;
        break;
    case "November":
        return 11;
        break;
    case "December":
        return 12;
        break;                                                              
    default:
    	console.log( "other");
    	break;
	}	
}
