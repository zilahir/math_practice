import { Router } from "express";
import { upload } from "./storage";

import uploadFile, { saveImageInDatabase } from "./upload/upload.controller";

const router = Router();

router.post("/", [upload.single("file"), uploadFile, saveImageInDatabase]);

export default router;
