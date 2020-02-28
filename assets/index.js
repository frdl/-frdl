'use strict';

 if ('undefined' === typeof ((window || self).global)) {
	 try{
       ((new Function("return self || this"))())['global'] = (new Function("return self || this"))();
	 }catch(e){
		  (window || self).global = (new Function("return self || this"))();
	 }

	 
  }

if ('undefined' === typeof  global.self) {
	 //patch filer.js
     global.self = global;	 
}


 if ('undefined' === typeof document || 'undefined' === typeof window) {
    require("@frdl/node-browser-shim")((new Function("return self || this"))());
 }

  
const NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/;
const NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;


var deferBootstrapWindowName = function(clear){
	if('undefined'!==typeof global.intent || 'undefined'===typeof window){
		return;
	}
	var winName = window.name;
    window.name= ('undefined'!==typeof clear && true === clear)
	                 ? winName.replace(NG_DEFER_BOOTSTRAP, '')
		             : 'NG_DEFER_BOOTSTRAP!'+winName.replace(NG_DEFER_BOOTSTRAP, '')
	;
};

deferBootstrapWindowName();

/*
 process = global.process = require('@frdl/process'); //process is undefined
*/
var process = global.process = require('@frdl/process');

//document.querySelector('html').setAttribute('ng-csp', 'no-inline-style;no-unsafe-eval');  
//document.querySelector('html').setAttribute('ng-non-bindable', 'non-bindable');


var MAX_DEPRECATION_WARNINGS = 1;
var Webfan = require('@frdl/webfan');	
const MAIN = Webfan.hps.scriptengine.webpack.main;
var main = exports = module.exports =  Webfan.setup(MAIN, {}, {}/* global */, Webfan.hps.scriptengine.frdlweb.version);
var is = require('@betafcc/is');  



var frdl = require('@frdl/functions');






Webfan.hps.scriptengine.webpack.chunkname= __webpack_chunkname__;	
Webfan.hps.scriptengine.webpack.hash = __webpack_hash__;
//require.__webpack_require__.p || Webfan .hps.scriptengine.webpack.__PUBLIC_PATH__
var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = Webfan .hps.scriptengine.webpack.__PUBLIC_PATH__ + Webfan.hps.scriptengine.webpack.__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;
const configEvent = 'after.'+__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;

const ev_ready_requirejs = 'ready:requirejs';
const ev_ready_main = 'ready:main';
const ev_ready_jquery = 'ready:jquery';
const ev_ready_jquery_lazy = 'ready:jquery-lazy';
const ev_ready_idle = 'ready:idle';
const ev_ready_buffer = 'ready:buffer';
const ev_ready_inline_worker = 'ready:inline-worker';
const ev_ready_frdl_helper = 'ready:frdl:helper';
const ev_defined_jquery = 'defined:jquery';
const ev_ready_dom_query_old = 'ready:dom-query-old';
const ev_ready_angularjs_root = 'ready:angularjs:root';
const ev_ready_fs = 'ready:fs';
const ev_ready_fs_defined = 'ready:fs:defined';
const ev_ready_start = 'ready:start';

const ev_ready_deps = 'frdl.ready.deps';
//'frdl.ready.deps'





		


process.addReadyCheck(function(){
	return 'undefined' !== typeof global.require && 'undefined' !== typeof global.require.main;
});


process.once(ev_ready_requirejs, function(s){	

	if('undefined'!==typeof global.require.main){	
        console.warn('require.main is already set (try to overwrite module `' + MAIN	+ '` as `require.main`)');	
	}

	global.require.main = ('undefined' === typeof global.require.main) 
		 ? main
	     : frdl.extend( global.require.main, main);	
});							
			

/*
process.required([
	               ev_ready_requirejs,
	               configEvent,
				 ], function(){	
	 var states = Array.prototype.slice.call(arguments);
	     global.require.s.contexts._.defined['frdl'] =('undefined' === typeof global.frdl) 
	                                                    ? global.require.main.frdl
	                                                    : global.frdl;
},  frdl.ready);
*/



function start(process, main, global){
	
(function(loadJQUery, loadRequireJs){
	
	
  loadRequireJs();	
	
 if('undefined'!==typeof global.jQuery && 'undefined'!==typeof global.$ && global.$ === global.jQuery){
   process.emit(ev_ready_jquery, true);
 }else{
   loadJQUery();
 }

	process.emit(ev_ready_start, true);
	

	
	 

}(function(){
        import('jquery')
	       .then(function(jquery){
	           global.jQuery = global.$  = jquery.default;
	           process.emit(ev_ready_jquery);
       });		
},
 function(){
  import('patch-require')
	  .then(function(patch){
          patch.default(main, main.frdl, global);
	      process.emit(ev_ready_requirejs);
  });	
}));

	
}//function start()






