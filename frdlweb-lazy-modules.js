

exports = module.exports = [
{
  name : 'frdl-ui-progressbar',
  files : [
		'webfan/navigator/progressbar'
  ],
  serial : false	
},

{
  name : 'feature-toggle',
  files : [
		'webfan/install/feature-flags'
  ],
  serial : false	
},


{
  name : 'terminal-emulator',
  files : [
		'angular-terminal/angular-terminal-frdl',
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-terminal/assets/terminal.css'
  ],
  serial : false	
},


{
  name : 'ui-notification',
  files : [
		'angular-ui-notification/dist/frdl-ui-notification',
		'${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-ui-notification/dist/angular-ui-notification.css'
  ],
  serial : false	
},

{
  name : 'mgo-angular-wizard',
  files : ['angular-wizard/dist/frdl-wizard',
		  '${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-wizard/dist/angular-wizard.css']	
},

{
  name : '${this.Webfan.hps.scriptengine.webpack.main}.install',
  files : ['webfan/install/setup',

		     '${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-wizard/dist/angular-wizard.css',		       
		  ]	
},

{
  name : 'angular-resizable',
  files : ['angular-resizable/angular-resizable',
		  '${this.Webfan.hps.scriptengine.requirejs.baseUrl}angular-resizable/angular-resizable.css']	
},

{
  name : 'frdlweb-whois',
  files : ['whois/frdlweb-whois',
		   
		 ]	
},

{
  name : 'frdlweb-whois2',
  files : ['whois/frdlweb-whois2',
		   
		 ]	
},

{
/*
  <link rel=stylesheet href="../doc/docs.css">

  <link rel="stylesheet" href="../lib/codemirror.css">
  <link rel="stylesheet" href="../addon/hint/show-hint.css">
  <script src="../lib/codemirror.js"></script>
  <script src="../addon/hint/show-hint.js"></script>
  <script src="../addon/hint/xml-hint.js"></script>
  <script src="../addon/hint/html-hint.js"></script>
  <script src="../mode/xml/xml.js"></script>
  <script src="../mode/javascript/javascript.js"></script>
  <script src="../mode/css/css.js"></script>
  <script src="../mode/htmlmixed/htmlmixed.js"></script>
  */
  name : 'codemirror-ui',
  files : [
	  '${this.Webfan.hps.scriptengine.requirejs.baseUrl}codemirror/lib/codemirror.css',
	  '${this.Webfan.hps.scriptengine.requirejs.baseUrl}codemirror/addon/hint/show-hint.css',
	  
	  
	  "codemirror/lib/codemirror",
	  "codemirror/addon/hint/show-hint",
	  "codemirror/addon/hint/xml-hint",
	  "codemirror/addon/hint/html-hint",
	  "codemirror/mode/xml/xml",
	  "codemirror/mode/javascript/javascript",
	  "codemirror/mode/css/css",
	  "codemirror/mode/htmlmixed/htmlmixed",

	  
	  'codemirror-ui/codemirror-module'
		   
		 
  ]	
}

];

