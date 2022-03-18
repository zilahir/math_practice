import { Router } from "express";
import { test } from "./controller";

const router = Router();

router.get('/test', [
    test()
])