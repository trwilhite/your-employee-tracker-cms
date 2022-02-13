const db = require('../db/connection');
// const inquirer = require('inquirer');
// const promptUser = require('../index');

class Database {

    viewDepartments() {
        const sql = 'SELECT * FROM departments';
        return db.promise().query(sql)
    }

    viewRoles() {
        const sql = `SELECT 
                        roles.id, 
                        roles.title, 
                        roles.salary, 
                        departments.name AS department 
                    FROM roles 
                    LEFT JOIN departments on roles.department_id = departments.id`;
        return db.promise().query(sql)
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
        return db.promise().query(sql)
    }

    addDepartment(department) {
        const sql = `INSERT INTO departments SET ?`
        db.promise().query(sql, department)
    }

    addRole(role) {
        const sql = `INSERT INTO roles SET ?`
        db.promise().query(sql, role)
    }

}

module.exports = new Database(db);