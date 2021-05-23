DROP DATABASE IF EXISTS employees_DB;
CREATE database employees_DB;

USE employees_DB;

CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  title VARCHAR (30), 
  salary INTEGER (10),
  department VARCHAR (30),
  manager VARCHAR (30),
  PRIMARY KEY (id)
);

CREATE TABLE Department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE Role (
 id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary INTEGER(10),
  department VARCHAR(30),
  PRIMARY KEY (id)
);

SELECT * FROM Employee;
select * from Department;
select * from Role; 
