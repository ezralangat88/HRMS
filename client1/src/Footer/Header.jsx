import React from 'react'
import { Link } from 'react-router-dom'


const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
            <a href="/" className="navbar-brand">HR Management System</a>
             <Link to = 'employeeList' className='btn btn-primary mb-2' 
               style = {{marginLeft:"10px"}}>Employees
             </Link>

             <Link to = 'addEmployee' className='btn btn-primary mb-2' 
               style = {{marginLeft:"10px"}}>Add Employee
             </Link>                             
            </div>                 
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent