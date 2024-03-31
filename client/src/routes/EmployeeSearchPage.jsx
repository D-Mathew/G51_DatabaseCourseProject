// EmployeeSearchPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeSearchPage = () => {
  const [bookingId, setBookingId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/booking-details/${bookingId}`);
  };

  return (
    <div>
      <h2>Search for Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          placeholder="Enter Booking ID"
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default EmployeeSearchPage;
