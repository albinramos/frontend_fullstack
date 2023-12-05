import React, { useState, Component } from 'react';
import { houses } from '../../Data';
import './landing.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Landing = () => {
  const pageStyles = {
    minHeight: '100vh'
  };

  const [randomHouses, setRandomHouses] = useState([]);

  const getCityName = async (lat, lon) => {
    try {
      const apiKey = '19ad8885f90bc4592b407518f2859bf2';
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const data = await response.json();
      const cityName = Array.isArray(data) && data.length > 0 ? data[0] : null;
      console.log('data:', data);
      //console.log('data.name:', data.name);
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
          //console.log('ciudad:', cityName.name);
          return { ...house, cityName };
        })
      );
  
      setRandomHouses(housesWithCityNames);
    } catch (error) {
      console.error('Error fetching city names for houses:', error.message);
    }
  };
  
  // Llama a la función al montar el componente
  React.useEffect(() => {
    getRandomHouses();
  }, []);
  
    return (
      <div style={pageStyles}>
        <section className="landing">
          <h1>Landing</h1>
          <div className='landing__input'>
          <form className='register__form'>
            <input type='text' placeholder='First Name'className='form__name'/>
            <input type='text' placeholder='Last Name'className='form__last'/>
            <input type="email" placeholder="Email" className='form__email'/>
          </form>
          </div>
          <div className='landing__container'>
            {randomHouses.map((house, index) => {
              let imageElement;
    
              if (house.imageSrc && house.imageSrc.length > 0) {
                imageElement = (
                  <img src={house.imageSrc[0]} alt={`House ${index + 1}`} className='landing__img'/>
                );
              } else {
                imageElement = (
                  <img src='../../assets/no-image.jpg' alt={`No Image`} className='landing__img'/>
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












export default Landing