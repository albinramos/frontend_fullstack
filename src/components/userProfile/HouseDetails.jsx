import React, { useEffect, useState } from 'react';

const HouseDetails = ({ houseId }) => {
  const [houseDetails, setHouseDetails] = useState(null);

  useEffect(() => {
    // Lógica para obtener los detalles de la casa desde la API
  }, [houseId]);

  return (
    <div>
     
    </div>
  );
};

export default HouseDetails;