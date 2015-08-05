function Graph( w, h, svg ){	
	this.w = w;
	this.h = h;
	this.svg = svg;
	this.rScale = .175; 

	//TODO compute this dynamically 
	this.paddingLeft = 60; 
	this.paddingBottom = 20; 
	this.labelWidth = 95;
	this.labelHeight = 35; 

	this.r;

	this.plots = [];

	this.xScale;
	this.yScale;

	this.xAxis;
	this.yAxis;

	svg.attr( "width", this.w )
		.attr( "height", this.h );
}

Graph.prototype = {
    constructor: Graph,

    addPlot:function( parkName, graph ){
    	var currentPlot = new Plot( parkName, this );
    	this.plots.push( currentPlot ); 
    },

    resetScales:function(){
    	var absoluteMax = 0;
    	var maxDataLength = 0; 
    	var currentMax; 
    	var currentDataLength;  

    	for( i = 0; i < this.plots.length; i++ ){
    		var currentData = this.plots[ i ].park.data;
    		currentMax = currentData.maxValue;
    		currentDataLength = currentData.values.length; 
    		if ( currentMax > absoluteMax ){
    			absoluteMax = currentMax;
    		}
    		if ( currentDataLength > maxDataLength ){
    			maxDataLength = currentDataLength;
    		}

    	}
    	this.r = this.w / maxDataLength / 2 * rScale;

		this.yScale = d3.scale.linear()
			.domain( [ 0, absoluteMax ] )
			.range( [ this.h - this.paddingBottom, this.labelHeight + this.r ] );

		this.xScale = d3.scale.linear()
			.domain( [ 0, maxDataLength ] )
			.range( [ this.paddingLeft, this.w - this.labelWidth - this.r ] );
		this.clearSvg();
		this.drawAxes();
		this.drawPlots();		
    },

    clearPlots: function(){
    	/** 
			clear the array, solution described on stackoverflow: 
			http://stackoverflow.com/questions/1232040/how-to-empty-an-array-in-javascript
		*/
    	this.plots = this.plots.splice( 0, this.plots.length );
    },

    drawAxes: function(){
    	var self = this; 
    	//Define Y axis
		this.yAxis = d3.svg.axis()
			.scale( this.yScale )
			.orient( "left" )
			.ticks( 6 );


		//Create Y axis
		svg.append("g")
			.attr( "class", "axis" )
			.attr( "transform", "translate(" + this.paddingLeft + ",0)" )
			.call( this.yAxis );

		//Define X axis
		this.xAxis = d3.svg.axis()
			.scale( this.xScale )
			.ticks( 12 )
			.tickFormat( function( i ) { 
					// we start counting months at 1 
					if ( i == 0 ){
						return "";
					}
					var monthName = self.plots[0].park.data.values[ i - 1 ].Field2; 
					return Format.monthToAbbreviated( monthName );
				})
			.orient( "bottom" )
			
		//Create X axis
		svg.append("g")
			.attr( "class", "axis" )
			.attr("transform", "translate(0," + ( this.h - this.paddingBottom ) + ")" )
			.call( this.xAxis );

    },

    drawPlots: function(){
    	for( i = 0; i < this.plots.length; i++ ){
    		console.log("drawing plot: " + i );
    		this.plots[ i ].draw(); 
    	}
    }, 

    // clear the visualization
	clearSvg:function(){

		//clear the svg
		this.svg.selectAll( "circle" ).remove();
		this.svg.selectAll( "g" ).remove();
		this.svg.selectAll( "path" ).remove();
		this.svg.selectAll( "rect" ).remove();
		this.svg.selectAll( "text" ).remove();
}


}


