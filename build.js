var co = require('co');
var prompt = require('co-prompt');
var shell = require("shelljs");

//var browserify = require('browserify');
var debug = require('debug');
var fs = require('fs');

var CP = (/win/i.test(process.platform)) ? 'copy' : 'cp';

var UglifyJS = require("uglify-js");

var pkg = require('./package.json');
require("@frdl/node-browser-shim")(global);

//var Webfan = require('./../frdl@webfan');
var Webfan = require('@frdl/webfan');
//var fixture = require('./patch-fixes-browser');
//fixture(Webfan);
//console.log(Webfan.module);



var download = require('@frdl/simple-downloader');
 //if ('undefined' === typeof global.define){
	// define = global.define =  require('amdefine');		
// }
var {extend, clone, sanitize, each, extractTextBetween, mt_rand, preg_quote} = require('@frdl/functions');

//console.log(extend);
//console.log(clone);

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
//const webpackRequireHttp = require('webpack-require-http');
//const DownloadWebpackPlugin = require('remote-webpack-plugin');
const SaveRemoteFilePlugin = require('save-remote-file-webpack-plugin');
//const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const requirejsPlugin = require('requirejs-webpack-plugin');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
//const NpmInstallPlugin = require('npm-install-webpack-plugin');
//var converter = require('requirejs-to-webpack-cli');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const InjectPlugin = require('webpack-inject-plugin').default;
 //const CleanWebpackPlugin = require('clean-webpack-plugin');
 //const NodeSecurityPlugin = require('webpack-nodesecurity-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');



