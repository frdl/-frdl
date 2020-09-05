 
 'use strict';

function sanitize(o){
 return JSON.parse(JSON.stringify(o));	
}

var co = require('co');
var prompt = require('co-prompt');
var shell = require("shelljs");

//var browserify = require('browserify');

var fs = require('fs');
var recursive = require("recursive-readdir");
var CP = (/win/i.test(process.platform)) ? 'copy' : 'cp';

var UglifyJS = require("uglify-js");

var pkg = require('frdl/package.json');
	
var download = require('@frdl/simple-downloader');

var {extend, clone, each, extractTextBetween, mt_rand, preg_quote, str_replace, urlencode} = require('@frdl/functions');


var lib =  require('frdl/assets/node_modules/generate-guid-simple'); 

const path = require('path');
const webpack = require('webpack');



const CopyWebpackPlugin = require('copy-webpack-plugin');
const requirejsPlugin = require('requirejs-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const InjectPlugin = require('webpack-inject-plugin').default;
var webpackRequireHttp = require('webpack-require-http');



function configWebfanLoader(config) {

  return (err, content) => {
	  if(err){
		 console.error(err);  
		 return;
	  }
	var k;		  

	
	// delete config.hps.scriptengine.webpack.predefine;
	  
	           for(k in config.hps.scriptengine.requirejs.paths){
				  if(/\$/.test(k)){
					  delete config.hps.scriptengine.requirejs.paths[k];	
				  }
			   }
	  
	/*  */
	  var d = new Date();
        var datestr = d.toDateString() + ' ' + d.toTimeString() ;
      
	  var versionstr =
		  datestr.replace(/([\w]+\s[\w]+\s[\d]+\s[\d]+\s[\d]{1,2}\:[\d]{1,2}\:[\d]{1,2})\sGMT\+[\d]+\s\([^\)]+\)/
						  , "\"hash.build.ws:"+ config.hps.scriptengine.hash + "\" \"date:$1\"");	  
	  
	   config.hps.scriptengine.build = '"product:[@frdl/frdljs](https://www.npmjs.com/package/frdl)" "version:'+ config.hps.scriptengine.frdlweb.version+'"' + ' ' + versionstr;	 	  
	  
   //  return "(function(){require('@frdl/webfan').config(/*! @@_BEGIN_CONFIG_@@ */"+ JSON.stringify(config) +"/*! @@_END_CONFIG_@@ */);}());"; 
	  return "(function(){require('@frdl/webfan').config("+ JSON.stringify(config) +");}());"; 
  };
}	


class WebfanInjectConfigPlugin {
  constructor(entry, config, loader) {
    this.config = config;
    this.entry = entry || 'index';
    this.loader = loader || configWebfanLoader;
  }

  apply(compiler) {
    new InjectPlugin(this.loader(this.config), {
		             loaderID : lib.frdl.guid,
					 entryName: this.entry,         //  Limit the injected code to only the entry w/ this name   
					// entryOrder: // ENTRY_ORDER.First    //  Make the injected code be the first entry point           
					 //  ENTRY_ORDER.Last     //  Make the injected code be the last entry point             
					 entryOrder: 'First'  //NotLast  Make the injected code be second to last. 
					 //(The last entry module is the API of the bundle. Useful when you don't want to override that.) This is the default.
					 }).apply(compiler);
  }
}






