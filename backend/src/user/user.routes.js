import { Router } from "express";
import { createUser } from "./user.controller";

const router = Router();

router.post('/', [
    createUser
])

router.get('/:userId', [
    // get a single user
])

router.delete('/:userId', [
    // delete user
])

export default router

