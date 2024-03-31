import React, {useEffect, useState} from 'react'
import FilterHotel from '../components/FilterHotel'
import HotelCard from '../components/HotelCard';
import { useLocation } from 'react-router-dom';
import apis from '../apis';

export const Hotels = () => {
    const location = useLocation();
    // console.log(location)
    const {search} = location.state || {}; // Empty obj if no state
    // console.log(search)

    const [hotelData, setHotelData] = useState(search ? search.data : []); // Data to be rendered, initially empty

    // Handler to be passed to FilterHotel
    const handleFilterChange = async (filters) => {
        try {
            console.log(hotelData)
            // Assuming your backend endpoint expects filters as query parameters
            const response = await apis.post('/hotelResults', filters);
            console.log(response.data.data)
            setHotelData(response.data.data); // Update state with fetched data
        } catch (error) {
            console.error('Fetching filtered data failed:', error);
            // Handle error (e.g., show error message)
        }
    };

    // useEffect(() => {
    //     handleFilterChange(filteredData);
    // }, [hotelData])

    const hotelCards = [];

    // For loop to create multiple hotelCard Components
    for (let i = 0; i < hotelData.length; i++) {
        hotelCards.push(<HotelCard key={i} data={hotelData[i]}/>);
    }

    return (
        <div className='container'>
            <FilterHotel onFilterChange={handleFilterChange} />
            <h2 className='mb-5'>Available Hotels</h2>
            {hotelCards}
        </div>
    )
}

export default Hotels
