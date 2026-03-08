const mysql = require("mysql2/promise");

class Database {
    constructor() {
        this.pool = mysql.createPool({
            host: "localhost",
            user: "root",
            password: process.env.DATABASE_PASSWORD,
            database: "shop",
            waitForConnections: true,
            connectionLimit: 10
        });
    }

    connect() {
        return this.pool;
    }
}

module.exports = Database;