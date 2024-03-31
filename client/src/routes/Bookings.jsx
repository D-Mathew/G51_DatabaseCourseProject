import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const { userEmail } = useAuth(); // Assuming useAuth provides the logged-in user's email

  useEffect(() => {
    const getBookings = async () => {
      try {
        // Pass the user's email as a query parameter
        const response = await axios.get(`http://localhost:4000/api/getbooking?email=${encodeURIComponent(userEmail)}`);
        if (response.status === 200) {
          setBookings(response.data.data); // Assuming the server response structure
        } else {
          console.error('Failed to fetch bookings', response.status);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.response?.data?.message || 'Failed to fetch bookings');
      }
    };

    if (userEmail) {
      getBookings();
    } else {
      setError('User email not found.');
    }
  }, [userEmail]); // Depend on userEmail to refetch if it changes

  return (
    <div>
      <h2>Bookings</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            Booking ID: {booking.bookingid}, Start Date: {booking.startdate}, End Date: {booking.enddate},
            Hotel Address: {booking.streetnum} {booking.streetname}, {booking.apartmentnum}, {booking.zipcode}, 
            Phone Number: {booking.phonenumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
