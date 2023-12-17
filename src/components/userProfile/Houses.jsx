import React, { useEffect, useState } from 'react';

const Houses = ({ userId }) => {
  const [houses, setHouses] = useState([]);
  const [visibilityStates, setVisibilityStates] = useState({});

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
        console.log("holii", data);

        // Inicializar el estado de visibilidad para cada casa
        const initialVisibilityStates = {};
        data.house.forEach(house => {
          initialVisibilityStates[house._id] = house.reservationsEnabled;
        });
        setVisibilityStates(initialVisibilityStates);

        setHouses(data.house);
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

     
      setHouses(prevHouses => prevHouses.map(house => {
        if (house._id === houseId) {
          return {
            ...house,
            reservationsEnabled: isVisible,
          };
        }
        return house;
      }));
      setVisibilityStates(prevVisibilityStates => ({
        ...prevVisibilityStates,
        [houseId]: isVisible,
      }));

      console.log("Visibility changed successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h3>Your Houses</h3>
      {houses.map((house) => (
        <div key={house._id}>
          <p>Title: {house.title}</p>
          <p>Description: {house.description}</p>

          <button onClick={() => handleChangeVisibility(house._id, !house.reservationsEnabled)}>
            {house.reservationsEnabled ? 'Hide from Reservations' : 'Show in Reservations'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Houses;
