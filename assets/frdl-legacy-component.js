define(function(){
 return function(element){
	console.log('frdl-legacy-component detected'//, element.tagName
			   );
	 
	 
	 		
	 global.require(['Webfan', 'Webfan.hps.rpc'], function(Webfan, rpc){		    
				rpc.client.call('hps.routing.info.all').then(function(r){
										
					    global.require(['Webfan.hps.Router'], function(Router){			
							
						  var k;             
							for(k in r.result){               
								Webfan.hps.Router.routes[k] = r.result[k];             
							}
							
							
							      process.ready(function(){
  
									  setTimeout(function(){ 
	
										  process.nextTick(function(){
	      
											  global.require(Webfan.hps.scriptengine.webpack.main).app.removeCloak();
	
										  });
	
									  },3000);   
 
								  });	 
						});	 
					
					
				});
		 
		 
		  
		});
	 
	 /*
   process.ready(function(){
    setTimeout(function(){ 
	 process.nextTick(function(){
	       global.require(Webfan.hps.scriptengine.webpack.main).app.removeCloak();
	 });
	},3000);   
  });	 
	 */
 };
});