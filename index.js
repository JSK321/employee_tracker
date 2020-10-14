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
            choices: ["View all Employees", "View all Departments", "View all Roles", "Add Department", "Add an Employee role", "Add Employee", "Update Employee", "Quit"]
        },
    ]).then(function (response) {
        if (response.choice === "View all Employees") {
            viewEmployees();
        } else if (response.choice === "View all Departments") {
            viewDepartments();
        } else if (response.choice === "View all Roles") {
            viewRoles();
        } else if (response.choice === "Add Department") {
            addDepartment();
        } else if (response.choice === "Add an Employee role") {
            addRole();
        } else if (response.choice === "Add Employee") {
            addEmployee();
        } else if (response.choice === "Update Employee") {
            updateEmployee();
        } else {
            console.log("Have a nice day!");
            connection.end();
        };
    });
};

function viewEmployees() {
    connection.query("SELECT first_name, last_name, title, salary FROM employees INNER JOIN role ON role.id = role_id", function (err, data) {
        if (err) {
            throw err
        } else {
            console.table(data);
            askQuestion();
        };
    });
};

function viewDepartments() {
    connection.query("SELECT name FROM department", function (err, data) {
        if (err) {
            throw err
        } else {
            console.table(data);
            askQuestion();
        };
    });
};

function viewRoles() {
    connection.query("SELECT title, salary FROM role", function (err, data) {
        if (err) {
            throw err
        } else {
            console.table(data);
            askQuestion();
        };
    });
};

function addEmployee() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) {
            throw err
        }
        let roleArray = data.map(function (role) {
            return {
                name: role.title,
                value: role.department_id
            }
        });
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
                console.log("Added Employee!");
                askQuestion();
            });
        });
    });
};

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
                console.log("---------------------------------")
                console.log(`Added ${response.role_title} role!`)
                console.log("---------------------------------")
                askQuestion();
            });
        });
    });
};

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
            console.log("---------------------------------")
            console.log(`Added ${response.department_title} department!`)
            console.log("---------------------------------")
            askQuestion();
        });
    });
};

function updateEmployee() {
    connection.query(`SELECT CONCAT(employees.first_name," ", employees.last_name) AS name, title FROM employees INNER JOIN role ON role.id = employees.role_id`, function (err, data) {
        if (err) {
            throw err
        }

        let empArray = data.map(function (emp) {
            return {
                name: emp.name,
            }
        });

        let empRole = data.map(function(role){
            return {
                name: role.title
            }
        });

        inquirer.prompt([
            {
                name: "update_employee",
                type: "list",
                message: "Which employee would you like to update?",
                choices: empArray
            },
            {
                name: "update_role",
                type: "list",
                message: "Which role would you like to update?",
                choices: empRole

            }
        ]).then(function (response) {
            let query = `UPDATE employees INNER JOIN role ON role.id = employees.role_id SET title = ? WHERE CONCAT(employees.first_name," ", employees.last_name) = ?`
            connection.query(query, [response.update_role, response.update_employee],function(err, res){
                if (err){
                    throw err
                }
                console.log("Employee Updated!");
                askQuestion();
            });
        });
    });
};