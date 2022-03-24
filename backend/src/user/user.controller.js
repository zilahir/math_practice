import { serverConfig } from "../config"
import MySQL from "../db/MySQL"

const { host, port, user, password } = serverConfig.database

const database = new MySQL(host, port, user, password, "erettsegi")

// todo
// create new user
// get user by user id
// delete user by user id


export async function createUser(request, response) {
    const { email, password } = request.body
    if (!email || !password) {
        response.status(500).send({
            error: true,
            message: "Hibás request"
        })
    }
    if (email.length !== 0 && password.length !== 0) {
        // input is ok
        const newUser = await database.query(`INSERT INTO users (email, passw) VALUES ("${email}", "${password}")`)
        response.status(200).send({
            success: true,
            newUser: {
                ...newUser
            }
        })
    }
}

