'use strict';



//require("./../stubs/node-browser-shim");
//WebfanConfig.hps.scriptengine.webpack.main
//require("@frdl/node-browser-shim")(undefined);


//console.log('MAIN', MAIN);	
//console.log('module.name', module.name);
/*
var debug = require('debug');



//debug.enable(module.name);


//debug.enable('*');
//debug.disable('*');
debug.disable();
//var Console = debug(module.name + ':*');
var Console = debug('*' + ':' + '*');
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

//console = 
	global.console = Console;

 //if ('undefined' === typeof define) define = global.define =  require('amdefine');		
//var Webfan = require('@frdl/webfan');
 // exports = module.exports = global.Webfan;



//  require( '@frdl/requirejs'); 
 // global.require=requirejs;
 // // require.ensure(['./config.js'], function(c){
  //    requirejs.config(c);	
  //    console.log(c);	
 //  });


// var config = require( __HOST__ + '.json');
// Webfan.config(config);

//console.log(require);
//console.log(require('@frdl/requirejs'));
*/
var Webfan = require('@frdl/webfan');	
const MAIN = Webfan.hps.scriptengine.webpack.main;
var main = exports = module.exports =  Webfan.setup(MAIN, {}, {}/* global */, Webfan.hps.scriptengine.frdlweb.version);

var frdl
//= global.frdl
= require('@frdl/functions');	
 //= Webfan.setup("frdl" , require('@frdl/functions'),{}/* global */, Webfan.hps.scriptengine.frdlweb.version);



/*
	Object.defineProperty(global, 'frdl', {
		           get : function(){
					  console.warn('global.frdl will maybe deprecated later..., require(\'frdl\') or require(\'main\').frdl instead!');   
					 return frdl;	                                    
				   }
	});
*/
	Object.defineProperty(main, 'frdl', {
		           get : function(){
					  return frdl;	               															  
				   }
	});	


Webfan .hps.scriptengine.webpack.chunkname= __webpack_chunkname__;	
Webfan .hps.scriptengine.webpack.hash = __webpack_hash__;
var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = Webfan.hps.scriptengine.webpack.__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;
const configEvent = 'after.'+__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;


global.process =  require('@frdl/process');
 

			
 require('@frdl/requirejs');


frdl.browser = global.requirejs.isBrowser;
frdl.worker = ('undefined' !== typeof self && 'function' === typeof self.importScripts) ? true : false;


frdl.debug = {
   mode : function(m){
         if('undefined'!==typeof m){
           process.env.DEBUG =m;
         }
        return process.env.DEBUG;
  }
 };		


frdl.time= function(){
	return (new Date()).getTime();
};


	Object.defineProperty(global, 'Webfan', {
		           get : function(){
					   console.warn('global.Webfan will maybe deprecated later..., require(\'@frdl/webfan\') instead!');
					  return Webfan;																	  
				   }
	});



	Object.defineProperty(main, 'Webfan', {
		           get : function(){
					  return Webfan;																	  
				   }
	});

	Object.defineProperty(main, 'vm', {
		           get : function(){
					  return require('@frdl/vm');																  
				   }
	});






	Object.defineProperty(frdl, 'ready', {
		           get : function(){
					  return  process.ready;																	  
				   }
	});		
		
	Object.defineProperty(frdl, 'addReadyCheck', {
		           get : function(){
					  return  process.addReadyCheck;																	  
				   }
	});	

  


	
require('patch-require')(main, frdl, global);



   





frdl.ready.readyMain = process.required([
	'ready:angular',
	configEvent
], function(states){
	
	process.emit('ready:main', states);
	
},  frdl.ready/*, false*/);		


frdl.ready.uiReadyToLoadDependencies = process.required(['ready:main', 
														 'ready:inline-worker' 
														//, 'ready:JsonRpcClient'
														// , 'ready:webcomponents'
														//  , 'ready:idle'
														], function(states){	
	process.emit('ready:main.full.async', states);
	console.log('frdl.ready.uiReadyToLoadDependencies.$trigger');	
},  frdl.ready/*, false*/);							
			


frdl.ready.patchLegacyReady = process.required(['ready:main'
												//, 'ready:webcomponents'
												, 'ready:idle'
											   ], function(states){
  
	  import('patch-deprecated').then(function(patch){
          patch.default(main, frdl,global);
	  });		
	
		console.log('frdl.ready.patchLegacyReady.$trigger');	
},  frdl.ready/*, false*/);		



process.once('ready:main', function(s){	
 console.log('frdl '+ Webfan.hps.scriptengine.frdlweb.version);	
});							
						












	Object.defineProperty(frdl, 'state', {
		           get : function(){
					   console.warn('frdl.state will maybe deprecated later...,use "?"   instead!');
					  return global.require.state;															  
				   }
	});

	Object.defineProperty(frdl, 'fs', {
		           get : function(){
					   console.warn('frdl.fs will maybe deprecated later...,use require(\'@frdl/fs\') or require(\'fs\')  instead!');
					  return require('@frdl/fs');															  
				   }
	});
 




	Object.defineProperty(frdl, 'require', {
		           get : function(){
					   console.warn('frdl.require will maybe deprecated later..., use require or requirejs or require.__webpack_require__ instead!');
					  return global.require;															  
				   }
	});

	Object.defineProperty(frdl, 'a', {
		           get : function(){
					   console.warn('frdl.a will maybe deprecated later..., use require(\'angular-frdl\') or require(\'angular\')  instead!!');
					   return  main.angular;	
				   }
	});
