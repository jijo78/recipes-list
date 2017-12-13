const express = require('express');
const port = process.env.PORT || '5000';
const http = require('http');
const path = require('path');
const app = express();
const bodyParser  = require('body-parser');

/**
 * Set HTTP server port.
 */
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


 //connect the back to the front
 app.use(express.static('./public/'));
 app.use(express.static('./client/dist/'));
 app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')));

server.listen(port);

module.exports = app;
