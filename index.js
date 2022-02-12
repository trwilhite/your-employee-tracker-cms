const inquirer = require('inquirer');
const db = require('./db/connection');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'department',
            message: 'Select the department?',
            choices: ['Department'],
        }
    ])
        .then(choices => { 
            db.query('SELECT * FROM departments', (tables) => {
                console.table(tables)
            });
        })
}

promptUser();
