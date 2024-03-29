import React, {useState} from 'react'

export const PaymentInfo = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here, add what you want to do with the form data.
        console.log({ cardNumber, expiryDate, cvv });
    };
    
    return (
        <div className="container mt-4">
            <h2>Payment Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">Credit Card Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
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
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
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
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
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