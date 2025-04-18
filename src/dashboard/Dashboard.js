import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Dashboard({ staffId }) {
  const [slots, setSlots] = useState([]);
  const [studentBookings, setStudentBookings] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      const q = query(collection(db, 'slots'), where('staffId', '==', staffId));
      const snapshot = await getDocs(q);
      setSlots(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchStudentBookings = async () => {
      const q = query(collection(db, 'slots'), where('status', '==', 3));
      const snapshot = await getDocs(q);
      setStudentBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchSlots();
    fetchStudentBookings();
  }, [staffId]);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Available Slots</h3>
      {slots.length === 0 ? (
        <p>No slots available yet.</p>
      ) : (
        slots.map(slot => (
          <div key={slot.id}>
            <p><strong>Service:</strong> {slot.serviceId} </p>
            <p><strong>Date:</strong> {slot.date} | {slot.startTime} - {slot.endTime}</p>
            <p><strong>Status:</strong> {slot.status === 1 ? 'Available' : slot.status === 2 ? 'Pending' : 'Finished'}</p>
          </div>
        ))
      )}

      <h3>Student Bookings</h3>
      {studentBookings.length === 0 ? (
        <p>No student bookings yet.</p>
      ) : (
        studentBookings.map(booking => (
          <div key={booking.id}>
            <p><strong>Service:</strong> {booking.serviceId}</p>
            <p><strong>Date:</strong> {booking.date} | {booking.startTime} - {booking.endTime}</p>
            <p><strong>Student Description:</strong> {booking.studentDescription}</p>
            <p><strong>Status:</strong> {booking.status === 3 ? 'Active' : 'Finished'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
