//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const {runSearch} = require("./index.js")

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
  