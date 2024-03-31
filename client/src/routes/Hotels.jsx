import React, {useState} from 'react'
import FilterHotel from '../components/FilterHotel'
import HotelCard from '../components/HotelCard';
import { useLocation } from 'react-router-dom';

export const Hotels = () => {
    const location = useLocation();
    console.log(location)
    const {search} = location.state || {}; // Empty obj if no state
    console.log(search)

    const [filteredData, setFilteredData] = useState([]); // Data to be rendered, initially empty

    // Dummy data for illustration
    const data = [
        { name: 'Item 1', type: 'wifi' },
        { name: 'Item 2', type: 'tv' },
        { name: 'Item 3', type: 'minibar' },
        // Add more items as needed
    ];

    const handleFilterChange = (filters) => {
        // Filter your data based on the selected filters
        const newFilteredData = data.filter(item => 
            (!filters.wifi || item.type === 'wifi') &&
            (!filters.tv || item.type === 'tv') &&
            (!filters.minibar || item.type === 'minibar')
        );
        setFilteredData(newFilteredData);
    };

    const hotelCards = [];

    // For loop to create multiple hotelCard Components
    for (let i = 0; i < search.data.length; i++) {
        hotelCards.push(<HotelCard key={i} data={search.data[i]}/>);
    }

    return (
        <div className='container'>
            <FilterHotel onFilterChange={handleFilterChange} />
            <ul>
                {filteredData.map(item => (
                    <li key={item.name}>{item.name}</li>
                ))}
            </ul>
            <h2 className='mb-5'>Available Hotels</h2>
            {hotelCards}
        </div>
    )
}

export default Hotels
