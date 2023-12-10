import React, { useState, useEffect } from 'react';
import { houses } from '../../Data';
import './landing.css';
import { useNavigate, Link } from 'react-router-dom'; 
import CityAutosuggest from './../cityAutosuggest'
import { fetchCityData } from '../../apiUtils';


const Landing = () => {
  const pageStyles = {
    minHeight: '100vh'
  };

  const navigate = useNavigate();

  const [randomHouses, setRandomHouses] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [lat, setLat] = useState(''); 
  const [lon, setLon] = useState('');


  const handleCitySelection = (selectedCity, selectedCountry, selectedLat, selectedLon) => {
    setCity(selectedCity);
    setCountry(selectedCountry);
    setLat(selectedLat);
    setLon(selectedLon);
  };

  const getCityName = async (lat, lon) => {
    try {
      const apiKey = '19ad8885f90bc4592b407518f2859bf2';
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const data = await response.json();
      const cityName = Array.isArray(data) && data.length > 0 ? data[0] : null;
      console.log('data:', data);
      console.log('cityName:', cityName);
      return cityName.name;
    } 
    catch (error) {
      console.error('Error fetching city name:', error.message);
      return '';
    }
  };

const getHouses = async () => {
  const endpoint = 'http://backend.com/houses';
  const response = await fetch(endpoint);
  const data = await response.json();
  console.log('data:', data);
  setRandomHouses(data.houses);
}

  useEffect(() => {
    getHouses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Fetch city data based on the selected city from cities500.json
    const cityData = await fetchCityData(city);

    // Navigate to the search page with the form data and cityData
    navigate('/search', { state: { city, arrivalDate, departDate, guests, country, cityData } });
    console.log('cityData:', cityData);
  };

  return (
    <div style={pageStyles}>
      <section className="landing">
        <h1>Landing</h1>
        <div className='landing__input'>
          <form className='landing__form' onSubmit={handleSubmit}>
            <CityAutosuggest onSelectCity={handleCitySelection}/>
            <input type='date' placeholder='Arrival Date' className='form__arrival-date' value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
            <input type="date" placeholder="Depart Date" className='form__depart-date' value={departDate} onChange={(e) => setDepartDate(e.target.value)} />
            <input type="number" placeholder="Guests" className='form__guests' value={guests} onChange={(e) => setGuests(e.target.value)} />
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
                <p className='landing__p-card-last'>Guest Count: {house.guestCount}</p>
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