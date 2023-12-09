import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './search.css';


const Search = () => { 
  const [houses, setHouses] = useState([]); 
  const location = useLocation();
  const { city, arrivalDate, departDate, guests, country, cityData } = location.state || {};
  //console.log('City:', city);
  //console.log('Country:', country);
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
    setHouses(data.houses);
  }

  const getGeolocation = () => {
    return houses.map((house) => (
      {
        lat: house.locationValue.split(',')[0],
        lon: house.locationValue.split(',')[1]
      }
    ))
  }

  return (
    <div style={pageStyles}>
      <section className="search">
        <h1>Search Results</h1>
        {}
        <p>City: {city}</p>
        <p>Country: {country}</p>
        <p>Arrival Date: {arrivalDate}</p>
        <p>Depart Date: {departDate}</p>
        <p>Guests: {guests}</p>
        {}
        <div className="map">
          <MapContainer center={[cityData.lat, cityData.lon]} zoom={13} scrollWheelZoom={true}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {getGeolocation().map((house, index) => (
              <Marker key={index} position={[house.lat, house.lon]}>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Search