exports = module.exports = function(
__ENTRY__,
__MAIN__,
__HOST__,
__DIST__,
__PUBLIC_PATH__,
__ASSETS__, 
__PROJECT_DIR__,
__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
__PROTOCOL__,
 __MODULES_DIR__,
 __DEFAULTS__
){

co(function*(__ENTRY__,
__MAIN__,			  
__HOST__,
__DIST__,
__PUBLIC_PATH__,
__ASSETS__, 
__PROJECT_DIR__,
__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
__PROTOCOL__,
 __MODULES_DIR__,
 __DEFAULTS__){
	
//debug.enable(module.name);
//var error = debug(module.name + ':error');
//// error.error = console.error.bind(console);
// by default stderr is used
//error('goes to stderr!');
 
//var log = debug(module.name + ':log');
// set this namespace to log via console.log
//log.log = console.log.bind(console); // don't forget to bind to console!
	
//log('goes to stdout');
//error('still goes to stderr!');
 
// set all output to go via console.info
// overrides all per-namespace log settings
//debug.log = console.info.bind(console);
//error('now goes to stdout via console.info');
//log('still goes to stdout, but via console.info now');
var debug = require('debug');
var check, p;
var writer, msg;
//debug.enable(module.name);
debug.enable(module.name);
//var Console = debug(module.name + ':*');
var Console = debug(module.name + ':' + '*'
				//	+ ';' + 'html-webpack-plugin' + ':' + 'error' + ''
				   );
Console.error = console.error.bind(console);
// by default stderr is used
//error('goes to stderr!');
 

// set this namespace to log via console.log
Console.log = console.log.bind(console); // don't forget to bind to console!
//log('goes to stdout');
//error('still goes to stderr!');
 
// set all output to go via console.info
// overrides all per-namespace log settings
Console.info = console.info.bind(console);
Console.warn = console.warn.bind(console);
Console.trace = console.trace.bind(console);
Console.debug = console.debug.bind(console);

//console = global.console = Console;	

var lib =  require('frdl/assets/node_modules/generate-guid-simple'); 
/**/
//var main = require("frdl/assets/node_modules/frdl-library-main")('frdlweb');
//var WebfanConfig =require('@frdl/webfan');
var WebfanConfig =lib.Webfan;


//var k, l, WebfanConfig =main.Webfan;
var k, l;	
var i  =0, url, m, y;	
var pwaManifest = false;	
	


var __PROJECT_DIR__ = 	__PROJECT_DIR__ || process.cwd();
var __CONFIG__ = __CONFIG__ || 'config'	
//var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ ||'config.main.'+lib.frdl.mt_rand(100000,9999999)+'.next-bundle.js';
var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ ||'config.main.'+lib.frdl.guid+'.next-bundle.js';
var __DIST__ = __DIST__ ||'dist/app';
var __PUBLIC_PATH__ = __PUBLIC_PATH__ || '';
var __ASSETS__ = __ASSETS__ || __PROJECT_DIR__+'/assets/';
var __HOST__ = __HOST__ ||'domainundhomepagespeicher.webfan.de';
var __PROTOCOL__ = __PROTOCOL__ ||'https:';	
var __ENTRY__ = __ENTRY__ ||'index.js';	
	
var __MAIN__ = __MAIN__ || __ENTRY__.split(/\.js/)[0];	
	
var __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_3__	= '';	
var __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_2__	= '';

var __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_1__	= '';	
	
var __MODULES_DIR__ = __MODULES_DIR__ || 'modules';

var __DEFAULTS__ = __DEFAULTS__ || false;	

	
	if(__PROJECT_DIR__ === __dirname 
	//   && 'root' !== process.env.USER && undefined !== process.env.USER
	  ){
	  var Continue = yield prompt('Warning: You are buillding a project in the `frdl`-module modules folder, that may not be wat you want! Type in "build frdl" to continue although:');
	  if('build frdl'!==Continue){
		  msg='Do not project into the frdl module install folder!';
		 console.error(msg);	
         process.exit(msg);		
		//  return false;
	  }else{
		  
	  }
	}
	


    // console.log('Assets path: ' + __ASSETS__);
	
	
 //  shell.exec("rm -rf " +path.resolve(__PROJECT_DIR__, 'assets'));

  p=__ASSETS__;
  check = fs.existsSync(p);	
  if(true===check || 'object'===typeof check){
	// shell.exec('mkdir -p '+p+' --mode=0755');
	  shell.exec("rm -rf " +p);
  }
/* */

	 
     shell.exec(CP+' -rf '+__dirname+'/assets/. '+__PROJECT_DIR__ + '/assets/');

	

  p=path.resolve(__PROJECT_DIR__, __DIST__);
  check = fs.existsSync(p);	
  if(true===check || 'object'===typeof check){
	// shell.exec('mkdir -p '+p+' --mode=0755');
	   shell.exec("rm -rf " +p);
  }

  p=path.resolve(__PROJECT_DIR__, 'themes');
  check = fs.existsSync(p);	
  if(true!==check && 'object'!==typeof check){
	 shell.exec('mkdir -p '+p+' --mode=0755');
  }

	/*
yield new Promise(function(resolve,reject){ 
	setTimeout(function(){
		resolve(true);
	}, 2500);
});
*/

p=path.resolve(__PROJECT_DIR__, __DIST__);
  check = fs.existsSync(p);	
  if(true!==check && 'object'!==typeof check){	
    shell.exec('mkdir -p '+p+' --mode=0775');
  }
	
var FrdlProjectJsonFile = path.resolve(__PROJECT_DIR__, 'frdl.project.json');
try{
	var FrdlProjectJson = require(FrdlProjectJsonFile);
	var FrdlThemeObject = FrdlProjectJson.config.theme;
}catch(e){
	var FrdlProjectJson = false;
	var FrdlThemeObject = false;
}

	



if(false !== FrdlProjectJson && 'undefined'!==typeof FrdlProjectJson.modules_dirname){
	__MODULES_DIR__ = FrdlProjectJson.modules_dirname;
}
	



var config = require('frdl/ws-configs/' + 'domainundhomepagespeicher.webfan.de' + '.json');

  url = __PROTOCOL__+'//'+__HOST__+config.hps.scriptengine.urls.library + '?version='+(new Date()).getFullYear()+'.'+(((new Date()).getMonth())+1)+'.'+(new Date()).getDay();
 var libraryContentLegacy = false;	
	yield download(url, {
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.error(e);
				 process.exit(1);
			 }else{
				  libraryContentLegacy = r.data || r;
			 }
 	 },
	  always : function(){
		        if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		           console.log('Requested: ', url);		 
		        }
	        } 
	     });	




	try{
          config = JSON.parse(extractTextBetween(libraryContentLegacy, '/*! @@_BEGIN_CONFIG_@@ */', ')\n/*! @@_END_CONFIG_@@ */'));
		}catch(e2){
	try{ 
		config = JSON.parse(extractTextBetween(libraryContentLegacy, '/*! @@_BEGIN_CONFIG_@@ */', '/*! @@_END_CONFIG_@@ */'));
		
	 	}catch(e){
		try{
		 config = JSON.parse(extractTextBetween(libraryContentLegacy, '/*! @@_BEGIN_CONFIG_@@ */', ');\n/*! @@_END_CONFIG_@@ */'));
	
		 }catch(e2){	
			msg='Cannot get configuration information from "'+url+'"!\nExample: '+__PROTOCOL__+'//frdl.webfan.de'+config.hps.scriptengine.urls.library;
		    console.warn(msg);	
           // process.exit(msg);	
			//  config = require('frdl/ws-configs/' + 'domainundhomepagespeicher.webfan.de' + '.json');
		}
	}
	}		


	
