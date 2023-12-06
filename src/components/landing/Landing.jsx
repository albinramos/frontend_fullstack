import React, { useState, useEffect } from 'react';
import { houses } from '../../Data';
import './landing.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, Link } from 'react-router-dom'; 

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

  const getRandomHouses = async () => {
    const shuffledHouses = houses.sort(() => 1 - Math.random());
    const selectedHouses = shuffledHouses.slice(0, 12);

    try {
      const housesWithCityNames = await Promise.all(
        selectedHouses.map(async (house) => {
          const [lat, lon] = house.locationValue.split(',').map(Number);
          const cityName = await getCityName(lat, lon);
          return { ...house, cityName };
        })
      );

      setRandomHouses(housesWithCityNames);
    } catch (error) {
      console.error('Error fetching city names for houses:', error.message);
    }
  };

  useEffect(() => {
    getRandomHouses();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    searchHouses(city, arrivalDate, departDate, guests);
    navigate('/search', { state: { city, arrivalDate, departDate, guests } });
  };

  const searchHouses = (city, arrivalDate, departDate, guests) => {
    console.log('Búsqueda de casas con los siguientes criterios:');
    console.log('City:', city);
    console.log('Arrival Date:', arrivalDate);
    console.log('Depart Date:', departDate);
    console.log('Guests:', guests);
  };

  return (
    <div style={pageStyles}>
      <section className="landing">
        <h1>Landing</h1>
        <div className='landing__input'>
          <form className='landing__form' onSubmit={handleSubmit}>
            <input type='text' placeholder='City' className='form__city' value={city} onChange={(e) => setCity(e.target.value)} />
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
              <div key={index}>
                <h2 className='landing__h2-title'>{house.title}</h2>
                <p>City: {house.cityName}</p>
                <p>Guest Count: {house.guestCount}</p>
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
