// Import necessary modules and initialize the Express application
const express = require('express');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const { startServer } = require('./utilities');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Use routes defined in the routes directory
app.use('/', require('./routes'));

// Initialize the database connection and start the server
startServer(app, port);