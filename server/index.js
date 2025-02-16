const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");

// Allow CORS requests
app.use(cors());

// JSON middleware to parse request body
app.use(express.json());

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'pass',  
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize the database and table
const initializeDB = () => {
  pool.query("CREATE DATABASE IF NOT EXISTS hrms;", (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists.');

    // Use the hrms database
    pool.query("USE hrms;", (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        return;
      }
      console.log('Using hrms database.');

      // Create Table if not exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          age INT NOT NULL,
          country VARCHAR(100) NOT NULL,
          position VARCHAR(100) NOT NULL,
          wage DECIMAL(10, 2) NOT NULL
        );
      `;
      pool.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          return;
        }
        console.log('Table employees created or already exists.');
      });
    });
  });
};

// Call the function to initialize the database
initializeDB();

// Route to Create Employee
app.post("/create", (req, res) => {
  const { name, age, country, position, wage } = req.body;
  const query = "INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)";
  pool.query(query, [name, age, country, position, wage], (err, result) => {
    if (err) {
      console.error('Error inserting record:', err);
      res.status(500).json({ error: "Error inserting record" });
    } else {
      res.status(201).json({ message: "Records Inserted Successfully", result });
    }
  });
});

// Route to Get All Employees
app.get("/employees", (req, res) => {
  pool.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.error('Error fetching records:', err);
      res.status(500).json({ error: "Error fetching records" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Route to Update Employee
app.put("/employees/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, country, position, wage } = req.body;
  const query = "UPDATE employees SET name = ?, age = ?, country = ?, position = ?, wage = ? WHERE id = ?";
  pool.query(query, [name, age, country, position, wage, id], (err, result) => {
    if (err) {
      console.error('Error updating record:', err);
      res.status(500).json({ error: "Error updating record" });
    } else {
      res.status(200).json({ message: "Record Updated Successfully", result });
    }
  });
});

// Route to Delete Employee
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  pool.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).json({ error: "Error deleting record" });
    } else {
      res.status(200).json({ message: "Record Deleted Successfully", result });
    }
  });
});

// Start the Server
app.listen(5001, () => {
  console.log("Server running at port 5001");
});
