const inquirer = require('inquirer');
const Database = require('./lib/Database');

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
    // respondUser(data.selections);
    switch(data.selections) {
        case 'View All Departments':
            Database.viewDepartments();
            break;
        case 'View All Roles':
            Database.viewRoles();
            break;
        case 'View All Employees':
            Database.viewEmployees();
            break;
        // case 'Add a Department':
        //     return addDepartment();
        // case 'Add a Role':
        //     return addRole();
        // case 'Add an Employee':
        //     return addEmployee();
        // case 'Update an Employee Role':
        //     return updateEmployee();
    }
};


promptUser();
