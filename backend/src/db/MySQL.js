import mysql from "mysql2";

class MySQL {
  constructor(host, port, user, password, database) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database =
      process.env.ENVIRONMENT === "production" ? database : "erettsegi";
    this.port = port;
    this.connection = mysql.createPool({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
    });
  }

  convertQueryResultToObject(queryResult) {
    return JSON.parse(JSON.stringify(queryResult));
  }

  query(queryToExecute) {
    return new Promise((resolve, reject) => {
      this.connection.query(queryToExecute, (err, result) => {
        if (err) {
          reject(err);
          console.log("mysqlError", err);
        }
        resolve(this.convertQueryResultToObject(result));
      });
    });
  }

  cloeConnection() {
    return this.connection.destroy();
  }
}

export default MySQL;
