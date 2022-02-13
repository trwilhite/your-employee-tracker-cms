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

    viewEmployees(orderSeq = '') {
        const sql = `SELECT
                        employees.id,
                        employees.first_name,
                        employees.last_name,
                        roles.title AS title,
                        roles.salary AS salary,
                        departments.name AS department, 
                        x.last_name AS manager,  
                        employees.manager_id
                    FROM employees
                    LEFT JOIN roles on employees.role_id = roles.id
                    LEFT JOIN departments on roles.department_id = departments.id
                    LEFT JOIN employees x on employees.manager_id = x.id
                    ${orderSeq}`;
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

    addEmployee(newEmployee) {
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES (?, ?, ?, ?)`
        db.promise().query(sql, newEmployee)
    }

    viewBudget() {
        const sql = `SELECT departments.name AS Department, 
                    SUM(roles.salary) AS Budget
                    FROM employees
                    LEFT JOIN roles on employees.role_id = roles.id
                    LEFT JOIN departments on roles.department_id = departments.id
                    GROUP BY departments.name;`
        return db.promise().query(sql);
    }

}

module.exports = new Database(db);