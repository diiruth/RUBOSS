import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css';

const Home = () => {

    const [role, setRole] = useState(''); // Track role selection
    const [isRoleSelected, setIsRoleSelected] = useState(false); // Track if role has been selected


    return (
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
          </div>
  )
}

export default Home;