function configWebfanLoader(config) {
  return (err, content) => {
	  if(err){
		 console.error(err);  
		 return;
	  }
	// console.log('content', content); 
     return "(function(){require('@frdl/webfan').config(\n/*! @@_BEGIN_CONFIG_@@ */\n"+ JSON.stringify(sanitize(config))+"\n/*! @@_END_CONFIG_@@ */\n);}());"
	   //  + "require.config(require('@frdl/webfan').hps.scriptengine.requirejs);console.log('requirejs configured');"
	   //   + "console.log(__webpack_chunkname__);console.log(__webpack_hash__);"
	   // + 'require("@frdl/node-browser-shim")(undefined);'
	  ; 
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
__PROTOCOL__
 
){




co(function*(__ENTRY__,
__MAIN__,			  
__HOST__,
__DIST__,
__PUBLIC_PATH__,
__ASSETS__, 
__PROJECT_DIR__,
__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
__PROTOCOL__){
	
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
	
var k, l, WebfanConfig ={};
var i  =0, url, m, y;	
var pwaManifest = false;	
	


var __PROJECT_DIR__ = 	__PROJECT_DIR__ || process.cwd();
var __CONFIG__ = __CONFIG__ || 'config'	
var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ ||'config.main.'+mt_rand(1000,9999)+'.next-bundle.js';
var __DIST__ = __DIST__ ||'app';
var __PUBLIC_PATH__ = __PUBLIC_PATH__ || '';
var __ASSETS__ = __ASSETS__ || __PROJECT_DIR__+'/assets/';
var __HOST__ = __HOST__ ||'domainundhomepagespeicher.webfan.de';
var __PROTOCOL__ = __PROTOCOL__ ||'https:';	
var __ENTRY__ = __ENTRY__ ||'index.js';	
	
var __MAIN__ = __MAIN__ || __ENTRY__.split(/\.js/)[0];	
	
var __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_2__	= '';

var __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_1__	= '';	

//__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = WebfanConfig.hps.scriptengine.webpack.__PUBLIC_PATH__ + __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;
	
	
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
	

 
  //   shell.exec("rm -r " + path.resolve(__PROJECT_DIR__, __DIST__) + ' || true');
	// shell.exec("mkdir " + __PROJECT_DIR__ + '/assets/');
	
	//shell.exec("rm -rf " +__PROJECT_DIR__ + '/assets/');
     shell.exec(CP+' -rf '+__dirname+'/assets/. '+__PROJECT_DIR__ + '/assets/');
	
    
  //   shell.exec("rm -r " + path.resolve(__PROJECT_DIR__, 'assets/frdl-legacy-app.js')  + ' || true');

/*
var b = browserify();
b.add(__ASSETS__+__ENTRY__);
//b.transform('deamdify');
b.bundle()
	//.pipe(process.stdout)
   .pipe(fs.createWriteStream('dist/bundle-test.js'))
;


*/
//define = global.define =  require('amdefine');	

//define =  require('amdefine');	





var config = require('./ws-configs/' + 'domainundhomepagespeicher.webfan.de' + '.json');

  url = __PROTOCOL__+'//'+__HOST__+config.hps.scriptengine.urls.library;
 var libraryContentLegacy;	
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
	  config = JSON.parse(extractTextBetween(libraryContentLegacy, '/*! @@_BEGIN_CONFIG_@@ */', ');\n/*! @@_END_CONFIG_@@ */'));
	}catch(e){
		try{
		   config = JSON.parse(extractTextBetween(libraryContentLegacy, '/*! @@_BEGIN_CONFIG_@@ */', '/*! @@_END_CONFIG_@@ */'));
		}catch(e2){	
			msg='Cannot get configuration information from "'+url+'"!\nExample: '+__PROTOCOL__+'//frdl.webfan.de'+config.hps.scriptengine.urls.library;
		    console.error(msg);	
            process.exit(msg);	
		}
	}
	// console.log('config: ', config);		

	
	
 // writer = fs.createWriteStream( __ASSETS__ +'frdl-legacy.js');
	
  yield new Promise(function(resolve,reject){ 
	   fs.writeFile( __ASSETS__ +'frdl-legacy-app.'+ config.hps.scriptengine.hash +'.js', 
			extractTextBetween(libraryContentLegacy, 
			 'webfan/hps-features-implementation */\n/*! https://github.com/jensarps/AMD-feature/blob/master/examples/targets/dynamic.js*/', 
			 '/*! @@_BEGIN_RUN_@@ */')
		
+ extractTextBetween(libraryContentLegacy, 
			 '/*! @@_BEGIN_HPS_MODULES_@@ */', 
			 '/*! @@_END_HPS_MODULES_@@ */')
					, function(e){
				   if(e){
					reject(e);   
				   }else{
					   resolve(true);
				   }
	  });
  });





//var reqConf =  converter.convert(config);
Webfan.config(config);

for(l in Webfan){
 if('object'===typeof Webfan[l]){	
  WebfanConfig[l] = Webfan[l];
  for(k in Webfan[l]){
	WebfanConfig[l][k] = Webfan[l][k];
  }
 }	 
}	

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
		amd : [
			/*
		       'webfan/navigator/json-rpc-worker',
			   'Webfan.hps.rpc',
			   'JsonRpcClient',
			   'Webfan.hps.Router',
			   'amd-loader/frdlweb/amd-loader',
			   'amd-loader',
			   'webfan/hps-features-implementation',
			   'implementations',
			   'feature/feature',
			   'webfan/simple-batch',
			   'webfan/navigator/ng-app-module',
			   'webfan/navigator/ui',
			   'webfan/navigator/webfan-nav',
			   'webfan/navigator/webfan-widget',
			   'angular-ui-bootstrap/angular-ui-bootstrap',
			   'angular-ui-select/ui-select',
			   'angular-xeditable/angular-xeditable',
			   'mobile-detect/mobile-detect',
			   'modernizr',
			   'frdl',
			   'co'
			   
			  	
			
			
			   'amd-loader/frdlweb/amd-loader',
			   'amd-loader',
			   'webfan/cjs/frdlcjs',
			    'frdlcjs',
			'webfan/bootcache',
			'webfan/loadPlain',
			'webfan/loadXML',
			 
			   'webfan/hps-features-implementation',
			   'implementations',	
			   'feature/feature',
		*/
			
			 //  'bootstrap-4/js/bootstrap-bundle',
			 //  'angular-ui-bootstrap/angular-ui-bootstrap',
			 //  'angular-ui-select/ui-select',
			 //  'angular-xeditable/angular-xeditable',
			 
			/*
		       'webfan/navigator/json-rpc-worker',
			   'Webfan.hps.rpc',
			   'JsonRpcClient',
			   'Webfan.hps.Router',
			//   'mimemessage',
			
			   'util',
			*/
			
			//'filer',
			   'amd-loader/frdlweb/amd-loader',
			   'amd-loader',
			//   'webfan/cjs/frdlcjs',
			//    'frdlcjs',
		//	'webfan/bootcache',
		//	'webfan/loadPlain',
		//	'webfan/loadXML',	
			'webfan/load-js',
			
			
			
			
			'util',
			'url',
			'path',
			
			'ieee754',			
			'base64-js',
			'buffer',
			'querystring',
			
			
			'idle',
			
			'literalizer',
			'inline-worker',
		]
	},
	
	OVERWRITE_LEGACY : false
};

WebfanConfig.hps.scriptengine.requirejs.prefix = 'webfan/load-js';
WebfanConfig.hps.scriptengine.requirejs.defaultPrefix = 'webfan/load-js';
	
WebfanConfig.hps.scriptengine.frdlweb = {
	version : pkg.version,
	components : {}
};


	

WebfanConfig.hps.scriptengine.frdlweb.components.legacy = 
{	
   selector : 'ng-flows:not([ng-bootstrapped]), ng-flow:not([ng-bootstrapped]), ng-app:not([ng-bootstrapped]), '
		+ 'webfa-nav:not([ng-bootstrapped]), webfan-widget:not([data-frdl-component-initiated="true"]), '
		+ 'webfan[type="widget"]:not([data-frdl-component-initiated-rewrite-_canonical_2_*="true"]), '
		+ '*[type^="application/vnd.frdl.flow.widget."]:not([data-frdl-component-initiated-rewrite-_canonical_2_*="true"]), '
		+ '*[type$=".wgt"]:not([data-frdl-component-initiated-rewrite-_canonical_2_*="true"]), '
		+ '*[data-frdl-component*=":"]:not([data-frdl-component-initiated-rewrite-_canonical_="true"]):not([data-frdl-component-initiated])',
	load : [
		{
			type : 'script',
			once : true,
			load : WebfanConfig.hps.scriptengine.webpack.__PUBLIC_PATH__ +  'frdl-legacy-app.' + WebfanConfig.hps.scriptengine.hash + '.js'  
			       //       + '?${Webfan.hps.scriptengine.webpack.chunkname}=${Webfan.hps.scriptengine.webpack.hash}'
		},
		{
	  type : 'amd',
	  once : true,		
	  load : [		
	    'webfan/load-js!webfan/lang-legacy', 
		'webfan/load-js!webfan/navigator/webfan-widget',
		'webfan/load-js!webfan/navigator/webfan-nav',
		'webfan/load-js!webfan/navigator/ui',
		 'webfan/load-js!' +   WebfanConfig.hps.scriptengine.webpack.__PUBLIC_PATH__ +  'frdl-legacy-component.' + WebfanConfig.hps.scriptengine.hash + '.js'  
	              // + '?${Webfan.hps.scriptengine.webpack.chunkname}=${Webfan.hps.scriptengine.webpack.hash}'
	  ]
	}
   ]
	
};
	



delete WebfanConfig.hps.scriptengine.requirejs.map;

	
WebfanConfig.hps.scriptengine.requirejs.paths['com.webfan.gui'] = 'webfan/navigator/ui'; 

WebfanConfig.hps.scriptengine.requirejs.paths.lit = 'literalizer'; 
	// WebfanConfig.hps.scriptengine.webpack.__ENTRY__.split(/\.js/)[0];



__CONFIG_MAIN_NEXT_BUNDLE_CONTENT_1__	 
	             += "define('Webfan', function(){return require('@frdl/webfan');});"
				  + "define('process', function(){return global.process;});"
	
                


				
				  + "define('fs', function(){return require('@frdl/fs');});"
				  + "define('vm', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').vm;});"
				 // + "define('@frdl/vm', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').vm;});"
				  + "define('webfan/vm', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').vm;});"
				
		
				

		

	
				  + "define('extend', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.extend;});"
				  + "define('clone', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.clone;});"	
				  + "define('base64_encode', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.base64_encode;});"
				  + "define('base64_decode', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.base64_decode;});"
				  + "define('base64_detect', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.base64_detect;});"
				  + "define('str_replace', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.str_replace;});"
				  + "define('explode', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.explode;});"
	

			//	  + "define('angular-frdl', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').angular;});"
				  + "define('angular', ['angular-frdl'], function(){return angular;});"
				  + "define('angularjs', ['angular-frdl'], function(){return angular;});"
	
				  + "define('EventEmitter', function(){return require('@frdl/eventemitter');});"
				  + "define('eventemitter', function(){return require('@frdl/eventemitter');});"
	

			//	  + "define('ngAppModule', ['webfan/navigator/ng-app-module'], function(ngAppModule){	return ngAppModule;});"
			//	  + "define('ng-app-module', ['webfan/navigator/ng-app-module'], function(ngAppModule){	return ngAppModule;});"
	
	          //    + "define('filer', function(){return require('@frdl/fs').filer;});"
	

				  + "define('lit', ['literalizer'], function(literalizer){return literalizer;});"
	
				  + "define('webfan/navigator/simpledialog-9x', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.alert;});"
	              + "define('webfan/navigator/simpledialog-9x.js', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.alert;});"
	
				  + "define('webfan/navigator/dom-observer-new', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.watchFor;});"
	              + "define('webfan/navigator/dom-observer-new.js', function(){return require('" + WebfanConfig.hps.scriptengine.webpack.main + "').frdl.watchFor;});"

;
//webfan/navigator/simpledialog-9x.js
//'webfan/navigator/dom-observer-new'	
	
	
	

	

 for(i=0; i<WebfanConfig.hps.scriptengine.webpack.predefine.amd.length-1;i++){
	m = WebfanConfig.hps.scriptengine.webpack.predefine.amd[i];	
	url =  WebfanConfig.hps.scriptengine.requirejs.baseUrl + m + '.js';		
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
 }//for 
	



	

	

 
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
	

	

/*

   y = yield new Promise(function(done,rejected){
	  fs.readdir( __DIST__ , function(e, dir){
		  if(e){
		    fs.mkdir( __DIST__ , function(err, d){
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
   fs.chmodSync( __DIST__ , 0o744); 
	*/
	





	//\/cdn\/frdl\/flow\/components\/webfan\/install\/icon128.png
 
	url = __PROTOCOL__+'//'+__HOST__+'/cdn/frdl/flow/components/webfan/install/icon128.png';
    writer = fs.createWriteStream(__ASSETS__ +'icon128.png');
  
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
	
				

	
   
	url = __PROTOCOL__+'//'+__HOST__+'/favicon.ico';
	writer = fs.createWriteStream( __ASSETS__ +'favicon.ico');
	
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
	 


	
	url = __PROTOCOL__+'//'+__HOST__+'/logo.jpg';
	writer = fs.createWriteStream( __ASSETS__ +'logo.jpg');
	
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
	 
 
	
	
	url = __PROTOCOL__+'//'+__HOST__+'/favicon.ico';
	writer = fs.createWriteStream( __ASSETS__ +'favicon.ico');
	
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
	 
 	
	
	// console.log('pwaManifest', pwaManifest); 
	
//Webfan.hps.scriptengine.requirejs.paths.Webfan = '@frdl/webfan';
//WebfanConfig.hps.scriptengine.requirejs.paths.vm = '@frdl/vm'; 	
//WebfanConfig.hps.scriptengine.requirejs.paths['webfan/vm'] = '@frdl/vm'; 	

WebfanConfig.hps.scriptengine.requirejs.shim = extend(WebfanConfig.hps.scriptengine.requirejs.shim, {		   
	      process: '@frdl/process', 
     //   vm: '@frdl/vm',
	  //  url : 'url',
	  //  path : 'path',
	//	fs : '@frdl/fs',
	  //  'jQuery' : 'webfan/frdl-jQuery',
	  //   'jQuery' : 'jquery',
	 //   __requirejs__loaded_module__ : "@frdl/requirejs"
});

var O = {
	path : path.resolve(__PROJECT_DIR__, __DIST__), //path.resolve(__dirname, __DIST__), 
	alias : extend(sanitize(WebfanConfig.hps.scriptengine.requirejs.paths), {
	//	require : '@frdl/requirejs', 
	//	requirejs : '@frdl/requirejs', 
	//	define : 'amdefine',   
	    process: '@frdl/process', 
        vm: '@frdl/vm',
		fs : '@frdl/fs',
		
		//	Webfan : '@frdl/webfan',
		
		
		
	//  	frdl : WebfanConfig.hps.scriptengine.webpack.main,
			//    process: '@frdl/process', 
            //    vm: '@frdl/vm',
		    //    url : 'url',
		     //   path : 'path',
		     //   fs : '@frdl/fs',
		
		      //    'angular-frdl' : require.resolve('angular-frdl'),
		    //    loadPlain : 'webfan/loadPlain',
		   //     'jQuery' : 'webfan/frdl-jQuery',
		      //   frdl : './../index.js'
		     //   Webfan : '@frdl/webfan'
      })
};

//console.log(reqConf);
function optimize(content){
  return content;	
}



var entry = {};
entry[WebfanConfig.hps.scriptengine.webpack.main] =  __ASSETS__ +  __ENTRY__ ;	
WebfanConfig.hps.scriptengine.webpack.automaticNameDelimiter = '~';

var r = yield new Promise(function(resolve, reject){	
	
process.chdir(__dirname);
	
webpack([
  {
//	baseUrl : Webfan.hps.scriptengine.requirejs.baseUrl,  
//	context: __dirname,  
	 //mode : 'none', 
	 mode : 'production', 
	// !no mode : 'development', 
	//amd: {
	//	
	//},
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
//	__filename: "mock",
//	__dirname: "mock"//,
	 __filename:  "mock",
	 __dirname: "mock",		
	 setImmediate:  true
   },	   
 optimization : {
	namedModules: true, 
	namedChunks: true,
      runtimeChunk:false,
      splitChunks: {
           // chunks: 'all',
           //  maxInitialRequests: Infinity,
           //  minSize: 0,
      chunks: 'async',
      minSize: 0,
		  
      maxSize: Infinity,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: 1,
      automaticNameDelimiter: WebfanConfig.hps.scriptengine.webpack.automaticNameDelimiter,			 
	   /*
               name(module) {
				   
				 
                    // get the name. E.g. node_modules/packageName/not/this/part.js
                    // or node_modules/packageName
				    //  var p = module.context.match(/[\/]node_modules|(.*?)[\/](.*?)([\/]|$)/);
				    var p = module.context.split(/[\/]node_modules[\/]/);
				   //  console.log(p);
				   
                     const packageName =p[1] || p[0];
                   //  console.log(packageName);
				   
                      // npm package names are URL-safe, but some servers don't like @ symbols
                     var n = `${packageName.replace('@', '')}`;
				   
				   return n;
                 },		  
		 
      cacheGroups: {
         vendor: {
               test: /node_modules/,
               name(module) {
				   
				 
                    // get the name. E.g. node_modules/packageName/not/this/part.js
                    // or node_modules/packageName
				    //  var p = module.context.match(/[\/]node_modules|(.*?)[\/](.*?)([\/]|$)/);
				    var p = module.context.split(/[\/]node_modules[\/]/);
				   //  console.log(p);
				   
                     const packageName =p[1] || p[0];
                   //  console.log(packageName);
				   
                      // npm package names are URL-safe, but some servers don't like @ symbols
                     var n = `${packageName.replace('@', '')}`;
				   
				   return n;
                 },
             reuseExistingChunk: true
             },
        default: {
          name(module) {
				   
				 
                    // get the name. E.g. node_modules/packageName/not/this/part.js
                    // or node_modules/packageName
				    //  var p = module.context.match(/[\/]node_modules|(.*?)[\/](.*?)([\/]|$)/);
				    var p = module.context.split(/[\/]node_modules[\/]/);
				   //  console.log(p);
				   
                     const packageName =p[1] || p[0];
                   //  console.log(packageName);
				   
                      // npm package names are URL-safe, but some servers don't like @ symbols
                     var n = `${packageName.replace('@', '')}`;
				   
				   return n;
                 },
		  maxSize: 1000000,	
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
	 */ 
  }	
},
  
	output: { 
		
		path: O.path,
		publicPath: WebfanConfig.hps.scriptengine.webpack.__PUBLIC_PATH__,
		chunkFilename: '[name].[hash].bundle.js',
		 filename: '[name].[hash].bundle-webpack.js',
		//filename: WebfanConfig.hps.scriptengine.webpack.main + '.' + pkg.version + '.js',
	//	filename: WebfanConfig.hps.scriptengine.webpack.main + '.js',
	  //  library: '[name].[hash]',
		library: WebfanConfig.hps.scriptengine.webpack.main,
		
	    // libraryTarget: "umd",
	   libraryTarget: "umd2",
	  //  libraryTarget: "amd",
        umdNamedDefine: true,
		 globalObject: 'this',
		
		
		devtoolModuleFilenameTemplate: info => {     
				// return `webpack:///${info.resourcePath}?${info.loaders}`;
				 return `webpack:///${info.namespace}/${info.id}?${info.loaders}`;
		}
	},
	  /* 
 externals:[
	
        webpackRequireHttp.custom({
            rules:{
                '^#bin\/(.+)':'https://js.frdl.de/$1',
				'^#cdn\:\/\/(.+)':'https://domainundhomepagespeicher.webfan.de/cdn/application/webfan/node_modules/$1'
            }
        })
		
    ],	  
	  */
 resolve: {
	 
	
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [

		
      "node_modules",
      "assets/node_modules",
      './node_modules',
   //  path.resolve(__dirname, '.'),		
	  path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "assets"),
      path.resolve(__dirname, "assets/node_modules"),
	//  path.resolve(__dirname, "ws-configs/")
	
	  path.resolve(__dirname, "bin"),	
		
		
	 path.resolve(__dirname, "node_modules"),
   //   path.resolve(__PROJECT_DIR__, '.'),		
	  path.resolve(__PROJECT_DIR__, "node_modules"),
      path.resolve(__PROJECT_DIR__, "assets"),
      path.resolve(__PROJECT_DIR__, "assets/node_modules"),
		
	  WebfanConfig.hps.scriptengine.requirejs.baseUrl	
    ],
	 alias :  O.alias,
	 extensions: ['.js'] // File types
},
module: {
    noParse: /requirejs/,  //|betafcc\/is
    rules: [
	 /* 
	 {
         test: require.resolve('./assets/test.js'),
         use: 'imports-loader?this=>window'
       },	
		
       {
        test:  require.resolve('@frdl/requirejs'),
        use: [
          {
            loader: `script-loader`
          }
        ]
      },
	
		 {
         test: [require.resolve('@frdl/requirejs')].join('|'),
         use: 'expose-loader?$'
       }, 
	   
       {
         test: require.resolve('./index.js'),
         use: 'expose-loader?frdl'
       }, 		
			 */ 	   
	  	
       {
         test:require.resolve('jquery'),
         use: 'expose-loader?global.$'
       }, 
	  		
  //     {
   ///      test:/requirejs/,
    //     use: 'expose-loader?__requirejs__loaded_module__'
    //   }, 
		
      {
         test: require.resolve('@frdl/process'),
         use: 'expose-loader?process'
       }, 			
	  /* 	
         {
         test:/angular/,
         use: 'expose-loader?angular'
       },   
		*/
		{
			
      test: /(\.js)$/,
   //   exclude: /(node_modules|bower_components)/,
	//  exclude: /(assets)/,		
	  exclude : new RegExp('^(' + preg_quote(__ENTRY__) +')|(index)|(betafcc\/is)|(patch\-require)|^co$'),		
      use: [{
        // babel-loader to convert ES6 code to ES5 + amdCleaning requirejs code into simple JS code, taking care of modules to load as desired
        loader: 'babel-loader',
        options: {
			
          presets: [
					  '@babel/preset-env',
			        //   require('babel-preset-es2015')
			         // 'es2015',
			        //   require('babel-preset-es2015')
				   ],
          plugins: [ 
			    "@babel/plugin-syntax-dynamic-import",
			 //    ["@babel/plugin-transform-runtime", {                         
              //                 "regenerator": false
               //    }], 
			 // "transform-runtime", 	
			  //  "@babel/runtime",
			  //  "@babel/plugin-transform-runtime",
            //  "@babel/plugin-transform-async-to-generator",
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
	 
	 new webpack.BannerPlugin({
		 banner:'  frdl.js @frdl/frdl ',	
		 raw :false, 
		 entryOnly :true
	 }),	 
	 
	 
	 
       new WebpackShellPlugin({
          onBuildStart: [
			  
			                   CP+' -rf '+__dirname+'/assets/. '+__PROJECT_DIR__+'/assets/', 
			          //         'rm -rf ' + __DIST__ +'/frdl-legacy-component.'+ WebfanConfig.hps.scriptengine.hash +'.js'
						],
		  onBuildEnd : [
								     //     CP+' -rf '+__PROJECT_DIR__+'/assets/logo.jpg ' + __DIST__ +'/logo.jpg',
									 //  CP+' -rf '+__PROJECT_DIR__+'/assets/. ' + __DIST__ +''	  
          ],
          onBuildExit: (__PROJECT_DIR__ === __dirname && 'root' === process.env.USER) 
		                            ? [ 

									  ] 
		                            : [
									
								   	  //   CP+' -rf '+__PROJECT_DIR__+'/assets/frdl-legacy.js ' + __DIST__ +'/frdl-legacy.js',
				  CP+' -rf '+__PROJECT_DIR__+'/assets/frdl-legacy-app.'+ config.hps.scriptengine.hash +'.js ' + __DIST__ +'/frdl-legacy-app.'+ WebfanConfig.hps.scriptengine.hash +'.js',
										
										
				  CP+' -rf '+__dirname+'/assets/frdl-legacy-component.js ' + __DIST__ +'/frdl-legacy-component.'+ WebfanConfig.hps.scriptengine.hash +'.js',
										
										//WebfanConfig.hps.scriptengine.webpack.main + '.' + pkg.version + '.js',
										
//CP+' -rf '+__DIST__+'/'+ WebfanConfig.hps.scriptengine.webpack.main + WebfanConfig.hps.scriptengine.webpack.automaticNameDelimiter + '* '
//										+__DIST__+'/'+ WebfanConfig.hps.scriptengine.webpack.main + '.' + pkg.version + '.js ',
										
//CP+' -rf '+__DIST__+'/'+ WebfanConfig.hps.scriptengine.webpack.main + WebfanConfig.hps.scriptengine.webpack.automaticNameDelimiter + '* '
//										+__DIST__+'/'+ WebfanConfig.hps.scriptengine.webpack.main + '.js ',
										
						  CP+' -rf '+__dirname+'/assets/home.view.html ' + __DIST__ +'/home.view.html',	
									],
		   safe: true
      }),	 
	 
	
	 
       
	 
        new SaveRemoteFilePlugin([
          //  {
          //      url: __PROTOCOL__+'//'+__HOST__+'/app.js',
         //       filepath: 'app.legacy.js',
         //   },
			
             {
                 url: __PROTOCOL__+'//'+__HOST__+'/logo.jpg',
                 filepath: 'logo.jpg',
             },			
        ]),
	 
	 /*
	new CopyWebpackPlugin([
		



      {
        from: path.resolve(__PROJECT_DIR__, 'assets')+'',
        to:O.path,
        transform(content, path) {
			//console.log('path', path);
		//	console.log('content', content);
            return Promise.resolve(optimize(content));
        },
        cache: false,
	    transformPath(targetPath, absolutePath) {		
		//	console.log('targetPath', targetPath);
		//	console.log('absolutePath', absolutePath);
		// if(!/(\.js)/.test(	targetPath))return targetPath;
          //return targetPath.replace(/(assets\/)/, '/');
			 return targetPath;
        }
      },

    ]),
	*/

      
	 new WebfanInjectConfigPlugin(WebfanConfig.hps.scriptengine.webpack.main, WebfanConfig, configWebfanLoader ),
		
	 new HtmlWebpackPlugin({
		  inject : 'head',
		  filename: 'index.html',
		  entry: 'index.html',
		  template:__ASSETS__ + 'index.html' ,
		  title : pwaManifest.name,
		  hash_hps : WebfanConfig.hps.scriptengine.hash
		  //favicon :   'favicon.ico'//,
		//  logo : 'logo.[hash].jpg',
	  }), 
	 	
	 
		 
	 new HtmlWebpackPlugin(
	  {
		  inject : 'head',
		  filename: 'webfan.html',
		  entry: 'webfan.html',
		  template:__ASSETS__ + 'webfan.html' ,
		  title : pwaManifest.name,
		  hash_hps : WebfanConfig.hps.scriptengine.hash
		  //favicon :   'favicon.ico'//,
		//  logo : 'logo.[hash].jpg',
	  }), 
	 
	 
	 
	 
	 new HtmlWebpackPlugin(
	  {
		  inject : 'head',
		  filename: 'blank.html',
		  entry: 'blank.html',
		  template:__ASSETS__ + 'blank.html' ,
		  title : pwaManifest.name,
		  hash_hps : WebfanConfig.hps.scriptengine.hash
		  //favicon :   'favicon.ico'//,
		//  logo : 'logo.[hash].jpg',
	  }), 
	 
	 
		 
      new webpack.ProvidePlugin(sanitize(WebfanConfig.hps.scriptengine.requirejs.shim)),
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

  new WebpackPwaManifest(extend(pwaManifest,{
    name: pwaManifest.name,
    short_name: pwaManifest.short_name,
    description: pwaManifest.description,
    background_color: '#ffffff',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src:__ASSETS__ + 'favicon.ico',
        sizes: [16, 32, 96] // multiple sizes
      },
      {
        src: __ASSETS__ +'icon128.png',
        sizes: [128, 192, 256, 384, 512, 1024] // you can also use the specifications pattern
      },
      {
        src: __ASSETS__ +'logo.jpg',
        sizes: ['364x68'] // you can also use the specifications pattern
      }
    ]
  })),	 
	 
      new requirejsPlugin({
            path: O.path,
           filename: WebfanConfig.hps.scriptengine.webpack.__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
		  // filename: __CONFIG__ + '.[hash].bundle.js',
          baseUrl : Webfan.hps.scriptengine.requirejs.baseUrl,
		   //   baseUrl : '',
            pathUrl : '',
            processOutput: function (assets) {
				assets = extend(sanitize(WebfanConfig.hps.scriptengine.requirejs), assets);
				assets.paths = extend(O.alias, assets.paths);
			//	delete assets.paths.main;
			//	delete assets.map;
                var code = '(function(){require.config(' + JSON.stringify(assets) + ');}());'
				  //console.log("requirejs configuration set done");
				//    + "define('Webfan', function(){return require('@frdl/webfan');});"
				//   + "define('frdl', function(){	return  {}; });"
				  + __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_1__
				
                   + '\n'
				   + __CONFIG_MAIN_NEXT_BUNDLE_CONTENT_2__
				;
				  //    + 'exports=module.exports=' + JSON.stringify(assets) + ';'
				
				
				var result = UglifyJS.minify(code,  { 
					toplevel: false,   
					compress: {       
						global_defs: {    
			                   //"@console.log": "alert"      
						}//,      
					//	passes: 2   
					},   
					output: {   
						beautify: false,     
						preamble: "/* fuglyfied */"   
					}
				});
				
				code = result.code;
				return code;
            }
        }),	 		  
	   //new webpack.NamedModulesPlugin(),
	 
		  
		   new webpack.ExtendedAPIPlugin(),
		  
	 // new NodeSecurityPlugin(),
	 
			
		//	 new webpack.HashedModuleIdsPlugin(),
	/*
               new NpmInstallPlugin({
                  // Use --save or --save-dev
                 dev: function(module, path) {
                     return Objext.keys(pkg.devDependencies).indexOf(module) !== -1;
                  },
                // Install missing peerDependencies
               peerDependencies: false,
                 // Reduce amount of console logging
               quiet: false,
               // npm command used inside company, yarn is not supported yet
                npm: 'npm'
              }),

         new DynamicCdnWebpackPlugin({
                resolver: () => new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                           var: 'config',
                            name: 'config',
                            url: './config.js',
                            version: ''
                        });
                    }, 200);
                })
       })	 
	   ,
*/
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

	
//	console.log('done webpack');
//	console.log('stats', Object.keys(r)); 
//	console.log('stats', Object.keys(r.stats)); 
	
	//process.exit(0);
	return r;
}, __ENTRY__,
__MAIN__,   
__HOST__,
__DIST__,
__PUBLIC_PATH__,
__ASSETS__, 
__PROJECT_DIR__,
__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__,
__PROTOCOL__).then(function(r){
	process.chdir(__PROJECT_DIR__);
	console.log(r.hash);
	process.exit(0);
}).catch(function(e){
	process.chdir(__PROJECT_DIR__);
	console.error(e);
});	
	
	
};