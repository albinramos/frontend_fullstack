import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './search.css';

const Search = () => {  
  const location = useLocation();
  const { city, arrivalDate, departDate, guests } = location.state || {};

  const pageStyles = {
    minHeight: '100vh',
    // Agrega otros estilos según sea necesario
  };

  return (
    <div style={pageStyles}>
      <section className="search">
        <h1>Search Results</h1>
        {/* Utiliza los datos en tu componente Search */}
        <p>City: {city}</p>
        <p>Arrival Date: {arrivalDate}</p>
        <p>Depart Date: {departDate}</p>
        <p>Guests: {guests}</p>
        {/* ... (resto de tu código) */}
      </section>
    </div>
  );
};

export default Search