import { Router } from "express";
import {
  insertNewPeriod,
  getAllPeriods,
  insertMultiplePeriods,
} from "./periods.controllers";

const router = Router();

router.post("/", [insertNewPeriod]);
router.post("/insert-multiple", [insertMultiplePeriods]);
router.get("/", [getAllPeriods]);

export default router;
