import { Router } from "express";
import { upload } from "./storage";

import uploadFile from "./upload/upload.controller";


const router = Router();

router.post('/', [
    upload.single("file"), uploadFile
])

export default router;