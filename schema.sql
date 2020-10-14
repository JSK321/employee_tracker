DROP DATABASE IF EXISTS employeesDB;

CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);

INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Engineering");

INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Person", 50000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Engineer", 75000, 4);

INSERT INTO employees (first_name, last_name, role_id) VALUES ("Charles", "Johnson", 1);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("John", "Davis", 2);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("David", "Smith", 4);
INSERT INTO employees (first_name, last_name, role_id) VALUES ("Paul", "Jones", 3);
