const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askQuestion();
});

function askQuestion() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all Employees", "View all Employees by Department", "View all Employees by Role","Update Employee", "Add Employee", "Add an Employee role", "Add department", "Quit"]
        },
    ]).then(function (response) {
        if (response.choice === "View all Employees") {
            viewEmployees();
        } else if (response.choice === "View all Employees by Department") {
            viewDepartments();
        } else if (response.choice === "View all Employees by Role") {
            viewRoles();
        } else if (response.choice === "Update Employee") {
            updateEmployee();
        } else if (response.choice === "Add Employee") {
            addEmployee();
        } else if (response.choice === "Add an Employee role") {
            addRole();
        } else if (response.choice === "Add department") {
            addDepartment();
        } else {
            console.log("Have a nice day!");
            connection.end();
        }
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, data) {
        if (err) {
            throw err
        } else {
            console.table(data)
            askQuestion();
        }
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) {
            throw err
        } else {
            console.table(data)
            askQuestion();
        }
    })
}

function viewRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) {
            throw err
        } else {
            console.table(data)
            askQuestion();
        }
    })
}

function addEmployee() {
    connection.query("SELECT * FROM role", function(err,data){
        if (err){
            throw err
        }
        let roleArray = data.map(function(role){
            return {
                name: role.title,
                value: role.department_id
            }
        })
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
                type: "list",
                message: "What is the Employee's role?",
                choices: roleArray
            }
        ]).then(function (response) {
            let query = "INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)"
            connection.query(query, [response.first_name, response.last_name, response.employee_role], function (err, res) {
                if (err) {
                    throw err
                }
                console.log("Added Employee!")
                askQuestion();
            })
        })
    })
}

function addRole() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) {
            throw err
        }
        let depArray = data.map(function (dep) {
            return {
                name: dep.name,
                value: dep.id
            }
        })
        inquirer.prompt([
            {
                name: "role_title",
                type: "input",
                message: "What is the title of the Employee's role?"
            },
            {
                name: "role_salary",
                type: "number",
                message: "What is the salary of the Employee's role?"
            },
            {
                name: "role_id",
                type: "list",
                message: "What is the department of the Employee's role?",
                choices: depArray
            },
        ]).then(function (response) {
            let query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)"
            connection.query(query, [response.role_title, response.role_salary, response.role_id], function (err, res) {
                if (err) {
                    throw err
                }
                console.table(res)
                askQuestion();
            })
        })
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            name: "department_title",
            type: "input",
            message: "What department would you like to add?"
        },
    ]).then(function (response) {
        let query = "INSERT INTO department (name) VALUES (?)"
        connection.query(query, [response.department_title], function (err, res) {
            if (err) {
                throw err
            }
            console.table(res)
            askQuestion();
        })
    })
}

function updateEmployee(){
    console.log("yay!")
    //  inquirer.prompt([
    //      {
    //         name: "update_employee",
    //         type: "input",
    //         message: "Which employee would you like to update?"
    //      },
    //  ]).then(function(response){
    //      let query = "UPDATE employees SET ? WHERE ?"
    //      connection.query(query, [response])
    //  })
}