WebfanConfig.config(config);

WebfanConfig.hps.scriptengine.webpack = WebfanConfig.hps.scriptengine.webpack || {
	__CONFIG__ : __CONFIG__,
	__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ :  __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
	__PUBLIC_PATH__ : __PUBLIC_PATH__, 
	__HOST__ : __HOST__,
	__PROTOCOL__ : __PROTOCOL__,
	__ENTRY__ : __ENTRY__,
	main : __MAIN__,
	predefine : {
		umd : [],
		amdRaw : [
		  'angular-frdl-part-1',
		  'angular-frdl-part-2',
		  'angular-frdl'
		],
		amd : [
		    'amd-loader/frdlweb/amd-loader',
		    'amd-loader',
			'webfan/load-js',			
			'ieee754',			
			'base64-js',
			'querystring',			
			'idle',	
			'util',
			'url',
			'path',
		    'requireRemoteModulePromise',
		    'inline-worker'
		]
	},
	automaticNameDelimiter : '~',
	OVERWRITE_LEGACY : false
};

	
WebfanConfig.hps.scriptengine.requirejs.prefix = '';
WebfanConfig.hps.scriptengine.requirejs.defaultPrefix = '';
	
WebfanConfig.hps.scriptengine.frdlweb = {
	version : pkg.version
};
	

WebfanConfig.hps.scriptengine.requirejs.shim = extend(WebfanConfig.hps.scriptengine.requirejs.shim, {		   
	      process: '@frdl/process'

});




WebfanConfig.hps.scriptengine.angularjs = {};	
WebfanConfig.hps.scriptengine.angularjs.rootSelector = 'body';	
WebfanConfig.hps.scriptengine.angularjs.mainRequire =[
	'url',
	'angular-frdl'
];
WebfanConfig.hps.scriptengine.angularjs.mainInject = [
		'csrf-cross-domain',                     
		'oc.lazyLoad',							
        '@frdl/frdl/angularjs',					
		'ngTouch',			                   	  
		'ui.router'
	];