(function(){
var oLog = console.log;
	
var d = function(m){
	var c = m || sessionStorage.getItem('frdl.debug.mode');
	try{
		 if(!isNaN(c)){
			return c; 
		 }
		
         return parseInt(c);
	}catch(e){
			try{        
				return JSON.parse(c);	
			}catch(e){	
				return c;	
			}
	}
};

frdl.debug = {
   mode : function(m){
         if('undefined'!==typeof m){
           process.env.DEBUG =m;
         }
	   
		 if(isNaN(process.env.DEBUG)){
			process.env.DEBUG = d(process.env.DEBUG); 
		 }	   
	   
	    if(process.env.DEBUG <=0){
			 console.log=function(){};	
		}else{
		     console.log=oLog;		
		}
	   
        return process.env.DEBUG;
  },
  default :	(sessionStorage && d() ) 
		      ? d()
		      : 'EXPERIMENTAL' === Webfan.hps.context.STAGE || /iphone/i.test(navigator.userAgent)
			
 };		

/*	
 if(!frdl.debug.default){
    console.log=function(){};		 
 }else{
	 frdl.debug.mode(frdl.debug.default);
 }
*/
 frdl.debug.mode(frdl.debug.default);


frdl.time= function(){
	return (new Date()).getTime();
};
}());



	



(function(){
var i;
	
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

	Object.defineProperty(frdl, 'guid', {
		           get : function(){
					            i++;
					 			 var t = frdl.explode('.', frdl.microtime() .toString() );				   
		                    	 var id =  frdl.dechex( parseInt(t[0]) )
							    +'-'
						        +   frdl.dechex( parseInt(t[1]) )	   
							   +'-'   
							   + frdl.dechex( frdl.mt_rand() )
						       + '-'
						       + i.toString() 
					  ;				   
			             return frdl.str_replace('.', '-', id);																  
				   }
	});	
	
	
	

	
	Object.defineProperty(frdl, 'is', {
		           get : function(){
					  return is;																  
				   }
	});	
	
 
	


	Object.defineProperty(frdl, 'slice', {
		           get : function(){
					  return require('sliced');																  
				   }
	});

  

	Object.defineProperty(frdl, 'context', {
		           get : function(){
					  return require('async-context');															  
				   }
	});   		
	


 
require('@frdl/sort');
}());




(function(){
 var i = 0;	
	/*
	Object.defineProperty(global, 'Webfan', {
		           get : function(){
					   if(i<MAX_DEPRECATION_WARNINGS){
						   console.warn('global.Webfan will maybe deprecated later..., require(\'@frdl/webfan\') instead!');
					   i++;
					   }
					  return Webfan;																	  
				   }
	});

*/

	Object.defineProperty(main, 'Webfan', {
		           get : function(){
					  return Webfan;																	  
				   }
	});
	
	Object.defineProperty(main, 'frdl', {
		           get : function(){
					  return frdl;	               															  
				   }
	});			
	
}());


(function(){
	Object.defineProperty(main, 'vm', {
		           get : function(){
					  return require('@frdl/vm');																  
				   }
	});
}());







  


	
frdl.ready.readyMain = process.required([
	ev_ready_requirejs,
	configEvent,
], function(){
	 var states = Array.prototype.slice.call(arguments);
	process.emit(ev_ready_main, states);
	
},  frdl.ready/*, false*/);		





frdl.ready.deps = process.required([	
	                                   ev_ready_requirejs,
	                                    configEvent,
									    ev_ready_main, 
										ev_ready_jquery,
										ev_ready_idle,
									    ev_ready_buffer,
									    ev_ready_inline_worker,
									    ev_ready_frdl_helper,
	                                    ev_ready_jquery_lazy,
	                                    'registerComponent::before',
	                                    'registerComponent::after',
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
  
	process.emit(ev_ready_deps, states);
	
	
},  frdl.ready, false);							
		







process.required([
	configEvent,
	ev_ready_main,
	ev_ready_requirejs,
	ev_defined_jquery,

], function(){
	 var states = Array.prototype.slice.call(arguments);
	
	global.require(['webfan/jquery-addons'], function($){	  
         $.lazy.loadMap( Webfan.hps.scriptengine['lazy-jquery'] );	
		 process.emit(ev_ready_jquery_lazy, states);
    });	 
	
	
	
},  frdl.ready/*, false*/);		








   
process.required([
	                                 configEvent,
	                                 ev_ready_main,
	                                   ev_ready_jquery,
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
  
	     global.require.s.contexts._.defined['jquery'] = global.jQuery;
         global.require.s.contexts._.defined['webfan/frdl-jQuery'] =  global.require.s.contexts._.defined['jQuery'] = global.require.s.contexts._.defined['jquery'];  	 
         process.emit(ev_defined_jquery, global.require.s.contexts._.defined['jquery']);	
 

},  frdl.ready/*, false*/);









process.required([	
	                                 configEvent,
	                                ev_ready_main,
	                                   ev_ready_jquery,
	                                   ev_defined_jquery,
	                                    
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
  
	global.require(['idle'], function(idle){	  
	    global.jQuery.fn.idle = global.$.fn.idle = idle;			
	    process.emit(ev_ready_idle, global.jQuery.fn.idle);	
    });	 

},  frdl.ready/*, false*/);










	







