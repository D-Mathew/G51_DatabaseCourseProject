// BookingDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`/api/booking/${bookingId}`);
        setBookingDetails(response.data);
      } catch (err) {
        setError('Failed to fetch booking details');
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  const handleUpdateBooking = async () => {
    try {
      await axios.put(`/api/update-booking/${bookingId}`);
      navigate('/success'); // Redirect to a success page or simply refetch booking details
    } catch (err) {
      setError('Failed to update booking');
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Customer Name: {bookingDetails.customerName}</p>
      <p>Booking ID: {bookingDetails.bookingId}</p>
      {/* Display other booking details */}
      <button onClick={handleUpdateBooking}>Mark as Renting</button>
    </div>
  );
};

export default BookingDetailsPage;