if(__DEFAULTS__){	
WebfanConfig.hps.scriptengine.webpack.predefine.amdRaw.push('angular-ui-bootstrap/angular-ui-bootstrap');		
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('bootstrap-4/js/bootstrap-bundle');		
WebfanConfig.hps.scriptengine.angularjs.mainRequire.push('bootstrap-4/js/bootstrap-bundle');	
WebfanConfig.hps.scriptengine.angularjs.mainRequire.push('angular-ui-bootstrap/angular-ui-bootstrap');
WebfanConfig.hps.scriptengine.angularjs.mainInject.push('ui.bootstrap');		
}
	
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('ng-sanitize');	
WebfanConfig.hps.scriptengine.angularjs.mainRequire.push('ng-sanitize');
WebfanConfig.hps.scriptengine.angularjs.mainInject.push('ngSanitize');		
		
if(__DEFAULTS__){	
WebfanConfig.hps.scriptengine.angularjs.mainRequire.push('angular-messages/angular-messages');
	
WebfanConfig.hps.scriptengine.angularjs.mainRequire.push('angular-xeditable/angular-xeditable');	
WebfanConfig.hps.scriptengine.angularjs.mainInject.push('xeditable');
	
WebfanConfig.hps.scriptengine.angularjs.mainInject.push('ui.select');	
	
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('webfan/navigator/json-rpc-worker');
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('Webfan.hps.rpc');
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('Webfan.hps.Router');	
	
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('webfan/webfanURLParser');
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('dom-legacy');
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('frdl-dom-query-old');
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('webfan/jquery-addons');		 
	
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('frdlweb.rpc');
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('JsonRpcClient');		
}	
	
		
	//'webfan/hps/dsgvo-cookiechoices'
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('webfan/hps/dsgvo-cookiechoices');		
WebfanConfig.hps.scriptengine.webpack.predefine.amd.push('dsgvo-adsense');	
	
		
if('undefined'===typeof WebfanConfig.hps.scriptengine.lazy){
  WebfanConfig.hps.scriptengine.lazy = [];	
}

if(__DEFAULTS__){
 var lazyModules = 	require('frdl/frdlweb-lazy-modules');
 lib.frdl.each(lazyModules, function(i,m){
	 WebfanConfig.hps.scriptengine.lazy.push(m);
 });
	
 WebfanConfig.hps.scriptengine.frdlweb.components = require('frdl/frdlweb-components');
}//__DEFAULTS__
	


delete WebfanConfig.hps.scriptengine.requirejs.map;

	
WebfanConfig.hps.scriptengine.requirejs.paths['com.webfan.gui'] = 'webfan/navigator/ui'; 

//WebfanConfig.hps.scriptengine.requirejs.paths.lit = 'literalizer'; 



__CONFIG_MAIN_NEXT_BUNDLE_CONTENT_1__ += ""
	

	              + "define('Webfan', function(){return require('@frdl/webfan');});"
				  + "define('process', function(){return require('@frdl/process');});"
				  + "define('fs', function(){return require('@frdl/fs');});"
				  + "define('vm', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').vm;});"
				  + "define('@frdl/vm', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').vm;});"
				  + "define('webfan/vm', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').vm;});"
				  + "define('extend', function(){return require.main.frdl.extend;});"
				  + "define('clone', function(){return require.main.frdl.clone;});"	
				  + "define('base64_encode', function(){return require.main.frdl.base64_encode;});"
				  + "define('base64_decode', function(){return require.main.frdl.base64_decode;});"
				  + "define('base64_detect', function(){return require.main.frdl.base64_detect;});"
				  + "define('str_replace', function(){return require.main.frdl.str_replace;});"
				  + "define('explode', function(){return require.main.frdl.explode;});"
	
	
				  + "define('EventEmitter', function(){return require('@frdl/eventemitter');});"
				  + "define('eventemitter', function(){return require('@frdl/eventemitter');});"
	
			//	  + "define('lit', ['literalizer'], function(literalizer){return literalizer;});"
	
				  + "define('webfan/navigator/simpledialog-9x', function(){return require.main.frdl.alert;});"
	              + "define('webfan/navigator/simpledialog-9x.js', function(){return require.main.frdl.alert;});"
	
				  + "define('webfan/navigator/dom-observer-new', function(){return require.main.frdl.watchFor;});"
	              + "define('webfan/navigator/dom-observer-new.js', function(){return require.main.frdl.watchFor;});"

