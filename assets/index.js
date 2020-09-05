
'use strict';

var MAX_DEPRECATION_WARNINGS = 1;
var main = exports = module.exports = require('frdl-library-main')(__webpack_chunkname__);
//global.process = main.process;
var Webfan = main.Webfan;
var MAIN = main.Webfan.hps.scriptengine.webpack.main;
module.name = MAIN;
var emitter =  main.emitter;

var frdl = main.frdl; 
var oLog = false;

var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = main.Webfan.hps.scriptengine.webpack.__PUBLIC_PATH__ + main.Webfan.hps.scriptengine.webpack.__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;
main.Webfan.hps.scriptengine.frdlweb.configfile = [];
var configEventDeprecated = 'after.'+__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;

main.Webfan.hps.scriptengine.webpack.chunkname= __webpack_chunkname__;	
main.Webfan.hps.scriptengine.webpack.hash = __webpack_hash__;

main.Webfan.hps.scriptengine.server.origin =( (1 == main.Webfan.hps.scriptengine.server.ssl)
     ? 'https://'
     : 'http://'
  ) +  main.Webfan.hps.scriptengine.server.host;	

var configEvent = 'after.config';
var ev_ready_requirejs = 'ready:requirejs';
var ev_ready_main = 'ready:main';
var ev_ready_jquery = 'ready:jquery';
var ev_ready_jquery_lazy = 'ready:jquery-lazy';
var ev_ready_idle = 'ready:idle';
var ev_ready_buffer = 'ready:buffer';
var ev_ready_inline_worker = 'ready:inline-worker';
var ev_ready_frdl_helper = 'ready:frdl:helper';
var ev_defined_jquery = 'defined:jquery';
var ev_ready_dom_query_old = 'ready:dom-query-old';
var ev_ready_angularjs_root = 'ready:angularjs:root';
var ev_ready_fs = 'ready:fs';
var ev_ready_fs_defined = 'ready:fs:defined';
var ev_ready_start = 'ready:start';
var ev_ready_alertify = 'ready:alertify';
var ev_ready_watchfor = 'ready:watchfor';
var ev_ready_co = 'ready:co';
var ev_ready_symbol_modules = 'ready:mainModules:symboled';	
var ev_ready_deps = 'frdl.ready.deps';
var ev_ready_include_downloader = 'ready:includes:downloader';
var ev_ready_include_lazy_members = 'ready:includes:lazy.members';
var NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO\!/;
var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP\!/;

	
main.frdl.sort = require('@frdl/sort');
main.frdl.is = require('@frdl/var-typing')();

function debugInfoWindowName(clear){
	if('undefined'!==typeof global.intent || 'undefined'===typeof window){
		return;
	}
	var winName = window.name;
    window.name= 'NG_ENABLE_DEBUG_INFO!' + winName.replace(NG_ENABLE_DEBUG_INFO, '');
}
function deferBootstrapWindowName(clear){
	if('undefined'!==typeof global.intent || 'undefined'===typeof window){
		return;
	}
	var winName = window.name;
    window.name= ('undefined'!==typeof clear && true === clear)
	                 ? winName.replace(NG_DEFER_BOOTSTRAP, '')
		             : 'NG_DEFER_BOOTSTRAP!'+winName.replace(NG_DEFER_BOOTSTRAP, '')
	;
}
main.debugInfoWindowName = debugInfoWindowName;
main.deferBootstrapWindowName = deferBootstrapWindowName;
main.deferBootstrapWindowName(false);

main.process.addReadyCheck(function(){
  return 'undefined' !== typeof global && 'undefined' !== typeof global.require && 'undefined' !== typeof global.require.main;
});
main.process.addReadyCheck(function(){
  return 'complete' === global.document.readyState;
});
main.process.addReadyCheck(function(){
  return main.frdl.ready && main.frdl.ready.readyMain && main.frdl.ready.readyMain.stateReady();
});


