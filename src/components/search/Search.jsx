import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './search.css';

const Search = () => {
  const [houses, setHouses] = useState([]);
  const location = useLocation();
  const { city, arrivalDate, departDate, guests, country, cityData } = location.state || {};
  console.log('cityData:', cityData);

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
    console.log('filteredHouses:', filteredHouses);
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

  return (
    <div style={pageStyles}>
      <section className="search">
        <h1>Search Results</h1>
        {/* ... (resto del contenido) */}
        <div className="map">
          <MapContainer center={[cityData.lat, cityData.lon]} zoom={13} scrollWheelZoom={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {getGeolocation().map((house, index) => (
              <Marker key={index} position={[house.lat, house.lon]}></Marker>
            ))}
          </MapContainer>
        </div>
      </section>
      <section className="houses">
        <h2>Houses</h2>
        <div className="houses__container">
          {houses.map((house, index) => (
            <div key={index}>
              <h2 className="houses__h2-title">{house.title}</h2>
              <p>City: {house.cityName}</p>
              <p>Guest Count: {house.guestCount}</p>
              <div className="houses__photos">
  {house.imageSrc.length > 0 ? (
    <img
      src={house.imageSrc[0]}
      alt={`House ${index + 1} - Photo 1`}
    />
  ) : (
    <img src="../src/assets/no-image.jpg" alt="No Image" />
  )}
</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
