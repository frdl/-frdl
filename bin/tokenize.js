if(typeof define !== 'function'){ 
 var define = (require('amdefine'))(module); 
}


define(function(){
 
	'use strict';
	
 return tokenize;	
 
function tokenize(str, lookForQuotes) {
        var args = [];
        var readingPart = false;
        var part = '';
        for(var i=0; i<str.length; i++) {
            if(str.charAt(i) === ' ' && !readingPart) {
                if(''!==part)args.push(part);
                part = '';
            } else {
                if(('undefined'===typeof lookForQuotes || !!lookForQuotes) && (str.charAt(i) === '\"' || str.charAt(i) === "\'")) {
                    readingPart = !readingPart;
                } else {
                    part += str.charAt(i);
                }
            }
        }
        if(''!==part)args.push(part);
        return args;
}
	
});