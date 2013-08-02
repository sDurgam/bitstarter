//:wq
//var express = require('express');
/*var fs = require('fs');
var content;
var readFile = fs.readFileSync('./index.html', function read(err, data){
if(err){
throw err;}
content = data;
});
console.log(content);
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World2!');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
*/
var fs = require("fs");
var express = require("express");
var fileName = "index.html";
var data;
fs.exists(fileName, function(exists)
{
if(exists)
{
fs.stat(fileName, function(err, stats)
{
//console.log(stats.size);
fs.open(fileName, "r", function(error, fd) {
var buffer = new Buffer(stats.size);
fs.read(fd, buffer, 0, buffer.length, null, function(read, readBytes, buffer)
{
data = buffer.toString("utf8", 0, buffer.length);
console.log(data);
DisplayHtml(data);
fs.close(fd);
});
});
});
}
});
var DisplayHtml = function(data)
{
var app = express.createServer(express.logger());
app.get('/', function(request, response){
response.send(data);
});
var port = process.env.PORT || 8080;
app.listen(port, function() {
console.log("Listening on " + port);
});
}
//console.log(data);
