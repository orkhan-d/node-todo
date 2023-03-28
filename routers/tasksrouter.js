const express = require('express');
const {client, newTask, getTaskById, getTasks} = require('../sqlapp');

const router = express.Router();

router.get('/tasks', async (req, res) => {
    res.render('tasks.ejs', {title: "Tasks", tasks: (await getTasks())});
});

router.get('/newtask', async (req, res) => {
    res.render('newtask.ejs', {title: "New task"});
});

router.post('/tasks', async (req, res) => {
    console.log(req.body);
    await newTask(req.body);

    res.redirect('/tasks');
});

module.exports = router;