// express web server
const express = require('express');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const { startServer } = require('./utilities');
const app = express();


app.use('/', require('./routes'));

startServer(app, port);