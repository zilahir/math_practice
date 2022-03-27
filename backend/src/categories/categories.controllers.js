import { serverConfig } from "../config"
import MySQL from "../db/MySQL"

const { host, port, user, password } = serverConfig.database

const database = new MySQL(host, port, user, password, "erettsegi")

export async function getAllCategories(request, response) {
    const allCategories = await database.query(`SELECT * from categories`);
    return response.status(200).send(allCategories)
}