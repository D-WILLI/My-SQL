const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
  
    password: 'Developer21',
    database: 'employees_DB',
  });

  connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

const start = () => {
    inquirer
      .prompt({
        name: 'Choices',
        type: 'list',
        message: 'Would you like to do?',
        choices: ['Add Employee', 'Add Department', 'Add Roles', 'View Departments', 'View Roles', 'View Employees', 'Quit'],
      })
      .then((answer) => {
        if (answer.Choices === 'Add Employee') {
          console.log ('Please add Employee');
          addEmployee();
        } else if (answer.Choices === 'Add Department') {
          console.log ('Please add Department') ; 
        //   addDepartment();
        } else if (answer.Choices === 'Add Roles') {
            console.log ('Please add Department') ; 
            // addRoles(); 
        } else if (answer.Choices === 'View Departments') {
            console.log ('Please add Department') ; 
            // viewDepartment();
        } else if (answer.Choices === 'View Roles') {
            console.log ('Please add Department') ; 
            // viewRoles();
        } else if (answer.Choices === 'View Employees') {
            console.log ('Please add Department') ; 
            // viewEmployee();
        }else {
          connection.end();
        }
      });
  };

  const addEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'What is the employees First Name?',
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'What is the employees Last Name?',
        },
        {
        name: 'title',
        type: 'list',
        message: 'What is the employees title?',
        choices: ['Sales Lead', 'Sales Person', 'Sr. Engineer', 'Software Engineer', 'Accountant', 'Lawyer', 'Account Manager'],
        }, 
        {
        name: 'department',
        type: 'list',
        message: 'What is the Employees Department?',
        choices: ['Sales', 'Engineering', 'Finance', 'Legal Team ',],
        },
        {
        name: 'salary',
        type: 'input',
        message: 'What is the employees salary?',
        },


      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO Employee SET ?',
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
          },

          (err) => {
            if (err) throw err;
            console.log('Employee was added successfully');
            start();
          }
        );
      });
  };