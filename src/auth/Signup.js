import React, { useState } from 'react';
import { auth, db } from '../firebase'; // Firebase imports
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, doc, setDoc, addDoc } from 'firebase/firestore';
import '../App.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      // Send email verification after signup
      await sendEmailVerification(user);

          alert('Account created successfully! Please check your email for verification.');
    } catch (error) {
      alert(error.message);
    }
  };
      // Store user details in Firestore with "pending" status for staff, "approved" for students
      /*await setDoc(doc(collection(db, "users"), user.uid), {
        name,
        email,
        role,
        status: role === "staff" ? "pending" : "approved"
      });

      // If staff, notify admin for approval
      if (role === "staff") {
        await addDoc(collection(db, "emailRequests"), {
          to: "cleidjipersonal@gmail.com",
          message: {
            subject: "Staff Approval Request",
            text: `A new staff (${email}) signed up. Approve or reject here: https://your-approval-page.com`
          }
        });
      }*/

  

  return (
    <div className="sign-up-form">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <label>Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
