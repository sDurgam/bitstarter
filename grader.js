//#!usr/bin/env node
/*
References:
+cheerio
+commander.js
+JSON
*/
var fs = require('fs');
var rst = require('restler');
var program = require('commander');
var cheerio = require('cheerio');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
var instr = infile.toString();
if(!fs.existsSync(instr)) {
console.log("%s does not exist. Exiting.", instr);
process.exit(1); //http://nodejs.org/api/process.html#process_process_exit_code
};
return instr;
};
var cheerioHtmlFile = function(htmlfile) {
return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(checksfile) {
return JSON.parse(fs.readFileSync(checksfile));
};
var checkHtmlFile = function(htmlfile, checksfile) {
$ = cheerioHtmlFile(htmlfile);
var checks = loadChecks(checksfile).sort();
//console.log(checks);
var out = {};
for(var ii in checks){
var present = $(checks[ii]).length > 0;
//console.log(present);
out[checks[ii]] = present;
}
return out;
};

var checkURLFile = function(urlResult, checksfile){
$ = cheerio.load(urlResult);
//console.log("$ is ......" + $);
var checks = loadChecks(checksfile).sort();
//console.log(checks);
var out = {};
for(var ii in checks){
var present = $(checks[ii]).length > 0;
//console.log("In url present");
out[checks[ii]] = present;
}
//console.log(out);
return out;
};

var clone = function(fn) {
return fn.bind({});
}
var checkJson;
if(require.main == module){
program.option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
.option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
.option('-u, --url <url_pointer>', 'Url link')
.parse(process.argv);
if(program.url)
{
rst.get(program.url)
.on('complete' ,function(result)
{
//console.log("result----" + result);
checkJson = checkURLFile(result, program.checks);
var outJson = JSON.stringify(checkJson, null, 4);
console.log(outJson);
});
}
else
{
checkJson = checkHtmlFile(program.file, program.checks);
var outJson = JSON.stringify(checkJson, null, 4);
console.log(outJson);
}
//var outJson = JSON.stringify(checkJson, null, 4);
//console.log('json' + outJson);
}
