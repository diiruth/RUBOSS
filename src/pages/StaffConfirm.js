import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function StaffConfirm({ staffId }) {
  const [requests, setRequests] = useState([]);
  const [descriptionMap, setDescriptionMap] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, 'bookings'));
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(b => b.status === 3 && b.staffId === staffId); // active bookings
      setRequests(filtered);
    };

    fetchRequests();
  }, [staffId]);

  const handleFinish = async (bookingId) => {
    const staffDescription = descriptionMap[bookingId] || '';
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status: 4, // finished
      staffDescription
    });
    alert('Marked as finished');
  };

  return (
    <div>
      <h2>Appointments to Finalize</h2>
      {requests.map(req => (
        <div key={req.id}>
          <p><b>Student:</b> {req.studentId}</p>
          <p><b>Date:</b> {req.date} | {req.startTime} - {req.endTime}</p>
          <p><b>Issue:</b> {req.studentDescription}</p>
          <textarea
            placeholder="What did you do during the appointment?"
            value={descriptionMap[req.id] || ''}
            onChange={(e) =>
              setDescriptionMap({ ...descriptionMap, [req.id]: e.target.value })
            }
          ></textarea>
          <button onClick={() => handleFinish(req.id)}>Mark as Finished</button>
        </div>
      ))}
    </div>
  );
}

export default StaffConfirm;
