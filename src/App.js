import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  // Notice the change from Switch to Routes
import Signup from './auth/Signup';
import Login from './auth/Login';
import StaffConfirm from './pages/StaffConfirm';
// …
<Route path="/staff-confirm" element={<StaffConfirm />} />


function App() {
  const [role, setRole] = useState(''); // Track role selection
  const [isRoleSelected, setIsRoleSelected] = useState(false); // Track if role has been selected

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Title */}
          <h1 className="title">RUBOS</h1>
          <h2>Welcome to the Real-Time University Booking System</h2>

          {/* Role Selection */}
          {!isRoleSelected && (
            <div className="role-selection">
              <button onClick={() => { setRole('student'); setIsRoleSelected(true); }}>
                Student
              </button>
              <button onClick={() => { setRole('staff'); setIsRoleSelected(true); }}>
                Staff
              </button>
            </div>
          )}

          {/* Navigation to Login or Sign Up based on role */}
          {isRoleSelected && (
            <div className="auth-buttons">
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          )}
        </header>

        {/* Routing with Routes instead of Switch */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//clear email and password
//add logged in name in corner