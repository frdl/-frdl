if (typeof define !== 'function') { var define = require('amdefine')(module) }



var frdl = frdl || require('./').instance;
var prompt = (('undefined'!==typeof frdl.alert && 'function'===typeof frdl.alert.prompt) ? frdl.alert.prompt : prompt) || require('co-prompt');
var fs = require('fs');

console.log('Init...');




fs.exists(frdl.projectDirectory() + '/frdlweb.json', function(exists){
// fs.readFile('/etc/passwd', (err, data) => {
 //   if (err) throw err;
 //  console.log(data);
 //});
	if(exists){
		throw new Error(frdl.projectDirectory() + '/frdlweb.json' + ' exists already');
		
	}
	 console.log(' exists /frdlweb.json', exists);
});	
	
	