/**
 * @file Simple Express server listening to port 8080 and serving from the dist folder directly.
 * @author Abhishek Mukherjee
 */

var express = require('express');
var server = express();
server.use('/', express.static(__dirname + '/dist'));
server.listen(8080);