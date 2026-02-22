const express = require("express");
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedMethods = new Set(["GET", "POST", "PUT", "DELETE"]);
app.use((req, res, next) => {
  if (!allowedMethods.has(req.method)) {
    return res.status(400).json({ error: "Metodo HTTP no valido" });
  }

  next();
});

app.use("/tasks", listViewRouter);
app.use("/tasks", listEditRouter);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
