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

function newTask(title, descr) {
    let task;
    client.query(`INSERT INTO tasks(name, description) VALUES(${title}, ${descr})`).then(
        (res) => task = res.rows[0]
    ).catch(
        (err) => console.error(err)
    );

    return task;
}

function getTaskById(id) {
    var task;
    client.query(`SELECT * FROM tasks WHERE id=${id}`).then(
        (res) => task = res.rows[0]
    ).catch(
        (err) => console.error(err)
    );

    return task;
}

async function getTasks() {
    return (await client.query(`SELECT * FROM tasks`)).rows;
}

module.exports = {client, newTask, getTaskById, getTasks};