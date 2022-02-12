const inquirer = require('inquirer');
const db = require('./db/connection');

const promptUser = async () => {
    let data = await inquirer.prompt([
        {
            type: 'list',
            name: 'selections',
            message: 'What would you like to do?',
            choices: [
            'View All Departments', 
            'View All Roles', 
            'View All Employees', 
            'Add a Department', 
            'Add a Role', 
            'Add an Employee', 
            'Update an Employee Role'],
        }
    ]);
    switch(data.selections) {
        case 'View All Departments':
            return viewDepartments();
        case 'View All Roles':
            return viewRoles();
        case 'View All Employees':
            return viewEmployees();
        case 'Add a Department':
            return addDepartment();
        case 'Add a Role':
            return addRole();
        case 'Add an Employee':
            return addEmployee();
        case 'Update an Employee Role':
            return updateEmployee();
    }
}

promptUser();
