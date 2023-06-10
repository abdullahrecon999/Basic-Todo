var express = require('express');
var router = express.Router();
const taskController = require('../../controllers/v1/taskController');

router.get('/', function (req, res, next) {
    res.send({"data":'Api Router called'});
});

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.patch('/tasks/:id/check', taskController.checkTask);
router.patch('/tasks/:id/uncheck', taskController.uncheckTask);

module.exports = router;