import React from 'react'
import { useLocation } from 'react-router-dom'

export const Rooms = () => {
  const location = useLocation();
  console.log(location)
  const {search} = location.state || {}; // Empty obj if no state

  return (
    <div>
      <h2>Search Results</h2>
      <p>Destination: {search?.destination}</p>
      <p>Start Date: {search?.startDate}</p>
      <p>End Date: {search?.endDate}</p>
      {/* Render additional search results here */}
    </div>
  )
}

export default Rooms
