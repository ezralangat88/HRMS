import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddEmployee from './Components/AddEmployee';
import AddEmployee1 from './Components/AddEmployee1';
import HeaderComponent from './Components/Header';
import FooterComponent from './Components/Footer';
import EmployeeList from './Components/EmployeeList';
function App() {
 

  return (
   <div>
    <Router>
      <HeaderComponent/>
      <Routes>
        <Route path="/" element={<AddEmployee />} />
        <Route path="/addEmployee" element={<AddEmployee1 />} />
        <Route path="/employeeList" element={<EmployeeList />} />
      </Routes>
      <FooterComponent/>
    </Router>
   </div>
  );
}

export default App;
