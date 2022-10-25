import { validationResult } from "express-validator";
import { has } from "lodash";

import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password, dbName } = serverConfig.database;

const database = new MySQL(host, port, user, password, dbName);

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
export async function getUserByEmail(request, response, next) {
  const { email } = request.body;

  const sqlQuery = `SELECT * from users WHERE email = '${email}'`;
  const queryResult = await database.query(sqlQuery);

  if (Array.isArray(queryResult) && queryResult.length === 1) {
    // megvan a user
    request.user = queryResult[0];
    return next();
  }

  return response.status(404).send({
    errors: [
      {
        value: email,
        msg: `Nincs felhasználó a(z) ${email} e-mail címmel `,
      },
    ],
  });
}

/**
 * @param request
 * @param response
 * @param next
 */
export async function checkForEmail(request, response, next) {
  const { email } = request.body;

  const sqlQuery = `SELECT * from users WHERE email = '${email}'`;

  const queryResult = await database.query(sqlQuery);

  if (Array.isArray(queryResult) && queryResult.length === 0) {
    // ez az email meg nem regisztralt
    return next();
  }

  response.status(200).send({
    errors: [
      {
        value: email,
        msg: "Az e-mail cím már használatban van!",
      },
    ],
  });
}

/**
 * @param request
 * @param response
 * @param next
 */
export function veryRequiredLoginFields(request, response, next) {
  if (has(request.body, "email") && has(request.body, "password")) {
    // password és email megvannak
    return next();
  }

  return response.status(500).send({
    error: true,
  });
}
