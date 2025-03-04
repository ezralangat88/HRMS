CREATE DATABASE hrms;

USE hrms;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  country VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  wage DECIMAL(10, 2) NOT NULL
);

npx sequelize-cli migration:generate --name create-employees-table

npx sequelize-cli db:migrate
