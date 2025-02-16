import axios from "axios";

class EmployeeService {
  // Base URL
  constructor() {
    this.BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001/api/employees";
  }

  // Helper function to build URL with optional ID
  buildUrl(id = "") {
    return `${this.BASE_URL}${id ? `/${id}` : ""}`;
  }

  // List all employees
  getEmployees() {
    return axios.get(this.buildUrl());
  }

  // Add new employee
  addEmployee(employee) {
    return axios.post(this.buildUrl(), employee);
  }

  // Delete employee by ID
  deleteEmployee(id) {
    return axios.delete(this.buildUrl(id));
  }

  // Get employee by ID
  getEmployeeById(id) {
    return axios.get(this.buildUrl(id));
  }

  // Update employee by ID
  updateEmployee(id, employee) {
    return axios.put(this.buildUrl(id), employee);
  }

  // Count all employees
  countEmployees() {
    return axios.get(`${this.BASE_URL}/count`);
  }

  // Get average salary
  getAverageSalary() {
    return axios.get(`${this.BASE_URL}/stats/average-salary`);
  }

  // Get average age
  getAverageAge() {
    return axios.get(`${this.BASE_URL}/stats/average-age`);
  }

  // Get department count
  getDepartmentCount() {
    return axios.get(`${this.BASE_URL}/stats/department-count`);
  }

  // Get active employee count
  getActiveEmployeeCount() {
    return axios.get(`${this.BASE_URL}/stats/active-employees`);
  }
}

export default new EmployeeService();
