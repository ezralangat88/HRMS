const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee CRUD Routes
router.get('/count', employeeController.countEmployees); // Count all employees (specific route)
router.get('/stats/average-salary', employeeController.getAverageSalary); // Average Salary
router.get('/stats/average-age', employeeController.getAverageAge); // Average Age
router.get('/stats/department-count', employeeController.getDepartmentCount); // Department Count
router.get('/stats/active-employees', employeeController.getActiveEmployeeCount); // Active Employees

// CRUD Operations
router.get('/', employeeController.getAllEmployees); // Get all employees
router.post('/', employeeController.createEmployee); // Create new employee
router.put('/:id', employeeController.updateEmployee); // Update employee by ID
router.delete('/:id', employeeController.deleteEmployee); // Delete employee by ID
router.get('/:id', employeeController.getEmployeeById); // Get employee by ID (dynamic route)

module.exports = router;