process.required([	
	                               configEvent,
	                                 ev_ready_main,
	                                   ev_ready_jquery,
	                                   ev_defined_jquery,
	                               //   ev_ready_idle, 
										], function(){	
	 var states = Array.prototype.slice.call(arguments);

 global.require(['frdl-dom-query-old'], function(dom){
   
   Object.defineProperty(frdl, '$j', {
 	 get : function(){
	 	return dom.$j;
	 }
			
   });
    
   Object.defineProperty(frdl, 'Dom', {
 	 get : function(){
	 	return dom.Dom;
	 }
			
   });
   
   process.emit(ev_ready_dom_query_old, dom);

 }); 
},  frdl.ready/*, false*/);


			









(function(){
 var i = 0;	

	Object.defineProperty(frdl, 'state', {
		           get : function(){
					   if(i<MAX_DEPRECATION_WARNINGS) {
						   console.warn('frdl.state will maybe deprecated later...,use "?"   instead!');
					   i++;
					   }
					  return global.require.state;															  
				   }
	});
}());	
	








(function(){	
	var _fs = false;
//	if('undefined'===typeof global.FileError && 'undefined' !== typeof global.Error){ 
//		global.FileError = global.Error;
//	}
	
	
	
	  Object.defineProperty(main.frdl, 'fs', {
		           get : function(){
					   if(false === _fs){
						 _fs = frdl.co(function*(){  						    
							 return yield main.Filesystem;
						}).then(function(r){
							 _fs = r;
							 	 _fs.then=function(fn){		 
									 fn(_fs);	
								 };
						 });  
					   }
				      return _fs;  
				   },
		           set : function(myFs){
					   console.warn('You SHOULD not set frdl.fs!');
					   _fs = myFs;
				   }
	   });



		
		Object.defineProperty(main, 'Filesystem', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
					
	                       import('@frdl/fs')	 						
	                      	     .then(function(fs){
									 resolve(fs.default);
								 });						  
					
					  });
				   }
	   });
	
	/*
  process.required([
	configEvent,
	ev_ready_start,	
	ev_ready_requirejs,  
 
  ], function(){	 
			main.Filesystem.then(function(fs){	
				frdl.fs = fs;
	            process.emit(ev_ready_fs_defined, fs);
			}).catch(function(reason){
				frdl.alert.error(reason);
			});		 
		 
  }, frdl.ready, false);
	*/

	
	
	process.required([
	 configEvent,	
	 ev_ready_requirejs, 	
	// ev_ready_fs_defined,	
  ], function(){	
		
 //  global.require.s.contexts._.defined['fs'] = require('@frdl/fs');	
	
		
		 if('undefined'===typeof global.require.s.contexts._.defined.fs){
		   Object.defineProperty(global.require.s.contexts._.defined, 'fs', {
		           get : function(){
					  return frdl.fs;															  
				   }
	        });	 
			 
		 }else{
	//		global.require.s.contexts._.defined.fs = frdl.fs; 
		 }
		 
		 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/fs']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/fs', {
		           get : function(){
					  return frdl.fs;															  
				   }
	        });	 
			 
		 }else{
		//	global.require.s.contexts._.defined['@frdl/fs'] = frdl.fs; 
		 }			
 
		
			
		if('undefined'===typeof global.require.s.contexts._.defined.filer){
		   Object.defineProperty(global.require.s.contexts._.defined, 'filer', {
		           get : function(){
					//  return require('filer.js');	
					    return require('patch-filer');	
				   }
	        });	 
			 
		 }else{
		//	global.require.s.contexts._.defined.filer = require('filer.js'); 
			// global.require.s.contexts._.defined.filer = require('patch-filer'); 
		 }     
		
		   	
	      process.emit(ev_ready_fs, true);
		
   },  main.frdl.ready, false);
	
	

	

}());	









(function(){
 var i = 0;	

	  
	
	 	
	


	
	 process.once(configEvent, function(Webfan){	 	 
		 
		 
		 
		 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/webfan']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/webfan', {
		           get : function(){
					  return Webfan;															  
				   }
	        });	 
			 
		 }else{
		//	global.require.s.contexts._.defined['@frdl/webfan'] = Webfan; 
		 }
		 
		 
		 
		 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/eventemitter']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/eventemitter', {
		           get : function(){
					  return require('@frdl/eventemitter');															  
				   }
	        });	 
			 
		 }else{
			global.require.s.contexts._.defined['@frdl/eventemitter'] = require('@frdl/eventemitter'); 
		 }
		 
		 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/functions']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/functions', {
		           get : function(){
					  return frdl;															  
				   }
	        });	 
			 
		 }else{
			global.require.s.contexts._.defined['@frdl/functions'] = frdl; 
		 }
		 
		 
		 
		 
	 });
}());	 



