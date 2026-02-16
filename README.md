# task-list-server

Project - 2

const express = require("express");
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");

const app = express();
const PORT = 3000;

app.use(express.json()); // Necesario para POST y PUT
app.use("/tasks", listViewRouter);
app.use("/tasks", listEditRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});