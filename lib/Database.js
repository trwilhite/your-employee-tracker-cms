const db = require('../db/connection');

class Database {
    constructor(db) {
        this.db = db;
    }

    viewDepartments() {
        const sql = 'SELECT * FROM departments';
        this.db.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    }

    viewRoles() {
        const sql = `SELECT * FROM roles`;
        this.db.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    }

    viewEmployees() {
        const sql = `SELECT * FROM employees`;
        this.db.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    }

}

module.exports = new Database(db);