import React from "react";
import { useNavigate } from "react-router-dom";
import "../static/styles/hotelcard.css"
import { useDates } from "./DateContext";
import apis from "../apis";

const HotelCard = (hotel_info) => {
    const {dates} = useDates();
    console.log(dates)
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