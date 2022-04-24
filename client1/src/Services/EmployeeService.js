import React from "react";
import axios from "axios";

const EMPLOYEE_LIST = "http://localhost:5001/employees";

class EmployeeService { 


    //List
    getEmployees(){
        return axios.get(EMPLOYEE_LIST)
    }


}

export default new EmployeeService();