
'use strict';

var fs = require("fs");



const { resolutions } = JSON.parse(
  fs.readFileSync("./package.json", "utf-8")
);


  module.exports = {
    hooks: {
      readPackage,
	  afterAllResolved
    }
  };

function readPackage(pkg, context) {
 if (pkg.dependencies) {
	
	if(resolutions){
      for (const k in resolutions) {
        if (pkg.dependencies[k] && pkg.dependencies[k] !== resolutions[k]) {
          context.log(
            `"${k}@${pkg.dependencies[k]}" overriden in "${pkg.name}" to "${k}@${resolutions[k]}"`
          );
          pkg.dependencies[k] = resolutions[k];
        }
      }
	}//resolutions
		
 }//if dependencies

 return pkg;
}

function afterAllResolved(shrinkwrap, context) {

  return shrinkwrap;
}