import React from "react";
import axios from "axios";

const EMPLOYEE_LIST = "http://localhost:5001/employees";
const EMPLOYEE_ADD = "http://localhost:5001/create";
const EMPLOYEE_DELETE = "http://localhost:5001/delete";

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
    getUserById(id){
        return axios.get(EMPLOYEE_LIST + '/' + id);  
    }



}

export default new EmployeeService();