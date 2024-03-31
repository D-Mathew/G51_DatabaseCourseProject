import React from 'react'
import { useNavigate } from 'react-router-dom'
import apis from '../apis'



const RoomCard = ({data, hotelId}) => {

    const navigate = useNavigate();
    const handleRoomBooking = async () => {
        try {
            // const response = await apis.get(`/bookRoom/${room_info.data.roomid}`);
            // console.log(response.data); // Handle the response data
            navigate(`/paymentInfo/${data.roomid}`, {state: { hotelId: hotelId, roomId: data.roomid}})
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
                <p className="card-text">Room id: {data.roomid}</p>
                <p className="card-text">Price per night: ${data.price}</p>
                <div className="btn btn-primary" onClick={handleRoomBooking}>Book</div>
            </div>
        </div>
    )
}

export default RoomCard;