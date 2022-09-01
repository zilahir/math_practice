import { Router } from "express";
import { body } from "express-validator";

import { createUser, loginUser } from "./user.controller";
import {
  validateNewUserRequest,
  checkForEmail,
  getUserByEmail,
  veryRequiredLoginFields,
} from "./user.middlewares";
import { errorMessages } from "../utils/errorMessages";

const router = Router();

router.post("/", [
  body("email").isEmail().withMessage(errorMessages.wrongEmail),
  body("password")
    .isLength({ min: 5 })
    .withMessage(errorMessages.wrongPassword),
  validateNewUserRequest,
  checkForEmail,
  createUser,
]);

router.get("/:userId", [
  // get a single user
]);

router.post("/login", [veryRequiredLoginFields, getUserByEmail, loginUser]);

router.delete("/:userId", [
  // delete user
]);

export default router;
