//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
const { builtinModules } = require("module");

//Prompt inquirer to start app
module.exports = {
runSearch:function(){
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
      .then(function({action}) {
        //For answers with the word Add, perform add function
        if(action.match(/Add/g)) {
            add(action)
        }
        //for answers with the word Update, perform update function
        if(action.match(/Update/g)) {
            update(action)
        }
        //for answers with the word View, perform view function
        if(action.match(/View/g)) {
            view(action)
        }
        //for answers with the word Delete, perform delete function
        // if(action.match(/Delete/g)) {
        //     delete(action)
        // }
      });
  },
  //add function based on key words in inquirer answers

  add:function(action){  //add 3 more of these functions.
    if(action.match(/role/g)){
        inquirer
      .prompt({
        name: "role",
        type: "input",
        message: "What role do you want to add?"
      })
      .then(function(answer) {
        //connection query to add role to table

        // var query = "SELECT position, song, year FROM top5000 WHERE ?";
        // connection.query(query, { artist: answer.artist }, function(err, res) {
        //   for (var i = 0; i < res.length; i++) {
        //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        //   }
          runSearch();
        });
      }
      //add new employee's first and last name, role, and department to table
      if(action.match(/employee/g)){
        inquirer
      .prompt({
        name: "employeeFirst",
        type: "input",
        message: "What is the employee's first name?"
      },
      {
        name:  "employeeLast",
        type: "input",
        message: "What is the employee's last name'?"
      })
      .then(function(answer) {
        //connection query to display list of employee roles to choose from

        // var query = "SELECT position, song, year FROM top5000 WHERE ?";
        // connection.query(query, { artist: answer.artist }, function(err, res) {
        //   for (var i = 0; i < res.length; i++) {
        //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        //   }

        //connection query to display list of employee managers to choose from

          runSearch();
        });
      }
      if(action.match(/department/g)){
        inquirer
      .prompt({
        name: "department",
        type: "input",
        message: "What department do you want to add?"
      })
      .then(function(answer) {
        //connection query to add department

        // var query = "SELECT position, song, year FROM top5000 WHERE ?";
        // connection.query(query, { artist: answer.artist }, function(err, res) {
        //   for (var i = 0; i < res.length; i++) {
        //     console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
        //   }
          runSearch();
        });
      }
    },

    view:function(action){  //add 3 more of these functions.
      if(action.match(/roles/g)){
        //connection query to display list of employee roles  
        runSearch();
      }
      if(action.match(/employees/g)){
        //connection query to display list of employees
        runSearch();
      }
      if(action.match(/departments/g)){
        //connection query to display list of departments
        runSearch();
      }
      },
    
  
  
//   function multiSearch() {
//     var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//     connection.query(query, function(err, res) {
//       for (var i = 0; i < res.length; i++) {
//         console.log(res[i].artist);
//       }
//       runSearch();
//     });
//   }
  
//   function rangeSearch() {
//     inquirer
//       .prompt([
//         {
//           name: "start",
//           type: "input",
//           message: "Enter starting position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         },
//         {
//           name: "end",
//           type: "input",
//           message: "Enter ending position: ",
//           validate: function(value) {
//             if (isNaN(value) === false) {
//               return true;
//             }
//             return false;
//           }
//         }
//       ])
//       .then(function(answer) {
//         var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//         connection.query(query, [answer.start, answer.end], function(err, res) {
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               "Position: " +
//                 res[i].position +
//                 " || Song: " +
//                 res[i].song +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Year: " +
//                 res[i].year
//             );
//           }
//           runSearch();
//         });
//       });
//   }
  
//   function songSearch() {
//     inquirer
//       .prompt({
//         name: "song",
//         type: "input",
//         message: "What song would you like to look for?"
//       })
//       .then(function(answer) {
//         console.log(answer.song);
//         connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//           console.log(
//             "Position: " +
//               res[0].position +
//               " || Song: " +
//               res[0].song +
//               " || Artist: " +
//               res[0].artist +
//               " || Year: " +
//               res[0].year
//           );
//           runSearch();
//         });
//       });
//   }
  
//   function songAndAlbumSearch() {
//     inquirer
//       .prompt({
//         name: "artist",
//         type: "input",
//         message: "What artist would you like to search for?"
//       })
//       .then(function(answer) {
//         var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//         query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//         query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";
  
//         connection.query(query, [answer.artist, answer.artist], function(err, res) {
//           console.log(res.length + " matches found!");
//           for (var i = 0; i < res.length; i++) {
//             console.log(
//               i+1 + ".) " +
//                 "Year: " +
//                 res[i].year +
//                 " Album Position: " +
//                 res[i].position +
//                 " || Artist: " +
//                 res[i].artist +
//                 " || Song: " +
//                 res[i].song +
//                 " || Album: " +
//                 res[i].album
//             );
//           }
  
//           runSearch();
//         });
//       });
//   }
}