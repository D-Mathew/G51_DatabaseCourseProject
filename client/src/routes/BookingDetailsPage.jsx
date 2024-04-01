import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState({});
  const [error, setError] = useState('');

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        console.log(bookingId);
        const response = await axios.get(`http://localhost:4000/api/booking/${bookingId}`);
        console.log(response.data.data)
        setBookingDetails(response.data.data);
      } catch (err) {
        setError('Failed to fetch booking details');
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  const handleUpdateBooking = async () => {
    try {
      await axios.put(`http://localhost:4000/api/update-booking/${bookingId}`);
      navigate('/success'); // Redirect to a success page or simply refetch booking details
    } catch (err) {
      setError('Failed to update booking');
    }
  };

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/process-payment/${bookingId}`, paymentDetails);
      if(response.status === 200) {
        navigate('/success');
    }
    } catch (err) {
      setError('Failed to process payment');
    }
  };

  

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Customer Name: {bookingDetails.fullname}</p>
      <p>Booking ID: {bookingDetails.bookingid}</p>
      {/* Display other booking details */}
      <button onClick={handleUpdateBooking}>Mark as Renting</button>

      <form onSubmit={handleProcessPayment}>
      <h3>Payment Information</h3>
      <input type="text" name="cardNumber" placeholder="Card Number" value={paymentDetails.cardNumber} onChange={handlePaymentChange} required />
      <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" value={paymentDetails.expiryDate} onChange={handlePaymentChange} required />
      <input type="text" name="cvv" placeholder="CVV" value={paymentDetails.cvv} onChange={handlePaymentChange} required />
      <button type="submit">Process Payment</button>
    </form>
    </div>
  );
};

export default BookingDetailsPage;
