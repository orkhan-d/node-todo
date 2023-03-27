const express = require('express');
const app = express();

app.use('static', '/static');


app.get('/', (req, res) => {
    res.contentType('text/plain').end('Hello, world!');
    // res.end('Hello, world!');
});

app.listen(3000, 'localhost', () => {
    console.log('started on http://127.0.0.1:3000');
})