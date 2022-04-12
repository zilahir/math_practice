import { Router } from "express";
import { insertNewPeriod } from "./periods.controllers";

const router = Router();

router.post("/", [insertNewPeriod]);

export default router;
