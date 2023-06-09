var express = require('express');
var router = express.Router();
const Task = require('../model/task');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({"data":'Api Router called'});
});

// Route: GET /getTasks
router.get('/getTasks', async (req, res) => {
    try {
        // Retrieve all tasks from the database
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'Tasks not found' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

// Route: POST /createTask
router.post('/createTask', async (req, res) => {
    try {
        // Create a new task based on the request body
        const task = new Task(req.body);
        // Save the task to the database
        const newTask = await task.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Route: DELETE /delTask/:taskId
router.delete('/delTask/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Delete the specified task from the database
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Route: PATCH /checkTask/:taskId
router.patch('/checkTask/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Find the specified task in the database
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        // Update the task's status and checkedAt fields
        task.status = 'checked';
        task.checkedAt = new Date();
        // Save the updated task to the database
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Route: PATCH /uncheckTask/:taskId
router.patch('/uncheckTask/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Find the specified task in the database
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        // Update the task's status and checkedAt fields
        task.status = 'active';
        task.checkedAt = new Date();
        // Save the updated task to the database
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

module.exports = router;