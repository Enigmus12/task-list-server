const express = require("express");

const app = express();
const PORT = 3000;

// Ruta principal
app.get("/tasks", (req, res) => {
  const tasks = [
    {
      id: 123456,
      isCompleted: false,
      description: "Walk the dog",
    },
    {
      id: 789012,
      isCompleted: true,
      description: "Do homework",
    },
  ];

  res.json(tasks);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
