import { Router } from "express";
import { insertNewPeriod, getAllPeriods } from "./periods.controllers";

const router = Router();

router.post("/", [insertNewPeriod]);

router.get("/", [getAllPeriods]);

export default router;
