var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "jaeshin2ek",
  database: "employeesDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  askQuestion();
});

function askQuestion() {
    inquirer.prompt([
        {
            name:"choice",
            type:"list",
            message: "What would you like to do?",
            choices: ["View all Employees", "View all Employees by Department", "View all Employees by Role", "Add Employee", "Quit"]
        },
    ]).then(function(response){
        if(response.choice === "View all Employees"){
            viewEmployees();
        } else if (response.choice === "View all Employees by Department"){
            viewDepartments();
        } else if (response.choice === "View all Employees by Role"){
            viewRoles();
        } else if (response.choice === "Add Employee"){
            addEmployee();
        } else {
            console.log("Have a nice day!");
            connection.end();
        }
    })
}

function viewEmployees(){
    console.log("Employees!")
    askQuestion();
}

function viewDepartments(){
    console.log("Department!")
    askQuestion();
}

function viewRoles(){
    console.log("Roles!")
    askQuestion();
}

function addEmployee(){
    console.log("Add!")
    askQuestion();
}