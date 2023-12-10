import React from 'react';
import { FaWifi, FaSwimmingPool, FaParking } from 'react-icons/fa';
import { LuAirVent } from 'react-icons/lu';
import { FaElevator } from 'react-icons/fa6';

const AmenityIcon = ({ amenity }) => {
  switch (amenity) {
    case 'Wifi':
      return <FaWifi />;
    case 'Swimming Pool':
      return <FaSwimmingPool />;
    case 'Parking':
      return <FaParking />;
    case 'Air Conditioned':
      return <LuAirVent />;
    case 'Elevator':  
      return <FaElevator />;
    // Agrega más casos según las amenities que tengas
    default:
      return null;
  }
};

export default AmenityIcon;