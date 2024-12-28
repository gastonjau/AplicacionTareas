const express = require('express');
const Task = require('../models/taskModel');
const router = express.Router();

// Crear una nueva tarea (POST /api/tasks)
router.post('/', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const newTask = new Task({ title, description, completed });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la tarea' });
  }
});

// Obtener todas las tareas (GET /api/tasks)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) {
      if (status === 'completed') {
        filter.completed = true;
      } else if (status === 'pending') {
        filter.completed = false;
      }
    }

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
});

// Obtener una tarea por ID (GET /api/tasks/:id)
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la tarea' });
  }
});

// Actualizar una tarea (PUT /api/tasks/:id)
router.put('/:id', async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la tarea' });
  }
});

// Eliminar una tarea (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la tarea' });
  }
});

module.exports = router;
