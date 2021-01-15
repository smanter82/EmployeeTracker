//FINISH ADD ROLE, ADD EMPLOYEE, AND SECOND HALF OF UPDATE ROLE FUNCTIONS

//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//Configure connection to database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "SeptemberBC2020!",
  database: "employeeTracker",
  multipleStatements: true,
});
//Connect to database, running runSearch, which wil start the app
connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

//Start App
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      pageSize: 10,
      choices: [
        //required
        "Add a department",
        "Add an employee",
        "Add a role",
        "View departments",
        "View employees",
        "View roles",
        "Update employee role",

        //bonus
        //"View employees by manager",
        // "Delete a department",
        // "Delete an employee",
        // "Delete a role",

        //required

        //bonus
        // "Update employee manager",
      ],
    })
    //Perform functions based on inquirer responses
    .then(function (answers) {
      switch (answers.action) {
        case "Add a department":
          addDepartment();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "View roles":
          viewRoles();
          break;
        case "Update employee role":
          updateRole();
          break;
      }
    })
    .catch((err) => console.log(err));
}
//add department function
function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What department do you want to add?",
    })
    .then(function (answer) {
      //connection query to add department
      const query = "INSERT INTO department SET ?;";
      connection.query(query, { name: answer.department }, function (err, res) {
        if (err) throw err;
        viewDepartments();
        runSearch();
      });
    });
}

//add employee function
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "newEmployeeFirst",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "newEmployeeLast",
        type: "input",
        message: "What is the employee's last name'?",
      },
      {
        name: "newEmployeeRole",
        type: "input",
        message: "What is employee's role id?",
      },
      {
        name: "newEmployeeManager",
        type: "input",
        message: "What is the employee's manager's ID?",
      },
    ])
    .then(function (answer) {
      //connection query to add employee
      const query = "INSERT INTO employee SET ?;";
      connection.query(
        query,
        {
          first_name: answer.newEmployeeFirst,
          last_name: answer.newEmployeeLast,
          role_id: answer.newEmployeeRole,
          manager_id: answer.newEmployeeManager,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          viewEmployees();
          runSearch();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "role",
        type: "input",
        message: "What role do you want to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "Using only numbers, what is the salary of the new role?",
      },
      {
        name: "newRoleDepartment",
        type: "input",
        message: "What is the new role's department id?",
      },
    ])
    .then(function (answer) {
      //connection query to add department
      const query = "INSERT INTO role SET ?;";
      connection.query(
        query,
        {
          title: answer.role,
          salary: answer.salary,
          department_id: answer.newRoleDepartment,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
}
function viewDepartments() {
  //connection query to view department
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function viewRoles() {
  //connection query to view department
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function viewEmployees() {
  //connection query to view department
  const query =
    "SELECT * from employee \
      JOIN role \
      ON employee.role_id = role.id \
      JOIN department \
      ON role.department_id = department.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function updateRole() {
  inquirer
    .prompt([
      {
        name: "employeeUpdate",
        type: "input",
        message: "What is the id of the employee would you like to update?",
      },
      {
        name: "employeeNewRole",
        type: "input",
        message: "What is the employee's new role id?",
      },
    ])
    .then(function (answer) {
      //connection query to update employee's role
      const query = "UPDATE employee SET ? WHERE ?;";
      connection.query(
        query,
        [
          {
            role_id: answer.employeeNewRole,
          },
          {
            id: answer.employeeUpdate,
          },
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          viewEmployees();
        }
      );
    });
}
