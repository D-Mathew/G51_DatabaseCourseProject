import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PicSlideShow from '../components/PicSlideShow'

export const Rooms = () => {
  const location = useLocation();
  const {hotelData} = location.state || {}; // Empty obj if no state
  console.log(hotelData)
  let { id } = useParams();

  return (
    <div className='container'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h2>Hotel Details {id}</h2>
          <PicSlideShow />
        </div>
    </div>
  )
}

export default Rooms
