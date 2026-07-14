// Create an Express API for task managedment with GET and POST endpoints. 

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory task storage
let tasks = [];
let taskId = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET task by id
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// POST create new task
app.post('/tasks', (req, res) => {
  const { title, description, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  
  const newTask = {
    id: taskId++,
    title,
    description: description || '',
    completed: completed || false,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const { title, description, completed } = req.body;
  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  
  res.json(task);
});

// DELETE task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Task Manager API running on port ${PORT}`);
});

module.exports = app;
