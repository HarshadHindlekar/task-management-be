const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.post('/task', taskController.createTask);
router.put('/tasks/:id/status', taskController.updateTaskStatus);
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);

module.exports = router;