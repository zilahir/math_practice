import { Router } from "express";

import { createNewTask, getAllTasks, getTaskById } from "./tasks.controller";

const router = Router();

router.post("/", [createNewTask]);

router.get("/all", [getAllTasks]);

router.get("/:taskId", [getTaskById]);

export default router;
