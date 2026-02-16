const express = require("express");
const router = express.Router();
const tasks = require("./tasks-db");

// POST - Crear una nueva tarea
router.post("/", (req, res) => {
  const { description, isCompleted } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'El campo "description" es requerido' });
  }

  const newTask = {
    id: Date.now(),
    isCompleted: isCompleted || false,
    description: description,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE - Eliminar una tarea específica
router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({
    message: "Tarea eliminada correctamente",
    task: deletedTask[0],
  });
});

// PUT - Actualizar una tarea específica
router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  // Actualizar campos si se proporcionan
  if (req.body.description !== undefined) {
    task.description = req.body.description;
  }

  if (req.body.isCompleted !== undefined) {
    task.isCompleted = req.body.isCompleted;
  }

  res.json({
    message: "Tarea actualizada correctamente",
    task: task,
  });
});

module.exports = router;
