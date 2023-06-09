const Task = require('../../model/task');

// GET /getTasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'Tasks not found' });
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
};

// POST /createTask
exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        const newTask = await task.save();
        res.status(200).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
};

// DELETE /delTask/:id
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
};

// PATCH /checkTask/:id
exports.checkTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.status = 'checked';
        task.checkedAt = new Date();
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};

// PATCH /uncheckTask/:id
exports.uncheckTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.status = 'active';
        task.checkedAt = new Date();
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
};