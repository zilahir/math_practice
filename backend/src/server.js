import morgan from "morgan";
import express from "express";
import path from "path";

import dotenv from "dotenv";

// import database from "./database";
import uploadRoutes from "./files/routes.files";
import userRoutes from "./user/user.routes";
import categoriesRoutes from "./categories/categories.routes";
import periodsRoutes from "./periods/periods.routes";
import taskRoutes from "./tasks/tasks.routes";
import systemRouter from "./system/system.routes";

dotenv.config();

const app = express();

app.use(morgan("common"));
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "../", "public")));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.get("/", function (req, res) {
  res.status(200).send({
    prod: true,
    timestamp: new Date().getTime(),
  });
});

app.get("/healthz", function (req, res) {
  res.send("I am happy and healthy\n");
});

app.use("/upload", uploadRoutes);
app.use("/user", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/periods", periodsRoutes);
app.use("/tasks", taskRoutes);

app.use("/system", systemRouter);

export default app;
