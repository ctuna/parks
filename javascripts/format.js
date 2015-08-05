function Format(){
}

Format.prototype = {
    constructor: Format,

    removeCommas:function( num ){
        var i = num.indexOf( "," );
        while( i > -1 ){ //error
            num = num.substr( 0, i ).concat( num.substr( i+1, num.length ) )
            var i = num.indexOf( "," );
        }
        return num;
    },

    strToInt:function( str ){
        return parseInt( this.removeCommas ( str ) );
    }, 

    // abbreviating months following Chicago Manual of Style
    monthToAbbreviated:function( month ){
        switch( month ) {
        case "January":
            return "Jan.";
            break;
        case "February":
            return "Feb.";
            break;
        case "March":
            return "Mar.";
            break;
        case "April":
            return "Apr.";
            break;
        case "August":
            return "Aug.";
            break;
        case "September":
            return "Sept.";
            break;
        case "October":
            return "Oct.";
            break;
        case "November":
            return "Sept.";
            break;
        case "December":
            return "Dec.";
            break;                                                              
        default:
            // May, June, July stay whole 
            return month; 
            break;
        }   
    },

    monthToInt:function( month ){
        switch( month ) {
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

}