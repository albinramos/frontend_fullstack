import React from 'react';
import { FaWifi, FaSwimmingPool, FaParking } from 'react-icons/fa';
import { LuAirVent } from 'react-icons/lu';
import { FaElevator } from 'react-icons/fa6';

const AmenityIcon = ({ amenity }) => {
  switch (amenity) {
    case 'wifi':
      return <FaWifi />;
    case 'swimming Pool':
      return <FaSwimmingPool />;
    case 'parking':
      return <FaParking />;
    case 'air Conditioned':
      return <LuAirVent />;
    case 'elevator':  
      return <FaElevator />;
    default:
      return null;
  }
};

export default AmenityIcon;