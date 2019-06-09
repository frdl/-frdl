# @frdl/frdl.js
frdl/frdl.js/µFlow2

````
 $ npm install frdl -g
 $ frdl help
 $ mkdir my-app
 $ cd my-app
 $ frdl bundlejs index.js --base /app/js/ --workspace frdl.webfan.de --dist www_root/app/js --name frdlweb 
````

   Register --workspace:
   https://domainundhomepagespeicher.webfan.de/?op=webaccount
   
 
# Example assets/webfan.html

````javascript
require('frdlweb').frdl.registerComponent('MyApp', {
			selector : 'my-app',
			load :[ 
				 {
					   type : 'append',
					   load : '<a title="Account" href="https://domainundhomepagespeicher.webfan.de/?op=webaccount" style="color:green;">Start...</a>'
				   },
	            	 {
					   type : 'append-url',
					   load : '/intro.html'
				   },
						
				{			
		      type : 'bootstrap-angular-js',	
			  load :	['myMenuApp']
				
			}
				  
		 ]	
		});




require('frdlweb').frdl.registerComponent('frdl-legacy', {	
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
			load : require('frdlweb').Webfan.hps.scriptengine.webpack.__PUBLIC_PATH__ +  'frdl-legacy-app.' + require('frdlweb').Webfan.hps.scriptengine.hash + '.js'  
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
		 'webfan/load-js!' +   require('frdlweb').Webfan.hps.scriptengine.webpack.__PUBLIC_PATH__ +  'frdl-legacy-component.' + require('frdlweb').Webfan.hps.scriptengine.hash + '.js'  
	              // + '?${Webfan.hps.scriptengine.webpack.chunkname}=${Webfan.hps.scriptengine.webpack.hash}'
	  ]
	}
   ]
	
});
````