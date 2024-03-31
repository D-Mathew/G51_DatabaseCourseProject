import React from "react";
import { useNavigate } from "react-router-dom";
import { useDates } from "../DateContext";
import apis from "../apis";

const HotelCard = (hotel_info) => {
    const {dates} = useDates();
    const navigate = useNavigate();
    const handleHotelSelect = async () => {
        try {
            const response = await apis.post(`/getHotelDetails/${hotel_info.data.hotelid}`, dates);
            console.log(response.data); // Handle the response data
            navigate(`/hotels/${hotel_info.data.hotelid}`, {state: {search: response.data}})
        }
        catch (error){
            console.error("Error Fetching Hotel Details", error)
        }
    }


    return (
        <div className="card mb-5">
            <div className="card-body">
                <h5 className="card-title">{hotel_info.data.name}</h5>
                <p className="card-text">Ratings: {hotel_info.data.ratings}/10</p>
                <p className="card-text">Number of Rooms: {hotel_info.data.noofrooms}</p>
                <p className="card-text">Address: {hotel_info.data.streetnum} {hotel_info.data.streetname}, {hotel_info.data.city}, {hotel_info.data.state}, {hotel_info.data.zipcode}</p>
                <div className="btn btn-primary" onClick={handleHotelSelect}>View Details</div>
            </div>
        </div>
    )
}

export default HotelCard;