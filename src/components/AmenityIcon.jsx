import React from 'react';
import { FaWifi, FaSwimmingPool, FaParking, FaHotTub } from 'react-icons/fa';
import { LuAirVent } from 'react-icons/lu';
import { FaElevator } from 'react-icons/fa6';
import { MdBalcony, MdFireplace, MdOutlineIron } from "react-icons/md";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidWasher } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { GiFlowerPot, GiBarbecue } from "react-icons/gi";
import { PiTelevisionBold } from "react-icons/pi";



const AmenityIcon = ({ amenity }) => {
  switch (amenity) {
    case 'wifi':
      return <FaWifi />;
    case 'swimming pool':
      return <FaSwimmingPool />;
    case 'parking':
      return <FaParking />;
    case 'air conditioner':
      return <LuAirVent />;
    case 'elevator':  
      return <FaElevator />;
    case 'terrace':
      return <MdBalcony />;
    case 'kitchen':
      return <FaKitchenSet />;
    case 'washer':
      return <BiSolidWasher />;
    case 'gym':
      return <CgGym />;
    case 'fireplace':
      return <MdFireplace />;
    case 'sauna':
      return <FaHotTub />;
    case 'garden':
      return <GiFlowerPot />;
    case 'tv':
      return <PiTelevisionBold />;
    case 'bbq':
      return <GiBarbecue />;
    case 'iron':
      return <MdOutlineIron />;
    default:
      return null;
  }
};

export default AmenityIcon;