import React, { useEffect, useState } from 'react';
import './userProfile.css'; // Asegúrate de importar el archivo CSS

const Reservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3666/user/${userId}/reservation`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error al obtener reservas: ${response.statusText}`);
        }

        const data = await response.json();
        setReservations(data.reservation);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchReservations();
  }, [userId]);

  const calculateDaysUntilReservation = (startDate) => {
    const today = new Date();
    const reservationDate = new Date(startDate);
    const timeDifference = reservationDate.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };

  const getCurrentReservations = () => {
    const now = Date.now();
    return reservations.filter((reservation) => now >= new Date(reservation.startDate) && now <= new Date(reservation.endDate));
  };

  const getFutureReservations = () => {
    const now = Date.now();
    return reservations.filter((reservation) => new Date(reservation.startDate) > now);
  };

  const getPastReservations = () => {
    const now = Date.now();
    return reservations.filter((reservation) => new Date(reservation.endDate) < now);
  };

  return (
    <div className='reservations--container'>
      <h3>Reservations</h3>
      <div className="reservation-cards-container">
        
        {getCurrentReservations().length > 0 && (
          <div className="reservation-card-container">
            <h4>Ongoing reservations</h4>
            {getCurrentReservations().map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-card-details">Details: {reservation.details}</div>
                <div className="reservation-card-date">
                  Start Date: {new Date(reservation.startDate).toLocaleDateString()} <br />
                  End Date: {new Date(reservation.endDate).toLocaleDateString()}
                </div>
                <div className="reservation-card-price">Price: ${reservation.price}</div>
               
              </div>
            ))}
          </div>
        )}

       
        {getFutureReservations().length > 0 && (
          <div className="reservation-card-container">
            <h4>Upcoming reservations</h4>
            {getFutureReservations().map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-card-details">Details: {reservation.details}</div>
                <div className="reservation-card-date">
                  Start Date: {new Date(reservation.startDate).toLocaleDateString()} <br />
                  End Date: {new Date(reservation.endDate).toLocaleDateString()}
                </div>
                <div className="reservation-card-price">Price: ${reservation.price}</div>
                <div className="reservation-card-days">
                  Days until reservation: {calculateDaysUntilReservation(reservation.startDate)}
                </div>
                <button className="reservation-card-cancel" onClick={() => handleCancelReservation(reservation.id)}>
                  Cancelar Reserva
                </button>
              </div>
            ))}
          </div>
        )}


        {getPastReservations().length > 0 && (
          <div className="reservation-card-container">
            <h4>ended reservations</h4>
            {getPastReservations().map((reservation) => (
              <div key={reservation.id} className="reservation-card">
                <div className="reservation-card-details">Details: {reservation.details}</div>
                <div className="reservation-card-date">
                  Start Date: {new Date(reservation.startDate).toLocaleDateString()} <br />
                  End Date: {new Date(reservation.endDate).toLocaleDateString()}
                </div>
                <div className="reservation-card-price">Price: ${reservation.price}</div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservations;
