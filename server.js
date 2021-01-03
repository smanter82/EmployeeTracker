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
    database: "employeeTracker"
  });
  //Connect to database, running runSearch, which wil start the app
  connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
  
    inquirer
      .prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          //required
          "Add a department",  
          "Add an employee",  
          "Add a role",  
          "View departments",  
          "View employees",  
          "View roles",  

          //bonus
          //"View employees by manager", 
          // "Delete a department",  
          // "Delete an employee",  
          // "Delete a role",  

          //required
          "Update employee role", 

          //bonus
          // "Update employee manager",  
        ]
      })
      //Perform functions based on key words in inquirer responses
      .then(function(answers) {
        //For answers with the word Add, perform add function
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
        };
      })
      .catch((err) => console.log(err))

  };
  //add function based on key words in inquirer answers
  function addDepartment () {
    inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "What department do you want to add?"
      })
      .then(function(answer) {
        //connection query to add department
        const query = "INSERT INTO department SET ?;";
        connection.query(query, { name: answer.department }, function(err, res) {
          viewDepartments();
          // runSearch();
        });
  })
  };
  function addEmployee () {
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
  };
  function addRole () {
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
  };
  function viewDepartments () {
    //connection query to view department
    const query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
      if (err) throw err;
        console.table(res)
        runSearch();
    })
  }
  function viewRoles () {
    //connection query to view department
    const query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
      if (err) throw err;
        console.table(res)
        runSearch();
    })
  }
  function viewEmployees () {
    //connection query to view department
    const query = 'SELECT * from role \
         JOIN employee \
         ON employee.role_id = role.id;';
    connection.query(query, function (err, res) {
      if (err) throw err;
        console.table(res)
    })
  }
  function updateRole () {
    inquirer
    .prompt(
      {
      name: "employeeUpdate",
      type: list,
      message: "Last name of employee to be updated?",
      choices []
    },
    {
      name: "updatedRole",
      type: list,
      message: "New role of employee?",
      choices []
    }
    ).then(function(answer) {
      const query = 'UPDATE employee SET title = ? WHERE last_name = ?'
        connection.query(query, {title: answer.updatedRole, last_name: answer.employeeUpdate}, function (err, res) {
          
          if (err) throw err;
            console.table(res)
        })
    })
    
  }
  // add:function(action){  //add 3 more of these functions.
  //   if(action.match(/role/g)){
  //       inquirer
  //     .prompt({
  //       name: "role",
  //       type: "input",
  //       message: "What role do you want to add?"
  //     })
  //     .then(function(answer) {
  //       //connection query to add role to table
  //       inquire
  //       .prompt(
  //       {
  //         name: "newRoleSalary",
  //         type: "input",
  //         message: "What is the salary of the new role?"
  //       },
  //       {
  //         name: "newRoleDepartment",
  //         type: "input",
  //         message: "What is the new role's department id?"
  //       }
  //       )
  //       var query = "SELECT position, song, year FROM top5000 WHERE ?";
  //       // connection.query(query, { artist: answer.artist }, function(err, res) {
  //       //   for (var i = 0; i < res.length; i++) {
  //       //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
  //       //   }
  //         runSearch();
  //       });
  //     }
  //     //add new employee's first and last name, role, and department to table
  //     if(action.match(/employee/g)){
  //       inquirer
  //     .prompt({
  //       name: "employeeFirst",
  //       type: "input",
  //       message: "What is the employee's first name?"
  //     },
  //     {
  //       name:  "employeeLast",
  //       type: "input",
  //       message: "What is the employee's last name'?"
  //     })
  //     .then(function(answer) {
  //       //connection query to display list of employee roles to choose from

  //       // var query = "SELECT position, song, year FROM top5000 WHERE ?";
  //       // connection.query(query, { artist: answer.artist }, function(err, res) {
  //       //   for (var i = 0; i < res.length; i++) {
  //       //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
  //       //   }

  //       //connection query to display list of employee managers to choose from

  //         runSearch();
  //       });
  //     