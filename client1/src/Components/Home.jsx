import React, { useState, useEffect } from 'react';
import EmployeeService from '../Services/EmployeeService';

const HomeComponent = () => {
  // State for employee count
  const [employeesCount, setEmployeesCount] = useState(0);

  // State for dashboard stats
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    departments: 0,
    averageAge: 0,
    averageSalary: 0,
  });

  // Fetch employee count from the service
  const countEmployees = async () => {
    try {
      const response = await EmployeeService.countEmployees();
      const totalEmployees = Number(response.data.totalEmployees) || 0;

      setEmployeesCount(totalEmployees);
      setStats((prevStats) => ({
        ...prevStats,
        totalEmployees: totalEmployees,
      }));
    } catch (error) {
      console.error('Failed to fetch employee count:', error);
    }
  };

  // Fetch other statistics from the service
  const fetchStats = async () => {
    try {
      // Fetching all stats here (replace with actual API calls)
      const [activeRes, deptRes, ageRes, salaryRes] = await Promise.all([
        EmployeeService.getActiveEmployeeCount(),
        EmployeeService.getDepartmentCount(),
        EmployeeService.getAverageAge(),
        EmployeeService.getAverageSalary(),
      ]);

      setStats((prevStats) => ({
        ...prevStats,
        activeEmployees: Number(activeRes.data.activeEmployees) || 0,
        departments: Number(deptRes.data.departmentCount) || 0,
        averageAge: Number(ageRes.data.averageAge) || 0,
        averageSalary: Number(salaryRes.data.averageSalary) || 0,
      }));
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    countEmployees(); // Fetch employee count
    fetchStats(); // Fetch other stats
  }, []);

  return (
    <div className='App'>
      <h4>WELCOME TO HRMS</h4>
      <div className='dashboard-stats'>
        <div className='stat-box'>
          <h3>Total Employees</h3>
          <p>{stats.totalEmployees}</p>
        </div>
        <div className='stat-box'>
          <h3>Active Employees</h3>
          <p>{stats.activeEmployees}</p>
        </div>
        <div className='stat-box'>
          <h3>Departments</h3>
          <p>{stats.departments}</p>
        </div>
        <div className='stat-box'>
          <h3>Average Age</h3>
          <p>{Number(stats.averageAge).toFixed(1)}</p>
        </div>
        <div className='stat-box'>
          <h3>Average Salary</h3>
          <p>${Number(stats.averageSalary).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
