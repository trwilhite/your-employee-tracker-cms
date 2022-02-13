const db = require('../db/connection');
const inquirer = require('inquirer');
// const promptUser = require('../index');

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
        const sql = `SELECT 
                        roles.id, 
                        roles.title, 
                        roles.salary, 
                        departments.name AS department 
                    FROM roles 
                    LEFT JOIN departments on roles.department_id = departments.id`;
        this.db.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    }

    viewEmployees() {
        const sql = `SELECT
                        employees.id,
                        employees.first_name,
                        employees.last_name,
                        employees.manager_id,
                        roles.title AS title,
                        roles.salary AS salary,
                        departments.name AS department    
                    FROM employees
                    LEFT JOIN roles on employees.role_id = roles.id
                    LEFT JOIN departments on roles.department_id = departments.id`;
        this.db.query(sql, (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    }

    addDepartment(department) {
        const sql = `INSERT INTO departments SET ?`
        this.db.query(sql, department, (err, res) => {
            if (err) throw err;
            console.table(res)
        });
    }

}

module.exports = new Database(db);