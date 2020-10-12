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
    connection.query("SELECT * FROM employees", function(err,data){
        if(err){
            throw err
        } else {
            console.table(data)
            askQuestion();
        }
    })
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
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the Employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the Employee's last name?"
        },
        {
            name: "employee_role",
            type: "input",
            message: "What is the Employee's role?"
        },
        {
            name: "manager_ID",
            type: "input",
            message: "Who is the Employee's manager?"
        },
    ]).then(function(response){
        let query = "INSERT INTO employees (first_name, last_name) VALUES (?,?)"
        connection.query(query, [response.first_name, response.last_name], function(err,res){
            if (err){
                throw err
            }
            console.table(res)
            askQuestion();
        })
    })  
}