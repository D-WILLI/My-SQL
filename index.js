const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
var figlet = require('figlet');

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

  figlet('Employee-Manager', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
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
          addDepartment();
        } else if (answer.Choices === 'Add Roles') {
            console.log ('Please add Department') ; 
            addRoles(); 
        } else if (answer.Choices === 'View Departments') {
            console.log ('Please add Department') ; 
            viewDepartment();
        } else if (answer.Choices === 'View Roles') {
            console.log ('Please add Department') ; 
            viewRoles();
        } else if (answer.Choices === 'View Employees') {
            console.log ('Please add Department') ; 
            viewEmployee();
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
        {
        name: 'manager',
        type: 'input',
        message: 'Please enter your Managers name.' 
        }


      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO Employee SET ?',
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            title: answer.title,
            salary: answer.salary,
            department: answer.department,
            manager: answer.manager
          },

          (err) => {
            if (err) throw err;
            console.log('Employee was added successfully');
            start();
          }
        );
      });
  };


  const addDepartment = () => {
    inquirer
      .prompt([
        {
        name: 'department',
        type: 'input',
        message: 'What is the new Department title?'
        },
      
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO Department SET ?',
          {
            name: answer.department
          },

          (err) => {
            if (err) throw err;
            console.log('Department was added successfully');
            start();
          }
        );
      });
  };

  const addRoles = () => {
    inquirer
      .prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the new roles title?',
            
        }, 

        {
            name: 'salary',
            type: 'input',
            message: 'What is the roles salary?',
        },

        {
            NAME: 'department',
            type: 'input', 
            message: 'What is this roles department?'
        }

      
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO Role SET ?',
          {
            title: answer.title,
            salary: answer.salary
          },

          (err) => {
            if (err) throw err;
            console.log('Department was added successfully');
            start();
          }
        );
      });
  };

  const viewDepartment = () => {
    console.log('Viewing all Departments');
    connection.query('SELECT * FROM Department', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
      start();
    });
  };

  const viewEmployee = () => {
    console.log('Viewing all Employees');
    connection.query('SELECT * FROM Employee', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
      start();
    });
  };

  const viewRoles = () => {
    console.log('Viewing all Roles');
    connection.query('SELECT * FROM Role', (err, res) => {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.table(res);
    //   connection.end();
      start();
    });
  };