var d = function(m){
	var c = m || sessionStorage.getItem('frdl.debug.mode');
	if('false'===c){
	  c=false;
	  return c;	
	}else if('true'===c){
	  c=true;	
	  return c;	
	}
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



main.frdl.debug = {
   mode : function(m){
         if('undefined'!==typeof m){
           main.process.env.DEBUG =m;
         }
	   
		 if(isNaN(main.process.env.DEBUG)){
			main.process.env.DEBUG = d(main.process.env.DEBUG); 
		 }	   
	  
	   if(false === oLog){
	     oLog = frdl.clone(global.console.log);
	   }
	   
	    if(main.process.env.DEBUG <=0){
			 global.console.log=(function(){});	
		}else if(main.process.env.DEBUG > 0){
		     global.console.log=oLog.bind(global.console);		
		}
	   
	    if('undefined'===typeof global.console.notice){
		   global.console.notice=global.console.warn;	
		}
	   
        return main.process.env.DEBUG;
  },
  default :	(sessionStorage && d() ) 
		      ? d()
		      : 'EXPERIMENTAL' === main.Webfan.hps.context.STAGE || /iphone/i.test(navigator.userAgent)
			
 };		

	if('frdl'=== main.process.shim){   
		main.frdl.debug.mode(main.frdl.debug.default);
	}
   	


main.frdl.time= function(){
	return (new Date()).getTime();
};






		   Object.defineProperty(global, Symbol.for('Webfan'), {
		           get : function(){
					  return main.Webfan;															  
				   }
	        });	 

		   Object.defineProperty(global, Symbol.for('frdl'), {
		           get : function(){
					  return main.frdl;															  
				   }
	        });	 

		   Object.defineProperty(global, Symbol.for('frdlweb'), {
		           get : function(){
					  return main;															  
				   }
	        });	 
		   Object.defineProperty(global.process, Symbol.for('Webfan'), {
		           get : function(){
					  return main.Webfan;															  
				   }
	        });	

		   Object.defineProperty(global.process, Symbol.for('frdl'), {
		           get : function(){
					  return main.frdl;															  
				   }
	        });	 

		   Object.defineProperty(global.process, Symbol.for('frdlweb'), {
		           get : function(){
					  return main;															  
				   }
	        });	 


	Object.defineProperty(main.frdl, 'ready', {
		           get : function(){
					  return  emitter.ready;																	  
				   }
	});		
		
	Object.defineProperty(main.frdl, 'addReadyCheck', {
		           get : function(){
					  return  emitter.addReadyCheck;																	  
				   }
	});	



emitter.on(configEvent, function(Webfan){
  emitter.emit(configEventDeprecated, Webfan);
});


emitter.once(ev_ready_requirejs, function(s){	

	if('undefined'!==typeof global.require.main){	
        console.warn('require.main is already set (try to overwrite module `' + MAIN	+ '` as `require.main`)');	
	}

	global.require.main = ('undefined' === typeof global.require.main) 
		 ? main
	     : main.frdl.extend( global.require.main, main);	
	
	
	
  (function(){
     var i = 0;	

	Object.defineProperty(main.frdl, 'state', {
		           get : function(){
					   if(i<MAX_DEPRECATION_WARNINGS) {
						   console.warn('frdl.state will maybe deprecated later...,use "?"   instead!');
					   i++;
					   }
					  return global.require.state;															  
				   }
	});
  }());	
});							
			




   
function WORKER_ENABLED(){
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
									
									var objectUrl = global.URL.createObjectURL(new global.Blob([functionBody], {
                                        type: "text/javascript"
                                    }))
									
									var arbeiter = new global.Worker(objectUrl);
									main.process.nextTick(function(){
									  global.URL.revokeObjectURL(objectUrl);
									});									
									return arbeiter;
                                }

								throw new Error('Worker ist not enabled!');
								
                                function postMessage(data) {
                                    main.process.nextTick(function() {
                                        _this.onmessage(JSON.stringify({
                                            data: data
                                        }));
                                    });
                                }
                                this.self = self;
                                this.self.postMessage = postMessage;
                                main.process.nextTick(function() {func.bind(self, self); });
                            }
                            InlineWorker.prototype.postMessage = function postMessage(data) {
                                var _this = this;
                               main.process.nextTick(function() {
                                    _this.self.onmessage(JSON.stringify({
                                        data: data
                                    }));
                                });
                          
							};                         
