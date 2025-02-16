import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';
import '../App.css';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for employee data, including department and new fields
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: 0,
    country: '',
    position: '',
    wage: 0,
    department: '',
    status: 'Active',
    email: '',
    username: '',
    password: ''
  });

  // List of departments for dropdown
  const [departments, setDepartments] = useState(['HR', 'IT', 'Finance', 'Marketing', 'Sales']);
  const statusOptions = ['Active', 'Inactive', 'Other'];

  // Fetch employee if an ID is provided (for editing)
  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (id) => {
    try {
      const response = await EmployeeService.getEmployeeById(id);
      setEmployee(response.data);
    } catch (error) {
      console.error('Failed to fetch employee data', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: name === 'age' || name === 'wage' ? Number(value) : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await EmployeeService.updateEmployee(id, employee);
      } else {
        await EmployeeService.addEmployee(employee);
      }
      navigate('/employeeList');
    } catch (error) {
      console.error('Failed to save employee data', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">{id ? 'Update Employee' : 'Add Employee'}</h5>
              <form onSubmit={handleSubmit}>
                <input className="form-control form-control-sm mb-3" name="firstName" value={employee.firstName} onChange={handleChange} placeholder="First Name" required />
                <input className="form-control form-control-sm mb-3" name="lastName" value={employee.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input className="form-control form-control-sm mb-3" name="age" type="number" value={employee.age} onChange={handleChange} placeholder="Age" />
                <input className="form-control form-control-sm mb-3" name="country" value={employee.country} onChange={handleChange} placeholder="Country" required />
                <input className="form-control form-control-sm mb-3" name="position" value={employee.position} onChange={handleChange} placeholder="Position" required />
                <input className="form-control form-control-sm mb-3" name="wage" type="number" value={employee.wage} onChange={handleChange} placeholder="Wage" />
                <input className="form-control form-control-sm mb-3" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
                <input className="form-control form-control-sm mb-3" name="username" value={employee.username} onChange={handleChange} placeholder="Username" required />
                <input className="form-control form-control-sm mb-3" name="password" type="password" value={employee.password} onChange={handleChange} placeholder="Password" required />
                
                <select className="form-select form-select-sm mb-3" name="status" value={employee.status} onChange={handleChange} required>
                  <option value="">Select Status</option>
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                <select className="form-select form-select-sm mb-3" name="department" value={employee.department} onChange={handleChange} required>
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <div className="row justify-content-center">
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-sm w-100">{id ? 'Update' : 'Add'} Employee</button>
                  </div>
                  <div className="col-6">
                    <button type="button" className="btn btn-secondary btn-sm w-100" onClick={() => navigate('/employeeList')}>Back</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
