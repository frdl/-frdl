'use strict';


window.name = 'NG_DEFER_BOOTSTRAP!' +  window.name;	

var MAX_DEPRECATION_WARNINGS = 1;
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




Webfan .hps.scriptengine.webpack.chunkname= __webpack_chunkname__;	
Webfan .hps.scriptengine.webpack.hash = __webpack_hash__;
//require.__webpack_require__.p || Webfan .hps.scriptengine.webpack.__PUBLIC_PATH__
var __CONFIG_MAIN_NEXT_BUNDLE_FILENAME__ = Webfan .hps.scriptengine.webpack.__PUBLIC_PATH__ + Webfan.hps.scriptengine.webpack.__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;
const configEvent = 'after.'+__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__;


global.process =  require('@frdl/process');

		


process.addReadyCheck(function(){
	return 'undefined' !== typeof global.require;
});












 //require('@frdl/requirejs');
/*
  import('@frdl/requirejs')
	  .then(function(){
         process.emit('ready:requirejs');
  });	
*/
//frdl.browser = global.requirejs.isBrowser;
//frdl.worker = ('undefined' !== typeof self && 'function' === typeof self.importScripts) ? true : false;


frdl.debug = {
   mode : function(m){
         if('undefined'!==typeof m){
           process.env.DEBUG =m;
         }
        return process.env.DEBUG;
  },
  default :	((sessionStorage && sessionStorage.getItem('frdl.debug.mode') ) 
		 ? sessionStorage.getItem('frdl.debug.mode')
		 : 'EXPERIMENTAL' === Webfan.hps.context.STAGE)
 };		

 if(!frdl.debug.default){
    console.log=function(){};		 
 }



frdl.time= function(){
	return (new Date()).getTime();
};




	


