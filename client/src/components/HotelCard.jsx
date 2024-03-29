import React from "react";
import { useNavigate } from "react-router-dom";
import "../static/styles/hotelcard.css"
import axios from "axios";

const HotelCard = (hotel_info) => {
    const navigate = useNavigate();
    const handleHotelSelect = () => {
        navigate(`/hotels/${hotel_info.data.hotelid}`, hotel_info.data)
    }
    return (
        <div className="card mb-5">
            <div className="card-header">
                Featured
            </div>
            <div className="card-body">
                <h5 className="card-title">Special title treatment</h5>
                <p className="card-text">Hotel id: {hotel_info.data.hotelid}</p>
                <p className="card-text">Available Rooms: {hotel_info.data.available_rooms}</p>
                <div className="btn btn-primary" onClick={handleHotelSelect}>View Details</div>
            </div>
        </div>
    )
}

export default HotelCard;