(function(){
 var i = 0;	
	Object.defineProperty(frdl, 'require', {
		           get : function(){
					  if(i<MAX_DEPRECATION_WARNINGS) {
						  console.warn('frdl.require will maybe deprecated later..., use require or requirejs or require.__webpack_require__ instead!');
					    i++;
					  }
					  return global.require;															  
				   }
	});
}());


(function(){
	Object.defineProperty(frdl, 'watchFor', {
		           get : function(){
					  return require('watchFor');															  
				   }
	});
}());














	Object.defineProperty(frdl, 'bootAngularJs', {
		           get : function(){
					  return  function($element, modules, config, clear){
						 var o=0, r;
					     return frdl.co(function*($element, modules, config){	
						   yield new Promise(function(resolve, reject){	 
					          global.require(['angular-frdl'], function(angular){  
	                              angular.element(document).ready(function () { 	
	                               
						    	      angular.element(function() {
										 
										 if(clear && !!clear){ 
										    $($element).data('$injector', ""); 
										 }
										  
                                            deferBootstrapWindowName(true);
										  
		  
										  try{  
	                                        r = angular.bootstrap($element, modules, config);
									     }catch(e){
												 // reject('Cannot AngularJs Bootstrap ' + modules.join(','));
												 // return;
										 	  }
										  
										  var stopper = 1;
										  while('undefined'===typeof r && o<stopper 
												&& !$element.hasAttribute('ng-scope')
												&& ('undefined'===typeof $element.injector || !$element.injector())
											   ){
											o++;
											  try{
												  r = angular.bootstrap($element, modules, config);		
												//  resolve(r);
												//  return;
											  }catch(e){
												 //reject('Cannot AngularJs Bootstrap ' + modules.join(','));
												  console.warn('Cannot AngularJs Bootstrap ' + modules.join(',') + '\n' + e);
												  r = false;
												  break;
											  }
										  } 
										  
										  resolve(r);
	                                    
										
	                                  });  
						          });  
						   
						       });  
					      	 }).then(function(res){							  										
							     return res;
						      });	 
						     
						      return r;
						  }, $element, modules, config);
					  };															  
				   }
	});






 process.once(configEvent, function(Webfan){  	
	 if('undefined' === typeof Webfan.hps.scriptengine.angularjs.rootSelector){				
		 Webfan.hps.scriptengine.angularjs.rootSelector = 'body';  			
	 }
 });	



(function(main){
  process.required([
	  'registerComponent::after',
	  ev_ready_angularjs_root
  ], function(){	  
		process.ready(function(){ 			 
			if(null === document.querySelector('[ng-flows], [ng-flow], [ng-app], app-root') ){           
			   main.app.boot(Webfan.hps.scriptengine.angularjs.rootSelector);			
			}
		});
   },  main.frdl.ready, false); 
}(main));