//process.once('ready:requirejs', function(){	
//  require('patch-require')(main, frdl, global);
//});
(function(){
	Object.defineProperty(main, 'frdl', {
		           get : function(){
					  return frdl;	               															  
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
}());




(function(){
 var i = 0;	
	Object.defineProperty(global, 'Webfan', {
		           get : function(){
					   if(i<MAX_DEPRECATION_WARNINGS){
						   console.warn('global.Webfan will maybe deprecated later..., require(\'@frdl/webfan\') instead!');
					   i++;
					   }
					  return Webfan;																	  
				   }
	});



	Object.defineProperty(main, 'Webfan', {
		           get : function(){
					  return Webfan;																	  
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
	'ready:requirejs',
	configEvent
], function(){
	 var states = Array.prototype.slice.call(arguments);
	process.emit('ready:main', states);
	
},  frdl.ready/*, false*/);		





frdl.ready.deps = process.required([	
	                                   'ready:requirejs',
	                                    configEvent,
									    'ready:main', 
										'ready:jquery',
										'ready:idle',
									    'ready:requirejs',
									    'ready:buffer',
									    'ready:inline-worker',
									    'ready:frdl:helper'
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
	process.emit('frdl.ready.deps', states);
	
	
},  frdl.ready, false);							
		




   









	





//process.once('ready:main', function(s){	
// console.log('frdl '+ Webfan.hps.scriptengine.frdlweb.version);	
//});							
						









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
 var i = 0;	
	Object.defineProperty(frdl, 'fs', {
		           get : function(){
					  if(i<MAX_DEPRECATION_WARNINGS) {
						  console.warn('frdl.fs will maybe deprecated later...,use require(\'@frdl/fs\') or require(\'fs\')  instead!');
					   i++;
					  }
					  return require('@frdl/fs');															  
				   }
	});
	
	
	 process.once(configEvent, function(Webfan){	 
	     global.require.s.contexts._.defined['filer'] = require('filer.js');	
	     global.require.s.contexts._.defined['fs'] = require('@frdl/fs');	 
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





/*
	Object.defineProperty(frdl, 'watchFor', {
		           get : function(){
					//  return require('insertion-query');		
					   return require('watchFor');
				   }
	});
    
*/
frdl.watchFor = require('watchFor');









	Object.defineProperty(frdl, 'bootAngularJs', {
		           get : function(){
					  return  function($element, modules, config){
						 var o=0, r;
					     return frdl.co(function*($element, modules, config){	
						   yield new Promise(function(resolve, reject){	 
					          global.require(['angular-frdl'], function(angular){  
	                          //    angular.element(document).ready(function () { 	
	                               
						    	      angular.element(function() {
									//	 window.name=window.name.replace(/NG_DEFER_BOOTSTRAP\!/, ''); 
	                                     r = angular.bootstrap($element, modules, config);
										 								 
										  while('undefined'===typeof r && o<8){
											o++;
											  try{
												  r = angular.bootstrap($element, modules, config);
												  resolve(r);
											  }catch(e){
												  reject('Cannot AngularJs Bootstrap ' + modules.join(','));
												  break;
											  }
										  }  
	                                    // window.name='NG_DEFER_BOOTSTRAP!'+window.name;
										
	                                  });  
						       //   });  
						   
						       });  
					      	 });	 
						     
						      return r;
						  }, $element, modules, config);
					  };															  
				   }
	});

/*
	Object.defineProperty(frdl, 'bootAngularJs', {
		           get : function(){
					  return  function($element, modules, config){
						 var o=0, r;
					
						    	      require('angular-frdl').element(function() {
									//	 window.name=window.name.replace(/NG_DEFER_BOOTSTRAP\!/, ''); 
	                                   //  r = angular.bootstrap($element, modules, config);
										 								 
										  while('undefined'===typeof r && o<8){
											o++;
											  try{
												  r = angular.bootstrap($element, modules, config);
												
											  }catch(e){
												//    reject('Cannot AngularJs Bootstrap ' + modules.join(','));
												  break;
											  }
										  }  
	                                    // window.name='NG_DEFER_BOOTSTRAP!'+window.name;
										
	                                  });  
						   
					      return r;
					  };															  
				   }
	});

*/






(function(main){
	'use strict';
	
var Instances = {};	
frdl.registerComponent=registerComponent;
	
//frdl.debug.default=true;
	

	
process.required([	
	                                   'ready:requirejs',
	                                    configEvent,
									    'ready:frdl:helper'
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
	
  global
	  .require(Webfan.hps.scriptengine.webpack.main)
	  .frdl
	  .each(Webfan.hps.scriptengine.frdlweb.components, registerComponent);
 },  frdl.ready, false);
	
	

	
	

function registerComponent($i, component){	
	 if(!!frdl.debug.default){	 
		 console.log('Register component: ', component);
	 }
	 global.require(Webfan.hps.scriptengine.webpack.main).frdl.watchFor(component.selector)
        .every(function(element){
		     
		      if('undefined'===typeof Instances[$i]){
				 Instances[$i] = {component:component,element:element};  
			  }
		     if(!!frdl.debug.default) console.log('Invoke component: ', {component:component,element:element});
		       frdl.co(function*($i, component, element){
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
									     frdlweb. frdl.dl(load.load, {	
											 callback : function (e, r) {           
												 if(e){
													 reject(e);
                                                 }else{		
													 $(element).html(r.data || r);
													 resolve([]);			
												 } 	
											 },	
											 always : function(){	
	 
											 } 	
										 });
									 break;		
								 case 'append-url' :
									     frdlweb. frdl.dl(load.load, {	
											 callback : function (e, r) {           
												 if(e){
													 reject(e);
                                                 }else{		
													 $(element).append(r.data || r);
													 resolve([]);			
												 } 	
											 },	
											 always : function(){	
	 
											 } 	
										 });
									 break;		
								 case 'prepend-url' :
									     frdlweb. frdl.dl(load.load, {	
											 callback : function (e, r) {           
												 if(e){
													 reject(e);
                                                 }else{		
													 $(element).prepend(r.data || r);
													 resolve([]);			
												 } 	
											 },	
											 always : function(){	
	 
											 } 	
										 });
									 break;		
								 case 'html' :
									   $(element).html(load.load);
									   resolve([]);
									 break;			
								 case 'append' :
									   $(element).append(load.load);
									   resolve([]);
									 break;			
								 case 'prepend' :
									   $(element).prepend(load.load);
									   resolve([]);
									 break;									 
								 case 'bootstrap-angular-js' : 
								 case 'ba' :
								 case 'ba1' :
									 var l = [];											
									 
									 frdl.each(load.load, function(x, m){
										l.push(frdl.strpp(m, main)); 
									 });
									 
						             frdl.bootAngularJs(element, l).then(function(r){
										  resolve(r);
									 }).catch(function(e){
										reject(e); 
									 });
									 break;
								 case 'amd' : 
				                     
									 if('string'===typeof load.load){					
										 load.load = [load.load]; 				
									 }
				
									
									 var l = [];
									 frdl.each(load.load, function(x, m){
										l.push(frdl.strpp(m, main)); 
									 });
									 			
									 global.require(l, function(){						
										 var modules = Array.prototype.slice.call(arguments);					
										 var Module = modules[modules.length-1];						
										 if('function' === typeof Module){					
											 Module.apply(element, [element, main]);						
										 }				
										 resolve(modules);
										  if(!!frdl.debug.default) console.log('Resolved component amd-modules: ', load.load);
									 });									 
								 break;
									 
								 case 'script' :
									 frdl.getScript(frdl.strpp(load.load, main), function(element, main){
										 resolve([]);
										 if(!!frdl.debug.default) console.log('Resolved component script: ', load.load);
									 }, false, false, [element, main]);
								  break;
							 }
						  
						 
					  }).then(function(loaded){
			                   if(!!frdl.debug.default) console.log('Resolved component load definition [#'+(i + 1).toString()+']: ', loaded);
						       Instances[$i][i]=loaded;
			          });
				  }
				 
				   return Instances[$i];
			  }, $i, component, element).then(function(Component){
				//   require('@frdl/webfan').hps.scriptengine.frdlweb.components[$i]._modules = ComponentMerging;
			       if(!!frdl.debug.default) console.log('Ready component: ', Component);
			   });
		 
		 
		 
		 

		 
		    
	 });
}
}(main));








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





// global.jQuery = require('jquery');	
// global.$ = global.jQuery;	
     	

process.required([	
	                                   'ready:jquery',
	                                    configEvent
										], function(){	
	 var states = Array.prototype.slice.call(arguments);
  
  global.require(['jquery', 'idle'], function(jquery, idle){	  	 
	  global.require.s.contexts._.defined['jquery'] = global.jQuery = global.$  = jquery; 
      global.require.s.contexts._.defined['webfan/frdl-jQuery'] = global.require.s.contexts._.defined['jquery'];  

	    global.jQuery.fn.idle = global.$.fn.idle = idle;			
	    process.emit('ready:idle', global.jQuery.fn.idle);	
    });	 

 });



//  frdl.ready.deps.add('ready:inline-worker');	
  process.once(configEvent, function(Webfan){
  	 require('@frdl/helper')(frdl)
			 .then(function(yes){
					process.emit('ready:frdl:helper', frdl);
		 
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
							
							
	                          process.emit('ready:inline-worker', frdl.InlineWorker);
						});
                            					   
	           });
  });








 
// frdl.ready.deps.add('ready:buffer');	
 process.once(configEvent, function(Webfan){
  global.require(['buffer'], function(Buffer){
	 global.Buffer = Buffer;
	 process.emit('ready:buffer', Buffer);	  
  });	
 });	




process.once('ready:requirejs', function(){	
  global.require(Webfan.hps.scriptengine.webpack.main)
   .frdl
   .getScript(__CONFIG_MAIN_NEXT_BUNDLE_FILENAME__, function(){
	   process.emit(configEvent, Webfan );
   });
});




  import('patch-require')
	  .then(function(patch){
          patch.default(main, frdl, global);
	      process.emit('ready:requirejs');
  });	



   import('jquery')
	  .then(function(jquery){
          global.jQuery = jquery.default;	
          global.$ = global.jQuery;	
	      process.emit('ready:jquery');
  });	



