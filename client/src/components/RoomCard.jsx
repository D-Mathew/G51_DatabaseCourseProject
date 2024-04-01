import React from 'react'
import { useNavigate } from 'react-router-dom'
import apis from '../apis'
import { useAuth } from '../AuthContext'


const RoomCard = ({data, hotelId}) => {

    const navigate = useNavigate();
    const {isLoggedIn} = useAuth();
    const handleRoomBooking = async () => {
        try {
            // const response = await apis.get(`/bookRoom/${data.roomid}`);
            // console.log(response.data); // Handle the response data
            console.log(data)
            if (isLoggedIn) {
                navigate(`/paymentInfo/${data.roomid}`, {state: { search: data, hotelId: hotelId, roomId: data.roomid}})
            }
            else {
                navigate('/loginRegister')
            }
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
                <h5 className="card-title">{data.capacity} Room</h5>
                <p className="card-text">{data.view}</p>
                <p className="card-text">Amenities: {data.amenities}</p>
                <p className="card-text">Price per night: ${data.price}</p>
                <div className="btn btn-primary" onClick={handleRoomBooking}>Book</div>
            </div>
        </div>
    )
}

export default RoomCard;