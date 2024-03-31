import React from "react";
import { useNavigate } from "react-router-dom";

const BookingCard = (hotelRoomInfo) => {
    const navigate = useNavigate();

    return (
        <div className="card mb-5">
            <div className="card-body">
                <h5 className="card-title">{hotelRoomInfo.data.name}</h5>
                <p className="card-text">Ratings: {hotelRoomInfo.data.ratings}/10</p>
                <p className="card-text">Number of Rooms: {hotelRoomInfo.data.noofrooms}</p>
                <p className="card-text">Address: {hotelRoomInfo.data.streetnum} {hotel_info.data.streetname}, {hotel_info.data.city}, {hotel_info.data.state}, {hotel_info.data.zipcode}</p>
            </div>
        </div>
    )
}

export default BookingCard;