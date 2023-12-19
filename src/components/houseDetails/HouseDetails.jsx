import React, { useState, useEffect } from "react";
import "./houseDetails.css";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import AmenityIcon from "../AmenityIcon";
import { useNavigate } from "react-router-dom";

const HouseDetails = () => {
  const location = useLocation();
  const [selectedHouse, setSelectedHouse] = useState(
    location.state?.selectedHouse || null
  );
  const navigate = useNavigate();
  const [isReserved, setIsReserved] = useState(false);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const resetSelectedHouse = () => {
    navigate(-1, { state: { selectedHouse: null } });
  };

  const handleAvailableDates = () => {
    navigate('/')
  }

  const handleReservation = async (e) => {
    e.preventDefault();
  
  try {
      const houseId = selectedHouse._id;
      const startDate = location.state.selectedHouse.startDate;
      const endDate = location.state.selectedHouse.endDate;
      const guests = location.state.selectedHouse.guests;
      const price = location.state.selectedHouse.price;
      const userId = localStorage.getItem("userId");
      const img = location.state.selectedHouse.imageSrc;
      console.log('imaaaaagen:',img);
      console.log('SEEEEEEELEEEEEECTED:', selectedHouse);

      const body = {
        houseId,
        startDate,
        endDate,
        guests,
        price,
        userId,
      };
      console.log(body);
      const result = await fetch("http://localhost:3666/reservations", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await result.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      setIsReserved(true);
    } catch (error) {
      console.log("Error registering: ", error.message);
    }
  };

  console.log(location.state.selectedHouse.arrivalDate);
  console.log(location.state.departDate);
  console.log(location.state.guests);
  console.log("looooooca:",location.state.selectedHouse);
  console.log(location.state.selectedHouse.price);


  return (
    <>
      {isReserved && (
        <div className="flash-notice">
          <p>Reservation successful!</p>
        </div>
      )}
      <div className="more-info__card">
        <div className="popup__container">
          <h3 className="h3-title">{location.state.selectedHouse.title}</h3>
          <Slider {...sliderSettings}>
            {location.state.selectedHouse.imageSrc.map((image, index) => (
              <div key={index}>
                <img
                  src={`http://localhost:3666/${image}`}
                  alt={`House ${index + 1}`}
                  className="slider-img"
                />
              </div>
            ))}
          </Slider>
          <p>
            <strong>Description:</strong> {location.state.selectedHouse.description}
          </p>
          <p>
            <strong>Number of guests:</strong> {location.state.selectedHouse.guestCount}
          </p>
          <p>
            <strong>Category:</strong> {location.state.selectedHouse.category}
          </p>
          <p>
            <strong>Nº of rooms:</strong> {location.state.selectedHouse.roomCount}{" "}
          </p>
          <p>
            <strong>Nº of bathrooms:</strong> {location.state.selectedHouse.bathroomCount}
          </p>
          <p><strong>Total Price:</strong> {location.state.selectedHouse.price}€</p>
          <div className="amenities__block">
            <p>
              <strong>Amenities:</strong>
            </p>
            {location.state.selectedHouse.amenities[0].split(',').map((amenity, index) => (
              <p key={index} style={{ marginBottom: "10px" }}>
                - <AmenityIcon amenity={amenity.trim()} /> {amenity}
              </p>
            ))}
          </div>
          <div className="search__buttons">
            {location.state.selectedHouse.startDate && location.state.selectedHouse.endDate && (
              <button
                className="reservation__button button-74"
                onClick={handleReservation}
              >
                Reservation
              </button>
            )}
            {!location.state.selectedHouse.startDate && !location.state.selectedHouse.endDate && (
              <button
                className="available reservation__button button-74"
                onClick={handleAvailableDates}
              >
                Find available dates
              </button>
            )}
            <button
              onClick={resetSelectedHouse}
              className="close__button button-74"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HouseDetails;
