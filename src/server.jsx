'use strict'

/* Webpack does not properly transpile ES6 servers that use Express - Use Babel CLI */

const port = process.env.PORT || 8080

import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.get('/test', (req, res) => {
   res.send('I\'m alive!')
})

app.listen(port, () => {
   console.log('Node.js listening on port', port + '.')
})


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
