import { Router } from "express";

import {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  modifyTask,
} from "./tasks.controller";

const router = Router();

router.post("/", [createNewTask]);
router.get("/all", [getAllTasks]);
router.get("/:taskId", [getTaskById]);
router.post("/delete", [deleteTaskById]);
router.patch("/", [modifyTask]);

export default router;
