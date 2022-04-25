import React from "react";
import axios from "axios";

const EMPLOYEE_LIST = "http://localhost:5001/employees";
const EMPLOYEE_ADD = "http://localhost:5001/create";
const EMPLOYEE_DELETE = "http://localhost:5001/delete";
const EMPLOYEE_UPDATE = "http://localhost:5001/update";

class EmployeeService { 


    //List
    getEmployees(){
        return axios.get(EMPLOYEE_LIST)
    }

    //Add
    addEmployee(employee){
        return axios.post(EMPLOYEE_ADD, employee)  
    }

    //Delete
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_DELETE + '/' + id);

    }

    //Get employee by id
    getEmployeeById(id){
        return axios.get(EMPLOYEE_LIST + '/' + id);  
    }

    //Update
    updateEmployee(id, employee){
        return axios.put(EMPLOYEE_LIST + '/' + id, employee);
    }

}

export default new EmployeeService();