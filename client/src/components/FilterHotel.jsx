import React, {useState, useEffect} from "react";
import "../static/styles/filter.css"
import { useDates } from "../DateContext";

const FilterHotel = ({onFilterChange}) => {
    const today = new Date().toISOString().split('T')[0]
    const {dates, setDates}= useDates();

    const [filters, setFilters] = useState({
        destination: '',
        startDate: dates.startDate,
        endDate: dates.endDate,
        capacity: [],
        view: [],
        price: 500,
    });

    const handleCapacityChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => {
            const updatedCapacity = checked
                ? [...prevFilters.capacity, name]
                : prevFilters.capacity.filter(capacity => capacity !== name);

            return {...prevFilters, capacity: updatedCapacity}
        });
    };

    const handleViewChange = (event) => {
        const { name, checked } = event.target;
        setFilters(prevFilters => {
            const updatedView = checked
                ? [...prevFilters.view, name]
                : prevFilters.view.filter(view => view !== name);

            return {...prevFilters, view: updatedView}
        });
    }

    // Handler for the price range change
    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: Number(value) }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFormData => {
          // When startDate changes, adjust endDate to ensure it's not before startDate
          if (name === 'startDate' && prevFormData.endDate && prevFormData.endDate < value) {
            return {
              ...prevFormData,
              [name]: value,
              endDate: value, // Set endDate to startDate if endDate is earlier than the new startDate
            };
          } else {
            return {
              ...prevFormData,
              [name]: value,
            };
          }
        });
      };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally
        onFilterChange(filters); // Pass the filters back to the parent component
    };

    useEffect(() => {
        setDates({ startDate: filters.startDate, endDate: filters.endDate });
      }, [filters])

    return (
        <form onSubmit={handleSubmit}>
            <div className="filter container mt-5 d-flex flex-column">
                <div id="destination" className="d-flex flex-column mb-3">
                    <h5>Destination</h5>
                    <input
                        type="text"
                        id="destination"
                        name='destination'
                        value={filters.destination}
                        onChange={handleChange}
                        placeholder="Enter your destination"
                    />
                </div>
                <div id="startDate" className="d-flex flex-column mb-3">
                    <h5>Start Date</h5>
                    <input
                        type="date"
                        id="start-date"
                        name='startDate'
                        value={filters.startDate}
                        min={today}
                        onChange={handleChange}
                    />
                </div>
                <div id="endDate" className="d-flex flex-column mb-3">
                    <h5>End Date</h5>
                    <input
                        type="date"
                        id="end-Date"
                        name='endDate'
                        value={filters.endDate}
                        min={today}
                        onChange={handleChange}
                    />
                </div>
                <div id="capactity" className="d-flex flex-column mb-3">
                    <h5>Capacity</h5>
                    <div id="capacity-options" className="d-flex flex-row gap-4">
                        <div>
                            <input
                                type="checkbox"
                                id="single"
                                name="Single"
                                checked={filters.capacity.includes('Single')}
                                onChange={handleCapacityChange}
                            />
                            <label htmlFor="single">Single</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="double"
                                name="Double"
                                checked={filters.capacity.includes('Double')}
                                onChange={handleCapacityChange}
                            />
                            <label htmlFor="double">Double</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="triple"
                                name="Triple"
                                checked={filters.capacity.includes('Triple')}
                                onChange={handleCapacityChange}
                            />
                            <label htmlFor="triple">Triple</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="quad"
                                name="Quad"
                                checked={filters.capacity.includes('Quad')}
                                onChange={handleCapacityChange}
                            />
                            <label htmlFor="quad">Quad</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="Suite"
                                name="Suite"
                                checked={filters.capacity.includes('Suite')}
                                onChange={handleCapacityChange}
                            />
                            <label htmlFor="Suite">Suite</label>
                        </div>
                    </div>
                </div>
                <div id="view" className="d-flex flex-column mb-3">
                    <h5>View</h5>
                    <div id="view-options" className="d-flex flex-row gap-4">
                        <div>
                            <input
                                type="checkbox"
                                id="city"
                                name="City"
                                checked={filters.view.includes('City')}
                                onChange={handleViewChange}
                            />
                            <label htmlFor="city">City</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="sea"
                                name="Sea"
                                checked={filters.view.includes('Sea')}
                                onChange={handleViewChange}
                            />
                            <label htmlFor="sea">Sea</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="garden"
                                name="Garden"
                                checked={filters.view.includes('Garden')}
                                onChange={handleViewChange}
                            />
                            <label htmlFor="garden">Garden</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="mountain"
                                name="Mountain"
                                checked={filters.view.includes('Mountain')}
                                onChange={handleViewChange}
                            />
                            <label htmlFor="mountain">Mountain</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="park"
                                name="Park"
                                checked={filters.view.includes('Park')}
                                onChange={handleViewChange}
                            />
                            <label htmlFor="park">Park</label>
                        </div>
                    </div>
                </div>
                <div id="price" className="d-flex flex-column mb-3">
                    <h5>Price per Night</h5>
                    <div id="price-options" className="d-flex flex-row gap-4">
                        <div>
                            <label htmlFor="price">Price: ${filters.price}</label>
                            <input
                                type="range"
                                id="price"
                                name="price"
                                min="0"
                                max="1000" // Adjust max value as needed
                                value={filters.price}
                                onChange={handlePriceChange}
                                className="form-control-range"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="mb-3">Search</button>
            </div>
        </form>
    );
}

export default FilterHotel;