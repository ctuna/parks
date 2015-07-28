

// visualization
var svg; 
var w = 500;
var h = 400; 

// data
var totalRecVisitors = 0;
var maxVisitors = 0; 
var dataset;

// initialize chain of functions: loadData(), editData(), generateVis()
init = function( s ){
			svg = s; 
			loadData();
}

// load csv data into var dataset
loadData = function(){ 
	console.log( "loading data...");
	d3.csv( "../data/yosemite2014.csv", function( error, d ){
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
		d.Field3 = formatNumber( d.Field3 ) 
		totalRecVisitors += d.Field3;
		// find maximum visitors (for scale)
		if( maxVisitors < d.Field3 ){
			maxVisitors = d.Field3; 
		}
	} )
	console.log( "total recreational visitors: " + totalRecVisitors );
	console.log( "max recreational visitors/month : " + maxVisitors);
	generateVis();
}


generateVis = function(){
	console.log( "generating visualization...")
	svg.attr("width", w)
		.attr("height", h);
	var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("fill", "green");

	circles.attr("cx", function(d, i) {
		return (i * 50) + 25;
	})
		.attr("cy", function (d){

			//console.log( d.Field3/ totalRecVisitors * 100 );
			return h - d.Field3 / ( maxVisitors) * ( h - 20 );
		})
		.attr("r", 8 )
		.on('mouseover', function(d){
			var coordinates = [0, 0];
			coordinates = d3.mouse(this);
			var x = coordinates[0];
			var y = coordinates[1];	
			mouseover( d, x, y ); 
		})
		.on('mouseout', function(d){
			mouseoff( d );
		})
	
}

// clear the visualization
clear = function(){
	svg.selectAll("circle").remove();
}

// redraw the visualization 
redraw = function(){
	console.log("redrawing vis");
	clear();
	generateVis();
}

mouseover = function( d, x, y ){
	console.log( d.Field3 + " [ "+ x + ", " + y + "]");
	svg.selectAll("rect")
	.data( { x: x, y: y, d: d.Field3 })
	.enter()
	.append("rect")
	.attr({
		x: function( d ) {d.x},  
		y: function( d ) {d.y}, 
		width: 60,
		height: 20,
		fill: "red"
		});
	}

mouseoff = function(d){
	redraw();
}

removeCommas = function( num ){
	var i = num.indexOf(",");
	while( i > -1 ){ //error
		num = num.substr( 0, i ).concat( num.substr( i+1, num.length ))
		var i = num.indexOf(",");
	}
	return num;
}

formatNumber = function( str ){
	return parseInt( removeCommas ( str ) );
		}