;
		

	
 p = path.resolve(__PROJECT_DIR__, 'frdl-extensions');	
 check = fs.existsSync(p);		
//	console.log(p);
//	console.log(check);
	
if(true===check || 'object'===typeof check){
yield new Promise(function(resolve,reject){ 
  recursive(path.resolve(__PROJECT_DIR__, 'frdl-extensions'), ["!webfan.js"], function (err, files) {
	   if(err){
		   console.warn(err);
		   reject(err);
		   return;
	   }
	   var file, i=0;
	   for(i=0; i<files.length;i++){
		   file = files[i];
		   require(file)(WebfanConfig);
		   console.log('Config Module File %s', file);
		   
	   }
	  resolve(files);
  });

});	
}


p=path.resolve(__PROJECT_DIR__, __MODULES_DIR__);
 check = fs.existsSync(p);	
		//console.log(p);
	//console.log(check);
if(true===check || 'object'===typeof check){
yield new Promise(function(resolve,reject){ 
  recursive(path.resolve(__PROJECT_DIR__, __MODULES_DIR__), ["!webfan.js"], function (err, files) {
	   if(err){
		   console.warn(err);
		   reject(err);
		   return;
	   }
	   var file, i=0;
	   for(i=0; i<files.length;i++){
		   file = files[i];
		   require(file)(WebfanConfig);
		   console.log('Config Module File %s', file);
		   
	   }
	  resolve(files);
  });

});	
}

if(false !== FrdlThemeObject){
	p=path.resolve(__PROJECT_DIR__, 'themes/'+FrdlThemeObject.vendor+'/'+FrdlThemeObject.name);
 check = fs.existsSync(p);	
 	//	console.log(p);
	//console.log(check);
 
 if(true===check || 'object'===typeof check){	 
    yield new Promise(function(resolve,reject){ 
       recursive(path.resolve(__PROJECT_DIR__, 'themes/'+FrdlThemeObject.vendor+'/'+FrdlThemeObject.name), ["!webfan.js"], function (err, files) {
	   if(err){
		   console.warn(err);
		   reject(err);
		   return;
	   }		   
	   var file, i=0;
	   for(i=0; i<files.length;i++){
		   file = files[i];
		   require(file)(WebfanConfig);
		   console.log('Config Theme File %s', file);
		   
	   }
	  resolve(files);
    });

  });	
 }
}

//}());



	
	
 
 m = [];	
 for(i=0; i<WebfanConfig.hps.scriptengine.webpack.predefine.amd.length;i++){
	m.push(WebfanConfig.hps.scriptengine.webpack.predefine.amd[i]);	
	 
 }//for 	 
 url = __PROTOCOL__+'//'+__HOST__+config.hps.scriptengine.urls.library + '?version='+(new Date()).getFullYear()+'.'+(((new Date()).getMonth())+1)+'.'+(new Date()).getDay() + '&node_modules='
	  + urlencode(m.join(','));
	
 yield download(url, {
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.error(e);
				 process.exit(1);
			 }else{
				  __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_2__ += r.data + '\n';
			 }
 	 },
	  always : function(){
		        if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		           console.log('Requested: ', url);		 
		        }
	        } 
	     });	  	

	
 m = [];	
 for(i=0; i<WebfanConfig.hps.scriptengine.webpack.predefine.amdRaw.length;i++){
	m.push(WebfanConfig.hps.scriptengine.webpack.predefine.amdRaw[i]);	
	 
 }//for 	 
 url = __PROTOCOL__+'//'+__HOST__+config.hps.scriptengine.urls.library + '?version='+(new Date()).getFullYear()+'.'+(((new Date()).getMonth())+1)+'.'+(new Date()).getDay() + '&node_modules='
	  + urlencode(m.join(','));
	
 yield download(url, {
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.error(e);
				 process.exit(1);
			 }else{
				  __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_3__ += r.data + '\n';
			 }
 	 },
	  always : function(){
		        if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		           console.log('Requested: ', url);		 
		        }
	        } 
	     });	
	
	


 
	url = __PROTOCOL__+'//'+__HOST__+'/manifest.webapp';
	y = yield download(url, {
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.error(e);
				 process.exit(1);
			 }else{
				  pwaManifest = r.data;
			}
 	 },
	  always : function(){
		 if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		   console.log('Requested: ', url);		 
		 }
	  } 
	});

	


	
