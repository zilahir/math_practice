import crypto from "crypto";

import { serverConfig } from "../config";
import MySQL from "../db/MySQL";

const { host, port, user, password } = serverConfig.database;

const database = new MySQL(host, port, user, password, "erettsegi");

/*
  // TODO: 
  2) az email létezik-e az adatbázisban
*/

/**
 * @param request
 * @param response
 */
export async function createUser(request, response) {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(500).send({
      error: true,
      message: "Hibás request",
    });
  }
  if (email.length !== 0 && password.length !== 0) {
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
}
