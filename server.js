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
        "View employees by manager",
        "View roles",
        "View the total utilized budget of each department",
        "Update employee role",
        "Update an employee's manager",
        "Delete an employee",
        "Delete a role",
        "Delete a department",
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
        case "Delete an employee":
          deleteEmployee();
          break;
        case "Delete a role":
          deleteRole();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "Update an employee's manager":
          updateEmployeeManager();
          break;
        case "View employees by manager":
          employeesByManager();
          break;
        case "View the total utilized budget of each department":
          viewDepartmentBudgets();
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
        }
      );
    });
}
//add role function
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
      //connection query to add role
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
          viewRoles();
        }
      );
    });
}
function viewDepartments() {
  //connection query to view departments
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function viewRoles() {
  //connection query to view employee roles
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function viewEmployees() {
  //connection query to view employees
  const query =
    "SELECT employee.id, first_name, last_name, manager_id, title, salary, name FROM employee\
    LEFT JOIN role\
    ON employee.role_id = role.id\
    LEFT JOIN department\
    ON role.department_id = department.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function employeesByManager() {
  //connection query to view employees by manager
  const query =
    "SELECT employee.id, first_name, last_name, manager_id, title, salary, name FROM employee\
    LEFT JOIN role\
    ON employee.role_id = role.id\
    LEFT JOIN department\
    ON role.department_id = department.id\
    ORDER BY manager_id asc;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function viewDepartmentBudgets() {
  //connection query to view departent budgets (sum of salaries within each department)
  const query =
    "SELECT name, SUM(salary) FROM department\
      LEFT JOIN role\
      ON role.department_id = department.id\
      GROUP BY department_id\
      ORDER BY salary asc;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}
function updateRole() {
  //function to update an employee's role
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
function deleteEmployee() {
  //function to delete an employee
  inquirer
    .prompt([
      {
        name: "employeeToDelete",
        type: "input",
        message: "What is the id of the employee you would like to delete?",
      },
    ])
    .then(function (answer) {
      //connection query to update employee's role
      const query = "DELETE FROM employee WHERE ?;";
      connection.query(
        query,
        [
          {
            id: answer.employeeToDelete,
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

//delete role function
function deleteRole() {
  inquirer
    .prompt([
      {
        name: "roleToDelete",
        type: "input",
        message: "What is the id of the role you want to delete?",
      },
    ])
    .then(function (answer) {
      //connection query to delete role
      const query = "DELETE FROM role WHERE ?;";
      connection.query(
        query,
        {
          id: answer.roleToDelete,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          viewRoles();
        }
      );
    });
}

//delete department function
function deleteDepartment() {
  inquirer
    .prompt({
      name: "departmentToDelete",
      type: "input",
      message: "What is the id of the department you want to delete?",
    })
    .then(function (answer) {
      //connection query to delete department
      const query = "DELETE FROM department WHERE ?;";
      connection.query(
        query,
        {
          id: answer.departmentToDelete,
        },
        function (err, res) {
          if (err) throw err;
          viewDepartments();
        }
      );
    });
}
//function to update an employee's manager
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        name: "employeeToUpdate",
        type: "input",
        message: "What is the id of the employee would you like to update?",
      },
      {
        name: "employeeNewManager",
        type: "input",
        message: "What is the id of the employee's new manager?",
      },
    ])
    .then(function (answer) {
      //connection query to update employee's role
      const query = "UPDATE employee SET ? WHERE ?;";
      connection.query(
        query,
        [
          {
            manager_id: answer.employeeNewManager,
          },
          {
            id: answer.employeeToUpdate,
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
