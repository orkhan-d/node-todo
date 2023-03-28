const express = require('express');
const app = express();

const baseRouter = require('./routers/baserouter');
const sqlRouter = require('./routers/tasksrouter');

// SETTING UP TEMPLATES AND STATIC FILES
app.set('view engine', 'ejs');
app.use(express.static('static'));

// SETTING UP LOGGING
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(baseRouter);
app.use(sqlRouter);

app.use((req, res, next) => {
    res.status(404).render('404.ejs', {title: "Not found!"});
})

app.listen(3000, 'localhost', () => {
    console.log('started on http://127.0.0.1:3000');
})