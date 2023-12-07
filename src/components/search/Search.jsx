import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './search.css';


const Search = () => {  
  const location = useLocation();
  const { city, arrivalDate, departDate, guests, country, cityData } = location.state || {};
  //console.log('City:', city);
  //console.log('Country:', country);
  console.log('cityData:', cityData);

  const pageStyles = {
    minHeight: '100vh',
  };

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
          <Marker position={[cityData.lat, cityData.lon]}>
          </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default Search