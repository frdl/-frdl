 'use strict';

exports = module.exports = (function(f){
	return {
		'platform-target' : 'browser',
		'main' : f()	
	};
}((!process || (process.shim && 'frdl' === process.shim) ) ? runBrowser : runNode));  

function runBrowser(){  
 console.warn('You SHOULD avoid running ' + __filename + ' in the browser!');	
	return {
		'platform-target' : 'browser',
		'main' : ( 'undefined'!==typeof global.require && 'undefined'!==typeof global.require.main) 
		? global.require.main 
		: global.require(global.require('path').resolve(__dirname, 'assets/index.js'))
	};	
}


function runNode(){
  return require(require('path').resolve(__dirname, 'run-in-node-platform.js'));
}