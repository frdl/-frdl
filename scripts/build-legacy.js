#!/usr/bin/env node

console.log('$ frdl build-legacy >');
console.log(process.argv);
var co = require('co');
var prompt = require('co-prompt');
var program = require('commander');
var https = require('https');
var fs = require('fs-extra');
var request = require('superagent');
var url = require('url');
var util = require('util');

//var wget = require('./download-wget');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;


var exit = function(){
  process.exit.apply(process,  Array.prototype.splice(arguments));
};

const dlMap = {
  '/cdn/application/webfan/node_modules/webfan/homepagesystem.app' : './src'
};

const DIST = './dist';


function download_file_https_get(file_url, dist, filename, client) {
return new Promise(function(resolve, reject){	
var options = {
    host: url.parse(file_url).host,
    port: 443,
    path: url.parse(file_url).pathname
};

var file_name = filename || url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(dist + '/' + file_name);
var size = 0;
	
 client.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
		    size += data.length;
        }).on('end', function() {
            file.end();
            console.log('%s downloaded to %s/%s size: %s ', file_name, dist, file_name, size);
		    resolve(dist + '/ ' +file_name);
        }).on('error', function(e) {
             console.error(e);
		     reject(e);
        });
    });
});
}


// Function to download file using HTTP.get
function download_file_http_get(file_url, dist, filename, client) {
return new Promise(function(resolve, reject){	
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = filename || url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(dist + '/' + file_name);
var size = 0;
	
 client.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
		    size += data.length;
        }).on('end', function() {
            file.end();
            console.log('%s downloaded to %s/%s size: %s ', file_name, dist, file_name, size);
		    resolve(dist + '/ ' +file_name);
        }).on('error', function(e) {
             console.error(e);
		     reject(e);
        });
    });
});
}


program 
 // .command('*')
  .usage('<command> <file> [options] \n\tExample: \n\t\t# $ npm run post-install:legacy app.js --host=test.webfan.de --hash=v123')
  .description('deploy the given env')

  .arguments('<cmd> [[file]]')

  .option('-o, --host <host>', 'The production host')
  .option('-s, --hash <hash>', 'The version hash')

  .outputHelp(function(help) {
	console.log(help);
	return help;
  })
;

program 
  .action(function(cmd, file) {
	//var args = Array.prototype.splice(arguments);
	
	console.log('cmd', cmd);
	console.log('file', file);
	console.log('process.argv', process.argv);
	
	var cmd = cmd || 'legacy-build';
    var file = file || 'app.js';
	
	  if('undefined' === typeof file || 'app.js' === file){
	  	file = '/cdn/application/webfan/node_modules/webfan/homepagesystem.app';
	  }			
	
	 var fn = {};
	 fn['legacy-build'] = function *() { 
         
		 if (!fs.existsSync(DIST)) {
	         fs.mkdir(DIST);
          }
		 
		
		 		 
		 if(program.host){
			var host = program.host; 
		 }else{
		   var host = yield prompt('host: ');
		 }
		  if(program.hash){
			var hash = program.hash;  
		 }else{
		    var hash = yield prompt('hash: '); 
		 }
				 
		  console.log('cmd: %s host: %s hash: %s file: %s', cmd, host, hash, file);
		 
		if(file in dlMap){ 
	        yield download_file_http_get('http' + '://' + host + file + '?' + hash, dlMap[file], 'legacy.insecure.js', http);
		    yield download_file_https_get('https' + '://' + host + file + '?' + hash, dlMap[file], 'legacy.js', https);
			yield prompt('Press ENTER to continue: '); 
			exit(0);
		}else{
		    console.error('File %s is not available yet, try "app.js"', file);
		}
		 
		 
     };
	
	
	 if(!cmd in fn){
		 console.error('Command %s is not defined', cmd);
		 exit(1);
	 }
	
     co(fn[cmd]);
	
   
	
	

})
.parse(process.argv);
