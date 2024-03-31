import React, {useState} from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDates } from '../DateContext';
import { useAuth } from '../AuthContext'; 

export const PaymentInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {search, hotelId, roomId} = location.state|| {}; // Empty obj if no state  
    // console.log(search)
    let { id } = useParams();
    const { customerID } = useAuth();
    const {dates} = useDates();
    console.log(dates)
    const nightlyRate = 100; // Example rate, adjust as needed
    const calculateNights = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    };
  
    const totalNights = calculateNights(dates.startDate, dates.endDate);
    const totalPrice = totalNights * nightlyRate;

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ 
            ...paymentInfo, 
            [name]: value 
        });

    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const bookingDetails = {
            roomid: roomId,
            hotelid: hotelId,
            customerid: customerID,
            startdate: dates.startDate,
            enddate: dates.endDate,
            card_no: paymentInfo.cardNumber,
            card_expiry: paymentInfo.expiryDate,
            card_cvv: paymentInfo.cvv
            // Add more details as per your requirements
        };

        try {
            console.log(bookingDetails);
            const response = await axios.post('http://localhost:4000/api/bookRoom', bookingDetails);
            if (response.status === 200) {
                // Handle success, for example redirect to a success page or display a success message
                navigate('/bookingSuccess', { state: { bookingDetails: response.data } }); // Adjust the path as necessary
            } else {
                // Handle other HTTP statuses or failure scenarios
                console.error('Booking failed with status:', response.status);
            }
        } catch (err) {
            console.error('Error during booking:', err);
            // Handle error, such as displaying an error message to the user
        }
    };
    
    return (
        <div className="container mt-4">
            <h2>Room Information</h2>
            <p>Stay Period: {dates.startDate} to {dates.endDate}</p>
            <p>Total Price: ${totalPrice}</p>

            <hr />
            <h2>Payment Information</h2>

            <form onSubmit={handlePaymentSubmit}>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name='cardNumber'
                        value={paymentInfo.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9123 4567"
                        maxLength="19"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="expiryDate"
                        name='expiryDate'
                        value={paymentInfo.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name='cvv'
                        value={paymentInfo.cvv}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="4"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Payment</button>
            </form>
        </div>
    )

}

export default PaymentInfo