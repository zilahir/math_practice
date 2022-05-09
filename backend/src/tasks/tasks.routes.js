import { Router } from "express";

import {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
} from "./tasks.controller";

const router = Router();

router.post("/", [createNewTask]);

router.get("/all", [getAllTasks]);

router.get("/:taskId", [getTaskById]);

router.post("/delete", [deleteTaskById]);

export default router;
