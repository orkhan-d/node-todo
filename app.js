const express = require('express');
const app = express();
const baseRouter = require('./routers/baserouter');

const {Client} = require('pg');
const client = new Client();
client.connect();

// creating tasks database
client.on('connection', ()=>{
    client.query(
        `CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY,
            name VARCHAR(255),
            description TEXT NULL
        );`
    )
    .then((res) => {console.log("Created tasks table!")})
    .catch((err) => {console.error(err)})
});


// SETTING UP TEMPLATES AND STATIC FILES
app.set('view engine', 'ejs');
app.use(express.static('static'));

// SETTING UP LOGGING
const morgan = require('morgan');
app.use(morgan('dev'));

app.use(baseRouter);

app.use((req, res, next) => {
    res.status(404).render('404.ejs', {title: "Not found!"});
})

app.listen(3000, 'localhost', () => {
    console.log('started on http://127.0.0.1:3000');
})