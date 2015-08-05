function Plot( parkName, graph ){
    this.park = new Park( parkName, graph );
    this.maxValue; 
    this.graph = graph; 
}

Plot.prototype = {
    constructor: Plot,
    

    draw: function ()  {

        var graph = this.graph; 
        var park = this.park; 
        var dataset = this.park.data.values;
                
        this.drawPoints( graph, park, dataset );
        this.drawLine( graph, park, dataset );

    },

    drawPoints: function( graph, park, dataset ){
    
        var r = graph.w / dataset.length / 2 * graph.rScale;
        var self = this; 

        var circles = graph.svg.selectAll( park.name+"Circle" )
            .data( dataset )
            .enter()
            .append( "circle" )
            .attr( "class", park.name+"Point" )
            .attr( "cx", function( d, i ) {
                return graph.xScale( d.MonthAsNum );
            })
            .attr( "cy", function ( d ){
                console.log( "d: " + d.Visitors );
                console.log( "yScale of that is:" + graph.yScale( d.Visitors ) );
                return graph.yScale( d.Visitors );
            })
            .attr( "r", r )
            .on('mouseover', function( d ){
                var coordinates = [ 0, 0 ];
                coordinates = d3.mouse( this );
                var x = coordinates[ 0 ];
                var y = coordinates[ 1 ];   
                self.onMouseOver( d, x, y ); 
            })
            .on('mouseout', function( d ){
                self.onMouseOff();
            })
    },

    drawLine: function( graph, park, dataset ){
        var valueLine = d3.svg.line()
            .interpolate( "cardinal" )
            .x( function( d ) { return ( graph.xScale( d.MonthAsNum ) ); })
            .y( function( d ) { return ( graph.yScale( d.Visitors ) ); });

        graph.svg.append( "path" )
            .attr( "class", park.name+"Line" )
            .attr( "d", valueLine( dataset ) );
    },

    onMouseOver: function( d, x, y ){
        var svg = this.graph.svg; 
        
        //Draw the Rectangle
        var rectangle = svg.append( "rect" )
            .attr("class", "label_rect")
            .attr("x", x )
            .attr("y", y - 35 )
            .attr("opacity", .75 )
            .attr("width", this.graph.labelWidth )
            .attr("height", this.graph.labelHeight );

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
    },

    onMouseOff: function( ){
        console.log("in onMouseOff");
        // clear the label
        this.graph.svg.selectAll( "text.label_text" ).remove();
        this.graph.svg.selectAll( "rect.label_rect" ).remove();
    }
}