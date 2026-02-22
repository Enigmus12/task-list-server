const express = require("express");
const router = express.Router();
const tasks = require("./tasks-db");

const isEmptyBody = (body) => !body || Object.keys(body).length === 0;

const validatePostBody = (req, res, next) => {
  if (isEmptyBody(req.body)) {
    return res.status(400).json({ error: "Cuerpo vacio" });
  }

  const { description, isCompleted } = req.body;

  if (typeof description !== "string" || description.trim() === "") {
    return res
      .status(400)
      .json({ error: 'El campo "description" es requerido y debe ser texto' });
  }

  if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    return res
      .status(400)
      .json({ error: 'El campo "isCompleted" debe ser booleano' });
  }

  next();
};

const validatePutBody = (req, res, next) => {
  if (isEmptyBody(req.body)) {
    return res.status(400).json({ error: "Cuerpo vacio" });
  }

  const { description, isCompleted } = req.body;

  if (description === undefined && isCompleted === undefined) {
    return res.status(400).json({ error: "Atributos faltantes" });
  }

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      return res
        .status(400)
        .json({ error: 'El campo "description" debe ser texto' });
    }
  }

  if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    return res
      .status(400)
      .json({ error: 'El campo "isCompleted" debe ser booleano' });
  }

  next();
};

// POST - Crear una nueva tarea
router.post("/", validatePostBody, (req, res) => {
  const { description, isCompleted } = req.body;

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
router.put("/:id", validatePutBody, (req, res) => {
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
