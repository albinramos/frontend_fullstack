import React, { useState, useEffect } from 'react';
import './houseDetails.css';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import AmenityIcon from '../AmenityIcon';
import { useNavigate } from 'react-router-dom';


const HouseDetails = () => {
  const location = useLocation();
  const [selectedHouse, setSelectedHouse] = useState(location.state?.selectedHouse || null);
  const navigate = useNavigate();

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const resetSelectedHouse = () => {
  navigate(-1, { state: { selectedHouse: null } });
};

return (
  <div className="more-info__card">
    <div className='popup__container'>
      <h3>{selectedHouse.title}</h3>
      <Slider {...sliderSettings}>
      {selectedHouse.imageSrc.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`House ${index + 1}`} className='slider-img'/>
        </div>
      ))}
    </Slider>
      <p><strong>Description:</strong> {selectedHouse.description}</p>
      <p><strong>Number of guests:</strong> {selectedHouse.guestCount}</p>
      <p><strong>Category:</strong> {selectedHouse.category}</p>
      <p><strong>Nº of rooms:</strong> {selectedHouse.roomCount} </p>
      <p><strong>Nº of bathrooms:</strong> {selectedHouse.bathroomCount}</p>
      <div className='amenities__block'>
        <p>
          <strong>Amenities:</strong>
        </p>
        {selectedHouse.amenities.map((amenity, index) => (
          <p key={index} style={{ marginBottom: '10px' }}>
            - <AmenityIcon amenity={amenity} /> {amenity}
          </p>
        ))}
      </div>
      <div className='search__buttons'>
        <button className='reservation__button'>Reservation</button>
        <button onClick={resetSelectedHouse} className='close__button'>Close</button>
      </div>
    </div>
  </div>
);
        }



export default HouseDetails