/*
   y = yield new Promise(function(done,rejected){
	  fs.readdir( __ASSETS__ , function(e, dir){
		  if(e){
		    fs.mkdir( __ASSETS__ , function(err, d){
			   if(err){
				  rejected(err);
				  //  console.warn(err);
				    // done(d);
			   }else{
				   done(d);
			   }
		    });
		  }else{
			  done(true);
		  }
	   });	  
	});
   fs.chmodSync( __ASSETS__ , 0o744); 	

*/
	






 
	url = __PROTOCOL__+'//'+__HOST__+'/cdn/frdl/flow/components/webfan/install/icon128.png';
    writer = fs.createWriteStream(path.resolve(__PROJECT_DIR__,  __DIST__ +'/icon128.png'));
  
	yield new Promise(function(resolve,reject){
	
	download(url, {
	  params : {	
	    responseType: 'stream'
	  },
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.error(e);
				 process.exit(1);
			 }else{	
				   (r.data || r).pipe(writer);
				 writer.on('finish', resolve);
                 writer.on('error', reject);
			 }
 	 },
	  always : function(){
		 if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		   console.log('Requested: ', url);		 
		 }
	  }
	  
	});
 });	
	
				

	
   
	url = __PROTOCOL__+'//'+__HOST__+'/favicon.ico.php';
	writer = fs.createWriteStream(path.resolve(__PROJECT_DIR__,  __DIST__ +'/favicon.ico'));
	
  yield new Promise(function(resolve,reject){ 
	
	download(url, {
	  params : {	
	    responseType: 'stream'
	  },
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.warn(e);
				// process.exit(1);
			 }else{
				 (r.data || r).pipe(writer);
				 writer.on('finish', resolve);
                 writer.on('error', reject);
			 }
 	 },
	  always : function(){
		 if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		   console.log('Requested: ', url);		 
		 }
	  } 
	});
  });
	 


	try{
	url = __PROTOCOL__+'//'+__HOST__+'/show_user_picture.php?pic=logo';
	writer = fs.createWriteStream(path.resolve(__PROJECT_DIR__,  __DIST__ +'/logo.jpg'));
	var logoFound = false;
  yield new Promise(function(resolve,reject){ 
	
	download(url, {
	  params : {	
	    responseType: 'stream'
	  },
	  callback : function (e, r) {
             if(e){
				// throw e;
				 console.warn(e);
				// process.exit(1);
			 }else{
				 (r.data || r).pipe(writer);
				 writer.on('finish', resolve);
                 writer.on('error', reject);
			 }
 	 },
	  always : function(){
		 if('undefined'!==process.env.DEBUG && false !== process.env.DEBUG){
		   console.log('Requested: ', url);		 
		 }
	  } 
	});
  }).then(function(){
	  logoFound = true;
  }).catch(function(){
	  logoFound = false;
  });
	 
	}catch(e){
		console.notice(e);
		logoFound = false;
	}
	
	

 	
	
	

var O = {
	path : path.resolve(__PROJECT_DIR__, __DIST__), //path.resolve(__dirname, __DIST__), 
	alias : extend(sanitize(WebfanConfig.hps.scriptengine.requirejs.paths), {
        'angular' : 'angular-frdl', 
        'angularjs' : 'angular-frdl', 
	    'process': '@frdl/process', 
        'vm': '@frdl/vm',
		'fs' : '@frdl/fs',
		'Webfan' : '@frdl/Webfan',		
		'searching' : 'frdl-searching-finder',
		
	
		'frdl' : '@frdl/frdl',	
		'@frdl/transpile-to-php' : 'jstophp',
		
		'request' : 'axios',
		'https' : 'axios',
		'http' : 'axios',		
		'filer.js' : 'patch-filer'
/*		
		'@frdl/simple-downloader$' : path.dirname(require.resolve('@frdl/simple-downloader')),
		'@frdl/helper$' : path.dirname(require.resolve('@frdl/helper')),
		'@frdl/functions$' : path.dirname(require.resolve('@frdl/functions')),
		'@frdl/eventemitter$' : path.dirname(require.resolve('@frdl/eventemitter')),
		'@betafcc/is$' : path.dirname(require.resolve('@betafcc/is')),
	    '@frdl/frdlweb-api-helper$' : path.dirname(require.resolve('@frdl/frdlweb-api-helper')),
		'@frdl/magic-overload$' : path.dirname(require.resolve('@frdl/magic-overload')),
		'frdlalert$' : 'frdl/assets/node_modules/frdlalert',
		'watchFor$' : 'frdl/assets/node_modules/watchFor',
		'jquery$' : 'frdl/assets/node_modules/jquery',
		'patch-require$' : 'frdl/assets/node_modules/patch-require'
*/		
	
      })
};


