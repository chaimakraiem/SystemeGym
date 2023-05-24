const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Array to store the classes (in-memory database for simplicity)
let classes = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// GET /classes
app.get('/classes', (req, res) => {
  res.json(classes);
});

// POST /classes
app.post('/classes', (req, res) => {
  const { id, name, instructor, schedule } = req.body;
  const newClass = { id, name, instructor, schedule };
  classes.push(newClass);
  res.status(201).json(newClass);
});

// PUT /classes/:id
app.put('/classes/:id', (req, res) => {
  const { id } = req.params;
  const { name, instructor, schedule } = req.body;
  const classIndex = classes.findIndex((c) => c.id === id);
  if (classIndex !== -1) {
    classes[classIndex] = { id, name, instructor, schedule };
    res.json(classes[classIndex]);
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
});

// DELETE /classes/:id
app.delete('/classes/:id', (req, res) => {
  const { id } = req.params;
  const classIndex = classes.findIndex((c) => c.id === id);
  if (classIndex !== -1) {
    const deletedClass = classes.splice(classIndex, 1)[0];
    res.json(deletedClass);
  } else {
    res.status(404).json({ error: 'Class not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Class microservice is running on port ${PORT}`);
});
