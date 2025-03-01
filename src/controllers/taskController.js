const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;
    const task = await Task.create({ title, description, due_date, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) throw new Error('Task not found');
    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const { priority, dueSoon } = req.query;
    const where = {};
    if (priority === 'true') where.priority = 'High';
    if (dueSoon === 'true') where.due_date = { [Sequelize.Op.lte]: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000) };
    const tasks = await Task.findAll({ where });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) throw new Error('Task not found');
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};