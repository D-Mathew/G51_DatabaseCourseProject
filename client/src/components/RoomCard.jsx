import React from 'react'
import { useNavigate } from 'react-router-dom'
import apis from '../apis'



const RoomCard = (room_info) => {

    const navigate = useNavigate();
    const handleRoomBooking = async () => {
        try {
            const response = await apis.post(`/bookRoom/${room_info.data.roomid}`, room_info);
            console.log(response.data); // Handle the response data
            navigate(`/paymentInfo/${room_info.data.roomid}`, {state: {search: response.data}})
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
                <h5 className="card-title">{room_info.data.capacity} Room</h5>
                <p className="card-text">{room_info.data.view}</p>
                <p className="card-text">Amenities: {room_info.data.amenities}</p>
                <p className="card-text">Price per night: ${room_info.data.price}</p>
                <div className="btn btn-primary" onClick={handleRoomBooking}>Book</div>
            </div>
        </div>
    )
}

export default RoomCard;