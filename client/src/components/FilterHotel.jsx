import React, {useState} from "react";
import "../static/styles/filter.css"

const FilterHotel = ({onFilterChange}) => {

    const [filters, setFilters] = useState({
        wifi: false,
        tv: false,
        minibar: false,
        balcony: false,
        desk: false,
        kitchenette: false,
        single: false,
        double: false,
        triple: false,
        quad: false,
        suite: false,
        city: false,
        sea: false,
        garden: false,
        mountain: false,
        park: false,
        price: 0,
    });

    const [price, setPrice] = useState(500);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters({ ...filters, [name]: checked });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form from submitting traditionally
        onFilterChange(filters); // Pass the filters back to the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="filter container mt-5 d-flex flex-column">
                <div id="amenities" className="d-flex flex-column mb-3">
                    <h5>Amenities</h5>
                    <div id="amenities-options" className="d-flex flex-row gap-4">
                        <div>
                            <input
                                type="checkbox"
                                id="wifi"
                                name="wifi"
                                checked={filters.wifi}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="wifi">Wifi</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="tv"
                                name="tv"
                                checked={filters.tv}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="tv">TV</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="minibar"
                                name="minibar"
                                checked={filters.minibar}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="minibar">Minibar</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="balcony"
                                name="balcony"
                                checked={filters.balcony}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="balcony">Balcony</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="des"
                                name="des"
                                checked={filters.des}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="des">Desk</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="kitchenette"
                                name="kitchenette"
                                checked={filters.kitchenette}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="kitchenette">Kitchenette</label>
                        </div>
                    </div>
                </div>
                <div id="capactity" className="d-flex flex-column mb-3">
                    <h5>Capacity</h5>
                    <div id="capacity-options" className="d-flex flex-row gap-4">
                        <div>
                            <input
                                type="checkbox"
                                id="single"
                                name="single"
                                checked={filters.single}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="single">Single</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="double"
                                name="double"
                                checked={filters.double}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="double">Double</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="triple"
                                name="triple"
                                checked={filters.triple}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="triple">Triple</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="quad"
                                name="quad"
                                checked={filters.quad}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="quad">Quad</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="Suite"
                                name="Suite"
                                checked={filters.Suite}
                                onChange={handleCheckboxChange}
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
                                name="city"
                                checked={filters.city}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="city">City</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="sea"
                                name="sea"
                                checked={filters.sea}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="sea">Sea</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="garden"
                                name="garden"
                                checked={filters.garden}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="garden">Garden</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="mountain"
                                name="mountain"
                                checked={filters.mountain}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="mountain">Mountain</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="park"
                                name="park"
                                checked={filters.park}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="park">Park</label>
                        </div>
                    </div>
                </div>
                <div id="price" className="d-flex flex-column mb-3">
                    <h5>Price per Night</h5>
                    <div id="price-options" className="d-flex flex-row gap-4">
                        <div>
                            <label htmlFor="price">Price: ${price}</label>
                            <input
                                type="range"
                                id="price"
                                name="price"
                                min="0"
                                max="1000" // Adjust max value as needed
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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