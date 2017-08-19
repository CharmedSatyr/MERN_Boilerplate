'use strict';

/* Webpack does not properly transpile ES6 servers that use Express - Use Babel CLI */

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 8080;

var app = (0, _express2.default)();

app.use(_express2.default.static(_path2.default.join(__dirname, 'client')));

app.get('/test', function (req, res) {
   res.send('I\'m alive!');
});

app.listen(port, function () {
   console.log('Node.js listening on port', port + '.');
});

/*

// Simple test server that doesn't use Express -- works with Webpack

import http from 'http'

http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      //res.sendfile('../client/index.html')
      res.end('Hello World\n')
   })
   .listen(port, '127.0.0.1')

console.log('Server running at http://127.0.0.1:' + port + '/')

*/