main.frdl.InlineWorker0 = InlineWorker;  


function getRequireRemoteModulePromiseFunction(module){
  return new Promise(function(resolve, reject){	
	 global.require(['requireRemoteModulePromise'], function(requireRemoteModulePromise){		
		 requireRemoteModulePromise(module).then(function(r){		
			 resolve(r);	
		 }).catch(function(e){		
			 reject(e);	
		 });	
	 });
  });	
}
	
main.requireRemoteModulePromise = function(module){
  if('undefined'!==typeof main.frdl.ready && 'undefined'!==typeof main.frdl.ready.readyMain && true === main.frdl.ready.readyMain.stateReady(configEvent) ){	
     return getRequireRemoteModulePromiseFunction(module);
  }else{
	    return new Promise(function(resolve, reject){	
			emitter.once(configEvent, function(){
				getRequireRemoteModulePromiseFunction(module).then(function(r){				
					resolve(r);			
				}).catch(function(e){			
					reject(e);			
				});
			});
	    });	
  }
};
		

main.process.required([
	               ev_ready_alertify
				 ], function(){	

 (global || window || self).onerror = function (msg, url, lineNo, columnNo, error) {
  var str = msg.toLowerCase();
  var substring = "script error";
  if (str.indexOf(substring) > -1){
   // require(Symbol.for('frdl')).alert.alert('Script Error: See Browser Console for Detail');
    var msg = 'Script Error: See Browser Console for Detail';
    var msg2 = 'Script Error: See Browser Console for Detail';
  } else {
    var message = [
    //  'Message: <error>' + msg + '</error>',
      '<error>' + msg + '</error>',
      'URL: ' + url,
      'Line: ' + lineNo,
      'Column: ' + columnNo,
      'Error object: ' + JSON.stringify(error)
    ];

   // require(Symbol.for('frdl')).alert. alert(message);
    // var msg = (new require.main.frdl.$j('body')).renderJSON(message);
     var msg = '<h3 class="text-danger">Error on '+(global || window).location.host+'</h3>' + message.join("<br />");
     var msg2 = {title:'An error occoured on the page '+(global || window).location.host,
                      //message:'<pre>' + message.join("\n") + '</pre>'
                    message: message.join("\n") 
               };
  }

  main.frdl.alert.error(msg2);
  if(main.process.env.DEBUG){
	  main.frdl.alert.error(msg);
  }

  return false;
 };	
},  main.frdl.ready);





main.frdl.ready.deps = emitter.required([	
	                                   ev_ready_requirejs,
	                                    configEvent,
									    ev_ready_co, 
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
  
	emitter.emit(ev_ready_deps, states);
	
	
},  main.frdl.ready, false);							
		


emitter.required([
	configEvent,
	ev_ready_requirejs,
	ev_defined_jquery

], function(){
	 var states = Array.prototype.slice.call(arguments);
	
	global.require(['webfan/jquery-addons'], function($){	  
         $.lazy.loadMap( main.Webfan.hps.scriptengine['lazy-jquery'] );	
		 emitter.emit(ev_ready_jquery_lazy, states);
    });	 
	
	
	
},  main.frdl.ready/*, false*/);		


   
emitter.required([
	                                 configEvent,
	                                     ev_ready_jquery
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
  
	     global.require.s.contexts._.defined['jquery'] = global.jQuery;
         global.require.s.contexts._.defined['webfan/frdl-jQuery'] =  global.require.s.contexts._.defined['jQuery'] = global.require.s.contexts._.defined['jquery'];  	 
         emitter.emit(ev_defined_jquery, global.require.s.contexts._.defined['jquery']);	
 

},  main.frdl.ready/*, false*/);



emitter.required([	
	                                 configEvent,
	                                   ev_ready_jquery,
	                                   ev_defined_jquery,
	                                    
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
  
	global.require(['idle'], function(idle){	  
	    global.jQuery.fn.idle = global.$.fn.idle = idle;			
	    emitter.emit(ev_ready_idle, global.jQuery.fn.idle);	
    });	 

},  main.frdl.ready/*, false*/);


