const inquirer = require('inquirer');
const Database = require('./lib/Database');
const cTable = require('console.table')

// credit to Chris Backes - function to delay the prompt from reappearing until after the table functions have finished executing to improve user experience
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

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
            'Update an Employee Role',
            'View Total Utilized Budget',
            'View Employees By Manager',
            'View Employees By Department',
            'Quit'],
        }
    ]);
    respondUser(data.selections);
};

const respondUser = async (selections) => {
    switch(selections) {
        case 'View All Departments':
            const [viewDepartments] = await Database.viewDepartments();
            console.table(viewDepartments);
            break;
        case 'View All Roles':
            const [viewRoles] = await Database.viewRoles();
            console.table(viewRoles);
            break;
        case 'View All Employees':
            const [viewEmployees] = await Database.viewEmployees();
            console.table(viewEmployees)
            break;
        case 'Add a Department':
            await promptAddDepartment();
            break;
        case 'Add a Role':
            await promptAddRole();
            break;
        case 'Add an Employee':
            await promptAddEmployee();
            break;
        case 'Update an Employee Role':
            await promptUpdateEmployee();
            break;
        case  'View Total Utilized Budget':
            const [viewBudget] = await Database.viewBudget();
            console.table(viewBudget);
            break;
        case 'View Employees By Manager':
            const [viewEmployeesByManager] = await Database.viewEmployees('ORDER BY manager');
            console.table(viewEmployeesByManager)
            break;
        case 'View Employees By Department':
            const [viewEmployeesByDepartment] = await Database.viewEmployees('ORDER BY department');
            console.table(viewEmployeesByDepartment)
            break;
        case 'Quit':
			console.log("You have successfully quit the application. Goodbye!");
			await sleep();
			return process.exit();
    }
    await sleep();
    promptUser();
}

const promptAddDepartment = async () => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department you would like to add:'
        },
    ]);
    Database.addDepartment(department);
    console.log(`Added ${department.name} to Departments!`)
}

const promptAddRole = async () => {
    const [departments] = await Database.viewDepartments();

    const depts = departments.map(({ id, name }) => ({
        name: name,
        value: id,
    }));

    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role you would like to add:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role you would like to add:',
            // validate that the user input was a numerical value only
            validate: (salaryInput) => {
                if(/[0-9]/.test(salaryInput)) {
                return true
            } else {
                console.log('Please enter a numerical value!')
            }
        }
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'What department does your new role belong to?',
            choices: depts
        }
    ]);
    Database.addRole(role);
    console.log(`Added ${role.title} to Roles!`)
}

const promptAddEmployee = async () => {
    const [roles] = await Database.viewRoles();
    const rolesObjects = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const [employees] = await Database.viewEmployees('ORDER BY last_name');
    const employeesObjects = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }));

    const newEmployee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee you would like to add:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee you would like to add:',
        },
        {
            type: 'list',
            name: 'role_id',
            message: `What is your new employee's role?`,
            choices: rolesObjects
        },
        {
            type: 'confirm',
            name: 'managerConfirm',
            message: 'Does your new employee have a manager?',
            default: true
        },
        {
            type: 'list',
            name: 'manager_id',
            message: `Who is your new employee's manager?`,
            choices: employeesObjects,
            // this prompt will only run when the managerConfirm prompt returns true
            when: ({ managerConfirm }) => managerConfirm
        }
    ]);

    Database.addEmployee([newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id || null]);
    console.log(`Added ${newEmployee.first_name} to Employees!`)
}

const promptUpdateEmployee = async () => {
    const [roles] = await Database.viewRoles();
    const rolesObjects = roles.map(({ id, title }) => ({
        name: title,
        value: id,
    }));

    const [employees] = await Database.viewEmployees('ORDER BY last_name');
    const employeesObjects = employees.map(({ id, first_name, last_name }) => ({
        name: first_name + ' ' + last_name,
        value: id
    }));

    const update = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: `Please select the employee whose role you would like to update:`,
            choices: employeesObjects
        },
        {
            type: 'list',
            name: 'role_id',
            message: `What is your employee's new role?`,
            choices: rolesObjects
        },
        {
            type: 'confirm',
            name: 'managerConfirm',
            message: 'Does your employee have a new manager?',
            default: true
        },
        {
            type: 'list',
            name: 'manager_id',
            message: `Who is your employee's new manager?`,
            choices: employeesObjects,
            // this prompt will only run when the managerConfirm prompt returns true
            when: ({ managerConfirm }) => managerConfirm
        }
    ]);

    Database.updateEmployee([update.role_id, update.manager_id || null, update.id]);
    console.log(`Your employee's role has been updated!`)    
}

promptUser();
