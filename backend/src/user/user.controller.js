/* eslint-disable no-extra-boolean-cast */
import crypto from "crypto";

import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password, dbName } = serverConfig.database;

const database = new MySQL(host, port, user, password, dbName);

/**
 * @param request
 * @param response
 */
export async function createUser(request, response) {
  const { email, password } = request.body;
  // input is ok
  const salt = crypto.randomBytes(16).toString("base64");
  const hash = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("base64");
  const hashedPassword = `${salt}$${hash}`;
  const newUser = await database.query(
    `INSERT INTO users (email, passw) VALUES ("${email}", "${hashedPassword}")`
  );
  response.status(200).send({
    success: true,
    newUser: {
      ...newUser,
    },
  });
}

/**
 * @param request
 * @param response
 */
export function loginUser(request, response) {
  const { password } = request.body;
  const { user } = request;
  // check password

  const userPassword = user.passw;

  const passwordFields = userPassword.split("$");
  const salt = passwordFields[0];
  const hash = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("base64");
  if (hash === passwordFields[1]) {
    // password is OK
    return response.status(200).send({
      loginSuccess: true,
      user: {
        id: user.id,
        email: user.email,
        is_admin: user.is_admin,
        userLevel: Boolean(user.is_admin) ? "ADMIN" : "USER",
      },
    });
  } else {
    return response.status(500).send({
      loginSuccess: false,
      errors: [
        {
          value: "password",
          msg: "Hibás jelszó",
        },
      ],
    });
  }
}
