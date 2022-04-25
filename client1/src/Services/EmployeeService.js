import React from "react";
import axios from "axios";

const EMPLOYEE_LIST = "http://localhost:5001/employees";
const EMPLOYEE_ADD = "http://localhost:5001/create";

class EmployeeService { 


    //List
    getEmployees(){
        return axios.get(EMPLOYEE_LIST)
    }

      //Add
      addEmployee(employee){
        return axios.post(EMPLOYEE_ADD, employee)
    }



}

export default new EmployeeService();