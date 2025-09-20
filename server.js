// express web server
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`Web Server is listening on port ${port}`);
});