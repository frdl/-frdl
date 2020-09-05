

exports = module.exports = {
	
	legacy : {	
	selector : 'ng-flows:not([ng-bootstrapped]), ng-flow:not([ng-bootstrapped]), '
		+ 'webfa-nav:not([ng-bootstrapped]), webfan-widget:not([data-frdl-component-initiated="true"]), '
		+ 'webfan[type="widget"]:not([data-frdl-component-initiated-rewrite-_canonical_2_*="true"]), '
		+ '*[type^="application/vnd.frdl.flow.widget."]:not([data-frdl-component-initiated-rewrite-_canonical_2_*="true"]), '
		+ '*[type$=".wgt"]:not([data-frdl-component-initiated-rewrite-_canonical_2_*="true"]), '
		+ '*[data-frdl-component*=":"]:not([data-frdl-component-initiated-rewrite-_canonical_="true"]):not([data-frdl-component-initiated])',
	load : [

	
		{
	  type : 'amd',
	  once : true,		
	  load : [		
		 'webfan/navigator/webfan-widget',
		 'webfan/navigator/webfan-nav',
		 'webfan/navigator/ui'
	  ]
	},		
		
		
		{
	  type : 'amd-callback',
	  once : true,		
	  load : [		
		'frdl-legacy-component'
	  ]
	}
		

   ]
	
},	
	
 uiNotificationPrepare : {		
		   selector : '*[oc-lazy-load*="ui-notification"]:not([frdl-prepared-ui-notify-directive*="true"])',	
		   load : [	
			   {	 
				   type : 'amd-callback',	 
				   once : false,		 
				   load : [			
					   'angular-ui-notification/dist/frdl-ui-makedirectiveifempty'	 
				   ]	
			   }
		   ]
	   },
		
		
defaultCssCollection : 	{	
   selector : 'html:not([frdlweb-options*="--no-defaults"])',
	load : [
	{
	  type : 'css-link',
	  once : true,		
	  load : [		
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}webfan/navigator/webfan-default.css',
	    '${this.Webfan.hps.scriptengine.requirejs.baseUrl}bootstrap-4/css/bootstrap-min.css'
	  ]
	}
   ]
	
},				
	
bootstrapCss : {	
   selector : '[frdlweb-styling*="bootstrap"]',
	load : [
	{
	  type : 'css-link',
	  once : true,		
	  load : [		
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}bootstrap-4/css/bootstrap-min.css'
	  ]
	}
   ]
	
},
		
webfanDefaultCss : 	{	
   selector : '[frdlweb-styling*="webfan"]',
	load : [
	{
	  type : 'css-link',
	  once : true,		
	  load : [		
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}webfan/navigator/webfan-default.css'
	  ]
	}
   ]
	
},
	
		
		
 intent : {	
   selector : 'intent, [frdl-intents-load]',
	load : [
		{
            type : 'script',
			once : true,
			load : 'https://frdl.webfan.de/cdn/frdl/flow/components/frdl/intent/webintents.js'
	}		
   ]		
},

	
uiSwitch : {	
   selector : 'switch-button',
	load : [
		{
	  type : 'directive',
	  once : true,		
	  load : [	  
		'angular-ui-switch/frdlweb.directive.angular-ui-switch' 		
	  ]
	},		
		
		
	{
	  type : 'css-link',
	  once : true,		
	  load : [		
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-ui-switch/angular-ui-switch.css'
	  ]
	}
   ]
	
},
	
	
	
hamburgerButton : {	
   selector : 'hamburger-button',
	load : [

		{
	  type : 'directive',
	  once : true,		
	  load : [	  
		'frdlweb.directive.hamburger-button' 		
	  ]
	}	
   ]
	
},

	
	
uiSelectCss : {	
   selector : 'ui-select',
	load : [
	{
	  type : 'css-link',
	  once : true,		
	  load : [		
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-ui-select/ui-select.css'
	  ]
	}
   ]
	
},
		
		
	
	
downloaderDirective:{	
   selector : 'downloader',
	load : [
		{
	  type : 'directive',
	  once : true,		
	  load : [	  
		'angular-downloader'		
	  ]
	}	
   ]
	
},
		
	
legacyTranslate : {	
   selector : '[name="frdl.inX.dictonary-file"]',
	load : [
		{
	  type : 'amd',
	  once : true,		
	  load : [	
	     'webfan/lang-legacy'
		]
	}	
   ]		
},
	
	
	
	
dsgvoAdsense:  {	
   selector : 'dsgvo-adsense',
	load : [		
		
		{
	  type : 'amd-callback',
	  once : true,		
	  load : [		
		  'dsgvo-adsense'
	  ]
	}	

   ]
	
}
		


};