(function(main){
	'use strict';
	
var Instances = {};	
main.frdl.registerComponent=registerComponent;
	
//frdl.debug.default=true;
	

	
process.required([	
	                                  ev_ready_main,
									    ev_ready_frdl_helper,
	                                   ev_ready_angularjs_root,
	                                    ev_ready_jquery,
	                                    ev_defined_jquery, 
	                                       ev_ready_dom_query_old,
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
	
//process.ready(function(){	
  process.emit('registerComponent::before', Instances);			
    main.frdl.each(main.Webfan.hps.scriptengine.frdlweb.components, registerComponent);
  process.emit('registerComponent::after', Instances);	
  	
//});	
	
	
	
 },  main.frdl.ready, false);
	
	

	


function registerComponent($i, component){	
	
	if(null===$i || 'undefined'===typeof $i){
	   $i = Object.keys(Instances).length;	
	}
	
	 if(!!main.frdl.debug.default){	 
		 console.log('Register component: ', component);
	 }
	 main.frdl.watchFor(component.selector)
        .every(function(element){
		  
		/*    				
		 var i = 0; 	 
		 for(i=0;i<component.load.length;i++){
			 (function(myI, i){
			   var indexC = i;
			   var indexI = myI;	 
		       main.frdl.addReadyCheck(function(){
				    return 'undefined'!==typeof  Instances[indexC][indexI];
			   });
			 }(i, $i));
		 }
		 */
		      if('undefined'===typeof Instances[$i]){
				 Instances[$i] = {component:component,element:element};  
			  }
		     if(!!main.frdl.debug.default) console.log('Invoke component: ', {component:component,element:element});
		       main.frdl.co(function*($i, component, element){
				  var i = 0; 
				  for(i=0;i<component.load.length;i++){
					  var load = component.load[i];
					  yield new Promise(function(resolve,reject){
					
						     if(load.once && !!load.once && 'undefined'!==typeof Instances[$i][i]){
								 resolve(Instances[$i][i]);
								 return;
							 }
						  
						 if('undefined'===typeof Instances[$i][i]){
						    Instances[$i][i]=function(){
								return Instances[$i][i];
							};
						 } 	
						     switch(load.type){
						    	 case 'html-url' :
								 case 'append-url' :	 
								 case 'prepend-url' :	 
									 main.frdl.dl(main.frdl.templater(load.load, main), {	
											 callback : function (e, r) {           
												 if(e){
													 reject(e);
                                                 }else{		
													 global.require('jquery')(element)[load.type.split(/\-/)[0]](r.data || r);
													 resolve([]);			
												 } 	
											 },	
											 always : function(){	
	 
											 } 	
										 });
									 break;	
								 case 'html' :
								 case 'append' :
								 case 'prepend' :										 
									   global.require('jquery')(element)[load.type](main.frdl.templater(load.load, main));
									   resolve([]);
									 break;
								 case 'bootstrap-angular-js' : 
								 case 'ba' :
								 case 'ba1' :
									 var l = [];											
															
									 if('string'===typeof load.load){					
										 load.load = [load.load]; 				
									 } 
									 main.frdl.each(load.load, function(x, m){
										//if('string'===typeof m){
											l.push(main.frdl.templater(m, main)); 
											//l.push(m); 
										//}
									 }); 
									
						             main.frdl.bootAngularJs(element, l, {}, (load.clear && !!load.clear)).then(function(r){
										  resolve(r);
									 }).catch(function(e){
										reject(e); 
									 });
									
									 break;
								 case 'amd' : 
								 case 'amd-callback' : 
				                     
									 if('string'===typeof load.load){					
										 load.load = [load.load]; 				
									 }
				
									
									 var l = [];
									 main.frdl.each(load.load, function(x, m){
										l.push(main.frdl.templater(m, main)); 
									 });
									 			
									 global.require(l, function(){						
										 var modules = Array.prototype.slice.call(arguments);					
										 var Module = modules[modules.length-1];						
										 if('amd-callback' === load.type && 'function' === typeof Module){					
											 Module.apply(element, [element, main]);						
										 }				
										 resolve(modules);
										  if(!!main.frdl.debug.default) console.log('Resolved component amd-modules: ', load.load);
									 });									 
								 break;
									 
								 case 'script' :
									 main.frdl.getScript(main.frdl.templater(load.load, main), function(element, main){
										 resolve([]);
										 if(!!main.frdl.debug.default) console.log('Resolved component script: ', load.load);
									 }, true, false, [element, main]);
								  break;
									 
								 case 'css' :
								 case 'style' :
								 case 'styles' :
								 case 'stylesheet' :
								 case 'stylesheets' :
								 case 'css-link' :
								 case 'css-import' :
												 
									 if('string'===typeof load.load){					
										 load.load = [load.load]; 				
									 }
													
									 var l = [], scriptsEmitter = new (require('@frdl/eventemitter')); 
								     var scriptsState = scriptsEmitter.required(['@url_rewrite', '@scripts_fired'], function(r){
                                           resolve([]);
                                     },  scriptsEmitter/*, false*/);	
									 
									 main.frdl.each(load.load, function(x, m){
										   var url = main.frdl.templater(m, main);
										   l.push(url); 
										   scriptsState.add(url);  
									 });								 
									 scriptsEmitter.emit('@url_rewrite', l);
														
									 main.frdl.each(l, function(x, url){
										    if('css-import' === load.type){
												main.frdl.cssImportLink(url).then(function(r){
													scriptsEmitter.emit(url, true);
												});
											}else{
												main.frdl.getCSS(url, 
																 ('undefined'===typeof load.once || !!load.once) 
																 ? document.querySelector('head') 
																 : element, 
																 ('undefined'===typeof load.once || !!load.once));
												scriptsEmitter.emit(url, true);
											}
									 });	
									 scriptsEmitter.emit('@scripts_fired', l);
									 
									 
									 
								   break;
									 

								 case 'directive' : 
								 case 'component' :
									 
									 				
									 if('string'===typeof load.load){					
										 load.load = [load.load]; 				
									 }
                                     
										
									 var l = ['angular-frdl'];
									 main.frdl.each(load.load, function(x, m){
										l.push(main.frdl.templater(m, main)); 
									 });
									 
									 global.require(l, function(){						
										 var modules = Array.prototype.slice.call(arguments);					
										 var Module = modules[modules.length-1];	
										 var Name = main.frdl.dashToCamel(component.selector);
										 
										 
																			 
										  //   main.app.removeCloak();
										 
										 
										 
		                                 var compile = function(scope){		
											 /*   
											  var $injector = modules[0].injector(['ng',// 'mockApp',
																				   main.app.root.name]);	
											   var $compile = $injector.get("$compile");
											   $compile(element)(scope);  
											   scope.$digest();
											 */
										 modules[0].element(document).ready(function(){
											 
											// modules[0].element(document.querySelector(Webfan.hps.scriptengine.angularjs.rootSelector))
											
											    //  .injector()
											   // .injector(modules[0].modules)
											//  .injector([])
											 modules[0].element(document.querySelectorAll(main.Webfan.hps.scriptengine.angularjs.rootSelector))
												.injector().invoke([ '$compile', function($compile) {
                                          
												     $(element).data('$injector', ""); 
												     var e = document.createElement('div');
												     e.innerHTML = element.innerHTML; 
												 
												     $compile(e)(scope);  
												     $(element).html($(e).html());												     
											    	 scope.$digest();
													/*
												     $compile(e)($rootScope);  
												     $(element).html($(e).html());												     
											    	 $rootScope.$digest();		
												  */
												 
                                               }]);
											 });//angular.element(document).ready
										 };
										 
										 main.app.root[load.type].apply(null,[Name,Module]);  
										 try{
										//    var scope = modules[0].element(element.parentNode).scope();		
											   var scope = modules[0].element(element).scope();		
										 }catch(e){
											 var scope = false;
										 }

	
								            if(true === main.app.isBooted && scope){
												 compile(scope);
											     resolve(modules); 
											}else{
												 resolve(modules); 
											}
										 
										 
											
										 
										     if(!!main.frdl.debug.default) console.log('Resolved component '+load.type+': ', load.load);
								
									 });								 

									 break;
									 
							 }
						  
						 
					  }).then(function(loaded){
			                   if(!!main.frdl.debug.default) console.log('Resolved component load definition [#'+(i + 1).toString()+']: ', loaded);
						       Instances[$i][i]=loaded;
			          });
				  }
				 
				   return Instances[$i];
			  }, $i, component, element).then(function(Component){
				//   require('@frdl/webfan').hps.scriptengine.frdlweb.components[$i]._modules = ComponentMerging;
			       if(!!main.frdl.debug.default) console.log('Ready component: ', Component);
			   });
		 
		 
		 
		 

		 
		    
	 });
}
}(main));