function optimize(content){
  return content;	
}



	
var entry = {};
//entry[WebfanConfig.hps.scriptengine.webpack.main] =  __ASSETS__ +  __ENTRY__ ;	
entry[WebfanConfig.hps.scriptengine.webpack.main] =  __dirname + '/assets/' +  __ENTRY__ ;	
/*
yield new Promise(function(resolve,reject){ 
	setTimeout(function(){
		resolve(true);
	}, 2500);
});
	*/
	
var r = yield new Promise(function(resolve, reject){	
	
process.chdir(__dirname);
	

webpack([
  {
	 mode : 'production', 
	target: 'web',  
	entry: entry,
	node : {	
	 console: false,
	 global: true,
	 process: false,
	 fs: false,	
	 Buffer: false,
	 url: false,
	 util: false,
	 path: false,
	 https : false,
	 http : false,	
	 request : false,
	 querystring:false,	
	 vm : false,
	 __filename:  "mock",
	 __dirname: "mock",		
	 setImmediate:  true
   },	   
 optimization : {
	namedModules: true, 
	namedChunks: true,
      runtimeChunk:false,
      splitChunks: {
      chunks: 'async',
      minSize: 0,		  
      maxSize: Infinity,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: 1,
      automaticNameDelimiter: WebfanConfig.hps.scriptengine.webpack.automaticNameDelimiter		 

  }	
},
  
	output: { 
		
		path: O.path,
		publicPath: WebfanConfig.hps.scriptengine.webpack.__PUBLIC_PATH__,
		chunkFilename: '[name].[hash].bundle.js',
	    filename: '[name].[hash].bundle-webpack.js',
	 	library: WebfanConfig.hps.scriptengine.webpack.main,   
	    libraryTarget: "umd2",	
        umdNamedDefine: true,
		globalObject: 'this',		
		devtoolModuleFilenameTemplate: info => {     
				 return `webpack:///${info.namespace}/${info.id}?${info.loaders}`;
		}
	},
/*
var webpackRequireHttp = r"equire('w"ebpack-require-http');

var custom1Function = webpackRequireHttp.custom({
    rules:{
        '^#(.+)\/(.+)':'http://static.something.com/$1/$2.js'
    }
});

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
*/
	  
    externals:[
        webpackRequireHttp.custom({
            rules:{
              //  '^#api\/common':'http://static.domain.com/api/common.js',
				'^#cdn\:frdlweb\/([^\/]+)\/(.+)': WebfanConfig.hps.scriptengine.requirejs.baseUrl + '$1/$2.js',
				'^#cdn\:frdlweb\/([^\/]+[^\/])$': WebfanConfig.hps.scriptengine.requirejs.baseUrl + '$1.js'
            }
        })
    ],	  
	 	
 resolve: {
    modules: [	
//	  path.resolve(__dirname ,'assets'),
	  path.resolve(__dirname ,'../..'),
	  path.resolve(__dirname ,'assets/node_modules'),
	  path.resolve(__dirname ,'../../node_modules')
    ],
	 alias :  O.alias,
	 extensions: ['.js'] // File types
},
module: {
	noParse: /requirejs|uglify\-browser|(angular)|nodules/, 
    rules: [
		
       {
         test: new RegExp(preg_quote('@frdl/process')),
         use: 'expose-loader?process'
       }, 			
/*	
			{
			
     test: /(\.js)$/,
	 exclude : new RegExp('nodules'),		
      use: [{     
        loader: 'babel-loader',
        options: {
			
          presets: [
					  '@babel/preset-env'
				   ],
          plugins: [ 
			    "@babel/plugin-syntax-dynamic-import",
			    "@babel/plugin-transform-runtime"
	
		  ]
        }
      }
	  ]
    },	
	
		
	*/	
		{
			
      test: /(\.js)$/,
	 // exclude : new RegExp('^(' + preg_quote(__ENTRY__) +')$|(index)|(betafcc\/is)|(patch\-require)|(uglify\-browser)|(angular\-frdl)|^co$'),	
	  exclude : /(nodules)|(betafcc\/is)|(webfan)|(require)|(uglify\-browser)|(angular)|^co$/,	
      use: [{     
        loader: 'babel-loader',
        options: {
			
          presets: [
					[
					 '@babel/preset-env', 
			         {     
						  targets: {         
							  esmodules: true  
						  },      
					  }					
					]
				   ],
          plugins: [ 
			    "@babel/plugin-syntax-dynamic-import",
			     [
   
					 "@babel/plugin-transform-runtime",
     
					 {       
						 "absoluteRuntime": false,      
						 "corejs": false,    
						 "helpers": true,     
						 "regenerator": true,      
						 "useESModules": true     
					 }
   
				 ]
	
		  ]
        }
      }
	  ]
    },
	
	 {
		 test: /\.png$|\.jpgg$|\.ico$/, 
		 loader: 'file-loader'
	 },	
				 
    ]
  },
	  
 plugins: [	 
	 new webpack.NamedModulesPlugin(),	   	 
	 new WebfanInjectConfigPlugin(WebfanConfig.hps.scriptengine.webpack.main, WebfanConfig, configWebfanLoader ),		 
     new webpack.ProvidePlugin(sanitize(WebfanConfig.hps.scriptengine.requirejs.shim)), 

/*
	  new BabelMinifyPlugin({   
		  "mangle": {     
			  "keepFnName": true,
			  "keepClassName": true
		  },  
		  "deadcode": {   
			  "keepFnName": true,
			  "keepClassName": true   
		  }
 
	  }),
	 	*/
	 
      new requirejsPlugin({
            path: O.path,
            //filename: WebfanConfig.hps.scriptengine.webpack.__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,		
		    filename : __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
            baseUrl : WebfanConfig.hps.scriptengine.requirejs.baseUrl,
            pathUrl : '',
            processOutput: function (assets) {
				assets =extend(sanitize(WebfanConfig.hps.scriptengine.requirejs), assets);
				assets.paths = extend(O.alias, assets.paths);
				var k;
				for(k in assets.paths){
				  assets.paths[k] = str_replace(__dirname, '.', assets.paths[k]);
				//  assets.paths[str_replace('$', '', k)] = assets.paths[k];
				  if(/\$/.test(k)){
					  delete assets.paths[k];	
				  }
				}

				//if('undefined'!==typeof assets.shim){
				//  delete assets.shim;
				//}
				var code = '(function(){require.config('+ JSON.stringify(assets) + ');}());'

				  + __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_1__
				
                   + '\n'
				   + __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_2__
				;
		
				code += '\n';
				code += __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_3__;
				return code;
            }
        }),	 		 
	 
	 
	 new webpack.ExtendedAPIPlugin()
	 

    ]	  
}
//	,  { entry: './index2.js', output: { filename: 'bundle2.js' } }
], function(err,stats){
	if(err){
    	 console.error(err);
		reject(err);
	}else{
		var str = stats.toString() + '\n';
		//console.log('stats', Object.keys(stats)); 
       process.stdout.write(str);
		resolve(stats);
	}
 });


}).catch(function(e){
	console.error(e);
});	

	

	return r;
}, __ENTRY__,
__MAIN__,   
__HOST__,
__DIST__,
__PUBLIC_PATH__,
__ASSETS__, 
__PROJECT_DIR__,
__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
__PROTOCOL__,
 __MODULES_DIR__,
 __DEFAULTS__).then(function(r){
	process.chdir(__PROJECT_DIR__);
	process.stdout.write(r.hash);
	process.exit(0);
}).catch(function(e){
	process.chdir(__PROJECT_DIR__);
	console.error(e);
	process.exit(e);
});	
	
	
};