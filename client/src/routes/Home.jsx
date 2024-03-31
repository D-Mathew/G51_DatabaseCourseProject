import React, {useEffect, useState} from 'react'
import "../static/styles/intro.css"
import {useNavigate} from 'react-router-dom'
import { useDates } from '../DateContext'
import apis from '../apis'

export const Home = () => {
  const today = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    destination: '',
    startDate: today,
    endDate: ''
  });

  const {setDates}= useDates();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
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

  useEffect(() => {
    setDates({ startDate: formData.startDate, endDate: formData.endDate });
  }, [formData])

  const handleSearch = async (e) => {
      e.preventDefault();
      // Implement your search logic here
      try {
        const response = await apis.post('/hotelResults', formData);
        console.log(response.data); // Handle the response data
        navigate('/hotels', { state: { search: response.data } });
      } catch (error) {
        console.error("There was an error submitting the form:", error);
        // Handle errors or give user feedback here
      }
  };
  return (
    <div className="hotel-search-card container">
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
                  min={today}
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
                  min={formData.startDate || today} // Ensures endDate is after startDate
                  className="form-control"
                  required
              />
          </div>
          <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  )
}

export default Home
