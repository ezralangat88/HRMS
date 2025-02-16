require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const fs = require('fs');               // To check for existing files
const path = require('path');
const { exec } = require('child_process'); // Import child_process to run shell commands

const employeeRoutes = require('./routes/employeeRoutes');
const app = express();

// Create a connection pool (to ensure database exists before migrations)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',  // Use your MySQL root password
  multipleStatements: true  
});

// Function to initialize the database
const initializeDB = () => {
  pool.query("CREATE DATABASE IF NOT EXISTS hrms;", (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists.');
  });
};

// Function to run Sequelize commands
const runMigrations = () => {
  // Check if migration already exists
  const migrationsDir = path.join(__dirname, 'migrations');
  const migrationExists = fs.existsSync(migrationsDir) && fs.readdirSync(migrationsDir)
    .some(file => file.includes('create-employees-table'));

  // Generate Migration only if it doesn't already exist
  if (!migrationExists) {
    console.log('No migration found for employees table. Creating one now...');
    exec('npx sequelize-cli migration:generate --name create-employees-table', (err, stdout, stderr) => {
      if (err) {
        console.error('Error generating migration:', stderr);
        return;
      }
      console.log('Migration generated:', stdout);

      // Run Migrations after generating
      exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
        if (err) {
          console.error('Error running migrations:', stderr);
          return;
        }
        console.log('Migrations completed:', stdout);
      });
    });
  } else {
    console.log('Migration for employees table already exists. Running migrations...');
    // Always run Migrations to ensure table is created
    exec('npx sequelize-cli db:migrate', (err, stdout, stderr) => {
      if (err) {
        console.error('Error running migrations:', stderr);
        return;
      }
      console.log('Migrations completed:', stdout);
    });
  }
};

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/employees', employeeRoutes);

// Initialize DB and then start the server
initializeDB();

// Run Migrations
setTimeout(runMigrations, 2000); // Delay to ensure DB is ready

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
