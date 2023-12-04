import React, { useState } from 'react';
import { houses } from '../../Data';
import './landing.css';

const Landing = () => {
  const pageStyles = {
    minHeight: '100vh'
  };

  const [randomHouses, setRandomHouses] = useState([]);

  const getCityName = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data = await response.json();
      return data.address.city || data.address.town || data.address.village || data.address.hamlet || data.address.county;
    } catch (error) {
      console.error('Error fetching city name:', error);
      return '';
    }
  };

  const getRandomHouses = async () => {
    const shuffledHouses = houses.sort(() => 1 - Math.random());
    const selectedHouses = shuffledHouses.slice(0, 10);

    // Obtener el nombre de la ciudad para cada casa
    const housesWithCityNames = await Promise.all(
      selectedHouses.map(async (house) => {
        const [latitude, longitude] = house.locationValue.split(',').map(Number);
        const cityName = await getCityName(latitude, longitude);
        return { ...house, cityName };
      })
    );

    setRandomHouses(housesWithCityNames);
  };

    // Llama a la función al montar el componente
    React.useEffect(() => {
      getRandomHouses();
    }, []);
  
    return (
      <div style={pageStyles}>
        <section className="landing">
          <h1>Landing</h1>
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