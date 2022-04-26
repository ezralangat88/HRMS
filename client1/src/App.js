import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UpdateEmployee from './Components/UpdateEmployee';
import AddEmployee1 from './Components/AddEmployee1';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';
import EmployeeList from './Components/EmployeeList';
import HomeComponent from './Components/Home';
function App() {
 

  return (
   <div>
    <Router>
      <HeaderComponent/>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/addEmployee" element={<AddEmployee1 />} />
        <Route path="/updateEmployee" element={<UpdateEmployee />} />
        <Route path='/editEmployee/:id' element={<AddEmployee1 />} />
        <Route path="/employeeList" element={<EmployeeList />} />
      </Routes>
      <FooterComponent/>
    </Router>
   </div>
  );
}

export default App;
