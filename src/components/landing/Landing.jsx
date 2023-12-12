import React, { useState, useEffect } from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom'; 
import CityAutosuggest from './../cityAutosuggest';
import { fetchCityData } from '../../apiUtils';

const Landing = () => {
  const pageStyles = {
    minHeight: '100vh'
  };

  const navigate = useNavigate();

  const [randomHouses, setRandomHouses] = useState([]);
  const [city, setCity] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [guests, setGuests] = useState(1);

  const handleCitySelection = (selectedCity, _, selectedLat, selectedLon) => {
    setCity(selectedCity);
  };

  const getCityName = async (lat, lon) => {
    try {
      const apiKey = '19ad8885f90bc4592b407518f2859bf2';
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const data = await response.json();
      const cityName = Array.isArray(data) && data.length > 0 ? data[0].name : null;
      console.log('data:', data);
      console.log('cityName:', cityName);
      return cityName;
    } catch (error) {
      console.error('Error fetching city name:', error.message);
      return '';
    }
  };

  const getHouses = async () => {
    try {
      const endpoint = 'http://localhost:3666/house';
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('data:', data);

      // Obtener el cityName para cada casa y actualizar el estado
      const housesWithCityName = await Promise.all(data.houses.map(async (house) => {
        const [lat, lon] = house.locationValue.split(',').map(coord => parseFloat(coord.trim()));
        const cityName = await getCityName(lat, lon);
        return { ...house, cityName };
      }));

      setRandomHouses(housesWithCityName);
    } catch (error) {
      console.error('Error fetching houses:', error.message);
    }
  };

  useEffect(() => {
    getHouses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetch city data based on the selected city from cities500.json
    const cityData = await fetchCityData(city);

    const citySlug = city.toLowerCase().replace(/\s/g, '-');
    // Navigate to the search page with the form data and cityData
    navigate(`/cities/${citySlug}`, { state: { city, arrivalDate, departDate, guests, cityData } });
  };

  return (
    <div style={pageStyles}>
      <section className="landing">
        <h1>Landing</h1>
        <div className='landing__input'>
          <form className='landing__form' onSubmit={handleSubmit}>
            <CityAutosuggest onSelectCity={handleCitySelection}/>
            <label for='arrivalDate'>Arrival Date</label>
            <input type='date' placeholder='Arrival Date' className='form__arrival-date' value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
            <label for='departureDate'>Departure Date</label>
            <input type="date" placeholder="Depart Date" className='form__depart-date' value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
            <label for='totalGuests'>Nº of Guests</label>
            <input type="number" className='form__guests' value={guests} onChange={(e) => setGuests(e.target.value)} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className='landing__container'>
          {randomHouses.map((house, index) => {
            let imageElement;

            if (house.imageSrc && house.imageSrc.length > 0) {
              imageElement = (
                <img src={house.imageSrc[0]} alt={`House ${index + 1}`} className='landing__img' />
              );
            } else {
              imageElement = (
                <img src='../src/assets/no-image.jpg' alt={`No Image`} className='landing__img' />
              );
            }

            return (
              <div key={index} className='landing__house-card'>
                <h2 className='landing__h2-title'>{house.title}</h2>
                <p className='landing__p-card'>City: {house.cityName}</p>
                <p className='landing__p-card-last'>Total Guests Number: {house.guestCount}</p>
                {imageElement}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Landing;
