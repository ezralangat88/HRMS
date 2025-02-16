import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);
  const navigate = useNavigate();

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from the service
  const fetchEmployees = async () => {
    try {
      const data = await EmployeeService.getEmployees();
      setEmployees(data.data);
      setIsSearchPerformed(true);
    } catch (error) {
      console.error('Failed to fetch employee data', error);
    }
  };

  // Handle employee deletion
  const deleteEmployee = async (id) => {
    try {
      await EmployeeService.deleteEmployee(id);
      fetchEmployees(); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete employee', error);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    [
      employee.name, 
      employee.country, 
      employee.position, 
      employee.department, 
      employee.status
    ].some(field => 
      field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle search when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchEmployees(); // Assuming search refetches all data for simplicity
    }
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Employee List</h2>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm w-25 me-2"
                  placeholder="Search Employee"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="btn btn-primary btn-sm me-2" onClick={fetchEmployees}>
                  Search
                </button>

                <button className="btn btn-primary btn-sm me-2" onClick={() => navigate('/addEmployee')}>
                  Add Employee
                </button>
               
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/')}>
                  Go Back
                </button>
              </div>

              {employees.length === 0 ? (
                <div className="text-center">No employees found</div>
              ) : filteredEmployees.length === 0 && isSearchPerformed ? (
                <div className="text-center">No matching employees</div>
              ) : (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Country</th>
                      <th>Position</th>
                      <th>Age</th>
                      <th>Salary</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Update</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(employee => (
                      <tr key={employee.id} onDoubleClick={() => navigate(`/editEmployee/${employee.id}`)}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.country}</td>
                        <td>{employee.position}</td>
                        <td>{employee.age}</td>
                        <td>{employee.wage}</td>
                        <td>{employee.department}</td>
                        <td>{employee.status}</td>
                        <td>
                          <Link to={`/editEmployee/${employee.id}`} className="btn btn-info btn-sm me-1">
                            Update
                          </Link>
                        </td>
                        <td>
                          <Link 
                            to="#" 
                            className="btn btn-danger btn-sm me-1"
                            onClick={(e) => {
                              e.preventDefault();
                              deleteEmployee(employee.id);
                            }}> 
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
