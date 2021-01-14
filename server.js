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
        viewDepartments();
        // runSearch();
      });
    });
}

//add employee function
function addEmployee() {
  let arr = connection.query("SELECT title FROM role", function (err, res) {
    if (err) throw err;
    return res.map((item) => {
      return item.title;
    });
  });

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
        type: "choice",
        message: "Choose employee's role.",
        choices: [arr],
      },
    ])
    .then(function (answer) {
      console.log(answer.newEmployeeRole);
      //connection query to add employee
      // const query =
      //   "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?);";
      // connection.query(
      //   query,
      //   {
      //     first_name: answer.newEmployeeFirst,
      //     last_name: answer.newEmployeeLast,
      //     role_id: answer.newEmployeeRole,
      //   },
      //   function (err, res) {
      //     if (err) throw err;
      //     console.table(res);
      //     viewEmployees();
      //   }
      // );
    });
}
function addRole() {
  //   inquirer
  //     .prompt({
  //       name: "department",
  //       type: "input",
  //       message: "What department do you want to add?"
  //     })
  //     .then(function(answer) {
  //       //connection query to add department
  //       const query = "INSERT INTO department SET ?;";
  //       connection.query(query, { name: answer.department }, function(err, res) {
  //         viewDepartments();
  //         // runSearch();
  //       });
  // })
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
// function updateRole () {
//   const roleQuery = 'SELECT * FROM employee'
//   connection.query(roleQuery, function (err, res) {
//     if (err) throw err;
//   inquirer
//   .prompt([
//     {
//     name: "employeeUpdate",
//     type: "list",
//     message: "Which employee would you like to update?",
//     choices: function () {
//       const employeeInfo = [];
//       for (let i = 0; i < res.length; i++) {
//         let employeeName = res[i].first_name + " " + res[i].last_name
//         employeeInfo.push(employeeName);
//       }
//       return employeeInfo;
//     },
//     },

//   //FIX THIS SO THE UPDATE FUNCTION WORKS!!
//     {
//     name: "updatedRole",
//     type: "list",
//     message: "New role of employee?",
//     choices: function () {
//       const roles = [];
//       connection.query('SELECT * FROM role', function(err, response){
//         if (err) throw err;
//         for (let i = 0; i < response.length; i++) {
//         let employeeRoles = response[i].title
//         roles.push(employeeRoles);
//       }
//       return roles;
//       })

//     }
//   }]
//   ).then(function(answer) {
//     const query = 'UPDATE employee SET title = ? WHERE last_name = ?'
//       connection.query(query, {title: answer.updatedRole, last_name: answer.employeeUpdate}, function (err, res) {

//         if (err) throw err;
//           console.table(res)
//       })
//   })

// })}
