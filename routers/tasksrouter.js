const express = require('express');
const {client, newTask, getTaskById, gettasksById, getTasks} = require('../sqlapp');

const router = express.Router();

router.get('/tasks', async (req, res) => {
    res.render('tasks.ejs', {title: "Node TODO", tasks: (await getTasks())});
});

module.exports = router;