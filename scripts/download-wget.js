#!/usr/bin/env node

  'use strict';

/*! https://www.hacksparrow.com/using-node-js-to-download-files.html */
/*
// Function to download file using wget
var download_file_wget = function(file_url) {

    // extract the file name
    var file_name = url.parse(file_url).pathname.split('/').pop();
    // compose the wget command
    var wget = 'wget -P ' + DOWNLOAD_DIR + ' ' + file_url;
    // excute wget using child_process' exec function

    var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err;
        else console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
    });
};
*/

var exec = require('child_process').exec;
//var spawn = require('child_process').spawn;

var url = require('url');

//url, OUT_DIR



exports = plug;




function filename(file){
 return	url.parse(file).pathname.split('/').pop();
}



function wget(url, OUT_DIR) {

    // extract the file name
    var file_name = url.parse(url).pathname.split('/').pop();
    // compose the wget command
    var cmd = 'wget -P ' + OUT_DIR + ' ' + url;
    // excute wget using child_process' exec function

    var child = exec(cmd, function(err, stdout, stderr) {
        if (err) console.error(err);
        else console.log(file_name + ' downloaded to ' + OUT_DIR);
    });
}

function plug(url, OUT_DIR){
	wget(url, OUT_DIR); 
}