/**/
	Object.defineProperty(frdl, 'watchFor', {
		           get : function(){
					  return require('watchFor');																  
				   }
	});
    


	Object.defineProperty(frdl, 'alert', {
		           get : function(){
					  return require('frdlalert');																  
				   }
	});

     






						
						
						
									   

/*

process.once(configEvent, function(Webfan){

 global.require(['JsonRpcClient'], function(JsonRpcClient){

	 frdl.rpc = new JsonRpcClient(
		          (
			        ((Webfan.defined('Webfan.hps.scriptengine.server.ssl') && 1==Webfan.hps.scriptengine.server.ssl) ? 'https:' : location.protocol) 
				 + '//' 
				 + ((Webfan.defined('Webfan.hps.scriptengine.server.host')) ? Webfan.hps.scriptengine.server.host : location.host) 
				 + ((!Webfan.defined('Webfan.hps.rpc.server.url') ) ? '/software-center/modules-api/rpc/0.0.1/' :  Webfan.hps.rpc.server.url)
				),
		       frdl.WebfanReadCookie('json_rpc_user_name'),
		       false,
		       frdl.WebfanReadCookie('json_rpc_user_dh1'),
		      'POST',
		       (Webfan.defined('Webfan.hps.scriptengine.server.ssl') && 1==Webfan.hps.scriptengine.server.ssl) ? 'https:' : location.protocol // 'http:'
		 );	
  
	process.emit('ready:JsonRpcClient', frdl.rpc);
 });	

//	console.log('frdl '+ Webfan.hps.scriptengine.frdlweb.version);
});
//require('https://domainundhomepagespeicher.webfan.de/cdn/application/webfan/node_modules/'); 
*/






 global.jQuery = require('jquery');	
 global.$ = require('jquery');	
     	


 process.once(configEvent, function(Webfan){
	 /*
  Object.defineProperty(global.require.s.contexts._.defined, 'jquery', {
		           get : function(){
					   return global.jQuery; 
				   }
    
  });		 
  Object.defineProperty(global.require.s.contexts._.defined, 'webfan/frdl-jQuery', {
		           get : function(){
					   return global.jQuery; 
				   }
    
  });	
  */
	global.require.s.contexts._.defined['jquery'] = global.jQuery; 
	 
    global.require(['idle'], function(idle){
	    global.jQuery.fn.idle = idle;
		process.emit('ready:idle', global.jQuery.fn.idle);
    });   
 });

/*
 process.once(configEvent, function(Webfan){
      import('patch-deprecated').then(function(patch){
            patch.default.apply(global,[main, frdl]);
	  });	
 });

  process.once(configEvent, function(Webfan){
	 var WebComponents = require('@webcomponents/webcomponentsjs');
	  console.log('WebComponents', WebComponents);
      (require('patch-deprecated')).apply(global,[main, frdl,global]);
  });
*/




  process.once(configEvent, function(Webfan){
  	 require('@frdl/helper')(frdl)
			 .then(function(yes){
						
						global.require(['inline-worker'], function(InlineWorker){
						      frdl.InlineWorker = function(func, varsObject) {
								    /* return new InlineWorker(frdl.templater(func, varsObject), global); */
								
							 	 var FunctionName = frdl.Reflector.getFunctionName( func );
                                 var FunctionBody = frdl.Reflector.getFunctionBody( func );
                                 var FunctionParameters = frdl.Reflector.getFunctionParameters( func );
                                 var func =
									 'function ' + FunctionName + '(' + FunctionParameters.join(',') + ')'
                                           +   '{'
                                           +      frdl.strpp(FunctionBody, varsObject)
                                           + '}';
								  return new InlineWorker(func, global);								 
							  };
							
							
	                          process.emit('ready:inline-worker', frdl.InlineWorker);
						});
                            					   
	           });
  });





  global.require([__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__], function(){
	 process.emit(configEvent, Webfan );
  });






importAngularJs();


function importAngularJs()    {
   import('angular-frdl').then(function(AngularJs){
	    var angular = AngularJs.default; 
	   
	   /*
     	Object.defineProperty(main, 'angular', {
		           get : function(){
					   return angular; 
				   }
    	});
		*/
	   main.angular = angular;
	   
		// global.define('angular-frdl', function(){
		//	 global.angular;
		// });
	process.once('ready:main', function(states){  
		
		global.require.s.contexts._.defined['angular']
		global.require.s.contexts._.defined['angularjs'] =
		global.require.s.contexts._.defined['angular-frdl'] =
		  = main.angular;
		/*
		  //global.require.s.contexts._.defined[name]
     	Object.defineProperty(global.require.s.contexts._.defined, 'angular', {
		           get : function(){
					   return angular; 
				   }
    	});		  

     	Object.defineProperty(global.require.s.contexts._.defined, 'angularjs', {
		           get : function(){
					   return angular; 
				   }
    	});		
		  
     	Object.defineProperty(global.require.s.contexts._.defined, 'angular-frdl', {
		           get : function(){
					   return angular; 
				   }
    	});	
		*/  	
		
	});	  
	 
	   console.log('main.angular', main.angular);
	   
		 process.emit('ready:angular', main.angular);
		// process.emit('before.angularBootstrap', main.angular.modules);
  });	
	
}


// import('@webcomponents/webcomponentsjs').then(function(){
//		  process.emit('ready:webcomponents', customElements);
 //});	



