import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../static/styles/hotelcard.css"
import { useDates } from "../DateContext";
import apis from "../apis";
import axios from "axios";

const HotelCard = (hotel_info) => {
    const {dates} = useDates();
    console.log(dates)
    const navigate = useNavigate();
    const [totalCapacity, setTotalCapacity] = useState(0);

    useEffect(() => {
        const fetchHotelCapacity = async () => {
            try {
                // Assuming apis is set up to make requests to your backend
                console.log(hotel_info.data.hotelid);
                const response = await apis.get(`/hotelCapacity/${hotel_info.data.hotelid}`);
                console.log("sick");
                if(response.data.total_capacity !== undefined) {
                    setTotalCapacity(response.data.total_capacity);
                    // console.log('');
                }
            } catch (error) {
                console.error("Error fetching hotel capacity", error);
            }
        };
        fetchHotelCapacity();
    }, [hotel_info.data.hotelid]);

    const handleHotelSelect = async () => {
        try {
            const response = await apis.post(`/getHotelDetails/${hotel_info.data.hotelid}`, dates);
            console.log(response.data); // Handle the response data
            navigate(`/hotels/${hotel_info.data.hotelid}`, {state: {search: response.data, hotelId: hotel_info.data.hotelid}})
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
                <p className="card-text">Total Capacity: {totalCapacity}</p>
                <div className="btn btn-primary" onClick={handleHotelSelect}>View Details</div>
            </div>
        </div>
    )
}

export default HotelCard;