import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';
import Select from 'react-select';
import countryList from 'react-select-country-list';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for employee data
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    age: '',
    country: '',
    position: '',
    wage: '',
    department: '',
    role: '',
    status: 'Active',
    email: '',
    username: '',
    password: ''
  });

  // Dropdown options
  const [departments] = useState(['HR', 'IT', 'Finance', 'Marketing', 'Sales']);
  const roleOptions = [
    { value: 'User', label: 'User' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Super_Admin', label: 'Super Admin' }
  ];
  const ageRanges = [
    { value: '18-30', label: '18-30' },
    { value: '31-40', label: '31-40' },
    { value: '41-50', label: '41-50' },
    { value: '51-65', label: '51-65' }
  ];

  const salaryRanges = [
    { value: '10000-20000', label: '10,000 - 20,000' },
    { value: '21000-30000', label: '21,000 - 30,000' },
    { value: '31000-50000', label: '31,000 - 50,000' },
    { value: '51000-100000', label: '51,000 - 100,000' }
  ];

  // Countries Dropdown Options
  const countries = countryList().getData();

  // Fetch employee if editing
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
      [name]: value
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
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">{id ? 'Update Employee' : 'Add Employee'}</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input className="form-control" name="firstName" value={employee.firstName} onChange={handleChange} placeholder="First Name" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input className="form-control" name="lastName" value={employee.lastName} onChange={handleChange} placeholder="Last Name" required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Select
                      options={ageRanges}
                      placeholder="Select Age Range"
                      value={ageRanges.find(option => option.value === employee.age)}
                      onChange={(selectedOption) => setEmployee({ ...employee, age: selectedOption.value })}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <Select
                      options={countries}
                      placeholder="Select Country"
                      value={countries.find(option => option.value === employee.country)}
                      onChange={(selectedOption) => setEmployee({ ...employee, country: selectedOption.label })}
                      isSearchable
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Select
                      options={departments.map(dept => ({ value: dept, label: dept }))}
                      placeholder="Select Department"
                      value={departments.find(option => option.value === employee.department)}
                      onChange={(selectedOption) => setEmployee({ ...employee, department: selectedOption.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input className="form-control" name="position" value={employee.position} onChange={handleChange} placeholder="Position" required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Select
                      options={salaryRanges}
                      placeholder="Select Salary Range"
                      value={salaryRanges.find(option => option.value === employee.wage)}
                      onChange={(selectedOption) => setEmployee({ ...employee, wage: selectedOption.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <Select
                      options={roleOptions}
                      placeholder="Select Role"
                      value={roleOptions.find(option => option.value === employee.role)}
                      onChange={(selectedOption) => setEmployee({ ...employee, role: selectedOption.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input className="form-control" name="email" value={employee.email} onChange={handleChange} placeholder="Email" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input className="form-control" name="username" value={employee.username} onChange={handleChange} placeholder="Username" required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <input className="form-control" name="password" type="password" value={employee.password} onChange={handleChange} placeholder="Password" required />
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-12 col-md-6 mb-2">
                    <button type="submit" className="btn btn-primary w-100">{id ? 'Update' : 'Add'} Employee</button>
                  </div>
                  <div className="col-12 col-md-6 mb-2">
                    <button type="button" className="btn btn-secondary w-100" onClick={() => navigate('/employeeList')}>Back</button>
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