(function(main){
	'use strict';
	
  var _isBooted = false;
	
	
	Object.defineProperty(main, 'angular', {
		           get : function(){
					  return false;	                                    
				   }	        
	});
	
	
	
   process.required([
      configEvent,
      ev_ready_frdl_helper
   ], function(){	
	   
 									 main.frdl.each(Webfan.hps.scriptengine.angularjs.mainRequire, function(i, dependency){
										 Webfan.hps.scriptengine.angularjs.mainRequire[i] = main.frdl.templater(dependency, main);
									 });
	   
	   
        global.require(Webfan.hps.scriptengine.angularjs.mainRequire, function(url, angular){
			
			//angular.bootstrap($element, modules, config);
			 main.frdl.MagicHelper.addMethodCallback(angular, 'bootstrap', false, function($element, modules, config){
				process.emit('angularjs:bootstrap', {
					   element : $element,
					   modules : modules,
					   config : config
				});
			}, angular);
			
			
	       var mockApp = angular._module('mockApp', []).provider({
  
	         	$rootElement:function() {    
		          	this.$get = function() {
                       return angular.element(document.querySelector('html'));  
			        }; 
	         	}

	        });		
			var $injector= angular.injector(['ng','mockApp']);
            var $location = $injector.get("$location");
			
			
			
						   
						   
						   
angular.module('oc.lazyLoad')
 .config([ '$ocLazyLoadProvider',
  function(  $ocLazyLoadProvider) {	  
	  								 
									 main.frdl.each(Webfan.hps.scriptengine.lazy, function(x, m){
										 main.frdl.each(Webfan.hps.scriptengine.lazy[x].files, function(i, f){											 
											  Webfan.hps.scriptengine.lazy[x].files[i] = main.frdl.templater(f, main);
										 });
									 });
	  

     $ocLazyLoadProvider.config({
        jsLoader: global.require,
        debug: true,
		events : true,            
        serie: false,			
        cache: true,
        rerun: false,
        reconfig: false ,                                            
        modules: Webfan.hps.scriptengine.lazy
    });	  

}]);						   
						   
						   
						   
						   
						   
						   
			main.module('app', function(plug, req){
				
				 									
				                      main.frdl.each(Webfan.hps.scriptengine.angularjs.mainInject, function(i, dependency){
										 Webfan.hps.scriptengine.angularjs.mainInject[i] = main.frdl.templater(dependency, main);
									 });
				
				plug.extend({
					 root : angular.module(MAIN, Webfan.hps.scriptengine.angularjs.mainInject),
					 angular : false,
					 removeCloak : function(){		
					   process.ready(function(){
					    setTimeout(function(){	 
					     process.nextTick(function(){
						     $('[ng-cloak], .ng-cloak')			
					          .removeAttr('ng-cloak')		
					          .removeClass('ng-cloak')	
				    	    ;		
						 });
						},2500);
					   });		 
				     }
				});
			});
			
		       
			  Object.defineProperty(main.app, 'angularjs', {
		           get : function(){
					  return angular;	                                    
				   }
	          });
					
			
			
			 Object.defineProperty(main.app, 'isBooted', {
		           get : function(){
					  return _isBooted;	                                    
				   }
	          });		
			
			main.module('app', function(plug, req){
				plug.extend({
					  boot : function(selector){
					      if(!!_isBooted){
							  return;
						  }
						  _isBooted = true;
						  global.require(global.require('@frdl/webfan').hps.scriptengine.webpack.main).frdl.registerComponent(null, {			
							  selector : selector,			
							  load :[ 			
								  {				    
									  type : 'bootstrap-angular-js',				
									  load :	[plug.root.name]			
								  }		
							  ]	
						  });	  
						  
					  }
					
					
				});
			});		
			
			
	main.module('app', function(plug, req){			
	
		plug.root.filter('base64_decode', function() { 		
			return function(x) {    
              return main.frdl.base64_decode(x);       
			};	
		});
		
	
		plug.root.filter('base64_encode', function() { 		
			return function(x) {    
              return main.frdl.base64_encode(x);       
			};	
		});
		
  		plug.root.filter('base64', function() { 		
			return function(x) {    
              return main.frdl.base64_encode(x);       
			};	
		});
		
	});

   
			
			
  main.module('app', function(plug, req){			
	
  plug.root.service('XFrdlRequestNegotiationInterceptor', ['$rootScope', '$injector', function($rootScope, $injector) {
        var service = this;
        service.request = function(config) {
			
                var state = $injector.get('$state') || plug.toState;

		    	if(state && 'undefined' !== typeof state.data && 'undefined' !== typeof state.data.xFrdlGetView){
					config.headers['X-Frdl-Request-Negotiation'] = state.data.xFrdlGetView;
				}else if(state && state.current && 'undefined' !== typeof state.current.data && 'undefined' !== typeof state.current.data.xFrdlGetView){
					config.headers['X-Frdl-Request-Negotiation'] = state.current.data.xFrdlGetView;
				}else{								    
					var u1 = url.parse(window.location.href);			
					var u2 = url.parse(config.url);
					if(u1.host===u2.host || null === u2.host){	
					   config.headers['X-Frdl-Request-Negotiation'] = 'centerView';
					}
				}
	
			
			
            return config;
        };
	  
	  
	  
        service.responseError = function(response) {
            if (response.status !== 200 && response.status !== 201) {
                $rootScope.$broadcast('HttpResponse:'+response.status.toString());
            }
            return response;
        };
	  
	   return service;
    }])  
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('XFrdlRequestNegotiationInterceptor');
    }])
	
	 .config(['$templateRequestProvider', function($templateRequestProvider) {    
		  $templateRequestProvider.httpOptions({     
			  headers: {
				  'X-Frdl-Request-Negotiation' : 'centerView' 
			  }   
		  });
	  }])
	  
	 .run( ['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams; 		   
      }])
		
    .run(['$rootScope', '$location', '$state', '$stateParams', '$timeout', function ($rootScope, $location, $state, $stateParams, $timeout) {

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){ 
           // alert("root change success");
			          if(toState && 'undefined' !== typeof toState.data && 'undefined' !== typeof toState.data.meta){
						  var meta = toState.data.meta;
						   $timeout(function () {
                                   if(meta.title){
							         document.title = meta.title;
						           }
                                   if(meta.description){
							         document.description = meta.description;
						           }
                           });
						 
					  }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
          //  alert("root change start");
			//console.log('toState', toState);
			//console.log('options', options);
			
			plug.toState  = toState;
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
          //  alert("root change error");
			  global.require.main.frdl.alert.error(error);
        });
    }])		
 ;
	  
 });
	
			
  main.module('app', function(plug, req){	
	  
    plug.root.config(['$stateProvider', function($stateProvider) {
       plug.$stateProvider = $stateProvider;
/*
		Object.defineProperty(plug, 'stateProvider', {
		           get : function(){
					  return $stateProvider;																  
				   }
		});		
	*/	
		 plug.addState = function(name, state) { 
             $stateProvider.state(name, state);
        };
    }])		
	.run( ['$rootScope', function ($rootScope) {
		     plug.$rootScope = $rootScope;
      }])
	 ;
	  
  });
			

			
			process.emit(ev_ready_angularjs_root, angular);				
        });	   
   },  main.frdl.ready, false);
}(main));




 process.once(configEvent, function(){	

	Object.defineProperty(frdl, 'alert', {
		           get : function(){
					  return require('frdlalert');																  
				   }
	});

  

	Object.defineProperty(frdl, 'idle', {
		           get : function(){
					  return require('on-idle');															  
				   }
	});  
	 
	 
	Object.defineProperty(frdl, 'version_compare', {
		           get : function(){
					  return require('locutus/php/info/version_compare');																  
				   }
	});	 
	 
});



   function download(){
	 var Args = Array.prototype.slice.call(arguments);	
	  if('undefined'===typeof Args[1])Args[1] = {
	     method : 'GET'
	  };
	 var r;
	   
	 r = frdl.co(function*(args){   
	    r =  yield frdl.co(function*(a){ 
	   
	   var p = yield new Promise(function(resolve, reject){	  
	      import('@frdl/simple-downloader')	 						
		     .then(function(downloadModule){
				downloadModule.default(a[0], {	  
					callback : function (e, res) {          
						if(e){			
							reject(e);			
						}else{		
							resolve(res.data || res);			
						} 	
					},
	
					always : function(){		
						'function' === typeof a[1].always && a[1].always(r);	 
					} 
	             });
		   });		   
	   }).then(function(res){
		   p = res; 
		   'function' === typeof a[1].callback && a[1].callback(null,res);
		   return res;
	   }).catch(function(e){
		   p = false;  
		   'function' === typeof a[1].callback && a[1].callback(e);
	   });
		  
        while(p instanceof Promise){
		  p = r = yield p;	
		}		  

	      return p;
	  }, args)
		 ;
		 
		 
	  
	   return r;		 
	 }, Args); 
	   
		 
	   return r;
   }



	Object.defineProperty(frdl, 'download', {
		           get : function(){
					  return download;															  
				   }
	});  

	Object.defineProperty(frdl, 'dl', {
		           get : function(){
					  return download;															  
				   }
	});  


	Object.defineProperty(main, 'downloader', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('@frdl/simple-downloader')	 						
	                      	     .then(function(downloader){
									 resolve(downloader.default);
								 });						  
					  });
				   }
	});  



	Object.defineProperty(main, 'axios', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('axios')	 						
	                      	     .then(function(axios){
									 resolve(axios.default);
								 });						  
					  });
				   }
	});  


	Object.defineProperty(main, 'jszip', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('jszip')	 						
	                      	     .then(function(ZipArchive){
									 resolve(ZipArchive.default);
								 });						  
					  });
				   }
	});  

	Object.defineProperty(main, 'uglify', {
		           get : function(){
					 return new Promise(function(resolve, reject){	    
					      global.require(['uglify'], function(UglifyJS){		 
									 resolve(UglifyJS);
	    			      });
					 });   
				   }
	});  

	Object.defineProperty(main, 'phpParser', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('php-parser')	 						
	                      	     .then(function(engine){
									 resolve(engine.default);
								 });						  
					  });
				   }
	});  

	Object.defineProperty(main, 'phpFunctions', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('locutus/php/info')	 						
	                      	     .then(function(php){
									 resolve(php.default);
								 });						  
					  });
				   }
	});
	/**/
