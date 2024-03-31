import React, {useState} from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useDates } from '../DateContext';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import apis from '../apis';
// import { useAuth } from '../AuthContext'; 

export const PaymentInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const { login } = useAuth();
    const {search} = location.state|| {}; // Empty obj if no state  
    console.log(search)
    let { id } = useParams();

    const {dates} = useDates();
    const nightlyRate = search.data.price; // Example rate, adjust as needed
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
        fullname: '',
        email: '',
        phonenumber: '',
    })

    const handleChange = (name, value) => {
        setPaymentInfo({ 
            ...paymentInfo, 
            [name]: value
        });

    };

    const handlePaymentSubmit = async (e) => {
        // e.preventDefault();
        // try {
        //     const response = await apis.post(`http://localhost:4000/api/book`, paymentInfo);
        //     if (response.status === 200) {
        //         // login(loginInfo.email, loginType); // Optionally, handle roles if needed
        //         alert("Book Room Successfully")
        //         navigate('/bookings');
        //     } else {
        //         console.error('Login failed with status:', response.status);
        //     }
        // } catch (err) {
        //     console.error('Login error:', err);
        // }
    };
    
    return (
        <div className="container mt-4">
            <h2>Room Information</h2>
            <p>Check in: {dates.startDate}</p>
            <p>Check out: {dates.endDate}</p>
            <p>Total Length of stay: {totalNights} nights</p>
            <p>Total Price: ${totalPrice}</p>

            <hr />
            <h2>Payment Information</h2>

            <form onSubmit={handlePaymentSubmit}>
            <div className="mb-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullname"
                        name='fullname'
                        value={paymentInfo.fullname}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name='email'
                        value={paymentInfo.email}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phonenumber" className='form-label'>Phone Number</label>
                    <PhoneInput
                        id='phonenumber'
                        className='form-control d-flex flex-row'
                        international
                        defaultCountry="US"
                        value={paymentInfo.phonenumber}
                        onChange={(value) => handleChange('phonenumber', value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name='cardNumber'
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
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