import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddEmployee from './Footer/AddEmployee';
import EmployeeList from './Footer/EmployeeList';
import HeaderComponent from './Footer/Header';
import FooterComponent from './Footer/Footer';

function App() {
 

  return (
   <div>
    <Router>
      <HeaderComponent/>
      <Routes>
        <Route path="/" element={<AddEmployee />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/employeeList" element={<EmployeeList />} />
      </Routes>
      <FooterComponent/>
    </Router>
   </div>
  );
}

export default App;
