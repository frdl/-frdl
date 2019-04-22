#!/usr/bin/env node
/**
* An extended install script which installs packages you have in package.json's dependencies or the packages you have mentioned
*  (similar to npm install) in the first path that is in $NODE_PATH
* This action allow you to install your packages in one repository and require('your_own_private_package') from this
*  private repository (e.g. local folder) without worry about relative path and without worry of duplication of
*  instances (for example module A and B each located in different places without the same root, but both requires
*  module C and both required by module D normally will create two instances of C.
*  However with this approach module D will cache module C for both of them using one instance.
* Created by kfirerez on 7/15/15.
*/

var npm = undefined;
try{
   npm = require("npm");
}catch(e){
   console.log('Cannot find npm. Try to include the global node modules (e.g. /usr/local/lib/node_modules) in NODE_PATH env.');
   console.log('Note that if you like to install your modules in special location other then global you should prefix NODE_PATH with that location');
   process.exit(1);
}
var packageJson = require('./package');

npm.load(packageJson, function (er, npm) {
   // use the npm object, now that it's loaded.

   var packages = resolvePackages(packageJson);
   var location = resolveEXModulesLocation();
   npm.commands.install(location, packages.list, function(){
       console.log('Install command arguments' + JSON.stringify(arguments));
   });
});

/**
* Returns a location as follow:
* 1. If --prefix paramter was specified with a location parameter after it, it will return that location.
* 2. If NODE_PATH contains one location and --allowOnePath is specified in the execution arguments or if it has more
*  than one paths in it.
* 3. Otherwise return './'
* @return {*}
*/
function resolveEXModulesLocation() {
   var paths = [];
   var allowOnePath = false;
   if(process.env.NODE_PATH){
       paths = process.env.NODE_PATH.split(':');
   }
   if(process.argv.length > 2){
       for(var i=2; i<process.argv.length; i++){
           if(process.argv[i] === '--prefix' && i<process.argv.length-1){
               return process.argv[i+1];
           }
           if(process.argv[i] === '---allowOnePath'){
               allowOnePath = true;
           }
       }
   }
   if(!paths || paths.length === 0 || (paths.length === 1 && !allowOnePath) ) {
       console.log('NODE_PATH is either empty or contain only one entry which is the global node modules location. ' +
           'If you like to use that entry specify --allowOnePath in the script arguments');
       return './';
   }

   return paths[0];
}

/**
* Resolve which packages need to install. Either a specified package or the packages listed in package.json dependencies
* @param packageJson
* @return {{list: Array}}
*/
function resolvePackages(packageJson){
   if(process.argv.length <=2 && (!packageJson || !packageJson.dependencies)){
       console.error('You must specify package to install or include dependencies in package.json');
       process.exit(1);
   }

   if(process.argv.length <= 2){
       return {
           list: Object.keys(packageJson.dependencies)
       }
   }
   var packages = {
       list: []
   };
   for(var i=2; i<process.argv.length; i++){
       if(process.argv[i].indexOf('--') === 0){
           switch(process.argv[i]){
               case '--save':
               case '--save-dev':
               case '--save-optional':
               case '--save-exact':
                   //TODO:Fix or handle this issues
                   break;
               case '--prefix':
                   i++;//skip the next argument as well
                   continue;
           }
       }
       packages.list.push(process.argv[i]);
   }
   if(packages.list.length === 0){
       console.error('You must specify package to install or include dependencies in package.json');
       process.exit(1);
   }

   return packages;
}