// global.jQuery = require('jquery');	
// global.$ = global.jQuery;	
     	





//  frdl.ready.deps.add('ready:inline-worker');	
  process.once(configEvent, function(Webfan){
  	 require('@frdl/helper')(frdl)
			 .then(function(yes){
					process.emit(ev_ready_frdl_helper, frdl);
		 
						global.require(['inline-worker'], function(InlineWorker){
						      frdl.InlineWorker = function(func, varsObject) {

								
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
							
							
							  process.emit(ev_ready_inline_worker, frdl.InlineWorker);
						
							
	                        
						});
                            					   
	           });
  });



              (function(frdl){
                            function WORKER_ENABLED() {
                                return !!(global === global.window && global.URL && global.Blob && global.Worker);
                            }
 
                            function InlineWorker(func, self, varsObject) {
                                var _this = this;
                                var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
                                self = self || global;
								
								var tplVars = varsObject || global;
								functionBody = (function(templateString, templateVars){                     
									return new Function("return `"+templateString +"`;").call(templateVars);                    
								}(functionBody, tplVars));
									
                                if (WORKER_ENABLED()) {
                                    return new global.Worker(global.URL.createObjectURL(new global.Blob([functionBody], {
                                        type: "text/javascript"
                                    })));
                                }

								throw new Error('Worker ist not enabled!');
								
                                function postMessage(data) {
                                    process.nextTick(function() {
                                        _this.onmessage(JSON.stringify({
                                            data: data
                                        }));
                                    });
                                }
                                this.self = self;
                                this.self.postMessage = postMessage;
                                process.nextTick(function() {func.bind(self, self); });
                            }
                            InlineWorker.prototype.postMessage = function postMessage(data) {
                                var _this = this;
                               process.nextTick(function() {
                                    _this.self.onmessage(JSON.stringify({
                                        data: data
                                    }));
                                });
                            };
    
                            frdl.InlineWorker0 = InlineWorker;  
				          
			  }(frdl));	


 
// frdl.ready.deps.add('ready:buffer');	
 process.once(configEvent, function(Webfan){
  global.require(['buffer'], function(Buffer){
	 global.Buffer = Buffer;
	 process.emit(ev_ready_buffer, Buffer);	  
  });	
 });	







process.required([	
	                                  ev_ready_requirejs,
	                    
										], function(){		
	// var states = Array.prototype.slice.call(arguments);
	
  global.require(Webfan.hps.scriptengine.webpack.main)
   .frdl
   .getScript(__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__, function(){
	   process.emit(configEvent, Webfan );
   }, true, false);
	
	
 },  main.frdl.ready, false);









start(process, main, global);
