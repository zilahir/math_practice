import { Router } from "express";
import { getAllCategories } from "./categories.controllers";

const router = Router();

router.get("/", [
    getAllCategories
])

export default router;