emitter.required([	
	                               configEvent,
	                                   ev_ready_jquery,
	                                   ev_defined_jquery
	                               //   ev_ready_idle, 
										], function(){	
	 var states = Array.prototype.slice.call(arguments);

 global.require(['frdl-dom-query-old'], function(dom){
   
   Object.defineProperty(main.frdl, '$j', {
 	 get : function(){
	 	return dom.$j;
	 }
			
   });
    
   Object.defineProperty(main.frdl, 'Dom', {
 	 get : function(){
	 	return dom.Dom;
	 }
			
   });
   
   emitter.emit(ev_ready_dom_query_old, dom);

 }); 
},  main.frdl.ready/*, false*/);




	emitter.required([
	 configEvent,	
	 ev_ready_requirejs,
	 ev_ready_co
  ], function(){		
		
	var _fs = false;
	var _bfs = false;
	var _Filesystem = false;	
	
	 function getFilesystem(){
		return import('@frdl/fs');
	 }
		

	  Object.defineProperty(main.frdl, 'fs', {
		           get : function(){
					   if(false === _fs){
						 _fs = main.frdl.co(function*(){  						    
							 return yield getFilesystem();
						}).then(function(r){
							 _fs = r;
							 	 _fs.then=function(fn){		 
									 fn(_fs);	
								 };
							 	 _fs.ready=function(fn){		 
									 fn(_fs);	
								 };
						 });  
					   }
				      return _fs;  
				   }
	   });


		
		 if('undefined'===typeof global.require.s.contexts._.defined.fs){
		   Object.defineProperty(global.require.s.contexts._.defined, 'fs', {
		           get : function(){
					  return frdl.fs;															  
				   }
	        });	 
			 
		 }
		
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/fs']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/fs', {
		           get : function(){
					  return frdl.fs;															  
				   }
	        });	 
			 
		 }
			
		if('undefined'===typeof global.require.s.contexts._.defined.filer){
		   Object.defineProperty(global.require.s.contexts._.defined, 'filer', {
		           get : function(){
					    return require('patch-filer');	
				   }
	        });	 
			 
		 }  
		 emitter.emit(ev_ready_fs, true);
		
     
		
		
		 
					
		 if('undefined'===typeof global.require.s.contexts._.defined[Symbol.for('frdlweb')]){
		   Object.defineProperty(global.require.s.contexts._.defined, Symbol.for('frdlweb'), {
		           get : function(){
					  return main;															  
				   }
	        });	 
			 
		 }
		
		 if('undefined'===typeof global.require.s.contexts._.defined[Symbol.for('frdl')]){
		   Object.defineProperty(global.require.s.contexts._.defined, Symbol.for('frdl'), {
		           get : function(){
					  return main.frdl;															  
				   }
	        });	 
			 
		 }	
		 emitter.emit(ev_ready_symbol_modules, true);	
},  main.frdl.ready, false);
	


	
 emitter.once(configEvent, function(Webfan){		 
	 main.frdl.each(['frdlweb', 'frdl.js', main.Webfan.hps.scriptengine.webpack.main], function(name){
		 if('undefined'===typeof global.require.s.contexts._.defined[name]){			 
		   Object.defineProperty(global.require.s.contexts._.defined, name, {
		           get : function(){
					  return main;															  
				   }
	        });	 			 
		 }			 
	 });

	 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/webfan']){			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/webfan', {
		           get : function(){
					  return main.Webfan;															  
				   }
	        });	 			 
		 }		 
		 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/eventemitter']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/eventemitter', {
		           get : function(){
					/*  return require('@frdl/eventemitter');	*/	
					   return main.emitter.constructor ;
				   }
	        });	 
			 
		 }	 
		 
		 if('undefined'===typeof global.require.s.contexts._.defined['@frdl/functions']){
			 
		   Object.defineProperty(global.require.s.contexts._.defined, '@frdl/functions', {
		           get : function(){
					  return main.frdl;															  
				   }
	        });	 
			 
		 }		 
	
 });





