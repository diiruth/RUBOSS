import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

function AvailableSlots({ staffId }) {
  const [slots, setSlots] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [serviceList, setServiceList] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      setServiceList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      const snapshot = await getDocs(collection(db, 'slots'));
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(slot => slot.staffId === staffId);
      setSlots(filtered);
    };
    fetchSlots();
  }, [staffId]);

  const handleSlotCreation = async () => {
    if (!startTime || !endTime || !date || !selectedService) {
      alert('Please fill in all fields');
      return;
    }

    // Add a new slot for the staff member
    await addDoc(collection(db, 'slots'), {
      staffId,
      serviceId: selectedService,
      startTime,
      endTime,
      date,
      status: 1 // available slot
    });

    alert('Slot added successfully');
    setStartTime('');
    setEndTime('');
    setDate('');
  };

  const handleSlotStatusChange = async (slotId, newStatus) => {
    const slotRef = doc(db, 'slots', slotId);
    await updateDoc(slotRef, { status: newStatus });
    alert('Slot status updated');
  };

  return (
    <div>
      <h2>Manage Available Slots</h2>
      
      <label>Select Service</label>
      <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
        <option value="">--Choose Service--</option>
        {serviceList.map(service => (
          <option key={service.id} value={service.id}>
            {service.name}
          </option>
        ))}
      </select>

      <label>Start Time</label>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <label>End Time</label>
      <input
        type="time"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />

      <label>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleSlotCreation}>Create Slot</button>

      <h3>Existing Slots</h3>
      {slots.length === 0 && <p>No slots available.</p>}
      {slots.map((slot) => (
        <div key={slot.id}>
          <p><b>Service:</b> {slot.serviceId}</p>
          <p><b>Date:</b> {slot.date} | {slot.startTime} - {slot.endTime}</p>
          <p><b>Status:</b> {slot.status === 1 ? 'Available' : slot.status === 2 ? 'Pending' : 'Finished'}</p>

          <button onClick={() => handleSlotStatusChange(slot.id, 2)}>Mark as Pending</button>
          <button onClick={() => handleSlotStatusChange(slot.id, 4)}>Mark as Finished</button>
        </div>
      ))}
    </div>
  );
}

export default AvailableSlots;
