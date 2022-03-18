import mysql from 'mysql';

class MySQL {
    constructor(host, user, database, password) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
        this.connection = mysql.createConnection({
            host: this.host,
            user: this.user,
            database: this.database
        });
    }

    convertQueryResultToObject(queryResult) {
        return JSON.parse((JSON.stringify(queryResult)))
    }

    query(queryToExecute) {
        return new Promise((resolve, reject) => {
            this.connection.query(queryToExecute, (err, result) => {
                if (err) reject(err)
                resolve(this.convertQueryResultToObject(result))
            })
        })
    }

    cloeConnection() {
        return this.connection.destroy()
    }
}

export default MySQL;