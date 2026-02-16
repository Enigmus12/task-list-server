const express = require("express");
const router = express.Router();
const tasks = require("./tasks-db");

// GET - Listar todas las tareas
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET - Ver una tarea específica por ID
router.get("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  res.json(task);
});

// GET - Filtrar tareas por estado (completas o incompletas)
// Uso: /tasks/filter?status=completed o /tasks/filter?status=incomplete
router.get("/filter/status", (req, res) => {
  const status = req.query.status;

  if (!status || (status !== "completed" && status !== "incomplete")) {
    return res.status(400).json({
      error: 'Parámetro "status" inválido. Use "completed" o "incomplete"',
    });
  }

  const filtered = tasks.filter((task) => {
    if (status === "completed") {
      return task.isCompleted === true;
    } else {
      return task.isCompleted === false;
    }
  });

  res.json(filtered);
});

module.exports = router;
