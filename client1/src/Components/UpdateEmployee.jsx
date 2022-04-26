import React, {useState, useEffect} from 'react'
import { Link, Navigate} from 'react-router-dom';
import Axios from "axios";
import '../App.css';


function UpdateEmployee() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employees, setEmployees] = useState([]);

  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [newCountry, setNewCountry] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newWage, setNewWage] = useState(0);

  //Add
  const addEmployee = () =>{
    Axios.post("http://localhost:5001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(()=>{
      console.log("Success")
      alert("Employee added successfully");
      setEmployees([
        ...employees,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

    //List
    const getEmployees = () => {
      Navigate('/updateEmployee');
      Axios.get("http://localhost:5001/employees")
      .then((response)=>{
        setEmployees(response.data);
      
      });
    };

    //Update
    const updateEmployee = (id) => {
      Axios.put("http://localhost:5001/update", 
      { wage: newWage, name: newName, country: newCountry, position: newPosition, age: newAge, id: id })
      .then(
        (response) => {
          setEmployees(
            employees.map((employee) => {
              return employee.id === employee
                ? {
                    id: employee.id,
                    name: employee.name,
                    country: employee.country,
                    age: employee.age,
                    position: employee.position,
                    wage: newWage,
                    name: newName, 
                    country: newCountry, 
                    position: newPosition, 
                    age: newAge
                  }
                : employee;
            })
          );
        }
      );
    };
  

    //Delete
    const deleteEmployee = (id) => {
      Axios.delete(`http://localhost:5001/delete/${id}`).then((response) => {
        setEmployees(
          employees.filter((employee) => {
            return employee.id !== id;
          })
        );
      });
    };




  return (
    <div className="App">
    <div className="information">
      
      {/* list */}
      <button onClick={getEmployees}>Show Employees</button>
      { employees.map((employee, key)=>{
        return (
          <div className="employee">
          <div>
            <h3>Name: {employee.name}</h3>
            <h3>Age: {employee.age}</h3>
            <h3>Country: {employee.country}</h3>
            <h3>Position: {employee.position}</h3>
            <h3>Wage: {employee.wage}</h3>
          </div>
          <div>
              {/* Update Old */}

      <input
       type="text"
       placeholder='New Name'
       value={name}

       onChange={(event) => {
         setNewName(event.target.value);
       }}
     />
      <input
       type="number"
       value={age}
       placeholder='New Age'
       onChange={(event) => {
         setNewAge(event.target.value);
       }}
     />

    <input
      
      placeholder='New Country'
       onChange={(event) => {
         setNewCountry(event.target.value);
       }}
     />

    <input
       type="text"
       placeholder='New Position'
       onChange={(event) => {
        setNewPosition(event.target.value);
       }}
     />
      <input
       type="text"
       placeholder='New Wage'
       onChange={(event) => {
         setNewWage(event.target.value);
       }}
     />
     <button
       onClick={() => {
         updateEmployee(employee.id);
         alert("employee updated")
       }}
     >
       
       Update
     </button>

              {/* Delete */}
              <button
                onClick={() => {
                  deleteEmployee(employee.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
          
          
        )
        
      })}
     
    </div> 
  </div>
);
}

export default UpdateEmployee