(function(main){
	'use strict';
	
  var _isBooted = false;
	

	
   main.emitter.required([
	   ev_ready_requirejs, 
       configEvent,
       ev_ready_watchfor,
	   ev_ready_frdl_helper
   ], function(){	
	  
 									 main.frdl.each(main.Webfan.hps.scriptengine.angularjs.mainRequire, function(i, dependency){
										 main.Webfan.hps.scriptengine.angularjs.mainRequire[i] = main.frdl.templater(dependency, main);
									 });

	   
  if('angular-frdl'!==main.Webfan.hps.scriptengine.angularjs.mainRequire[0] && 'angular-frdl'!==main.Webfan.hps.scriptengine.angularjs.mainRequire[1]){
	 main.Webfan.hps.scriptengine.angularjs.mainRequire.splice(main.Webfan.hps.scriptengine.angularjs.mainRequire.indexOf('angular-frdl'),1);  
	 main.Webfan.hps.scriptengine.angularjs.mainRequire.unshift('angular-frdl');
 }
	   
	   
 if('url'!==main.Webfan.hps.scriptengine.angularjs.mainRequire[0]){
	 main.Webfan.hps.scriptengine.angularjs.mainRequire.splice(main.Webfan.hps.scriptengine.angularjs.mainRequire.indexOf('url'),1);   
	 main.Webfan.hps.scriptengine.angularjs.mainRequire.unshift('url');
 }
	   
 global.require(main.Webfan.hps.scriptengine.angularjs.mainRequire, function(url, angular){
			
			

				
	Object.defineProperty(main, 'angular', {
		           get : function(){
					  return false;	                                    
				   }	        
	});
	Object.defineProperty(main, 'angularjs', {
		           get : function(){
					  return angular;	                                    
				   }	        
	});	
	
			
			
			
			//angular.bootstrap($element, modules, config);
			 main.frdl.MagicHelper.addMethodCallback(angular, 'bootstrap', false, function($element, modules, config){
				emitter.emit('angularjs:bootstrap', {
					   element : $element,
					   modules : modules,
					   config : config
				});
			}, angular);
			
			/*
	       var mockApp = angular._module('mockApp', []).provider({
  
	         	$rootElement:function() {    
		          	this.$get = function() {
                       return angular.element(document.querySelector('html'));  
			        }; 
	         	}

	        });		
			var $injector= angular.injector(['ng','mockApp']);
            var $location = $injector.get("$location");
			*/
					   
	/*					   
angular.module('oc.lazyLoad')
 .config([ '$ocLazyLoadProvider',
  function(  $ocLazyLoadProvider) {	  
	  								 
									 main.frdl.each(main.Webfan.hps.scriptengine.lazy, function(x, m){
										 main.frdl.each(main.Webfan.hps.scriptengine.lazy[x].files, function(i, f){											 
											  main.Webfan.hps.scriptengine.lazy[x].files[i] = main.frdl.templater(f, main);
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
        modules: main.Webfan.hps.scriptengine.lazy
    });	  

}]);						   
						   
						 
*/
						   
			main.module('app', function(plug, req){
				
				 						/*			
				                      main.frdl.each(main.Webfan.hps.scriptengine.angularjs.mainInject, function(i, dependency){
										 main.Webfan.hps.scriptengine.angularjs.mainInject[i] = main.frdl.templater(dependency, main);
									 });
				*/
				
				plug.extend({
					 root : angular.module(main.Webfan.hps.scriptengine.webpack.main, main.Webfan.hps.scriptengine.angularjs.mainInject),
					 angular : false,
					 removeCloak : function(){		
					   main.process.ready(function(){
					    setTimeout(function(){	 
					     main.process.nextTick(function(){
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
					
			  Object.defineProperty(main.app, 'angular', {
		           get : function(){
					  return false;	                                    
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
					      if(true===_isBooted){
							  return;
						  }
						  _isBooted = true;
						  
						   main.frdl.registerComponent(null, {			
							  selector : selector,	
							  clear : false, 
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
	  
	
 .config([ '$ocLazyLoadProvider',
  function(  $ocLazyLoadProvider) {	  
	  								 
									 main.frdl.each(main.Webfan.hps.scriptengine.lazy, function(x, m){
										 main.frdl.each(main.Webfan.hps.scriptengine.lazy[x].files, function(i, f){											 
											  main.Webfan.hps.scriptengine.lazy[x].files[i] = main.frdl.templater(f, main);
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
        modules: main.Webfan.hps.scriptengine.lazy
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
			plug.toState  = toState;
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
			  main.frdl.alert.error(error);
        });
    }])		
 ;
	  
 });
	
			
  main.module('app', function(plug, req){	
	  
    plug.root.config(['$stateProvider', function($stateProvider) {
       plug.$stateProvider = $stateProvider;

		 plug.addState = function(name, state) { 
             $stateProvider.state(name, state);
        };
    }])		
	.run( ['$rootScope', function ($rootScope) {
		     plug.$rootScope = $rootScope;
      }])
	 ;
	  
  });
			

			
			main.emitter.emit(ev_ready_angularjs_root, angular);				
        });	   
   },  main.frdl.ready, false);
}(main));
 




emitter.once(ev_ready_co, function(){
		 function getDownloaderGetPromise(){		
			  return new Promise(function(resolve, reject){		
				  import('@frdl/simple-downloader')	 			
					  .then(function(downloader){		
					      resolve(downloader.default);		
				  });		
			  });	
		  }
	
   function download(){
	 var Args = Array.prototype.slice.call(arguments);	
	  if('undefined'===typeof Args[1])Args[1] = {
	     method : 'GET'
	  };
	 var r;
	   
	 r = main.frdl.co(function*(args){   
	    r =  yield main.frdl.co(function*(a){ 
	   
	   var p = yield new Promise(function(resolve, reject){	  
	      main.downloader.then(function(downloadModule){
				downloadModule/*.default*/(a[0], {	  
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

	Object.defineProperty(main.frdl, 'download', {
		           get : function(){
					  return download;															  
				   }
	});  

	Object.defineProperty(main.frdl, 'dl', {
		           get : function(){
					  return download;															  
				   }
	});  
	Object.defineProperty(main, 'downloader', {
		           get : function(){
					  return getDownloaderGetPromise();
				   }
	});  
	
   emitter.emit(ev_ready_include_downloader, true);
});





emitter.required([	
 ev_ready_requirejs,
 ev_ready_include_downloader,	
 ev_ready_watchfor	
], function(){		
	main.frdl.watchFor('html[webfan-hps-config-url]:not([frdl-processed*="webfan-hps-config-url"]),'					   
					   +' html[requirejs-config-url]:not([frdl-processed*="requirejs-config-url"])'					  
					  ).every(function(el){
	var loadDefaultConfig = true, _a =  ' webfan-hps-config-url requirejs-config-url ';
	var a = (el.hasAttribute('frdl-processed')) ? el.getAttribute('frdl-processed') + _a : _a;  
	el.setAttribute('frdl-processed', _a);
	
		
		
	var loadFn = function(attributeName, configProcessor){
		  var configurl = main.frdl.templater(el.getAttribute(attributeName), main),
			  eventName = 'ready:config:url:'+configurl,
			  moRes = false;
		   main.frdl.ready.readyMain.add(eventName);
		
		   main.frdl.dl(configurl, {
			   callback : function (e, r) {  										
				   if(e){										
					   console.error(e);                                          
				   }else{														
					  try{ 
					   var v = r.data || r;
						  var c = JSON.parse(v);
						  moRes = configProcessor(c);
					  }catch(e2){
						console.error(e2); 
					  }
				   } 												
			   },										
			   always : function(){		 
				 emitter.emit(eventName, moRes);						
			   } 											
		});		
	};
		
		if(el.hasAttribute('webfan-hps-config-url')){
			loadFn('webfan-hps-config-url', main.Webfan.config);
		}
		
		if(el.hasAttribute('requirejs-config-url')){
			loadFn('requirejs-config-url', global.require.config);
		}
		
});	
},  main.frdl.ready, false);
	 Object.defineProperty(main.frdl, 'searching', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('searching')	 						
	                      	     .then(function(searching){
									 resolve(searching.default);
								 });						  
					  });
				   }
	});
	 Object.defineProperty(main.frdl, 'finder', {
		           get : function(){
					  return main.frdl.searching;
				   }
	});

	 Object.defineProperty(main.frdl, 'sort', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('@frdl/sort')	 						
	                      	     .then(function(sort){
									 resolve(sort.default);
								 });						  
					  });
				   }
	});

	 Object.defineProperty(main, 'subarg', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('subarg')	 						
	                      	     .then(function(subarg){
									 resolve(subarg.default);
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
	Object.defineProperty(main, 'dnsOverHttps', {
		           get : function(){
					  return new Promise(function(resolve, reject){	 						  
	                       import('dohjs-frdl')	 						
	                      	     .then(function(dohjs){
									 resolve(dohjs.default);
								 });							

					  });
				   }
	});  
	Object.defineProperty(main, 'api', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('@frdl/frdlweb-api-helper')	 						
	                      	     .then(function(apiHelper){
									 resolve(apiHelper.default);
								 });						  
					  });
				   }
	});
	Object.defineProperty(main.frdl, 'queryString', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
	                       import('query-string')	 						
	                      	     .then(function(queryString){
									 resolve(queryString.default);
								 });						  
					  });
				   }
	});

	 //vcards-js : https://github.com/enesser/vCards-js/tree/v2.10.0
	 //'vcf : https://github.com/jhermsmeier/node-vcf#format-vcf
	 	Object.defineProperty(main, 'vcard', {
		           get : function(){
					  return new Promise(function(resolve, reject){	  
						  Promise.all([ 							  
						   new Promise(function(resolveV1, rejectV1){	  
							  import('vcards-js').then(function(vcards){
									 resolveV1(vcards.default);
							   });
						  }),
						   new Promise(function(resolveV2, rejectV2){
								  import('vcf').then(function(vcf){
									 resolveV2(vcf.default);
							   });								  
							})
						  ])
						   .then(function(vcfApis){							      
									 resolve({
									     FileHelper : vcfApis[0],
										 JSONHelper : vcfApis[1]
									 });
							 });						  
					  });
				   }
	});



emitter.once(ev_ready_start, function(){
	
	Object.defineProperty(main.frdl, 'co', {
		           get : function(){					 					     
					  return require('co');	                                    
				   }	        
	});
	emitter.emit(ev_ready_co, true);
	
		
	if('undefined' === typeof Webfan.hps.scriptengine.angularjs.rootSelector){				
		 Webfan.hps.scriptengine.angularjs.rootSelector = 'body:not([frdl-angularjs-bootstrap*="prepared"])';  			
	 }  
	
    global.Buffer = require('buffer/').Buffer;   
    emitter.emit(ev_ready_buffer, global.Buffer);	

   import('webfan/frdlweb-part/include-lazy-main-members')
     .then(function(members){	
	    members.default(main, emitter);
        emitter.emit(ev_ready_include_lazy_members, true);
	    emitter.emit('ready:frdlweb-components', true);
   });	
	
});//once ev_ready_start
	
main.frdl.ready.readyMain = emitter.required([
	ev_ready_requirejs,
	configEvent,
	ev_ready_co, 
	ev_ready_symbol_modules,									   
	ev_ready_inline_worker,								
	ev_ready_frdl_helper,	                                  
	ev_ready_jquery_lazy,								
	ev_ready_idle,							
	ev_ready_buffer,
	ev_ready_include_lazy_members
], function(){
	// var states = Array.prototype.slice.call(arguments);
	  main.emitter.emit(ev_ready_main, true);
},  main.frdl.ready/*, false*/);		



 main.frdl.ready.angularBootDependencies = emitter.required([
	  configEvent,
	  'registerComponent::after',
	  ev_ready_angularjs_root,
	  ev_ready_include_lazy_members,	
	  ev_ready_jquery_lazy,
	 ev_ready_main	
  ], function(){	  
		main.process.ready(function(){ 			 
			if(null === document.querySelector('[ng-flows], [ng-flow], [ng-app], app-root, [frdl-angularjs-bootstrap*="prepared"]') ){           
			   main.app.boot(main.Webfan.hps.scriptengine.angularjs.rootSelector);			
			}
		});
   },  main.frdl.ready, false); 


  main.emitter.required([	 
	  ev_ready_frdl_helper,	      
	  'ready:frdlweb-components',
      ev_ready_co, 
	  ev_ready_include_downloader,
	  ev_ready_include_lazy_members,	  
	  configEvent,
	  ev_ready_angularjs_root,
	  ev_ready_jquery_lazy
  ], function(){	
	// var states = Array.prototype.slice.call(arguments);
		
  main.emitter.emit('registerComponent::before', main.frdl.registerComponentInstances);			
    main.frdl.each(main.Webfan.hps.scriptengine.frdlweb.components, main.frdl.registerComponent);
  main.emitter.emit('registerComponent::after', main.frdl.registerComponentInstances);	
	
 },  main.frdl.ready, false);


emitter.required([	
 ev_ready_requirejs,
 ev_ready_watchfor
], function(){		
	
main.frdl.watchFor('head:not([frdl-processed*="init-config"]').every(function(el){
	var loadDefaultConfig = true, _a =  ' init-config ';
	var a = (el.hasAttribute('frdl-processed')) ? el.getAttribute('frdl-processed') + _a : _a;  
	el.setAttribute('frdl-processed', _a);
	
   if(el.hasAttribute('frdlweb-options')){
		if(false !==main.frdl.strpos(el.getAttribute('frdlweb-options'), '--no-defaults') ){
			loadDefaultConfig = false;
		}
	}	

  if(true === loadDefaultConfig){	
   main.frdl.getScript(__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__, function(){
	   emitter.emit(configEvent, main.Webfan );
   }, true, false);
  }else{
	   emitter.emit(configEvent, false );
  }
	
});	
	
},  main.frdl.ready, false);



(function(main, helper){
 function loadWorker(main, emitter){
	global.require(['inline-worker'], function(InlineWorker){
						      main.frdl.InlineWorker = function(func, varsObject) {								
							 	 var FunctionName = main.frdl.Reflector.getFunctionName( func );
                                 var FunctionBody = main.frdl.Reflector.getFunctionBody( func );
                                 var FunctionParameters = main.frdl.Reflector.getFunctionParameters( func );
                                 var func =
									 'function ' + FunctionName + '(' + FunctionParameters.join(',') + ')'
                                           +   '{'
                                         //  +      main.frdl.strpp(FunctionBody, varsObject)
								           +      main.frdl.interpolate(FunctionBody, varsObject)
                                           + '}';
								  return new InlineWorker(func, global);								 
							  };		
							
		 emitter.emit(ev_ready_inline_worker, main.frdl.InlineWorker);                        
	}); 
 }
	
  	 helper(main.frdl, main.emitter, main)
			 .then(function(yes){
					main.emitter.emit(ev_ready_frdl_helper, main.frdl);	 		 
		              if('undefined'!==typeof main.emitter.ready && 'undefined'!==typeof main.emitter.ready.readyMain && true === main.emitter.ready.readyMain.stateReady(configEvent) ){
						  loadWorker(main, main.emitter);
					  }else{
						  main.emitter.once(configEvent, function(Webfan){
							  loadWorker(main, main.emitter);
						  });
					  }     
	 });
}(main, require('@frdl/helper')));




(function(main, __webpack_require__, loadJQUery, loadRequireJs){	
   main.frdl.__webpack_require__ = __webpack_require__;	
  
  main.emitter.once(ev_ready_requirejs, function(){ 	
   main.emitter.emit(ev_ready_start, true);
 });	
	
   loadRequireJs(main, __webpack_require__);	

	 if('undefined'!==typeof global && 'undefined'!==typeof global.jQuery && 'undefined'!==typeof global.$ && global.$ === global.jQuery){  
		 main.emitter.emit(ev_ready_jquery, global.jQuery); 
	 }else{ 
		 loadJQUery(main);
	 }	
}(
  main,	
  __webpack_require__,
  function(main){
        import('jquery')
	       .then(function(jquery){
	           global.jQuery = global.$  = jquery.default;
	           main.emitter.emit(ev_ready_jquery, global.jQuery);
       });		
},
 function(main, __webpack_require__){ 
  import('patch-require')
	  .then(function(patch){	     
          patch.default(main);
	      global.require.__webpack_require__ = __webpack_require__;
	      main.emitter.emit(ev_ready_requirejs, global.require);
  });	
}));