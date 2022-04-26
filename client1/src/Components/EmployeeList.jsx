import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../Services/EmployeeService';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    // LIST
    useEffect(() => {
      getAllEmployees();
    
    }, [])
    


    const getAllEmployees = ()=>{
        EmployeeService.getEmployees().then((response)=>{
            setEmployees(response.data)
            console.log(response.data);
        }).catch((error)=>{
            console.log(error);
        })

    }

    //UPDATE



    //DELETE
    const deleteEmployee = (id) =>{
        EmployeeService.deleteEmployee(id).then((response) =>{
            getAllEmployees();
        }).catch(error=>{
            console.log(error);
        })
    } 

    

  return (
    <div className='container'> 
    <h2 className='text-center'>Employee List</h2>  
    
    <table className='table table-striped table-bordered'>
    <thead>
            <th>ID </th>
            <th>Name</th>
            <th>Country</th>
            <th>Position</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          
    </thead>

    <tbody>

        {
            employees.map (
                employee => 
                    <tr key = {employee.id}>

                        <td> {employee.id} </td>
                        <td> {employee.name} </td>
                        <td> {employee.Country} </td>
                        <td> {employee.position} </td>
                        <td> {employee.age} </td>
                        <td> {employee.wage} </td>
                    
                        
                        <td>
                           {/* <Link to = {`/edit-user/${employee.id}`} className='btn btn-info'> Update</Link>
                            */}
                       <Link to = {`/editEmployee/${employee.id}`} className='btn btn-info'> Update</Link>             
                        <button className = "btn btn-danger" onClick = {() => deleteEmployee(employee.id)}
                                   style = {{marginLeft:"10px"}}> Delete</button>
                        </td>
          

                    </tr>
                
            )
        }
    
    </tbody>
    </table>
    
</div>
)
}

export default EmployeeList