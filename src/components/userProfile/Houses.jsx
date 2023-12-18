import React, { useEffect, useState } from 'react';
import './userProfile.css';
import HouseCreation from '../houseCreation/HouseCreation';
import { Link } from 'react-router-dom';

const Houses = ({ userId }) => {
  const [houses, setHouses] = useState([]);
  const [visibilityStates, setVisibilityStates] = useState({});
  const [showAddHouseButton, setShowAddHouseButton] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch(`http://localhost:3666/user/${userId}/houses`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error al obtener casas: ${response.statusText}`);
        }

        const data = await response.json();

        // Inicializar el estado de visibilidad para cada casa
        const initialVisibilityStates = {};
        data.house.forEach((house) => {
          initialVisibilityStates[house._id] = house.reservationsEnabled;
        });
        setVisibilityStates(initialVisibilityStates);

        setHouses(data.house);

        // Verificar si hay casas para determinar si se debe mostrar el botón "Add House"
        setShowAddHouseButton(data.house.length === 0);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchHouses();
  }, [userId]);

  const handleChangeVisibility = async (houseId, isVisible) => {
    try {
      const response = await fetch(`http://localhost:3666/landing/changestate?reservations=${isVisible}&houseid=${houseId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error al cambiar la visibilidad de la casa: ${response.statusText}`);
      }

      setHouses((prevHouses) =>
        prevHouses.map((house) => {
          if (house._id === houseId) {
            return {
              ...house,
              reservationsEnabled: isVisible,
            };
          }
          return house;
        })
      );
      setVisibilityStates((prevVisibilityStates) => ({
        ...prevVisibilityStates,
        [houseId]: isVisible,
      }));

      console.log('Visibility changed successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h3>Your Houses</h3>
      
      <button className="add-house-button" onClick={() => window.location.href = `/housecreation`}>
  Add House
</button>
      

      <ul className="houses-list">
        {houses.map((house) => (
          <li key={house._id} className="house-card">
            <p className="house-card-title">Title: {house.title}</p>
            <p className="house-card-description">Description: {house.description}</p>
            <button
              className="house-card-visibility"
              onClick={() => handleChangeVisibility(house._id, !house.reservationsEnabled)}
            >
              {house.reservationsEnabled ? 'Hide from Reservations' : 'Show in Reservations'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Houses;
