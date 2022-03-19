import { serverConfig } from "../config"
import MySQL from "../db/MySQL"

const { host, port, user, password } = serverConfig.database

const database = new MySQL(host, port, user, password, "test")

export async function test(request, response) {
    const testQuery = await database.query('SELECT * FROM table_1');
    response.status(200).send({
        queryResult: testQuery,
    })
}