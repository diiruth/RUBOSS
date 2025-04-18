import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Notice the change from Switch to Routes
import Signup from './auth/Signup';
import Login from './auth/Login';
import StaffConfirm from './pages/StaffConfirm';
import Dashboard from './dashboard/Dashboard';
import Home from './pages/Home';
// …


function App() {
  
  return (
    <Router>
      
        {/* Routing with Routes instead of Switch */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard-staff" element={<Dashboard staffId="staffId" />} /> {/* Pass the staffId prop here */}
          {/* Add other routes here as needed */}
        </Routes>
      
    </Router>
  );
}

export default App;

//clear email and password
//add logged in name in corner