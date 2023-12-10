import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './search.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaWifi,FaSwimmingPool, FaParking } from "react-icons/fa";
import { LuAirVent } from "react-icons/lu";
import { FaElevator } from "react-icons/fa6";

const Search = () => {
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null); // Nuevo estado para la casa seleccionada
  const location = useLocation();
  const { cityData } = location.state || {};

  const pageStyles = {
    minHeight: '100vh',
  };

  useEffect(() => {
    getHouses();
  }, []);

  const getHouses = async () => {
    const endpoint = 'http://backend.com/houses';
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log('data:', data);

    // Filtrar las casas por la ciudad especificada en cityData y alrededores (100 km)
    const filteredHouses = data.houses.filter((house) => {
      const houseLat = parseFloat(house.locationValue.split(',')[0]);
      const houseLon = parseFloat(house.locationValue.split(',')[1]);

      // Calcular la distancia entre la casa y la ciudad objetivo
      const distance = getDistance(cityData.lat, cityData.lon, houseLat, houseLon);

      // Filtrar casas dentro del rango de 100 km
      return distance <= 100;
    });

    setHouses(filteredHouses);
  };

  // Función para calcular la distancia entre dos puntos en la Tierra (fórmula de Haversine)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const deg2rad = (deg) => deg * (Math.PI / 180);

  const getGeolocation = () => {
    return houses.map((house) => ({
      lat: parseFloat(house.locationValue.split(',')[0]),
      lon: parseFloat(house.locationValue.split(',')[1]),
    }));
  };

  const handleMoreInfoClick = (house) => {
    setSelectedHouse(house);
  };

  const resetSelectedHouse = () => {
    setSelectedHouse(null);
  };

  const renderHouseDetails = () => {
    if (!selectedHouse) {
      return null;
    }
  
  const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
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
            <p><strong>Amenities:</strong></p>
            {selectedHouse.amenities.map((amenity, index) => (
            <p key={index} style={{ marginBottom: '10px' }}>- {amenity}</p>
            ))}
          </div>
          <button onClick={resetSelectedHouse}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div style={pageStyles}>
      <section className="search">
        <h1 className='search__h1'>Search Results</h1>
        <div className="map">
          <MapContainer center={[cityData.lat, cityData.lon]} zoom={13} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {getGeolocation().map((house, index) => (
              <Marker key={index} position={[house.lat, house.lon]}>
              </Marker>
            ))}
            {renderHouseDetails()} {/* Nuevo llamado a la función para mostrar detalles */}
          </MapContainer>
        </div>
      </section>
      <section className="houses">
        <h2>Houses</h2>
        <div className="houses__container-main">
          <div className="houses__container">
            {houses.map((house, index) => (
              <div key={index} className="house__card">
                <h2 className="houses__h2-title">{house.title}</h2>
                <p>City: {cityData.name}</p>
                <p>Guest Count: {house.guestCount}</p>
                <div className="houses__photos">
                  {house.imageSrc.length > 0 ? (
                    <img className="houses__img" src={house.imageSrc[0]} alt={`House ${index + 1} - Photo 1`} />
                  ) : (
                    <img src="../src/assets/no-image.jpg" alt="No Image" />
                  )}
                </div>
                <button className="houses__button" onClick={() => handleMoreInfoClick(house)}>
                  More Info
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {renderHouseDetails()}
    </div>
  );
};

export default Search;
