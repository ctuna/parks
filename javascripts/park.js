

function Park( name, graph ){
    console.log(" in park constructor ");
    this.name = name; 
    this.graph = graph; 
    var dataLink = this.getDataLink();
    this.data = new Data( dataLink, graph );   
}

Park.prototype = {
    constructor: Park,

    getDataLink:function ()  {
        switch ( this.name ){
            case "Yosemite":
                return "./data/yosemite2014.csv";
                break;
             case "Point Reyes":
                return "./data/pointreyes.csv";
                break;
            default:
                console.log( "in Park.getLink default of switch case");
                break;
        }
    },



}