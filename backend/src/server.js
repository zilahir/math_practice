import morgan from "morgan";
import express from "express";
import path from "path";

import database from "./database";
import uploadRoutes from "./files/routes.files";
import userRoutes from "./user/user.routes";
import categoriesRoutes from "./categories/categories.routes";
import periodsRoutes from "./periods/periods.routes";
import taskRoutes from "./tasks/tasks.routes";

const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "../", "public")));

app.get("/", function (req, res, next) {
  database
    .raw("select VERSION() version")
    .then(([rows]) => rows[0])
    .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

app.get("/healthz", function (req, res) {
  res.send("I am happy and healthy\n");
});

app.use("/upload", uploadRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/periods", periodsRoutes);
app.use("/tasks", taskRoutes);

export default app;
