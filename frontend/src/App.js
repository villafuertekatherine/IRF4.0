import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import PreAdmissionsPage from './components/PreAdmissionsPage';
import AddPossibleAdmission from './components/AddPossibleAdmission';
import EditPatientPage from './components/EditPatientPage';
import EditAdmissionsPage from './components/EditAdmissionsPage';
import HomePage from './components/HomePage';
import CensusPage from './components/CensusPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pre-admissions" element={<PreAdmissionsPage />} />
          <Route path="/add-possible-admission" element={<AddPossibleAdmission />} />
          <Route path="/edit-patient/:patientId" element={<EditPatientPage />} />
          <Route path="/edit-admission/:id" element={<EditAdmissionsPage />} />
          <Route path="/census" element={<CensusPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
