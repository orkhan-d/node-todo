const express = require('express');
const {client, newTask, getTaskById, getTasks, deleteTaskById, updateTaskById} = require('../sqlapp');

const router = express.Router();
router.use(express.urlencoded({extended: true}));
router.use(express.json());

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

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await deleteTaskById(id);

    res.json({ redirect: '/tasks' });
})

router.put('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await updateTaskById(id, req.body);

    res.json({ redirect: '/tasks' });
})

router.get('/tasks/:id', async (req, res) => {
    let task = await getTaskById(req.params.id);
    res.render('task.ejs', {title: task.name, task: task});
});

module.exports = router;