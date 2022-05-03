import { Router } from "express";

import { createNewTask } from "./tasks.controller";

const router = Router();

router.post("/", [createNewTask]);

export default router;
