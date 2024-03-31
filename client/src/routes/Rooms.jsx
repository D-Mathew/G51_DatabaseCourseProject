import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import PicSlideShow from '../components/PicSlideShow'
import RoomCard from '../components/RoomCard'

export const Rooms = () => {
  const location = useLocation();
  const {search} = location.state|| {}; // Empty obj if no state  
  console.log(search.data)
  let { id } = useParams();

  const roomCards = [];

  // For loop to create multiple RoomCard Components
  for (let i = 0; i < search.data.length; i++) {
      // console.log(search.data[i])
      roomCards.push(<RoomCard key={i} data={search.data[i]}/>);
      // console.log(roomCards)
  }

  return (
    <div className='container'>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h2>Hotel Details {id}</h2>
          <PicSlideShow />
        </div>
        <div className='d-flex flex-column'>
          <h2 className='mb-3 mt-3'>Our Rooms</h2>
          {roomCards}
        </div>
    </div>
  )
}

export default Rooms
