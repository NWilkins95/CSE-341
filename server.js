// express web server
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Jannetta Wilkins');
});

app.listen(PORT, () => {
    console.log(`Web Server is listening on port ${PORT}`);
}); 