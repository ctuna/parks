
function Data( datalink, graph ){
    console.log(" in data constructor")
    this.dataLink = datalink;
    this.graph = graph; 
    this.initData(); 
    this.values;
    this.maxValue;

}

Data.prototype = {
    constructor: Data,

    initData:function ()  {
        console.log( "initializing data" );
        var self = this;
        d3.csv( this.dataLink, function( error, d ){
            if( error ){
                console.log( error );
            }
            else{
                self.values = d; 
                self.formatData();
            }
        } );
    },

    formatData:function ()  {
        console.log( "formatting data");
        //TODO MAKE MORE GENERAL TO OTHER DATA TYPES
        var maxValue = 0;
        this.values.forEach( function( d ){ 
            d.Visitors = Format.strToInt( d.Field3 );
            d.MonthAsNum = Format.monthToInt( d.Field2 );

            // find maximum visitors (for scale)
            if( maxValue < d.Visitors ){
                maxValue = d.Visitors; 
            }
        } )
        this.maxValue = maxValue; 
        this.graph.resetScales();
    }


}