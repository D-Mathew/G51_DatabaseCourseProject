import React, {useState} from 'react'
import "../static/styles/intro.css"
import {useNavigate} from 'react-router-dom'

export const Intro = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const handleSearch = (e) => {
      e.preventDefault();
      // Implement your search logic here
      navigate('/exploreRooms', { state: { search: formData } });
  };
  return (
    <div className="hotel-search-card">
      <form onSubmit={handleSearch}>
          <div className="form-group">
              <label htmlFor="destination">Destination:</label>
              <input
                  type="text"
                  id="destination"
                  name='destination'
                  value={formData.destination}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your destination"
                  required
              />
          </div>
          <div className="form-group">
              <label htmlFor="start-date">Start Date:</label>
              <input
                  type="date"
                  id="start-date"
                  name='startDate'
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-control"
                  required
              />
          </div>
          <div className="form-group">
              <label htmlFor="end-date">End Date:</label>
              <input
                  type="date"
                  id="end-date"
                  name='endDate'
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-control"
                  required
              />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  )
}

export default Intro
