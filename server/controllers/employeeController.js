const Employee = require('../models/employeeModel');

const getAllEmployees = async (req, res) => {
  try {
    const [employees] = await Employee.getAll();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching employees" });
  }
};

const createEmployee = async (req, res) => {
  try {
    await Employee.create(req.body);
    res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating employee" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.update(id, req.body);
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating employee" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await Employee.delete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting employee" });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const [employee] = await Employee.getById(id);
    if (employee.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching employee" });
  }
};


// Controller Function
const countEmployees = async (req, res) => {
    try {
      const [rows] = await Employee.countEmployees();
      console.log('Query Result:', rows); // Debugging line to inspect the result
  
      // Check if rows is an array and has at least one element
      if (Array.isArray(rows) && rows.length > 0 && rows[0].total !== undefined) {
        res.status(200).json({ totalEmployees: rows[0].total });
      } else {
        res.status(404).json({ error: "No employees found" });
      }
    } catch (err) {
      console.error('Database Error:', err);
      res.status(500).json({ error: "Error counting employees" });
    }
  };
  



// 
// Get Average Salary
const getAverageSalary = async (req, res) => {
    try {
      const [rows] = await Employee.getAverageSalary();
      // Check if result is not empty and has the expected data
      if (rows.length > 0 && rows[0].averageSalary !== null) {
        res.status(200).json({ averageSalary: rows[0].averageSalary });
      } else {
        res.status(200).json({ averageSalary: 0 }); // Return 0 if no data
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error calculating average salary" });
    }
  };
  
  // Get Average Age
  const getAverageAge = async (req, res) => {
    try {
      const [rows] = await Employee.getAverageAge();
      if (rows.length > 0 && rows[0].averageAge !== null) {
        res.status(200).json({ averageAge: rows[0].averageAge });
      } else {
        res.status(200).json({ averageAge: 0 });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error calculating average age" });
    }
  };
  

  // Get Department Count
const getDepartmentCount = async (req, res) => {
    try {
      const [rows] = await Employee.getDepartmentCount();
      // Check if rows exist and access the first object
      const departmentCount = rows.length > 0 ? rows[0].departmentCount : 0;
      res.status(200).json({ departmentCount: departmentCount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error counting departments" });
    }
  };
  
  
  // Get Active Employee Count
  const getActiveEmployeeCount = async (req, res) => {
    try {
      const [rows] = await Employee.getActiveEmployeeCount();
      if (rows.length > 0 && rows[0].activeEmployees !== null) {
        res.status(200).json({ activeEmployees: rows[0].activeEmployees });
      } else {
        res.status(200).json({ activeEmployees: 0 });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error counting active employees" });
    }
  };
// 

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  countEmployees,
  getAverageSalary,
  getAverageAge,
  getDepartmentCount,
  getActiveEmployeeCount,
};
