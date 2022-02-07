#!/usr/bin/env node

const http = require('http');
const express = require('express')
const morgan = require('morgan');

const PORT = 5000;

// initialise express
const app = express();
const server = http.Server(app);

app.use(morgan('dev')) // logger

// app.use(express.static('./static'));

// Routing
app.use('/api', require('./api/index'));
app.use((req, res, next) => res.status(404).send('404 - Not Found')) // catch 404

app.set('port', PORT)
server.listen(PORT)

// Because it's fancy :)
console.log('\x1b[36m%s\x1b[0m', '✓ App is now fully running');
console.log('\x1b[36m%s\x1b[0m', 'Server listening on port:', PORT);
