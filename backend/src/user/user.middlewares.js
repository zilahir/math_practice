import { validationResult } from "express-validator";

import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password } = serverConfig.database;

const database = new MySQL(host, port, user, password, "erettsegi");

/**
 * @param request
 * @param response
 * @param next
 */
export function validateNewUserRequest(request, response, next) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(200).json({ errors: errors.array() });
  }

  return next();
}

/**
 * @param request
 * @param response
 * @param next
 */
export async function checkForEmail(request, response, next) {
  const { email } = request.body;

  const sqlQuery = `SELECT email from users WHERE email = '${email}'`;

  const queryResult = await database.query(sqlQuery);

  if (Array.isArray(queryResult) && queryResult.length === 0) {
    // ez az email meg nem regisztralt
    return next();
  }

  response.status(200).send({
    errors: [
      {
        value: email,
        msg: "Az email cím már használatban van!",
      },
    ],
  });
}
