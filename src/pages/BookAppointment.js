import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';

function BookAppointment({ studentId }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchServices();
  }, []);

  const handleServiceSelect = async (e) => {
    const serviceId = e.target.value;
    setSelectedService(serviceId);

    const snapshot = await getDocs(collection(db, 'slots'));
    const filtered = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(slot => slot.serviceId === serviceId && slot.status === 1);
    setAvailableSlots(filtered);
  };

  const handleBooking = async () => {
    if (!selectedSlot || !description) {
      alert('Please select a slot and write a description.');
      return;
    }

    // Create booking
    await addDoc(collection(db, 'bookings'), {
      slotId: selectedSlot.id,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      date: selectedSlot.date,
      studentId,
      staffId: selectedSlot.staffId,
      status: 2, // pending
      serviceId: selectedService,
      studentDescription: description,
      staffDescription: ''
    });

    // Update slot status to pending (optional)
    await updateDoc(doc(db, 'slots', selectedSlot.id), {
      status: 2
    });

    alert('Booking request sent. Await staff confirmation.');
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <label>Select Service:</label>
      <select onChange={handleServiceSelect}>
        <option value="">--Choose--</option>
        {services.map(service => (
          <option key={service.id} value={service.id}>{service.name}</option>
        ))}
      </select>

      <label>Select Slot:</label>
      <select onChange={(e) => {
        const slot = availableSlots.find(s => s.id === e.target.value);
        setSelectedSlot(slot);
      }}>
        <option value="">--Choose--</option>
        {availableSlots.map(slot => (
          <option key={slot.id} value={slot.id}>
            {slot.date} {slot.startTime}-{slot.endTime}
          </option>
        ))}
      </select>

      <textarea
        placeholder="Describe your issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button onClick={handleBooking}>Submit Booking</button>
    </div>
  );
}

export default BookAppointment;
