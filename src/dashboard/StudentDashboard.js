import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function StudentDashboard({ studentId }) {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [studentBookings, setStudentBookings] = useState([]);

  useEffect(() => {
    // Fetch available slots for student (status 1)
    const fetchAvailableSlots = async () => {
      const q = query(collection(db, 'slots'), where('status', '==', 1));
      const snapshot = await getDocs(q);
      setAvailableSlots(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    // Fetch current student bookings (status 3, Active)
    const fetchStudentBookings = async () => {
      const q = query(collection(db, 'slots'), where('studentId', '==', studentId), where('status', '==', 3));
      const snapshot = await getDocs(q);
      setStudentBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchAvailableSlots();
    fetchStudentBookings();
  }, [studentId]);

  const handleBooking = async (slotId) => {
    try {
      const slotRef = db.collection('slots').doc(slotId);
      await slotRef.update({ studentId, status: 2 }); // Change status to 'pending' after booking
      alert('Your appointment is now pending approval.');
    } catch (error) {
      alert('Failed to book the slot: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>

      <h3>Available Slots</h3>
      {availableSlots.length === 0 ? (
        <p>No available slots at the moment.</p>
      ) : (
        availableSlots.map((slot) => (
          <div key={slot.id}>
            <p><strong>Service:</strong> {slot.serviceId}</p>
            <p><strong>Date:</strong> {slot.date} | {slot.startTime} - {slot.endTime}</p>
            <button onClick={() => handleBooking(slot.id)}>Book Slot</button>
          </div>
        ))
      )}

      <h3>Your Bookings</h3>
      {studentBookings.length === 0 ? (
        <p>No active bookings.</p>
      ) : (
        studentBookings.map((booking) => (
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

export default StudentDashboard;
