import React, {useState, useEffect} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Axios from "axios";
import '../App.css';
import EmployeeService from '../Services/EmployeeService';


function AddEmployee1() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employees, setEmployees] = useState([]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState("");
  const [newPosition, setnEWPosition] = useState("");
  const [newWage, setNewWage] = useState(0);

 //useHistory() gives you access to the history instance that you use to navigate
 const navigate = useNavigate();
 //useParams() will be used to retrieve ID from url - Provides objects that contains key value points from url 
 const {id} = useParams();     

  //Getting employee by id and setting them to state variables to populate form for editing.
 useEffect(() => {
   EmployeeService.getEmployeeById(id).then((response)=>{
     setName(response.data.name)
     setAge(response.data.age)
     setCountry(response.data.age)
     setPosition(response.data.position)
     setAge(response.data.age)
   }).catch((error)=>{
     console.log(error)
   })
 }, [])

// SAVE or UPATE
    // Getting data from properties onclicking save btn
    const saveorUpdateEmployee = (e) =>{
      //Prevents refreshing of the page on submit
      e.preventDefault();

      const employee = {name, age, country, position, wage }

      if(id){
        EmployeeService.updateEmployee(id, employee).then((response) =>{
          navigate('/employeeList');
        }).catch(error =>{
          console.log(error);
      }) 
      }else{

      //Parsing User to addUser() to send  User data to Rest API 
      EmployeeService.addEmployee(employee).then (response =>{

        console.log(response.data);

        navigate('/employeeList');

    }).catch(error =>{
        console.log(error);
    })
    }
      
  }   

  //Adding Condition to change page title dynamically
  const title = () =>{

    if(id){
        return <h3 className="text-center">Update Employee</h3>
    } 
    else {
        return <h3 className="text-center">Add Employee</h3>

    }
    
}

  return (
    <div className="App">
      {
        title()
      }
    <div className="information">
      
      <label>Name:</label>
      
      <input
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <label>Age:</label>
      <input
        type="number"
        onChange={(event) => {
          setAge(event.target.value);
        }}
      />
      <label>Country:</label>
      <input
        type="text"
        onChange={(event) => {
          setCountry(event.target.value);
        }}
      />
      <label>Rank:</label>
      <input
        type="text"
        onChange={(event) => {
          setPosition(event.target.value);
        }}
      />
      <label>Salary</label>
      <input
        type="number"
        onChange={(event) => {
          setWage(event.target.value);
        }}
      />
      {/* add */}
      <button className='btn btn-success' onClick={(e) => saveorUpdateEmployee(e)}>Save</button>
  
    </div> 
  </div>
);
}

export default AddEmployee1