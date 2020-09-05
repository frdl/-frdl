
'use strict';



/*
custom1Function('', '#api/sdk', function(err, content) {
    console.log('TEST2', content); // script, src=http://static.something.com/api/sdk.js
});

var custom2Function = webpackRequireHttp.custom({
    rules:function(context, request) {
        if(request && request.indexOf('//') == 0) {
            return 'http:' + request;
        }
        return request;
    }
});

custom2Function('', '//something.com/index.js', function(err, content) {
    console.log('TEST3', content); // script, src=http://something.com/index.js
});

    externals:[
        webpackRequireHttp.custom({
            rules:{
              //  '^#api\/common':'http://static.domain.com/api/common.js',
				'^#cdn\:frdlweb\/([^\/]+)\/(.+)': WebfanConfig.hps.scriptengine.requirejs.baseUrl + '$1/$2.js',
				'^#cdn\:frdlweb\/([^\/]+[^\/])$': WebfanConfig.hps.scriptengine.requirejs.baseUrl + '$1.js'
            }
        })
    ],	 
*/



function runNode(){	 
  var co = require('co'),
	  path = require('path'),
	  findUp = require('find-up'),
	  dotenv = require('dotenv'), 
	  dotenvExpansion = require('dotenv-expand'),
	  main = require('frdl-library-main')('frdlweb'); 	

      main.ENV = dotenv.config({ 
	     path: path.resolve(process.cwd(), '.env'),
	     debug: process.env.DEBUG || false
      });	
	
	   dotenvExpansion(main.ENV);	
	
	   main.project = {
		  config : {} 
	   };
	
	
main.findTopmostFile = async function(filename, doNotSave){
		 return await co(function*(filename){
			   return yield new Promise(function(resolve, reject){
				   
(async (filename) => {
	
 var fileMetaData = {
	file : (await findUp(async directory => {
        const hasProject = await findUp.exists(path.join(directory, filename));
        return path.basename(directory) === '.frdl' ? findUp.stop : hasProject && directory;
    }, {type: 'directory'})))
 };	
	
	if(findUp.stop !== fileMetaData.file){
	   fileMetaData.file +=  '/' + filename;	
	}
	   
		   Object.defineProperty(fileMetaData, 'content', {
		           get : function(){
					  return fileMetaData.file;															  
				   }
	        });	 
	
	 if(!doNotSave){
		main.project[Symbol.for('@' + filename)] = fileMetaData; 
	 }
		
	 resolve(fileMetaData);
	
})(filename);		
				   
			   });//promise
		 }, filename);//co			  
};

	

	
	
	
	
	   main.webpackRequireHttp = require('webpack-require-http');
	   var webpackRequireHttp = webpackRequireHttp.custom({
            rules:{
              //  '^#api\/common':'http://static.domain.com/api/common.js',
				'^#cdn\:frdlweb\/([^\/]+)\/(.+)': WebfanConfig.hps.scriptengine.requirejs.baseUrl + '$1/$2.js',
				'^#cdn\:frdlweb\/([^\/]+[^\/])$': WebfanConfig.hps.scriptengine.requirejs.baseUrl + '$1.js'
            }
        });	
	   main.moduleResolvers = main['module-resolvers'] = {
		   webpackRequireHttp : webpackRequireHttp
	   };	
	
	

	
	var exp = {
		'platform-target' : 'node',
		main : main,
		$threads : {}
	};		
	
	exp.$threads[process.pid] = co(function*(){
		yield main.findTopmostFile('frdl.project.json', false);
		yield main.findTopmostFile('package.json', false);
		yield main.findTopmostFile('composer.json', false);
	});
	
	
	return exp;
}



 



exports = module.exports = runNode;