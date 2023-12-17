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

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      const houseId = selectedHouse._id;
      const startDate = location.state.arrivalDate;
      const endDate = location.state.departDate;
      const guests = location.state.guests;
      const price = selectedHouse.price;
      const userId = localStorage.getItem("userId");

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

  console.log(location.state.arrivalDate);
  console.log(location.state.departDate);
  console.log(location.state.guests);

  return (
    <>
      {isReserved && (
        <div className="flash-notice">
          <p>Reservation successful!</p>
        </div>
      )}
      <div className="more-info__card">
        <div className="popup__container">
          <h3 className="h3-title">{selectedHouse.title}</h3>
          <Slider {...sliderSettings}>
            {selectedHouse.imageSrc.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`House ${index + 1}`}
                  className="slider-img"
                />
              </div>
            ))}
          </Slider>
          <p>
            <strong>Description:</strong> {selectedHouse.description}
          </p>
          <p>
            <strong>Number of guests:</strong> {selectedHouse.guestCount}
          </p>
          <p>
            <strong>Category:</strong> {selectedHouse.category}
          </p>
          <p>
            <strong>Nº of rooms:</strong> {selectedHouse.roomCount}{" "}
          </p>
          <p>
            <strong>Nº of bathrooms:</strong> {selectedHouse.bathroomCount}
          </p>
          <div className="amenities__block">
            <p>
              <strong>Amenities:</strong>
            </p>
            {selectedHouse.amenities.map((amenity, index) => (
              <p key={index} style={{ marginBottom: "10px" }}>
                - <AmenityIcon amenity={amenity} /> {amenity}
              </p>
            ))}
          </div>
          <div className="search__buttons">
            <button
              className="reservation__button button-74"
              onClick={handleReservation}
            >
              Reservation
            </button>
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
