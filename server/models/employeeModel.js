const db = require('../config/db');
const { countEmployees } = require('../controllers/employeeController');

const Employee = {
  getAll: () => {
    return db.query("SELECT * FROM employees");
  },

  create: (data) => {
    const { firstName, lastName, age, country, department,role, position, wage, status, email, username, password } = data;
    return db.query(
      "INSERT INTO employees (firstName, lastName, age, country, department, role, position, wage, status, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [firstName, lastName, age, country, department,role, position, wage, status, email, username, password]
    );
  },

  update: (id, data) => {
    const { firstName, lastName, age, country, department, role, position, wage, status, email, username, password } = data;
    return db.query(
      "UPDATE employees SET firstName=?, lastName=?, age=?, country=?, department=?, role=?, position=?, wage=?, status=?, email=?, username=?, password=? WHERE id=?",
      [firstName, lastName, age, country, department,role, position, wage, status, email, username, password, id]
    );
  },

  delete: (id) => {
    return db.query("DELETE FROM employees WHERE id = ?", [id]);
  },

  getById: (id) => {
    return db.query("SELECT * FROM employees WHERE id = ?", [id]);
  },

//   countEmployees: () => {
//     return db.query("SELECT COUNT(*) AS total FROM employees");
//   },

  countEmployees: () => {
    return db.query("SELECT COUNT(*) AS total FROM employees");
  },

  // New Methods for Statistics
  getAverageSalary: () => {
    return db.query("SELECT AVG(wage) AS averageSalary FROM employees");
  },

  getAverageAge: () => {
    return db.query("SELECT AVG(age) AS averageAge FROM employees");
  },

  getDepartmentCount: () => {
    return db.query("SELECT COUNT(DISTINCT department) AS departmentCount FROM employees");
  },

  getActiveEmployeeCount: () => {
    return db.query("SELECT COUNT(*) AS activeEmployees FROM employees WHERE status = 'active'");
  }
};

module.exports = Employee;
