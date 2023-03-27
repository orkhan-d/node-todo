const express = require('express');
const app = express();

// SETTING UP TEMPLATES AND STATIC FILES
app.set('view engine', 'ejs');
app.use(express.static('static'));


app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.use((req, res, next) => {
    res.status(404).render('404.ejs');
})

app.listen(3000, 'localhost', () => {
    console.log('started on http://127.0.0.1:3000');
})