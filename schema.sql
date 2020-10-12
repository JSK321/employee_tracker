DROP DATABASE IF EXISTS employeesDB;

CREATE database employeesDB;

USE employeesDB;

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id),
    -- FOREIGN KEY (role_id) REFERENCES role (id)
    -- FOREIGN KEY (manager_id) REFERENCES 
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

SELECT * FROM employees